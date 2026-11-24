#!/usr/bin/env bash
set -euo pipefail
# Build prerequisite only: does not provide the 200-feature hERG runtime yet.
PROJECT_ROOT="$PWD"
RDKIT_COMMIT=b598a27802d30d2f07913fe40ede0d9fb60e4239
mkdir -p .cache/herg-wasm
cd .cache/herg-wasm
if [ ! -d rdkit/.git ]; then git clone --filter=blob:none https://github.com/rdkit/rdkit.git rdkit; fi
git -C rdkit checkout --detach "$RDKIT_COMMIT"
test "$(git -C rdkit rev-parse HEAD)" = "$RDKIT_COMMIT"
# Historical MinimalLib uses MolAlign without listing it as a direct link input.
sed -i 's/CIPLabeler_static MolDraw2D_static/CIPLabeler_static MolAlign_static ChemTransforms_static Fingerprints_static MolDraw2D_static/' rdkit/Code/MinimalLib/CMakeLists.txt
python3 "$PROJECT_ROOT/tools/herg/extend-rdkit.py" "$PWD/rdkit"
mkdir -p headers
cp -R /usr/include/boost headers/
cp -R /usr/include/eigen3 headers/
emcmake cmake -S rdkit -B build \
 -DBoost_INCLUDE_DIR="$PWD/headers" -DEIGEN3_INCLUDE_DIR="$PWD/headers/eigen3" -DRDK_BUILD_MINIMAL_LIB=ON \
 -DRDK_BUILD_PYTHON_WRAPPERS=OFF -DRDK_BUILD_CPP_TESTS=OFF \
 -DRDK_USE_BOOST_SERIALIZATION=OFF -DRDK_OPTIMIZE_POPCNT=OFF \
 -DRDK_BUILD_THREADSAFE_SSS=OFF -DRDK_BUILD_DESCRIPTORS3D=OFF \
 -DRDK_TEST_MULTITHREADED=OFF -DRDK_BUILD_MAEPARSER_SUPPORT=OFF \
 -DRDK_BUILD_COORDGEN_SUPPORT=OFF -DRDK_BUILD_INCHI_SUPPORT=ON \
 -DRDK_BUILD_FREETYPE_SUPPORT=OFF -DRDK_BUILD_SLN_SUPPORT=OFF \
 -DRDK_USE_BOOST_IOSTREAMS=OFF \
 -DCMAKE_CXX_FLAGS="-Wno-enum-constexpr-conversion -s DISABLE_EXCEPTION_CATCHING=0" \
 -DCMAKE_EXE_LINKER_FLAGS="-s MODULARIZE=1 -s EXPORT_NAME='initRDKitModule'"
# Historical InChI util.c platform check: same compatibility patch as upstream.
sed -i 's/&& defined(__APPLE__)//' rdkit/External/INCHI-API/src/INCHI_BASE/src/util.c
cmake --build build --target RDKit_minimal --parallel 2
mkdir -p ../../output/herg-wasm-research
cp build/Code/MinimalLib/RDKit_minimal.js build/Code/MinimalLib/RDKit_minimal.wasm ../../output/herg-wasm-research/
cd ../../output/herg-wasm-research
printf '%s\n' '{"type":"commonjs"}' > package.json
sha256sum RDKit_minimal.js RDKit_minimal.wasm > SHA256SUMS
