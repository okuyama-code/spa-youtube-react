import React, { useEffect, useState } from 'react'
import { fetchAllPosts, deletePost } from '../../services/postService'
import { Link } from 'react-router-dom';
import "./PostImage.css"

import usePostsData from "../../hooks/usePostsData"
import useURLSearchParam from "../../hooks/useURLSearchParam"
import SearchBar from './SearchBar';


export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  // const [, setLoading] = useState(true);
  // const [, setError] = useState(null);
  // searchTerm 検索語
  const [searchTerm, setSearchTerm] = useState("");
  // 、Reactのカスタムフック useURLSearchParams を使用して、URLのクエリパラメータを取得し、デバウンス（遅延実行）された検索キーワードを状態として管理するコードです。
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const {
    posts: fetchedPosts,
    loading,
    error,
  } = usePostsData(debouncedSearchTerm); // Note the change here

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts); // Update the posts state once fetchedPosts is available
    }
  }, [fetchedPosts]);

  // useEffect(() => {
  //   async function loadPosts() {
  //     try {
  //       const data = await fetchAllPosts();
  //       setPosts(data);
  //       setLoading(false);
  //     } catch (e) {
  //       setError(e);
  //       setLoading(false);
  //     }
  //   }
  //   loadPosts();
  // }, []);

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

  // part26 追記
  // すぐに Immediate
  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // debounceとは  イベントを呼び出し後、次のイベントまで指定した時間が経過するまではイベントを発生させない処理。
  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      {loading && (<p>Loading...</p>)}
      {error && (<p>Error loading posts.(投稿の読み込み中にエラーが発生しました。)</p>)}
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
