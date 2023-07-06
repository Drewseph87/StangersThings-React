import React, { useState } from "react";
import { makePost } from "../api";
import { useNavigate } from "react-router-dom";
import CommonButtons from "./Common/CommonButtons";
import Box from "@mui/material/Box";
import InputField from "./Common/TextFields";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import {
//   // Button,
//   Box,
//   TextField,
//   Checkbox,
//   FormControlLabel,
// } from "@brian.mui/material";

const NewPostForm = ({ setLoading }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const buttonStyles = {
    fontSize: 12,
    fontWeight: 700,
    border: "1px solid white",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "blue",
    },
  };

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

  console.log(handleSubmit);
  return (
    <div id="newpostcontainer">
      <div id="newpostheader">
        Feel free to add your new product here! Fields with a star are required!
      </div>
      <Box
        id="newpostbox"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <div>
          <InputField
            margin="normal"
            required
            fullWidth
            id="outlined-required"
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoComplete="current-username"
          />
          <InputField
            margin="normal"
            required
            id="outlined-required"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <InputField
            required
            id="outlined-required"
            label="Price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <InputField
            required
            id="outlined-required"
            label="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => setWillDeliver(event.target.checked)}
              />
            }
            checked={willDeliver}
            label="Will Deliver?"
          />
          <br></br>
          <CommonButtons
            variant="contained"
            size="medium"
            sx={buttonStyles}
            type="submit"
            onClick={handleSubmit}
          >
            Submit Post
          </CommonButtons>
        </div>
      </Box>
    </div>
  );
};
export default NewPostForm;
