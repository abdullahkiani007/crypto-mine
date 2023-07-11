import React from "react";
import { useState, useEffect } from "react";
import { getNews } from "../api/external";
import Loader from "./Loader";

function Home() {
  const handleClick = (url) => {
    window.open(url, "_blank");
  };
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();

      if (response.code == "ERR_BAD_REQUEST") {
        setError(response);
        console.log(response);
      } else {
        setArticles(response);
        console.log("I got executed");
      }
    })();

    // cleanup
    setArticles([]);
  }, []);
  if (error) {
    return (
      <h1 className="text-red-900 text-3xl text-center min-w-full w-full mt-20 m-auto">
        {error.message}
      </h1>
    );
  }
  if (articles.length == 0) {
    return <Loader text="Articles" />;
  } else
    return (
      <div className="max-w-full w-full">
        <h1 className="font-bold text-4xl text-center mt-10 mb-10">
          Latest Articles
        </h1>
        <div className="flex flex-wrap justify-center">
          {articles.map((article) => {
            return (
              <div
                className="border border-white rounded-xl m-10 cursor-pointer  md:w-1/5 p-4 flex flex-col align-center justify-center"
                key={article.url}
                onClick={() => handleClick(article.url)}
              >
                <img className="rounded-xl w-full h-full" src={article.image} />
                <h3>{article.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Home;
