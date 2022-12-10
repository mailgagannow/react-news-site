import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `Daily Briefing-${this.capitalizeFirstLetter(this.props.category)}`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=8a0b2e3eda6f4daa8194fa3aa442ce17&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    let data = await fetch(url);
    this.props.setProgress(20);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
      console.log(this.props);
    this.updateNews();
  }

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=8a0b2e3eda6f4daa8194fa3aa442ce17&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      });
    });
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, function () {
      this.updateNews();
    });
  };

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 }, function () {
      this.updateNews();
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Daily Briefing-{this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4">
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage ? element.urlToImage : ""}
                    newsUrl={element.url ? element.url : ""}
                    author={element.author ? element.author : "Unknown"}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            style={{ marginTop: "7px" }}
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
