import React from 'react'
import { useState  } from 'react';
function ImageInputBox({ register,index }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
      }
    };
  return (
        <label
          htmlFor={`file-upload-${index}`}
          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
        >
    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
          {selectedImage ? (
            <div>
            <input
              id={`file-upload-${index}`}
              name={`file-upload-${index}`}
              type="file"
              className="sr-only"
              {...register(`images.${index}`, { onchange: handleImageChange })}
              accept="image/png, image/jpeg, image/jpg"
            />
            <img
              src={selectedImage}
              alt="Selected Preview"
              className="mx-auto   rounded-lg object-cover"
            />
          </div>
        ) : (
          <div>
            <svg
              className="mx-auto size-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              dataslot="icon"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <span className=" text-indigo-600">Upload a file</span>
              <input
                id={`file-upload-${index}`}
                name={`file-upload-${index}`}
                type="file"
                className="sr-only"
                {...register(`images.${index}`, {
                  onChange: handleImageChange,
                })}
                accept="image/png, image/jpeg, image/jpg"
              />

              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs/5 text-gray-600">PNG, JPG, JPEG up to 10MB</p>
          </div>)}
      </div>
    </div>
    </label>
  );
}

export default ImageInputBox