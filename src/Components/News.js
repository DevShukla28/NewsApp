/** @format */
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [
    {
      source: { id: "news-com-au", name:  "News.com.au" },
      author: null,
      title: "Legend blasts Indian pitch ‘cheating’ claim",
      description:
        "<p>India cricket great Ravi Shastri has savaged claims the nation is &ldquo;cheating&rdquo; with its handling of the Nagpur pitch for the first Test against Australia.</p>",
      url: "https://www.news.com.au/sport/cricket/thats-bullst-indian-legend-savages-cheating-claims-over-controversial-first-test-pitch/news-story/50ce8e45fd93ef3a5a934ccd0bac9043",
      urlToImage:
        "https://content.api.news/v3/images/bin/8fc1ecdef187bd3fe1c4ace44dca7d9d",
      publishedAt: "2023-02-08T08:15:00Z",
      content:
        "India cricket great Ravi Shastri has savaged claims the nation is “cheating” with its handling of the Nagpur pitch for the first Test against Australia.\r\nControversy has broken out in the days before… [+2856 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      isMounted:false,
      articles: [],
      loading: true ,
      page: 1,
      totalResults:0,
    }
    document.title = `${this.props.category} - SMART NEWS`;
  }
  
  //async updateNews(){
  //const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=899b551e54144f298510f814743d3df7& ${this.state.page}&pageSize= ${this.props.pageSize}`;
  //this.setState({loading:true});
  //let data = await fetch(url);
  //let parsedData = await data.json();
  //console.log(parsedData);
  //this.setState({articles: parsedData.articles,
  //totalResults: parsedData.totalResults,
  //loading:false,
//})

  
  async componentDidMount() {
    //this.updateNews();
      this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=899b551e54144f298510f814743d3df7&page=1&pageSize= ${this.props.pageSize}`;
    let data = await fetch(url);
   this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(70);

    console.log(parsedData);
     this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false,
    isMounted:true,
    });
    this.props.setProgress(100);
 
  };
  fetchMoreData =  async () => {
 //this.setState({page:this.state.page + 1})
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=899b551e54144f298510f814743d3df7&page=${this.state.page+1}&pageSize= ${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page:this.state.page+1,
    });

  };
 
  


  render() {
    return (
      <div className="container my-6">
        <h1 className="text-center  " style={{marginTop:'66px', padding:'40px'}}> SMART NEWS - Top Headlines from {this.props.category} </h1>

        <div className="row">
        <InfiniteScroll 
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults && this.state.isMounted}
          loader={<h2>Loading...</h2>}
        >
                  <div className="row">

          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageurl={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt} 
                />
              </div>
            )
          })}
                  </div>

            </InfiniteScroll>
        </div>
        

          
        </div>
    
    )
  }
}

  
export default News;
