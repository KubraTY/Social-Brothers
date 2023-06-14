import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import ReactPaginate from "react-paginate";
import "../pagination.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let perPage = 8;

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        `https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=${perPage}&sortBy=title&sortDirection=asc&searchPhrase=test%20ber&categoryId=1`,
        {
          headers: {
            token: "pj11daaQRz7zUIH56B9Z",
          },
        }
      );
      const total = response.data.total;
      setPageCount(Math.ceil(total / perPage));
      setBlogs(response.data.data);
    };
    fetchBlogs();
  }, [perPage]);

  const fetchPageBlog = async (currentPage) => {
    const response = await axios.get(
      `https://frontend-case-api.sbdev.nl/api/posts?page=${currentPage}&perPage=${perPage}&sortBy=title&sortDirection=asc&searchPhrase=test%20ber&categoryId=1`,
      {
        headers: {
          token: "pj11daaQRz7zUIH56B9Z",
        },
      }
    );
    const data = response.data.data;
    console.log(data);
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const blogsFormServer = await fetchPageBlog(currentPage);

    setBlogs(blogsFormServer);
  };

  return (
    <div className="container">
      <div className="blog-list">
        <ul>
          {blogs.map((item) => (
            <li key={item.id}>
              <PostCard item={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Vorige pagina"}
          nextLabel={"Volgende pagina"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};
export default BlogList;
