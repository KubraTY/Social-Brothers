import React from "react";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import UploadPost from "../components/UploadPost";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(4);
  const perPageCount = 8;

  const showMoreItems = () => {
    setVisible((preValue) => preValue + 4);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `https://frontend-case-api.sbdev.nl/api/posts?page=${
          visible / 4
        }&perPage=4&sortBy=title&sortDirection=asc&searchPhrase=test%20ber&categoryId=1`,
        {
          headers: {
            token: "pj11daaQRz7zUIH56B9Z",
          },
        }
      );

      setBlogs((prevState) => [...prevState, ...response.data.data]);
    };
    if (visible % 4 === 0) fetchPosts();
  }, [visible]);

  return (
    <div className="page-container home-container">
      <div className="post-adding">
        <UploadPost />
      </div>

      <div className="blog-list">
        <ul className="homeposts">
          {blogs.slice(0, visible).map((item) => (
            <li key={item.id}>
              <PostCard item={item} />
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button className="mainbtn" onClick={showMoreItems}>
            Laad Meer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
