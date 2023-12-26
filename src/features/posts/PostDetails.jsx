import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { POSTS_API_URL } from '../../constants';

export const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();


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

  if (!post) return <h2>Lording...</h2>

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

