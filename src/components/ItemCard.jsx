import React from 'react'
import { Link } from 'react-router'
import service from '../appwrite/config';
import {motion} from "motion/react"
function ItemCard({ post }) {
  return (
    <Link to={`/item/${post.$id}`}>
      <motion.div
        style={{
          width: 288,
          height: 384,
          backgroundColor: "#fff",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        }}
        className="h-96 w-72 box-content ease-in-out bg-white rounded-md outline outline-1  outline-slate-300 hover:shadow-xl transition duration-200 shadow-input  cursor-pointer"
      >
        <img
          src={service.getFileView(post.images[0])}
          alt={post.images[0]}
          loading="lazy"
          onLoad={(e) => e.target.classList.remove("blur-md", "scale-105")}
          className=" w-full h-3/4 object-cover rounded-t-md  blur-md scale-105 transition-all duration-700"
        />
        <div className="h-1/4 w-full  flex flex-col gap-0.5 px-2 py-0.5 text-xs font-normal ">
          <p className="font-semibold text-slate-700 text-sm">{post.title}</p>
          <p className="text-slate-400 line-clamp-1 ">{post.description} </p>
          <p className="font-semibold text-slate-700 text-sm ">
            Expecting:
            <span className="text-slate-600"> {post.expectation}</span>
          </p>
          <p className="font-semibold text-slate-600 text-sm ">{post.city}</p>
        </div>
      </motion.div>
    </Link>
  );
}

export default ItemCard