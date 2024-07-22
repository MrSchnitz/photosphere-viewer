import "./App.css";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { useMemo, useState } from "react";
import LandingBanner from "./components/LandingBanner.tsx";
import Viewer from "./components/Viewer.tsx";
import NavBar, { Page } from "./components/Navbar/NavBar.tsx";

// const presetPhotosphere = {
//   bankok: "./preset/bankok.jpg",
//   patawan: "./preset/patawan.jpg",
// };

export enum FilesType {
  Image = "image",
  Model = "model",
}

export type FileType = {
  blob: string;
  file: File;
}

export type Files = {
  files: FileType[];
  type: FilesType;
};

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

function App() {
  const [files, setFiles] = useState<Files | null>(null);
  const [page, setPage] = useState<Page | null>(null);

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

  const handleSetFile = (files: Files | null) => {
    setPage(Page.VIEW);
    setFiles(files);
  };

  return (
    <KeyboardControls map={map}>
      {page && <NavBar page={page} onNavChange={setPage} />}
      {page !== Page.VIEW && (
        <div className="h-full w-full grid place-content-center">
          <LandingBanner onFiles={handleSetFile} />
        </div>
      )}
      {page === Page.VIEW && files && <Viewer files={files} />}
    </KeyboardControls>
  );
}

export default App;
