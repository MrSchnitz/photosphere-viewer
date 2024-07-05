import React, { ChangeEvent, useState } from "react";
import clsx from "clsx";
import { Files, FilesType } from "../App.tsx";

type Props = {
  onFiles: (files: Files) => void;
};

const LandingBanner = ({ onFiles }: Props) => {
  const [dragover, setDragover] = useState(false);

  const handleCreateObjectFile = (files: FileList) => {
    const imageFiles = /(\.jpg|\.jpeg|\.png|\.gif|\.hdr)$/i;
    const modelFiles = /(\.obj|\.fbx|\.gltf)$/i;

    let isImage = false;
    let isModel = false;

    const fileObjects = [...files].map((file) => {
      if (imageFiles.test(file.name)) {
        isImage = true;
      }
      if (modelFiles.test(file.name)) {
        isModel = true;
      }

      return URL.createObjectURL(file);
    });
    // console.log("FFFF", fileObjects);

    if (!isImage && !isModel) {
      alert("Please upload an image or 3D model file");
      return;
    }

    if (isImage) {
      onFiles({
        files: fileObjects,
        type: FilesType.Image,
      });
    }

    if (isModel) {
      onFiles({
        files: fileObjects,
        type: FilesType.Model,
      });
    }

    // const fileObject = URL.createObjectURL(file);
    // onFile(fileObject);

    // console.log("files", fileObjects);

    // const fileObjects: string[] = [];
    //
    // [...files].map((file) => {
    //   const fileReader = new FileReader();
    //   fileReader.onload = (event) => {
    //     console.log("READER file", event.target?.result as string);
    //     fileObjects.push(event.target?.result as string);
    //   };
    //   fileReader.readAsDataURL(file);
    // });
    //
    // onFiles(fileObjects);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // const items = event.dataTransfer.items;
    const files = event.dataTransfer.files;

    // if (items.length > 1 || files.length > 1) {
    //   alert("Please drop only one file at a time");
    //   return;
    // }

    // if (items) {
    //   const item = items[0];
    //
    //   if (item.kind === "file") {
    //     const file = item.getAsFile();
    //     if (file) {
    //       handleCreateObjectFile(file);
    //     }
    //   }
    // } else {
    //   const file = files[0];
    handleCreateObjectFile(files);
    // }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!dragover) {
      setDragover(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragover(false);
  };

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // if (files.length > 1) {
      //   alert("Please drop only one file at a time");
      //   return;
      // }
      handleCreateObjectFile(files);
    }
  };

  return (
    <div className="p-8 rounded-lg text-center max-w-2xl w-full">
      <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        PhotosphereViewer
      </h1>
      <p className="text-lg text-gray-200 mb-6">
        Drag and drop your images or 3D objects here to view them instantly.
      </p>
      <div
        className={clsx(
          "p-28 rounded-lg flex items-center justify-center mb-4 transition-colors border-4 border-dashed border-gray-200 text-gray-200",
          dragover && "bg-gray-400",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <span className="text-2xl">Drop your image or 3D object here</span>
      </div>
      <p className="text-gray-300 mb-4">or</p>
      <input
        type="file"
        id="button-upload-file"
        hidden
        multiple
        onChange={handleSelectFile}
      />
      <label
        htmlFor="button-upload-file"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full transition-all cursor-pointer hover:from-blue-600 hover:to-purple-700"
      >
        Browse Files
      </label>
    </div>
  );
};

export default LandingBanner;
