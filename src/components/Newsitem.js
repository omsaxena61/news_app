import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date ,source} = this.props; //destrcturing
    return (
      <div className="my-3">
        <div className="card">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:"1" ,color:"gold"}}>
              {source}
                <span class="visually-hidden">unread messages</span>
              </span>
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
            <h5 className="card-title">
              {title}...Example heading{" "}
              
            </h5>
            <p className="card-text">{description}...</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark" style={{color:"gold"}}>
              Read more...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
