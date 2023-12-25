import { useState } from 'react'
import './App.css'
import { PostsLists } from './features/posts/PostsLists'

function App() {


  return (
    <>
      <div className='app'>
        <h1>React × Rails(API)</h1>
        <p>FInd this application layout in client/src/App.jsx</p>
        <PostsLists />
      </div>
    </>
  )
}

export default App
