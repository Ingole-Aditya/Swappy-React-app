import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import CircleProgress from "./CircleProgress";
import BtnDialog from "./BtnDialog";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import "../App.css";
export default function Infopage() {
  const status = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((res) => {
        if (res) {
          console.log(res);
          setPost(res);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const handleDelete = () => {
    service.deletePost(post.$id).then((res) => {
      if (res) {
        post.images.map((image) => service.deleteFile(image));
        navigate("/");
      }
    });
  };

  return post ? (
    <>
      <div className="h-fit bg-white w-3/4 outline outline-1 pt-2 pb-10 px-5 text-slate-700 outline-slate-300 justify-self-center max-lg:h-fit">
        <h1 className=" font-semibold  text-md max-lg:text-sm mb-3 ">
          {post.title}
        </h1>

        {/* images */}
        <div className="h-3/5 w-full flex overflow-auto hide-scrollbar gap-3 mb-5">
          {post.images.map((image) => (
            <img
              key={image}
              src={service.getFilePreview(image)}
              className=" w-96  max-lg:w-80 max-lg:h-96 object-cover rounded-md"
            />
          ))}
        </div>

        {/* bottom */}
        <div className=" h-1/3 flex max-lg:flex-col pt-4">
          {/* first portion */}
          <div className="w-2/3 border-r pr-2 max-lg:w-full max-lg:border-r-0 pb-4 max-lg:border-b">
            <h1 className="max-lg:text-xl text-3xl text-slate-950 font-bold">
              {post.title}
            </h1>
            <p className="max-lg:text-xs text-base text-slate-600 mt-2 font-normal">
              {post.description}
            </p>
            <h2 className="max-lg:text-sm text-xl font-semibold mt-4 text-slate-950">
              Expectaion Info
            </h2>
            <p className="max-lg:text-xs text-base text-slate-600 mt-2 font-normal">
              {post.expectdescription}
            </p>
          </div>

          {/* second portion */}
          <div className="p-3 w-1/3 max-lg:w-full">
            <h1 className="text-2xl max-lg:text-xl  font-semibold">
              Expecting: {post.expectation}
            </h1>
            <h2 className="font-semibold hover:cursor-pointer py-0.5 bg-gray-200 inline-block px-2 rounded-md text-sm my-5"
            onClick={()=>{navigate(`/category/${post.category}`);}}>
              {post.category
                .replace(/-/g, " ") // Replace hyphens with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </h2>
            <h3 className="font-semibold text-lg text-slate-950">
              {post.city},{post.state}
            </h3>

            {/* if authorised send to link or redire login page */}
            {status ? (
              isAuthor ? (
                <div className="w-full flex justify-start items-center gap-2 ">
                  <BtnDialog
                    color={1}
                    title="Delete swap"
                    description="Are you sure you want to delete this item? This action is permanent and cannot be undone. All associated data will be permanently removed."
                    btnText="Delete"
                    btnIcon={
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-7"
                        dataslot="icon"
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
                      </svg>
                    }
                    icon={
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-6 text-red-600"
                      />
                    }
                    confirmBtn="Delete"
                    classes="px-5  max-lg:text-md inline-flex gap-2 text-white font-semibold   text-xl mt-5   justify-center rounded-md cursor-pointer py-2  shadow-xs"
                    method={handleDelete}
                  />
                </div>
              ) : (
                <Link to={`https://wa.me/${post.phoneno}`} target="_blank">
                  <button className="w-full max-lg:text-sm  bg-indigo-600 text-white font-semibold p-2 rounded-md text-xl mt-2 hover:bg-indigo-500">
                    Start chat
                  </button>
                </Link>
              )
            ) : (
              <Link to={`/login`}>
                <button className="w-full max-lg:text-sm bg-indigo-600 text-white font-semibold p-2 rounded-md text-xl mt-5 hover:bg-indigo-500">
                  Log in to chat
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <CircleProgress />
  );
}
