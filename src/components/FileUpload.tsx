"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import toast from "react-hot-toast";

const FileUpload = () => {

  const { mutate } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string, file_name: string }) => {
      const response = await axios.post('/api/create-chat', {
        file_key,
        file_name
      });
      return response.data;
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"], // Accept only PDF files
    },
    onDrop: async (acceptedFiles) => {
      console.log("Accepted files:", acceptedFiles);
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        //bigger than 10 mb...
toast.error("File is too large buddy")
        alert('please upload a smaller file')
        return;
      }

      try {
        const data = await uploadToS3(file);
        console.log('data', data);
        if (!data?.file_key || !data?.file_name) {
          toast.error("Something went wrong")
          alert("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log(data);
          }, 
          onError: (err) => {
            toast.error("Error in creating chat")
            console.log(err);

          }
        })

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