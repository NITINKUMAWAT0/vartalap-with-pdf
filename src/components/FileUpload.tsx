"use client";
import { uploadToS3 } from "@/lib/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"], // Accept only PDF files
    },
    onDrop: async (acceptedFiles) => {
      console.log("Accepted files:", acceptedFiles);
      const file = acceptedFiles[0]
      if(file.size > 10 * 1024 * 1024){
        //bigger than 10 mb...

        alert('please upload a smaller file')
        return;
      }

      try {
        const data = await uploadToS3(file);
        console.log('data', data);
        
      } catch (error) {
        console.log(error)
      } 
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        {/* Add the input element for file upload */}
        <input {...getInputProps()} />
        <Inbox className="w-10 h-10 text-black" />
        <p className="mt-2 text-sm text-black">Drop PDF Here</p>
      </div>
    </div>
  );
};

export default FileUpload;