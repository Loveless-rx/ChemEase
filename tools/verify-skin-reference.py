"""Extract numeric parity cases from CDC's PGMethod constructor without executing Java.

Download SkinPerm.jar from the URL below into ignored qa/skin first. This small,
allowlisted interpreter supports only the constructor's arithmetic and fields.
It never loads Java classes, executes a JAR, or unpickles downloaded objects.
"""
import hashlib
import json
import struct
import zipfile
from pathlib import Path

jar = Path("qa/skin/SkinPerm.jar")
blob = jar.read_bytes()
with zipfile.ZipFile(jar) as archive:
    raw = archive.read("skinperm/PGMethod.class")
pos = 0


def take(n):
    global pos
    result = raw[pos:pos+n]
    pos += n
    return result


def u1():
    return int.from_bytes(take(1), "big")


def u2():
    return int.from_bytes(take(2), "big")


def u4():
    return int.from_bytes(take(4), "big")


assert take(4) == b"\xca\xfe\xba\xbe"
take(4)
count = u2()
pool = [None]*count
i = 1
while i < count:
    tag = u1()
    if tag == 1:
        pool[i] = take(u2()).decode("utf-8")
    elif tag == 6:
        pool[i] = struct.unpack(">d", take(8))[0]
        i += 1
    elif tag in (7, 8):
        pool[i] = (tag, u2())
    elif tag in (9, 10, 11, 12):
        pool[i] = (tag, u2(), u2())
    elif tag in (3, 4):
        take(4)
    elif tag == 5:
        take(8)
        i += 1
    else:
        raise ValueError(f"Unexpected constant-pool tag {tag}")
    i += 1


def member(index):
    ref = pool[index]
    owner = pool[pool[ref[1]][1]]
    name_type = pool[ref[2]]
    return owner, pool[name_type[1]], pool[name_type[2]]


def attributes():
    result = {}
    for _ in range(u2()):
        name = pool[u2()]
        result[name] = take(u4())
    return result


take(6)
take(u2()*2)
for _ in range(u2()):
    take(6)
    attributes()
code = None
for _ in range(u2()):
    u2()
    name, descriptor = pool[u2()], pool[u2()]
    attrs = attributes()
    if name == "<init>" and descriptor == "(DD)V":
        content = attrs["Code"]
        length = int.from_bytes(content[4:8], "big")
        code = content[8:8+length]
assert code, "PGMethod(double MW, double LogKow) constructor missing"


def evaluate(weight, log_kow):
    fields, stack, pc = {}, [], 0
    while pc < len(code):
        op = code[pc]
        pc += 1
        if op in (0xb4, 0xb5, 0xb7, 0xb8, 0x14):
            index = int.from_bytes(code[pc:pc+2], "big")
            pc += 2
        if op == 0x2a:
            stack.append(fields)
        elif op == 0x0e:
            stack.append(0.0)
        elif op == 0x27:
            stack.append(weight)
        elif op == 0x29:
            stack.append(log_kow)
        elif op == 0x14:
            assert isinstance(pool[index], float)
            stack.append(pool[index])
        elif op in (0xb4, 0xb5):
            owner, name, dtype = member(index)
            assert owner == "skinperm/PGMethod" and dtype == "D"
            if op == 0xb5:
                value, obj = stack.pop(), stack.pop()
                obj[name] = value
            else:
                stack.append(stack.pop()[name])
        elif op == 0xb7:
            assert member(index) == ("java/lang/Object", "<init>", "()V")
            stack.pop()
        elif op == 0xb8:
            assert member(index) == ("java/lang/Math", "pow", "(DD)D")
            exponent, base = stack.pop(), stack.pop()
            stack.append(base**exponent)
        elif op in (0x6b, 0x63):
            b, a = stack.pop(), stack.pop()
            stack.append(a*b if op == 0x6b else a+b)
        elif op == 0xb1:
            assert not stack and pc == len(code)
            return fields
        else:
            raise ValueError(f"Unsupported opcode {op:#x}")
    raise ValueError("Missing return")


cases = []
for weight in [18.0, 78.11, 122.12, 180.16, 750.0]:
    for log_kow in [-3.0, 0.0, 2.13, 6.0]:
        result = evaluate(weight, log_kow)
        cases.append({"weight": weight, "logKow": log_kow,
                      "logKpCmHour": result["logkp"], "kpCmHour": result["kp"]})
fixture = {"source": "https://ftp.cdc.gov/pub/niosh/skin/SkinPerm.jar",
           "jarSha256": hashlib.sha256(blob).hexdigest(),
           "classSha256": hashlib.sha256(raw).hexdigest(),
           "method": "skinperm.PGMethod(double MW, double LogKow)",
           "verification": "Allowlisted constructor bytecode interpretation; numeric parity, not predictive validation",
           "cases": cases}
target = Path("vendor/skin/cdc-reference.json")
target.parent.mkdir(parents=True, exist_ok=True)
text = json.dumps(fixture, indent=2) + "\n"
if target.exists():
    assert json.loads(target.read_text()) == fixture, "CDC reference changed; review before changing model"
else:
    target.write_text(text)
print(f"Verified {len(cases)} reference cases; JAR SHA256 {fixture['jarSha256']}")
