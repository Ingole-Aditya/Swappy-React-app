import React from "react";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import CircleProgress from "../components/CircleProgress";
import ErrorPage from "../components/ErrorPage";

function MyPosts() {
  const [posts, setPosts] = React.useState(null);
  const [postLength, setPostLength] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // Track loading state
  const [error, setError] = React.useState(null); // Track error state
  const userData = useSelector((state) => state.auth.userData); // Get user data from Redux

  React.useEffect(() => {
    if (userData) {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Clear previous errors
      service
        .getMyPosts(userData.$id) // Fetch posts for the logged-in user
        .then((res) => {
          if (res) {
            setPosts(res.documents); // Set the posts in the state
            setPostLength(res.total); // Set the total number of posts
          }
        })
        .catch(() => {
          setError("An error occurred while fetching posts."); // Handle error
        })
        .finally(() => {
          setLoading(false); // Stop loading once the request is finished
        });
    }
  }, [userData]); // Only run when userData changes

  if (loading) {
    return <CircleProgress />; // Show loading spinner while fetching
  }

  if (!userData) {
    return (
      <ErrorPage
        code={404}
        message="Unable to load posts"
        description="Posts are available only to logged-in users. Please log in."
        btn="Login"
        navigate="/login"
      />
    );
  }

  if (error) {
    return (
      <ErrorPage
        code={500}
        message="Unable to load posts"
        description={error}
      />
    );
  }

  return (
    <div className="mb-5">
      <div className="text-2xl pl-10 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
        <h1 className="text-start border-b py-2 px-2 rounded-md">My Posts</h1>
      </div>

      {postLength > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 justify-items-center gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {posts.map((post) => (
            <ItemCard key={post.$id} post={post} />
          ))}
        </div>
      ) : (
        <ErrorPage
          code="404"
          message="Not Found"
          description="You haven't posted anything yet! Start sharing your items now."
            navigate="/upload-post"
            btn="Add Items"
        />
      )}
    </div>
  );
}

export default MyPosts;
