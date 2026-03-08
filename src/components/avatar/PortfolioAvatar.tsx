import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type PortfolioAvatarProps = {
  className?: string;
  modelPath?: string;
};

function AvatarModel({ modelPath = "/models/character.glb" }: { modelPath?: string }) {
  const rootRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, rootRef);

  useMemo(() => {
    clonedScene.traverse((node: any) => {
      if (!node.isMesh || !node.material) return;
      const mats = Array.isArray(node.material) ? node.material : [node.material];
      const meshName = (node.name || "").toLowerCase();

      mats.forEach((mat: any) => {
        if (!mat?.color) return;
        const name = (mat.name || "").toLowerCase();
        if (/(skin|face|head|ear|nose|mouth)/.test(meshName + name)) {
          mat.color.set("#b77a64");
          if ("roughness" in mat) mat.roughness = 0.62;
          if ("metalness" in mat) mat.metalness = 0.06;
        }
        if (/(cap|hat)/.test(meshName + name)) mat.color.set("#ff3502");
        if (/(brim|visor)/.test(meshName + name)) mat.color.set("#281414");
        if (/(shirt|hood|hoodie|cloth|torso|top)/.test(meshName + name))
          mat.color.set("#2a2d33");
      });
    });
  }, [clonedScene]);

  useMemo(() => {
    ["key1", "key2", "key5", "key6", "typing"].forEach((name) => {
      const action = actions[name];
      if (action) {
        action.enabled = true;
        action.timeScale = 1.1;
        action.play();
      }
    });
    const blink = actions["Blink"];
    if (blink) {
      blink.enabled = true;
      blink.timeScale = 0.85;
      blink.setLoop(THREE.LoopRepeat, Infinity);
      blink.play();
    }
  }, [actions]);

  useFrame(({ clock }) => {
    if (!rootRef.current) return;
    const t = clock.getElapsedTime();
    rootRef.current.position.y = Math.sin(t * 1.15) * 0.055;
    rootRef.current.scale.y = 1 + Math.sin(t * 1.5) * 0.006;
    rootRef.current.rotation.y = THREE.MathUtils.lerp(
      rootRef.current.rotation.y,
      Math.sin(t * 0.45) * 0.08,
      0.06
    );
  });

  return (
    <group ref={rootRef} position={[0, -1.7, 0]} rotation={[0, 0.9, 0]} scale={1.2}>
      <primitive object={clonedScene} />
    </group>
  );
}

const PortfolioAvatar = ({ className, modelPath = "/models/character.glb" }: PortfolioAvatarProps) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 2.7, 7.2], fov: 28 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.95} color="#f8f8ff" />
        <directionalLight position={[-1.2, 2.2, 2.4]} intensity={1.15} color="#f8f5ff" />
        <pointLight position={[3.8, 2.2, 2.6]} intensity={1.7} distance={14} color="#d78fff" />
        <Environment files="/models/char_enviorment.hdr" environmentIntensity={0.55} />
        <Suspense fallback={null}>
          <AvatarModel modelPath={modelPath} />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload("/models/character.glb");

export default PortfolioAvatar;
