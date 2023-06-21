import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchPosts } from "../api";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchTerm = new URLSearchParams(location.search).get("term");

    const getSearchResults = async () => {
      try {
        setSearching(true);
        const token = localStorage.getItem("token");
        const posts = await fetchPosts(token);

        const filteredPosts = posts.filter((post) =>
          postMatches(post, searchTerm)
        );

        setSearchResults(filteredPosts);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setLoading(false);
        setSearching(false);
      }
    };

    getSearchResults();
  }, [location.search]);

  const postMatches = (post, text) => {
    const searchTerm = text.toLowerCase();

    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.author.username.toLowerCase().includes(searchTerm) ||
      post.price.toLowerCase().includes(searchTerm) ||
      post.location.toLowerCase().includes(searchTerm)
    );
  };

  const handleViewPost = (postId) => {
    navigate(`/ViewPost/${postId}`);
  };

  return (
    <div id="searchbox">
      {loading || searching ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        searchResults.map((post) => (
          <div className="post" key={post._id}>
            <h3>{post.title}</h3>
            <div>{post.author.username || "Unknown User"}</div>
            <div>Description: {post.description}</div>
            <div>Price: {post.price}</div>
            <div>Location: {post.location}</div>
            <button onClick={() => handleViewPost(post._id)}>View Post</button>
          </div>
        ))
      ) : (
        <p>No matching posts found.</p>
      )}
    </div>
  );
};

export default SearchResults;

// return (
//   <div id="searchbox">
//     <input
//       id="insearchbox"
//       type="text"
//       placeholder="Search..."
//       name="Search..."
//       value={searchTerm}
//       onSubmit={handleSearch}
//     />
//     <CommonButtons
//       id="searchbutton"
//       size="medium"
//       variant="contained"
//       sx={buttonStyles}
//       type="submit"
//     >
//       Search
//     </CommonButtons>
//     <ul>
//       {postsToDisplay.map((post) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   </div>
// );
// };
