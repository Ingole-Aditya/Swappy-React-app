import React from 'react'
import { Link } from 'react-router'
import service from '../appwrite/config';
function ItemCard({ post }) {
  console.log(post)
  return (
    <Link to={`/item/${post.$id}`}>
      <div className="h-80 w-60  rounded-md outline outline-1 outline-slate-300 hover:shadow-lg ease-linear cursor-pointer">
        <img
          src={service.getFilePreview(post.images[0])}
          alt={post.images[0]}
          className=" w-full h-3/4 object-cover rounded-t-md"
        />
        <div className="h-1/4 w-full  flex flex-col gap-0.5 px-2 py-0.5 text-xs font-normal">
          <p className="font-semibold text-slate-700 text-sm">
            Swap: {post.expectation}
          </p>
          <p className="text-slate-400 line-clamp-2">{post.description}</p>
          <p className="font-semibold text-slate-600 text-sm ">{post.city}</p>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard