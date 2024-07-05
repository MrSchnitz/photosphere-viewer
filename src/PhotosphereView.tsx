import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  EquirectangularReflectionMapping,
  MathUtils,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from "three";
import { Environment } from "@react-three/drei";
import { useEffect, useState } from "react";
import {Files} from "./App.tsx";

type Props = {
  file: string;
  deltaY: number;
};

const PhotosphereView = ({ file, deltaY }: Props) => {
  // const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isWheel, setIsWheel] = useState(false);
  // const [texture, setTexture] = useState<Texture | null>(null);

  const texture = useLoader(TextureLoader, file, undefined, (progress) => {
    console.log("progress", progress);
  });
  texture.colorSpace = SRGBColorSpace;
  texture.mapping = EquirectangularReflectionMapping;

  // useFrame((state) => {
  //   if (isWheel) {
  //     camera.lookAt(state.pointer.x, state.pointer.y, 0);
  //   }
  //   setMouse({ x: state.pointer.x, y: state.pointer.y });
  // });

  // useEffect(() => {
  //   window.addEventListener("mousemove", (event) => {
  //     setMouse({ x: event.clientX, y: event.clientY });
  //   });
  //
  //   return () => {
  //     window.removeEventListener("mousemove", (event) => {
  //       setMouse({ x: event.clientX, y: event.clientY });
  //     });
  //   };
  // }, []);

  useEffect(() => {
    const zoom = camera.zoom + deltaY * -0.03;
    camera.zoom = MathUtils.clamp(zoom, 1, 9);

   // setIsWheel(true);

    // console.log("camera", mouse.x, mouse.y);

    camera.updateProjectionMatrix();
  }, [camera, deltaY]);

  // useEffect(() => {
  //   console.log("FFFF", files);
  //   window.addEventListener("wheel", (event) => {
  //     const zoom = camera.zoom + event.deltaY * -0.03;
  //     camera.zoom = MathUtils.clamp(zoom, 1, 9);
  //
  //     camera.updateProjectionMatrix();
  //   });
  //
  //   return () => {
  //     window.removeEventListener("wheel", (event) => {
  //       console.log("wheel", event.deltaY);
  //     });
  //   };
  // }, []);

  // useEffect(() => {
  //   const loadingManager = new LoadingManager(
  //     () => console.log("Loading complete"),
  //     (_, loaded, total) => console.log("Loading", loaded / total),
  //   );
  //   const textureLoader = new TextureLoader(loadingManager);
  //
  //   const textures = files.map((file) => {
  //     const texture = textureLoader.load(file);
  //     texture.colorSpace = SRGBColorSpace;
  //     texture.mapping = EquirectangularReflectionMapping;
  //     return texture;
  //   });
  //
  //   setTexture(textures[0]);
  // }, [files]);

  return (
    <>
      {texture && <Environment map={texture} background />}
      {/*<mesh>*/}
      {/*  <sphereGeometry args={[500, 60, 40]} scale-x={-1} scale-y={1} scale-z={1} />*/}
      {/*  <meshBasicMaterial map={texture} />*/}
      {/*</mesh>*/}
    </>
  );
};

export default PhotosphereView;
