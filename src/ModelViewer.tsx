import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { ContactShadows, useGLTF } from "@react-three/drei";

type Props = {
  file: string;
};

const ModelViewer = ({ file }: Props) => {
  console.log("MMMMMMMM");

  // const model = useLoader(
  //   GLTFLoader,
  //   "/models/zombieCar.gltf",
  //   (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("/draco");
  //     loader.setDRACOLoader(dracoLoader);
  //   },
  //   (progress) => {
  //     console.log("progress", progress);
  //   },
  // );

  const model = useGLTF(file);

  console.log("nodes", model);

  return (
    <>
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1} />
      <ContactShadows position={[0, -2, -0.16]} />

      <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive object={model.scene} />
      {/*<mesh geometry={nodes.} />*/}
    </>
  );
};

export default ModelViewer;
