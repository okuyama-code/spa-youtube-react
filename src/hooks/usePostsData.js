import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostsData(searchTerm, page = 1) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    async function loadPosts() {
      try {
        let data;
        if (searchTerm) {
          data = await searchPosts(searchTerm, page);
        } else {
          data = await fetchAllPosts(page);
        }
        if (data.posts) {
          setPosts(data.posts);
          setTotalPosts(data.total_count)
          setPerPage(data.per_page)
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch posts: ", e);
      }
    }
    loadPosts();
  }, [searchTerm]);

  return { posts, loading, error, totalPosts, perPage };
}

export default usePostsData;
