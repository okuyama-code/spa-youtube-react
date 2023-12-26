import React, { useEffect, useState } from 'react'
import { POSTS_API_URL } from '../../constants'
import { Link } from 'react-router-dom';

export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);


  useEffect(() => {
    async function loadPosts() {
      try {
        // const response = await fetch("http://localhost:3000/api/v1/posts");
        const response = await fetch(POSTS_API_URL);
        if (response.ok) {
          const json = await response.json();
          // console.log(json);
          setPosts(json);
        } else {
          throw response;
        }
      } catch(e) {
        setError("エラーが発生しました。")
        console.log("エラーが発生しました", e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${POSTS_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {

        // 特定のidに一致しない投稿のみを残す
        // 関数内でtrueが返ってきたもののみを抽出
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw response;
      }
    } catch (e) {
      console.log(e);
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
          {/* <p>{post.body}</p> */}
          <div className='post-links'>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}