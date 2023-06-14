import React from "react";
import { Link, useLocation } from "react-router-dom";
const routes = [
  { url: "/", name: "Home" },
  { url: "/blog", name: "Blog" },
];
const Navbar = () => {
  const location = useLocation();
  //console.log(location);
  //   const path = window.location.pathname;
  return (
    <nav className="nav">
      <div className="container">
        <Link to="/" className="site-title">
          Social Brothers
        </Link>
        <ul>
          {routes.map((route) => (
            <li
              className={location.pathname === route.url ? "active" : ""}
              key={route.url}
            >
              <Link to={route.url}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// function CustomLink({ to, children }) {
//   const path = window.location.pathname;

//   return (
//     <li className={path === to ? "active" : ""}>
//       <Link to={to}>{children}</Link>
//     </li>
//   );
// }

export default Navbar;

// const arr = [1,2,3,4,5]

// const newArr = arr.slice(0,2) ==> newArr= [1,2,3] arr= [1,2,3,4,5] //bunuu kullanabiliriz
// const newArr2 = arr.splice(0,2) ==> [1,2,3]
