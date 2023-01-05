export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "src/assets/three/textures/environmentMap/px.jpg",
      "src/assets/three/textures/environmentMap/nx.jpg",
      "src/assets/three/textures/environmentMap/py.jpg",
      "src/assets/three/textures/environmentMap/ny.jpg",
      "src/assets/three/textures/environmentMap/pz.jpg",
      "src/assets/three/textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "grassColorTexture",
    type: "texture",
    path: "src/assets/three/textures/dirt/color.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "src/assets/three/textures/dirt/normal.jpg",
  },
  {
    name: "foxModel",
    type: "gltfModel",
    path: "src/assets/three/models/Fox/glTF/Fox.gltf",
  },
];
