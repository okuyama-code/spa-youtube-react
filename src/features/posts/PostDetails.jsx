import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePost, fetchPost } from '../../services/postService';
import "./PostImage.css"


export const PostDetails = () => {
  const [post, setPost] = useState(null);
  // useParamsはReact Routerのフックで、現在のURLの動的なパラメータを取得するために使用されます。/1とかを取得
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (e) {
        console.log("エラーが発生しました" ,e)
      }
    }
    fetchCurrentPost();
  }, [id])

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id)
      navigate("/")
    } catch (e) {
      console.error("削除に失敗しました", e)
    }
  }

  if (!post) return <h2>Lording...</h2>

  return (
    <div>
      <h2>Post ID: {id}</h2>
      <h2>{post.title}</h2>
      {/* post.image_urlが存在する場合に、<img>要素を描画します。&&は論理 AND 演算子で、左辺が true の場合に右辺を評価します。 */}
      {post.image_url && (<img src={post.image_url} alt={post.title} className='post-image' />)}
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit Pageへ</Link>
      {" | "}
      <Link to="/">Back to Home</Link>
      {" | "}
      <button onClick={deletePostHandler}>Delete</button>
    </div>
  )
}

