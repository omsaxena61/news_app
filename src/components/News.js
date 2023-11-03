import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import LoadingBar from 'react-top-loading-bar';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "entertainment",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);

    this.state = { articles: [], loading: true, page: 1, totalResults: 0 };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsBook`;
    
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedata = await data.json();
    this.props.setProgress(70);
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79c43d9e71644c96812888270ce4fb0d&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedata = await data.json();
    // console.log(parsedata);
    // this.setState({
    //   articles: parsedata.articles,
    //   totalResults: parsedata.totalResults,
    //   loading: false,
    // });
    // console.log("cdm");
    this.updateNews();
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=3c6eacc0ba2d4034bf74f2ca4e263d86&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    // console.log("next");
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 12))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=3c6eacc0ba2d4034bf74f2ca4e263d86&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   console.log(parseData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseData.articles,
    //     totalResults: parseData.totalResults,
    //     loading: false,
    //   });

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79c43d9e71644c96812888270ce4fb0d&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
    });
  };

  render() {
    console.log("Render");
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsBook - Top Headlines
        </h1>
        {this.state.loading&&<Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((Element) => {
                return (
                  <div className="col-md-4" key={Element.url} >
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
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            disabled={
              this.state.page >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
          </div> */
    );

  }
}

export default News;
