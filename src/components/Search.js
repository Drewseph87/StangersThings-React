import React, { useState, useEffect } from "react";
import CommonButtons from "./Common/CommonButtons";

export const searchFunc = () => {
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "red",
    },
  };

  const postMatches = async () => {
    setLoading(true);
    return (
      post.title.includes(text) ||
      post.description.includes(text) ||
      post.price.includes(text) ||
      post.location.includes(text) ||
      post.author.username.includes(text)
    );
  };

  const filteredPosts = posts.filter((post) => handleSearch(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div id="searchbox">
      <input
        id="insearchbox"
        type="text"
        placeholder="Search..."
        name="Search..."
        value={searchTerm}
        onSubmit={handleSearch}
      />
      <CommonButtons
        id="searchbutton"
        size="medium"
        variant="contained"
        sx={buttonStyles}
        type="submit"
      >
        Search
      </CommonButtons>
      <ul>
        {postsToDisplay.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default searchFunc;
