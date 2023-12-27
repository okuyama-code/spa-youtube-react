import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/postService';
import PostForm from "./PostForm"
import { objectToFormData } from '../../utils/formDataHelper';

export const NewPostForm = () => {
  const navigate = useNavigate();

  const handleCreateSubmit = async (rawData) => {
    // lets create the formData object(formData オブジェクトを作成しましょう)
    
    // const formData = new FormData();
    // formData.append("post[title]", rawData.title)
    // formData.append("post[body]", rawData.body)
    // formData.append("post[image]", rawData.image)



    try {
      // part21 formDataHelperを使う
      const formData = objectToFormData({ post: rawData})
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
