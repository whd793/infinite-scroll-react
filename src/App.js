import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=5`)
      .then((res) => res.json())
      .then((json) => {
        setPosts([...posts, ...json.data]);
      });
  };

  useEffect(() => {
    // fetchData();
    setLoading(true);
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=5`)
      .then((res) => res.json())
      .then((json) => {
        setPosts([...posts, ...json.data]);
        setLoading(false);
      });

    return () => {
      window.removeEventListener("scroll", () => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.offsetHeight
        ) {
          setPage((prev) => prev + 1);
          // console.log(page);
        }
      });
    };
  }, [page]);

  //on scroll, add page

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight
    ) {
      setPage(page + 1);
      console.log(page);
    }
  });

  // window.onscroll = function () {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 100 >=
  //     document.documentElement.offsetHeight
  //   ) {
  //     setPage((prev) => prev + 1);
  //     console.log(page);
  //   }
  // };

  return (
    <div className="posts">
      {posts.length > 0 &&
        posts.map((_, i) => {
          return (
            <div className="posts__post">
              <h1>{_.name}</h1>
              {/* <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png" /> */}
              <p>{i}</p>
            </div>
          );
        })}
      {loading && (
        <div>
          <h1>LOADING...</h1>
        </div>
      )}
    </div>
  );
}
