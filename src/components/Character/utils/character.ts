import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            applyCharacterStyle(gltf.scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

function applyCharacterStyle(scene: THREE.Object3D) {
  // DEBUG: print mesh + material names
  scene.traverse((node: any) => {
    if (!node.isMesh) return;

    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];

    materials.forEach((mat: any) => {
      console.log("Mesh:", node.name, "| Material:", mat?.name || "(no name)");
    });
  });

  paintByTokens(scene, ["hair", "eyebrow"], "#000000");
  paintByTokens(
    scene,
    [
      "face.002",
      "cube.002",
      "ear.001",
      "ear",
      "neck",
      "nose",
      "hand",
      "jaw",
      "skin",
      "skins",
      "default",
    ],
    "#bd773a"
  );
  paintByTokens(scene, ["body.shirt", "shirt", "top"], "#9e5ede");
  paintByTokens(scene, ["pant", "leg"], "#000000");
  paintByTokens(scene, ["shoe"], "#6b6b6b");
  paintByTokens(scene, ["sole"], "#111111");
}

function paintByTokens(
  scene: THREE.Object3D,
  tokens: string[],
  hexColor: string
) {
  const matchers = tokens.map((t) => t.toLowerCase());
  scene.traverse((node: any) => {
    if (!node.isMesh || !node.material) return;
    const nodeName = String(node.name || "").toLowerCase();
    const mats = Array.isArray(node.material) ? node.material : [node.material];
    const materialNames = mats.map((m: any) => String(m?.name || "").toLowerCase()).join(" ");
    if (!matchers.some((t) => nodeName.includes(t) || materialNames.includes(t))) return;

    const updated = mats.map((mat: any) => {
      const clone = mat.clone();
      clone.map = null;
      clone.emissiveMap = null;
      clone.alphaMap = null;
      clone.normalMap = null;
      clone.roughnessMap = null;
      clone.metalnessMap = null;
      clone.aoMap = null;
      if ("vertexColors" in clone) clone.vertexColors = false;
      clone.color = new THREE.Color(hexColor);
      if (clone.emissive) clone.emissive.set("#000000");
      if ("roughness" in clone) clone.roughness = 0.7;
      if ("metalness" in clone) clone.metalness = 0.05;
      clone.needsUpdate = true;
      return clone;
    });
    node.material = Array.isArray(node.material) ? updated : updated[0];
  });
}

export default setCharacter;
