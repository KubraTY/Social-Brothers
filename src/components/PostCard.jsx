import React, { useEffect, useState } from "react";

const PostCard = ({ item }) => {
  const imgPath = `https://frontend-case-api.sbdev.nl/storage/${item.img_url}`;
  const [date, setDate] = useState("");
  useEffect(() => {
    const date2 = new Date(item.created_at);
    setDate(`${date2.getMonth()}-${date2.getDay()}-${date2.getFullYear()}`);
  }, [item.created_at]);
  return (
    <div>
      <div className="blogItem-cover">
        <img className="blogItem-img" src={imgPath} alt="" />
        <div className="post-header">
          <div className="c-date">{date}</div>
          <div className="category-name">{item.category.name}</div>
        </div>
      </div>
      <div className="post-content">
        <div className="post-title">{item.title}</div>
        <p className="post-text">{item.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
