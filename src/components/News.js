import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello i am a constructor for new component");
    this.state = { articles: [], loading: false, page: 1 };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=In&apiKey=3c6eacc0ba2d4034bf74f2ca4e263d86&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
    });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=In&apiKey=3c6eacc0ba2d4034bf74f2ca4e263d86&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  };
  handleNextClick = async () => {
    console.log("next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 12))) {
      let url = `https://newsapi.org/v2/top-headlines?country=In&apiKey=3c6eacc0ba2d4034bf74f2ca4e263d86&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        totalResults: parseData.totalResults,
        loading: false,
      });
    }
  };

  render() {
    console.log("Render");
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsBook - top Headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {this.state.articles.map((Element) => {
            return (
              <div className="col-md-4" key={Element.url}>
                <Newsitem
                  title={Element.title ? Element.title.slice(0, 45) : ""}
                  description={
                    Element.description ? Element.description.slice(0, 88) : ""
                  }
                  imageUrl={Element.urlToImage}
                  newsUrl={Element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
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
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
