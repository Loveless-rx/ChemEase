import {
  add,
  cross,
  lookAt,
  mix,
  normalize,
  perspective,
  rotate,
  scale,
  sub,
  type SceneFrame,
  type Vec3,
} from "./sceneMath";

type Mesh = { buffer: WebGLBuffer; vertices: number };
type IntroAtom = { point: Vec3; scatter: Vec3; element: "C" | "H" };
const vertexShader = `
attribute vec3 a_position;
attribute vec3 a_normal;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;
uniform mat3 u_normal;
varying vec3 v_normal;
varying vec3 v_position;
void main(){
 vec4 world = u_model * vec4(a_position, 1.0);
 v_position = world.xyz;
 v_normal = normalize(u_normal * a_normal);
 gl_Position = u_projection * u_view * world;
}`;
const fragmentShader = `
precision highp float;
varying vec3 v_normal;
varying vec3 v_position;
uniform vec3 u_color;
uniform vec3 u_camera;
uniform float u_alpha;
uniform float u_shine;
void main(){
 vec3 N = normalize(v_normal);
 vec3 V = normalize(u_camera - v_position);
 vec3 key = normalize(vec3(-3.0, 5.0, 6.0));
 vec3 fill = normalize(vec3(4.0, 1.0, -3.0));
 float diffuse = max(dot(N, key), 0.0);
 float bounce = max(dot(N, fill), 0.0);
 float specular = pow(max(dot(N, normalize(key + V)), 0.0), u_shine);
 float rim = pow(1.0 - max(dot(N,V),0.0), 3.0);
 vec3 color = u_color * (0.43 + 0.53 * diffuse + 0.19 * bounce);
 color += vec3(1.0, 0.98, 0.95) * specular * 0.56;
 color += vec3(0.45, 0.31, 0.62) * rim * 0.12;
 gl_FragColor = vec4(color, u_alpha);
}`;

function sphereGeometry(columns = 36, rows = 24) {
  const vertices: number[] = [];
  const point = (u: number, v: number) => [
    Math.sin(v * Math.PI) * Math.cos(u * Math.PI * 2),
    Math.cos(v * Math.PI),
    Math.sin(v * Math.PI) * Math.sin(u * Math.PI * 2),
  ];
  const emit = (p: number[]) => vertices.push(...p, ...p);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < columns; x++) {
      const a = point(x / columns, y / rows),
        b = point((x + 1) / columns, y / rows),
        c = point(x / columns, (y + 1) / rows),
        d = point((x + 1) / columns, (y + 1) / rows);
      [a, c, b, b, c, d].forEach(emit);
    }
  return new Float32Array(vertices);
}
function cylinderGeometry(segments = 24) {
  const vertices: number[] = [];
  const emit = (t: number, y: number) => {
    const x = Math.cos(t),
      z = Math.sin(t);
    vertices.push(x, y, z, x, 0, z);
  };
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2,
      b = ((i + 1) / segments) * Math.PI * 2;
    emit(a, -0.5);
    emit(b, -0.5);
    emit(a, 0.5);
    emit(b, -0.5);
    emit(b, 0.5);
    emit(a, 0.5);
  }
  return new Float32Array(vertices);
}
function makeAtoms(): IntroAtom[] {
  const atoms: IntroAtom[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    atoms.push({
      point: [1.42 * Math.cos(angle), 1.42 * Math.sin(angle), 0],
      scatter: [
        Math.cos(angle + 0.4) * 1.25,
        Math.sin(angle + 0.2) * 1.1,
        Math.sin(i * 2.1) * 1.7,
      ],
      element: "C",
    });
  }
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    atoms.push({
      point: [2.46 * Math.cos(angle), 2.46 * Math.sin(angle), 0],
      scatter: [
        Math.cos(angle - 0.2) * 1.5,
        Math.sin(angle - 0.5) * 1.6,
        Math.cos(i * 1.7) * 2.1,
      ],
      element: "H",
    });
  }
  return atoms;
}

/** Real, depth-tested WebGL meshes. The illustrative geometry is not a conformer. */
export class MoleculeScene {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private sphere: Mesh;
  private cylinder: Mesh;
  private positionLocation: number;
  private normalLocation: number;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private atoms = makeAtoms();
  private edges = [
    ...Array.from({ length: 6 }, (_, i) => [i, (i + 1) % 6]),
    ...Array.from({ length: 6 }, (_, i) => [i, i + 6]),
  ];
  private width = 1;
  private height = 1;

  private canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      premultipliedAlpha: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: true,
    });
    if (!gl) throw new Error("WebGL is unavailable.");
    this.gl = gl;
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to allocate shader.");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(error || "Shader compilation failed.");
      }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexShader),
      fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!program) throw new Error("Unable to allocate WebGL program.");
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      throw new Error("WebGL program linking failed.");
    }
    this.program = program;
    this.positionLocation = gl.getAttribLocation(program, "a_position");
    this.normalLocation = gl.getAttribLocation(program, "a_normal");
    for (const name of [
      "model",
      "normal",
      "view",
      "projection",
      "color",
      "camera",
      "alpha",
      "shine",
    ])
      this.uniforms[name] = gl.getUniformLocation(program, `u_${name}`);
    this.sphere = this.mesh(sphereGeometry());
    this.cylinder = this.mesh(cylinderGeometry());
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
  }
  private mesh(data: Float32Array): Mesh {
    const buffer = this.gl.createBuffer();
    if (!buffer) throw new Error("Unable to allocate mesh.");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    return { buffer, vertices: data.length / 6 };
  }
  resize() {
    const { width, height } = this.canvas.getBoundingClientRect();
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      width < 700 ? 1.5 : 1.75,
    );
    this.width = Math.max(width, 1);
    this.height = Math.max(height, 1);
    const w = Math.round(this.width * ratio),
      h = Math.round(this.height * ratio);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.gl.viewport(0, 0, w, h);
  }
  private drawMesh(
    mesh: Mesh,
    p: Vec3,
    x: Vec3,
    y: Vec3,
    z: Vec3,
    color: Vec3,
    alpha = 1,
    shine = 52,
  ) {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(this.normalLocation);
    gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, false, 24, 12);
    gl.uniformMatrix4fv(
      this.uniforms.model,
      false,
      new Float32Array([
        x[0],
        x[1],
        x[2],
        0,
        y[0],
        y[1],
        y[2],
        0,
        z[0],
        z[1],
        z[2],
        0,
        p[0],
        p[1],
        p[2],
        1,
      ]),
    );
    gl.uniformMatrix3fv(
      this.uniforms.normal,
      false,
      new Float32Array([...normalize(x), ...normalize(y), ...normalize(z)]),
    );
    gl.uniform3fv(this.uniforms.color, color);
    gl.uniform1f(this.uniforms.alpha, alpha);
    gl.uniform1f(this.uniforms.shine, shine);
    gl.drawArrays(gl.TRIANGLES, 0, mesh.vertices);
  }
  private bond(a: Vec3, b: Vec3, radius: number, color: Vec3, opacity = 1) {
    const direction = sub(b, a),
      length = Math.hypot(...direction);
    if (length < 0.01) return;
    const y = normalize(direction),
      x = normalize(cross(Math.abs(y[1]) > 0.95 ? [1, 0, 0] : [0, 1, 0], y)),
      z = cross(x, y);
    this.drawMesh(
      this.cylinder,
      scale(add(a, b), 0.5),
      scale(x, radius),
      scale(y, length),
      scale(z, radius),
      color,
      opacity,
      70,
    );
  }
  render(frame: SceneFrame, pointer: { x: number; y: number }, dark: boolean) {
    const gl = this.gl;
    if (gl.isContextLost()) return;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.program);
    const camera: Vec3 = [
      frame.camera[0] + pointer.x * 0.12,
      frame.camera[1] + pointer.y * 0.08,
      frame.camera[2],
    ];
    gl.uniformMatrix4fv(
      this.uniforms.projection,
      false,
      perspective((38 * Math.PI) / 180, this.width / this.height),
    );
    gl.uniformMatrix4fv(
      this.uniforms.view,
      false,
      lookAt(camera, frame.target),
    );
    gl.uniform3fv(this.uniforms.camera, camera);
    const rotation: Vec3 = [
      frame.rotation[0] + pointer.y * 0.07,
      frame.rotation[1] + pointer.x * 0.1,
      frame.rotation[2],
    ];
    const positions = this.atoms.map((a) =>
      add(
        frame.position,
        scale(
          rotate(add(a.point, scale(a.scatter, frame.spread)), rotation),
          frame.zoom,
        ),
      ),
    );
    const radii = this.atoms.map(
      (a) => (a.element === "C" ? 0.38 : 0.21) * frame.radius * frame.zoom,
    );
    // A few distant spheres give perspective during the disassembly chapter, not chemical atoms.
    if (frame.spread > 0.15) {
      gl.depthMask(false);
      for (let i = 0; i < 12; i++) {
        const p: Vec3 = [
          Math.sin(i * 2.399) * 7,
          Math.cos(i * 2.1) * 4,
          -5 - (i % 3),
        ];
        const r = 0.017 + (i % 3) * 0.005;
        this.drawMesh(
          this.sphere,
          p,
          [r, 0, 0],
          [0, r, 0],
          [0, 0, r],
          dark ? [0.65, 0.52, 0.78] : [0.6, 0.49, 0.7],
          Math.min(0.5, frame.spread * 0.3),
        );
      }
      gl.depthMask(true);
    }
    for (const [a, b] of this.edges) {
      const direction = normalize(sub(positions[b], positions[a]));
      const start = add(positions[a], scale(direction, radii[a] * 0.8)),
        end = add(positions[b], scale(direction, -radii[b] * 0.8));
      if (frame.bonds > 0.01)
        this.bond(
          start,
          end,
          0.075 * frame.zoom * Math.max(0.18, frame.bonds),
          dark ? [0.68, 0.63, 0.76] : [0.76, 0.72, 0.81],
          frame.bonds,
        );
    }
    // Real sphere meshes and depth testing, rather than CSS circles or 2D shaded discs.
    for (let i = 0; i < positions.length; i++) {
      const atom = this.atoms[i],
        r = radii[i];
      const c: Vec3 =
        atom.element === "C"
          ? dark
            ? [0.77, 0.62, 0.92]
            : [0.69, 0.52, 0.83]
          : dark
            ? [0.91, 0.91, 0.95]
            : [0.99, 0.98, 0.95];
      this.drawMesh(
        this.sphere,
        positions[i],
        [r, 0, 0],
        [0, r, 0],
        [0, 0, r],
        c,
        1,
        atom.element === "C" ? 50 : 72,
      );
    }
    // An aromatic inner circle emerges as the molecular structure rotates toward 2D.
    const guide = Math.max(0, (frame.at - 0.88) / 0.12);
    if (guide > 0.01) {
      for (let i = 0; i < 32; i++) {
        const a = add(
          frame.position,
          scale(
            rotate(
              [Math.cos((i * Math.PI) / 16), Math.sin((i * Math.PI) / 16), 0],
              rotation,
            ),
            frame.zoom * 0.92,
          ),
        );
        const b = add(
          frame.position,
          scale(
            rotate(
              [
                Math.cos(((i + 1) * Math.PI) / 16),
                Math.sin(((i + 1) * Math.PI) / 16),
                0,
              ],
              rotation,
            ),
            frame.zoom * 0.92,
          ),
        );
        this.bond(
          a,
          b,
          mix(0.002, 0.016, guide),
          dark ? [0.65, 0.53, 0.8] : [0.5, 0.37, 0.68],
          guide,
        );
      }
    }
    this.canvas.dataset.renderer = "webgl";
    this.canvas.dataset.progress = frame.at.toFixed(4);
    this.canvas.dataset.camera = camera.map((n) => n.toFixed(3)).join(",");
    this.canvas.dataset.spread = frame.spread.toFixed(3);
  }
  dispose() {
    this.gl.deleteBuffer(this.sphere.buffer);
    this.gl.deleteBuffer(this.cylinder.buffer);
    this.gl.deleteProgram(this.program);
  }
}
