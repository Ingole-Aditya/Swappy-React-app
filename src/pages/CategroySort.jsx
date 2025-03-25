import React from "react";
import service from "../appwrite/config";
import { useParams } from "react-router";
import ItemCard from "../components/ItemCard";
import ErrorPage from "../components/ErrorPage";
import CircleProgress from "../components/CircleProgress";
import { useSelector } from "react-redux";

function CategorySort() {
  const [posts, setPosts] = React.useState(null);
  const [postLength, setPostLength] = React.useState(0);
  const [loading, setLoading] = React.useState(true); // Track loading state
  const status = useSelector((state) => state.auth.userData); // User authentication status
  const { category } = useParams(); // Get category from URL params

  React.useEffect(() => {
    if (status) {
      // If status is true, fetch posts for the given category
      setLoading(true); // Set loading state before fetching
      service
        .getPostsByCategory(category.replace(/^:/, "")) // Clean the category
        .then((res) => {
          if (res) {
            setPosts(res.documents); // Set fetched posts
            setPostLength(res.total); // Set total number of posts
            setLoading(false); // Stop loading once data is fetched
          }
        })
        .catch(() => {
          setLoading(false); // Stop loading in case of an error
        });
    }else{setLoading(false)}
  }, [category, status]);

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

  return (
    <div className="mb-5">
      <div className="text-2xl pl-10 font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
        <h1 className="text-start border-b py-2 px-2 rounded-md">
          {category
            .replace(/^:/, "") // Remove starting ':'
            .replace(/-/g, " ") // Replace hyphens with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
          {/* Capitalize first letter */}
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
          description="Sorry, we couldn't find any data for the selected category."
        />
      )}
    </div>
  );
}

export default CategorySort;
