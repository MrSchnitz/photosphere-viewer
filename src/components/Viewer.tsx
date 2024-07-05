import { OrbitControls } from "@react-three/drei";
import PhotosphereView from "../PhotosphereView.tsx";
import { Canvas, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { MathUtils } from "three";
import { Files, FilesType } from "../App.tsx";
import ModelViewer from "../ModelViewer.tsx";

type Props = {
  files: Files;
};

const Viewer = ({ files }: Props) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [deltaY, setDeltaY] = useState(0);
  const timeout = useRef<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    files.files.length === 1 ? files.files[0] : null,
  );

  console.log("FFFF", files)

  const handleMouseDown = () => {
    setAutoRotate(false);
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  const handleMouseUp = () => {
    if (!autoRotate && !timeout.current) {
      timeout.current = setTimeout(() => setAutoRotate(true), 10000);
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    setAutoRotate(false);
    setDeltaY(event.deltaY);
  };

  const viewer = files.type === FilesType.Image && files.files.length > 1 && (
    <div className="p-5 flex gap-2">
      {files.files.map((file) => (
        <img
          width={300}
          height={300}
          src={file}
          alt={file}
          key={file}
          onClick={() => setSelectedImage(file)}
          className="rounded-lg transition-all cursor-pointer border border-transparent hover:border-white"
        />
      ))}
    </div>
  );

  return (
    <>
      {viewer}
      {selectedImage && (
        <>
          <div className="fixed top-2 left-2 p-5 z-10">
            <button onClick={() => setAutoRotate((prevState) => !prevState)}>
              Autorotate: {autoRotate ? "ON" : "OFF"}
            </button>
          </div>
          <Canvas
            className="canvas cursor-grab"
            camera={{ position: [-4, 3, 6], fov: 75, far: 1100, near: 1 }}
            shadows
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          >
            <OrbitControls
              makeDefault
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              enableZoom
              enablePan={false}
            />
            {files.type === FilesType.Model ? (
              <ModelViewer file={selectedImage} />
            ) : (
              <PhotosphereView file={selectedImage} deltaY={deltaY} />
            )}
          </Canvas>
        </>
      )}
    </>
  );
};

export default Viewer;
