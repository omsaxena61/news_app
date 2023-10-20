import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props; //destrcturing
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              !imageUrl
                ? "https://www.hindustantimes.com/ht-img/img/2023/10/15/1600x900/PTI10-15-2023-000092A-0_1697363274441_1697363341754.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read more...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;