import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { POSTS_API_URL } from '../../constants';

export const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, body };

    const response = await fetch(`${POSTS_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const { id } = await response.json();
      // console.log(id);
      navigate(`/posts/${id}`);
    } else {
      console.log("エラーがあります")
    }
  }

  return (
    <div>
      <h2>Create new post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input
          id='titleInput'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
             id="bodyInput"
             value={body}
             onChange={(e) => setBody(e.target.value)}
             required
          />
        </div>
        <div>
          <button type='submit'>Create Post</button>
        </div>
      </form>
    </div>
  )
}
