import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx' 
import Signup from './pages/SignUp.jsx'
import UploadPost from './pages/UploadPost.jsx'
import MyPosts from './pages/MyPosts.jsx'
import Post from './pages/Post.jsx'
import CategroySort from './pages/CategroySort.jsx'
import SearchItems from './pages/SearchItems.jsx'
import Verifiaction from './components/Verifiaction.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
            <Home />
        ),
      },
      {
        path: "/my-posts",
        element: (
          <MyPosts />
        ),
      },
      {
        path: "/upload-post",
        element: (
          <UploadPost />
        ),
      },
      {
        path: "/item/:slug",
        element: (
          <Post />
        ),
      },
      {
        path: "/category/:category",
        element: (
            <CategroySort />
        ),
      },
      {
        path: "/search/:searchText",
        element: (
            <SearchItems />
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verify",
    element: <Verifiaction />,
  },
  {
    path: "/forgotpass",
    element: <ForgotPassword />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
],{basename:'/'});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
