import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  
  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
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
  }, [id])

  return (
    <div>PostDetails</div>
  )
}

