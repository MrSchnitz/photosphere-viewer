import { useLoader } from "@react-three/fiber";
import {
  ContactShadows,
  useFBX,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { FileType } from "./App.tsx";
import { useMemo } from "react";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

const GTLFModel = ({ file }: Props) => {
  const model = useGLTF(file.blob);

  return <primitive object={model.scene} />;
};

const OBJModel = ({ file }: Props) => {
  // const material = useLoader(MTLLoader, "./models/cottage_obj.mtl");
  // const obj = useLoader(OBJLoader, "./models/cottage_obj.obj", (loader) => {
  //   material.preload();
  //   loader.setMaterials(material);
  // });
  const obj = useLoader(OBJLoader, file.blob)

  console.log("OBJ", obj);

  return <primitive object={obj} />;
};

const FBXModel = ({ file }: Props) => {
  const fbx = useFBX(file.blob);

  return <primitive object={fbx} />;
};

type Props = {
  file: FileType;
};

enum ModelType {
  GTLF = "GLTF",
  OBJ = "OBJ",
  FBX = "FBX",
}

function getModelTypeFromFile(file: string) {
  if (file.includes(".gltf")) {
    return ModelType.GTLF;
  } else if (file.includes(".obj")) {
    return ModelType.OBJ;
  } else if (file.includes(".fbx")) {
    return ModelType.FBX;
  } else {
    return null;
  }
}

const ModelViewer = ({ file }: Props) => {
  // const { progress } = useProgress();

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

  const modelType = useMemo(
    () => getModelTypeFromFile(file.file.name),
    [file.file.name],
  );

  // console.log("Model", file, modelType);

  if (!modelType) {
    return null;
  }

  // console.log("progress", progress);

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

      {(() => {
        switch (modelType) {
          case ModelType.GTLF:
            return <GTLFModel file={file} />;
          case ModelType.OBJ:
            return <OBJModel file={file} />;
          case ModelType.FBX:
            return <FBXModel file={file} />;
          default:
            return null;
        }
      })()}

      {/*<mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>*/}
      {/*  <planeGeometry />*/}
      {/*  <meshStandardMaterial color="white" />*/}
      {/*</mesh>*/}
      {/*<primitive object={model.scene} />*/}
      {/*<mesh geometry={nodes.} />*/}
    </>
  );
};

export default ModelViewer;
