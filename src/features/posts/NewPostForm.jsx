import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/postService';
import PostForm from "./PostForm"

export const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createPost(formData)
      console.log(response);
       navigate(`/posts/${response.id}`);
    } catch (e) {
      console.error("投稿に失敗", e);
    }
  }

  return (
    <PostForm
      headerText="Create a New Post"
      onSubmit={handleCreateSubmit}
      buttonText="Create Post"
    />
  )
}
