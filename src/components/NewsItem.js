import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
      this.props;

    return (
      <div>
        <div className="card">
        <span style={{zIndex:1,left:"90%"}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                {source}
              </span>
          <img src={imageUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">By {author}</small>{" "}
              <small className="text-muted">
                {new Date(publishedAt).toDateString()}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
