import "./App.css";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { useMemo, useState } from "react";
import LandingBanner from "./components/LandingBanner.tsx";
import Viewer from "./components/Viewer.tsx";

// const presetPhotosphere = {
//   bankok: "./preset/bankok.jpg",
//   patawan: "./preset/patawan.jpg",
// };

export enum FilesType {
  Image = "image",
  Model = "model",
}

export type Files = {
  files: string[];
  type: FilesType;
};

enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

function App() {
  const [files, setFiles] = useState<Files | null>(null);

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    [],
  );

  return (
    <KeyboardControls map={map}>
      {!files && (
        <div className="h-full w-full grid place-content-center">
          <LandingBanner onFiles={setFiles} />
        </div>
      )}
      {files && <Viewer files={files} />}
    </KeyboardControls>
  );
}

export default App;
