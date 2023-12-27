import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POSTS_API_URL } from '../../constants';
import { updatePost } from '../../services/postService';
import PostForm from './PostForm';
import { objectToFormData } from '../../utils/formDataHelper';

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

  // "rawData" は生の、変更や処理を加えていないデータを表します。
  const handleUpdateSubmit = async (rawData) => {
    const formData = new FormData();
    formData.append("post[title]", rawData.title)
    formData.append("post[body]", rawData.body)
    formData.append("post[image]", rawData.image)

    // "sanitizedData" は、「無害化されたデータ」や「安全なデータ」といった意味を持ちます。この用語は通常、セキュリティやデータ整合性の観点から、悪意のあるデータや不正確なデータから除外され、信頼性を確保されたデータを指します。
    // const sanitizedData = {
    //   title: rawData.title,
    //   body: rawData.body,
    //   image: rawData.image,
    // }
    // const formData = objectToFormData({ post: sanitizedData })
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
