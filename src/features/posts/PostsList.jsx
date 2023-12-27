import React, { useEffect, useState } from 'react'
import { fetchAllPosts, deletePost } from '../../services/postService'
import { Link } from 'react-router-dom';
import "./PostImage.css"


export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);


  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePostHandler = async (id) => {
    try {
        await deletePost(id);
        // 特定のidに一致しない投稿のみを残す
        // 関数内でtrueが返ってきたもののみを抽出
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className='post-container'
        >
          <h2>
            <Link to={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </h2>
          <div>
            {post.image_url && (<img src={post.image_url} alt={post.title} className='post-image' />)}
          </div>
          <div className='post-links'>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePostHandler(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
