import React from "react";
import service from "../appwrite/config";
import { useParams } from "react-router";
import ItemCard from "../components/ItemCard";
import ErrorPage from "../components/ErrorPage";
import CircleProgress from "../components/CircleProgress";
import { useSelector } from "react-redux";

function SearchItems() {
  const [posts, setPosts] = React.useState(null);
  const [postLength, setPostLength] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // Track loading state
  const [error, setError] = React.useState(null); // Track error state
  const status = useSelector((state) => state.auth.userData); // Get user data from Redux
  const search = useParams(); // Get search text from URL params

  React.useEffect(() => {
    if (status) {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      service
        .searchItem(search.searchText) // Search items by search text
        .then((res) => {
          if (res) {
            setPosts(res.documents); // Set the fetched posts
            setPostLength(res.total); // Set the total number of posts
          }
        })
        .catch(() => {
          setError("An error occurred while fetching search results."); // Handle error
        })
        .finally(() => {
          setLoading(false); // Stop loading once data is fetched
        });
    }else{setLoading(false)}
  }, [search, status]); // Run this effect when search or status changes

  if (loading) {
    return <CircleProgress />; // Show loading spinner while fetching
  }

  if (!status) {
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
        message="Unable to load search results"
        description={error}
      />
    );
  }

  return (
    <div className="mb-5">
      <div className="text-2xl pl-10 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
        <h1 className="text-start border-b py-2 px-2 rounded-md">
          Results for "{search.searchText}"
        </h1>
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
          description="Sorry, we couldn't find any items matching your search."
        />
      )}
    </div>
  );
}

export default SearchItems;
