import React, { useRef, useState } from 'react'
import service from '../appwrite/config';
import ItemCard from '../components/ItemCard';
import CircleProgress from '../components/CircleProgress';
import ErrorPage from '../components/ErrorPage';
import { useSelector } from 'react-redux';
import '../App.css'
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router';

function Home() {
  const [posts, setPosts] = React.useState(null);
  const [postLength, setPostLength] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // To track loading state
  const status = useSelector((state) => state.auth.status);
  const location = useLocation();
React.useEffect(() => {
  if (status) {
    // If status is true, we proceed to fetch posts
    service.getAllPosts()
    .then((res) => {
      if (res) {
        setPosts(res.documents);
        setLoading(false)
        if (location.state?.message  ) {
          toast.success(location.state.message)
        }
        setPostLength(res.documents.length);
        }
        })
    } else {
      setLoading(false)
    }
  }, [status]);

  if (loading) {
    return <CircleProgress />; // Show loading spinner while fetching
  }


  if (!status) {
    return (
      <ErrorPage
        code={404}
        message="Unable to load posts"
        description="Posts are available only to logged-in users. Please log in"
        btn="Login"
        navigate="/login"
      />
    );
  }

  return (
    <div className="mb-5 bg-[#F9FAFB] grid-back " >
      <ToastContainer/>
      <div className="text-2xl pl-4 box-content font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
        <h1 className="text-start  border-b-2  py-2  px-2 ">New Swaps</h1>
      </div>

      {postLength > 0 ? (
        <div className="mt-6 grid grid-cols-1 justify-items-center gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5 mb-6">
          {posts.map((post) => (
            <ItemCard key={post.$id} post={post} />
          ))}
        </div>
      ) : (
        <ErrorPage
          code="404"
          message="Not Found"
          description="Sorry, we could not find any data"
        />
      )}
    </div>
  );
}

export default Home