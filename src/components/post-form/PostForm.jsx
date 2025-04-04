import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import service from "../../appwrite/config";
import {  useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CircleProgress from "../CircleProgress";
import { Alert } from "@mui/material";
import ImageInputBox from "./ImageInputBox";

function PostForm() {
  const [  error, setError ] = useState(null); //handling errrors
  const [loading, setLoading] = useState(false)
  const status=useSelector((state)=>state.auth.status)
  

  const categories = [
    "Cloth",
    "Accessories",
    "Home & Kitchen",
    "Electronics",
    "Furniture",
    "Books & Stationery",
    "Toys & Games",
  ];
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      title:  "",
      slug: "",
      description: "",
      expectation: "",
      expectdescription:"",
      category: "",
      city: "",
      state: "",
      phoneno: "",
      images:[]
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setError('')
    setLoading(true)
    
    let fileIds
    try {
      data.phoneno = '91' + data.phoneno
      // Create an array of promises for file uploads
      const uploadPromises = data.images
        .map((image) => {
          if (image && image[0]) {
            return service.uploadFile(image[0]);
          }
          return null;
        })
        .filter(Boolean); // Remove null values

      // Wait for all file uploads to complete
      const uploadedFiles = await Promise.all(uploadPromises);
      // Get file IDs from uploaded files
      fileIds = uploadedFiles.map((file) => file.$id);
      // Update data with file IDs
      const postData = {
        ...data,
        images: fileIds,
        category: data.category.toLowerCase().replace(/ /g, "-"),
        userId: userData.$id,
      };

      // Create post with uploaded files
      const dpPost = await service.createPost(postData);

      if (dpPost) {
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      fileIds.map((image) => {
        if (image) {
          service.deleteFile(image);
        }
      })
      setError(error.message);
      console.error("Upload error:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value) {
      return value.toLowerCase().replace(/ /g, "-");
    } else return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

 

  return status?(
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full h-fit flex justify-center"
    >
      <div className="w-3/5 border border-gray-200 bg-white shadow-lg p-8 max-md:w-full rounded-lg ">
        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        {error && (
          <Alert
            severity="error"
            onClose={() => {
              setError("");
            }}
          >
            {error}
          </Alert>
        )}

        {/* title inputbox */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register("title", { required: true })}
                />
              </div>
            </div>
          </div>

          {/* slug box */}
          <div className="sm:col-span-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="slug"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Slug
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  disabled
                  name="slug"
                  id="slug"
                  autoComplete="given-name"
                  onInput={(e) => {
                    setValue("sulg", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register("slug", { required: true })}
                />
              </div>
            </div>
          </div>

          {/* description */}
          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                id="description"
                rows="3"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("description", { required: true })}
              ></textarea>
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">
              Write a few sentences about your product.
            </p>
          </div>

          {/* expectation */}
          <div className="sm:col-span-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="expectaion"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Expectaion
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="expectaion"
                  id="expectaion"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register("expectation", { required: true })}
                />
              </div>
            </div>
          </div>

          {/* expectation description description */}
          <div className="col-span-full">
            <label
              htmlFor="expetaion-description"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Expectation Description
            </label>
            <div className="mt-2">
              <textarea
                name="expetaion-description"
                id="expetaion-description"
                rows="3"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("expectdescription", { required: true })}
              ></textarea>
            </div>
            <p className="mt-3 text-sm/6 text-gray-600">
              Write a few sentences about your expecations.
            </p>
          </div>

          {/* category */}
          <div className="sm:col-span-3">
            <label
              htmlFor="category"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Category
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="category"
                name="category"
                defaultValue="Cloth"
                autoComplete="category-name"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("category", { required: true })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                dataslot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>

          {/* status */}
          <div className="sm:col-span-3">
            <label
              htmlFor="status"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Status
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="status"
                name="status"
                autoComplete="status-name"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("status", { required: true })}
              >
                <option>unswapped</option>
                <option>swapped</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                dataslot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          {/* city */}
          <div className="sm:col-span-2 sm:col-start-1 ">
            <label
              htmlFor="city"
              className="block text-sm/6 font-medium text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("city", { required: true })}
              />
            </div>
          </div>
          {/* state */}
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="state"
              className="block text-sm/6 font-medium text-gray-900"
            >
              State
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="state"
                id="state"
                autoComplete="address-level2"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("state", { required: true })}
              />
            </div>
          </div>

          {/* mobile no */}
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="phoneno"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Mobile No
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="phoneno"
                multiple={true }
                id="phoneno"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("phoneno", { required: true })}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Images
            </label>
            {/* images upload */}
            <div className="w-full grid grid-cols-2 gap-3  max-md:grid-cols-1">
              {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {selectedImage ? (
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        {...register("image1", {
                          onChange: handleImageChange,
                        })}
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <img
                        src={selectedImage}
                        alt="Selected Preview"
                        className="mx-auto   rounded-lg object-cover"
                      />
                    </label>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
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
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          {...register("image2", {
                            onChange: handleImageChange,
                          })}
                          accept="image/png, image/jpeg, image/jpg"
                        />

                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </label>
                  )}
                </div>
              </div>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {selectedImage ? (
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        {...register("image1", {
                          onChange: handleImageChange,
                        })}
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <img
                        src={selectedImage}
                        alt="Selected Preview"
                        className="mx-auto   rounded-lg object-cover"
                      />
                    </label>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
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
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          {...register("image1", {
                            onChange: handleImageChange,
                          })}
                          accept="image/png, image/jpeg, image/jpg"
                        />

                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </label>
                  )}
                </div>
              </div> */}
              <ImageInputBox register={register} index={0}/>
              <ImageInputBox  register={register} index={1}/>
              <ImageInputBox  register={register} index={2}/>
              <ImageInputBox  register={register} index={3}/>
              <ImageInputBox  register={register} index={4}/>
              <ImageInputBox  register={register} index={5}/>
              <ImageInputBox  register={register} index={6}/>
              <ImageInputBox  register={register} index={7}/>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-5">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post
          </button>
            
            
        </div>
        {loading ? <CircleProgress /> : null}
      </div>
    </form>
  ):(<CircleProgress/>);
}

export default PostForm;
