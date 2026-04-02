import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const techLabels = [
  "Python",
  "R",
  "MATLAB",
  "Scikit-learn",
  "Machine Learning",
  "Statistical Modeling",
  "Probability",
  "Numerical Analysis",
  "Optimization",
  "Data Analysis",
];

// Detect slow device performance
const isSLowDevice = () => {
  const nav = navigator as any;
  if (nav.deviceMemory && nav.deviceMemory < 4) return true;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return true;
  return false;
};

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const sphereCount = isSLowDevice() ? 12 : 30;
const spheres = [...Array(sphereCount)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

function createTextTexture(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#0b1220");
  gradient.addColorStop(1, "#123049");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 44px Geist, Arial, sans-serif";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSlowDevice = isSLowDevice();

  useEffect(() => {
    let activeInterval: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workElement = document.getElementById("work");
      if (!workElement) return;
      const threshold = workElement.getBoundingClientRect().top;
      
      const newActive = scrollY > threshold;
      if (newActive !== isActive) {
        setIsActive(newActive);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, isSlowDevice ? 200 : 100);
    };

    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        if (activeInterval) clearInterval(activeInterval);
        activeInterval = setInterval(() => {
          handleScroll();
        }, isSlowDevice ? 100 : 50);
        const timeout = setTimeout(() => {
          if (activeInterval) clearInterval(activeInterval);
          activeInterval = null;
        }, 1000);
        return () => {
          clearTimeout(timeout);
          if (activeInterval) clearInterval(activeInterval);
        };
      });
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (activeInterval) clearInterval(activeInterval);
    };
  }, [isActive, isSlowDevice]);
  
  const materials = useMemo(() => {
    return techLabels
      .map((label) => createTextTexture(label))
      .filter((texture): texture is THREE.CanvasTexture => texture !== null)
      .map(
        (texture) =>
          new THREE.MeshPhysicalMaterial({
            map: texture,
            emissive: "#ffffff",
            emissiveMap: texture,
            emissiveIntensity: isSlowDevice ? 0.08 : 0.15,
            metalness: isSlowDevice ? 0.2 : 0.3,
            roughness: 0.95,
            clearcoat: isSlowDevice ? 0 : 0.1,
          })
      );
  }, [isSlowDevice]);

  return (
    <div className="techstack">
      <h2>My Techstack</h2>

      <Canvas
        shadows={!isSlowDevice}
        gl={{ 
          alpha: true, 
          stencil: false, 
          depth: false, 
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.5;
          state.gl.outputColorSpace = "srgb-linear";
        }}
        className="tech-canvas"
        dpr={Math.min(window.devicePixelRatio, isSlowDevice ? 1 : 1.5)}
      >
        <ambientLight intensity={isSlowDevice ? 0.7 : 1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow={!isSlowDevice}
          shadow-mapSize={[256, 256]}
        />
        <directionalLight position={[0, 5, -4]} intensity={isSlowDevice ? 1.2 : 2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={isSlowDevice ? 0.3 : 0.5}
          environmentRotation={[0, 4, 2]}
        />
        {!isSlowDevice && (
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={1.5} intensity={0.6} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default TechStack;
