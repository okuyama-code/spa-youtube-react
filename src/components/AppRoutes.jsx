import React from 'react'
import { PostsLists } from '../features/posts/PostsLists'
import { Route, Routes } from 'react-router-dom'
import { PostDetails } from '../features/posts/PostDetails'
import { NewPostForm } from '../features/posts/NewPostForm'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PostsLists />} />
      <Route path='/posts/:id' element={<PostDetails />} />
      <Route path='/new' element={<NewPostForm />} />
    </Routes>
  )
}
