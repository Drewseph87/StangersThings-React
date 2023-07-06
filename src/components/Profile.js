import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api";
import { Button } from "@mui/material";

const Profile = () => {
  const [messagesToUser, setMessagesToUser] = useState([]);
  const [messagesFromUser, setMessagesFromUser] = useState([]);

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetchUserData(token);
          console.log(response);

          if (response.success) {
            const messages = response.data.messages;
            const userId = response.data._id;

            if (messages && Array.isArray(messages)) {
              const messagesToCurrentUser = messages.filter(
                (message) => message.post.author._id === userId
              );

              const messagesFromCurrentUser = messages.filter(
                (message) => message.fromUser._id === userId
              );

              setMessagesToUser(messagesToCurrentUser);
              setMessagesFromUser(messagesFromCurrentUser);
            } else {
              console.log("No messages found or messages is not an array");
            }
          } else {
            console.log("Failed to fetch user data:", response.error);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchMessageData();
  }, [setMessagesToUser, setMessagesFromUser]);

  return (
    <div>
      <h1 id="profileheader">Profile</h1>
      <h2 id="messagestome"> Messages to Me</h2>
      <ul id="messagestomefield">
        {messagesToUser.map((message) => (
          <p key={message._id}>
            <p id="messageauthor1">Author: {message.fromUser.username}</p>
            <p>Message: {message.content}</p>
            <p id="linktopost1">
              Link to Post:{" "}
              <a id="linkpostlink1" href={`/post/${message.post._id}`}>
                {message.post.title}
              </a>
            </p>
          </p>
        ))}
      </ul>
      <h2 id="messagesfromme">Messages You've Sent</h2>
      <ul>
        {messagesFromUser.map((message) => (
          <p id="messagesfrommefield" key={message._id}>
            <p id="messageauthor2">Author: {message.fromUser.username}</p>
            <p>Message: {message.content}</p>
            <p id="linktopost2">
              Link to Post:{" "}
              <a id="linkpostlink2" href={`/post/${message.post._id}`}>
                {message.post.title}
              </a>
            </p>
          </p>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
