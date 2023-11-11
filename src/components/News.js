import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [loading, setloading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = "";
    if (localStorage.getItem("searchTerm"))
      url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${props.category}&q=${localStorage.getItem(
        "searchTerm"
      )}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    else
      url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedata = await data.json();
    props.setProgress(70);
    console.log(parsedata);
    if (parsedata.status === "error") return;
    setarticles(parsedata.articles);
    settotalResults(parsedata.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsBook`;

    updateNews();

    /* eslint-disable */
  }, []);

  // handlePrevClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=3c6eacc0ba2d4034bf74f2ca4e263d86&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseData.articles,
  //   //   totalResults: parseData.totalResults,
  //   //   loading: false,
  //   // });
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  // handleNextClick = async () => {
  //   // console.log("next");
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 12))) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     props.country
  //   //   }&category=${
  //   //     props.category
  //   //   }&apiKey=3c6eacc0ba2d4034bf74f2ca4e263d86&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${props.pageSize}`;
  //   //   this.setState({ loading: true });
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();
  //   //   console.log(parseData);
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parseData.articles,
  //   //     totalResults: parseData.totalResults,
  //   //     loading: false,
  //   //   });

  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setpage(page + 1);

    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setData(parsedata.articles, parsedata.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsBook - Top Headlines
      </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container" style={{ marginTop: "-10px" }}>
          <div className="row">
            {articles.map((Element) => {
              return (
                <div className="col-md-4" key={Element.url}>
                  <Newsitem
                    title={Element.title ? Element.title.slice(0, 45) : ""}
                    description={
                      Element.description
                        ? Element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={Element.urlToImage}
                    newsUrl={Element.url}
                    author={Element.author}
                    date={Element.publishedAt}
                    source={Element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>

    /* <div className="container d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-dark"
            disabled={page <= 1}
            onClick={handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            disabled={
              page >
              Math.ceil(totalResults / props.pageSize)
            }
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
          </div> */
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "entertainment",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
