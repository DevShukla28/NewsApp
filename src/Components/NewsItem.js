/** @format */

import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, url, author, date, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageurl} className="card-img-top " alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {source}
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
