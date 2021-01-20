import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Posts from "./components/Posts";
import Paginate from "./components/paginate";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  // https://restcountries.eu/rest/v2/all
  // https://jsonplaceholder.typicode.com/posts

  useEffect(() => {
    (async function () {
      setLoading(true);
      const res = await axios.get("https://restcountries.eu/rest/v2/all");
      setPosts(res.data);
      setLoading(false);
    })();
  }, []);

  const trimStart = (currentPage - 1) * postPerPage;
  const trimEnd = trimStart + postPerPage;

  const trimPosts = posts.slice(trimStart, trimEnd);

  const paginate = (number) => {
    setCurrentPage(number)
  }

  const preNextPage = (direction) => {
    if(direction === 'pre') {
      setCurrentPage(currentPage - 1)
    }
    if(direction === 'next') {
      setCurrentPage(currentPage + 1)
    }
  }


  return (
    <div className="App">
      <h1>hallow world</h1>
      <label htmlFor="pageRange">Post per page </label>
        <input type="text" name="pageRange" onBlur={e => {setPostPerPage(+e.target.value)}} />
      <ul>
        <Posts posts={trimPosts} loading={loading} />
        <Paginate preNextPage={preNextPage} postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />
      </ul>
    </div>
  )
}

export default App;
