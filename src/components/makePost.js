import React, { useState } from "react";
import { makePost } from "../api";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const NewPostForm = ({ setLoading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const handleSubmit = (event) => {
    if (!title || !description || !price || !location) {
      console.error("Please fill in all the required fields");
      return;
    }

    event.preventDefault();

    const makePostData = async () => {
      setLoading(true);
      try {
        const result = await makePost(
          token,
          title,
          description,
          price,
          location,
          willDeliver
        );

        console.log("New post result:", result);

        const newPosts = [...posts, result];
        console.log("Previous posts:", posts);
        console.log("New posts:", newPosts);

        setPosts(newPosts);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
      } catch (error) {
        console.error("Post was not finalized", error);
      } finally {
        setLoading(false);
        navigate("/");
      }
    };
    makePostData();
  };

  return (
    <div id="newpostcontainer">
      <div id="newpostheader">
        Feel free to add your new product here! Fields with a star are required!
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Title">*Title:</label>
        <input
          placeholder={"Title"}
          type="text"
          name="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <label htmlFor="Description">*Description:</label>
        <input
          placeholder={"Description"}
          type="text"
          name="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <label htmlFor="Price">*Price:</label>
        <input
          placeholder={"Price"}
          type="text"
          name="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <label htmlFor="Location">*Location:</label>
        <input
          placeholder={"Location"}
          type="text"
          name="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <label htmlFor="WillDeliver">Will Deliver?:</label>
        <input
          type="Checkbox"
          name="WillDeliver"
          value="true"
          checked={willDeliver}
          onChange={(event) => setWillDeliver(event.target.checked)}
        />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default NewPostForm;
