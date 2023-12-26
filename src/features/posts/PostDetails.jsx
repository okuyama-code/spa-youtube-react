import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { POSTS_API_URL } from '../../constants';

export const PostDetails = () => {
  const [post, setPost] = useState(null);
  // useParamsはReact Routerのフックで、現在のURLの動的なパラメータを取得するために使用されます。/1とかを取得
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

  const deletePost = async () => {
    try {
      const response = await fetch(`${POSTS_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/")
      } else {
        // 例外を投げる。例外とはプログラム実行時に発生する予期せぬエラーのこと
        throw response;
      }
    } catch (e) {
      console.log("エラー", e)
    }
  }

  if (!post) return <h2>Lording...</h2>

  return (
    <div>
      <h2>Post ID: {id}</h2>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to Home</Link>
      {" | "}
      <button onClick={deletePost}>Delete</button>
    </div>
  )
}

