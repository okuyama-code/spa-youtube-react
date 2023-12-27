import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POSTS_API_URL } from '../../constants';
import { updatePost } from '../../services/postService';
import PostForm from './PostForm';

const EditPostForm = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${POSTS_API_URL}/${id}`);
        if (response.ok) {
          // JSONデータを取得して状態を更新
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        console.log("エラーが発生しました" ,e)
      }
    }
    fetchCurrentPost();
  }, [id])

  const handleUpdateSubmit = async (formData) => {
    try {
      const response = await updatePost(id, formData)
      navigate(`/posts/${response.id}`)
    } catch(e) {
      console.log(e)
    }
  }

  if (!post) return <h2>Loading...</h2>

  return (
    <PostForm
      post={post}
      onSubmit={handleUpdateSubmit}
      headerText="Edit Post"
      buttonText="Update Post"
    />
  )
}

export default EditPostForm
