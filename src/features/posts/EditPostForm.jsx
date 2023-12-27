import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POSTS_API_URL } from '../../constants';
import { updatePost } from '../../services/postService';

const EditPostForm = () => {
  const [post, setPost] = useState(null);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
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
        setError(e);
      } finally {
        setLoading(false)
      }
    }
    fetchCurrentPost();
  }, [id])

  const handleSubmit= async (e) => {
    e.preventDefault();
    const updatedPost = {
      title: post.title,
      body: post.body
    }

    try {
      const response = await updatePost(id, updatedPost)
      navigate(`/posts/${response.id}`)
    } catch(e) {
      console.log(e)
    }
  }

  if (!post) return <h2>Loading...</h2>

  return (
    <div>
      <h2>Edit Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title</label>
          <br />
          <input
            type="text"
            id='post-title'
            value={post?.title}
            onChange={(e) => setPost({ ...post, title: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="post-body">Body</label>
          <br />
          <textarea
            id="post-body"
            value={post?.body}
            onChange={(e) => setPost({ ...post, body: e.target.value})}
          />
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditPostForm
