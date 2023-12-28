import React, { useEffect, useState } from 'react'
import { fetchAllPosts, deletePost } from '../../services/postService'
import { Link, useSearchParams } from 'react-router-dom';
import "./PostImage.css"

import usePostsData from "../../hooks/usePostsData"
import useURLSearchParam from "../../hooks/useURLSearchParam"
import SearchBar from './SearchBar';
import Pagination from './Pagination';


export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  // searchTerm 検索語
  const [searchTerm, setSearchTerm] = useState("");
  // 、Reactのカスタムフック useURLSearchParams を使用して、URLのクエリパラメータを取得し、デバウンス（遅延実行）された検索キーワードを状態として管理するコードです。
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search");

  // part29追記　鍵
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPageFromURL = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPageFromURL);
  // part29追記

  const {
    posts: fetchedPosts,
    loading,
    error,
    totalPosts,
    perPage,
  } = usePostsData(debouncedSearchTerm, currentPage); // Note the change here

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts); // Update the posts state once fetchedPosts is available
    }
  }, [fetchedPosts]);

  // part29追記
  useEffect(() => {
    const initialSearchTerm = searchParams.get("search") || "";
    setSearchTerm(initialSearchTerm);

    const pageFromURL = searchParams.get("page") || "1";
    setCurrentPage(Number(pageFromURL));

  }, [searchParams])
  // part29追記


  // リファクタリング前
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

  // part29追記
  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Update the URL to include the page number
    // ページ番号を含めるように URL を更新します
    setSearchParams({ search: debouncedSearchTerm, page: page});
  }

  // part29追記



  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPosts={totalPosts}
        postsPerPage={perPage}
        onPageChange={handlePageChange}
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
