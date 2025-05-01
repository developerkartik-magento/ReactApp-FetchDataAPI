import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {

  constructor() {
    super();
    this.state = {
        articles: [],
        loading: false,
        page: 1
    }
}

async componentDidMount() {
  // let url = `https://newsapi.org/v2/top-headlines?country=us&page=1&category=${this.props.category}&apiKey=7054ab85ec0a4e36ad0e3a3c5be8f021&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true});
  // let data = await fetch(url);
  // let parseData = await data.json();
  // console.log(parseData);
  // this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading:false});
  this.updateNews();
}
async updateNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&page=${this.props.page}&category=${this.props.category}&apiKey=7054ab85ec0a4e36ad0e3a3c5be8f021&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json();
  console.log(parseData);
  this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading:false});
}
preClick = async() => {
  // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=7054ab85ec0a4e36ad0e3a3c5be8f021&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true});  
  // let data = await fetch(url);
  //   let parseData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseData.articles,
  //     loading: false
  //   });
  this.setState({page: this.state.page - 1});
  this.updateNews();
}

nextClick = async () => {
  // if(!this.state.page + 1 < Math.ceil(this.state.totalResults/this.props.pageSize)){
  //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=7054ab85ec0a4e36ad0e3a3c5be8f021&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parseData.articles,
  //     loading: false
  //   });
  // }
  this.setState({page: this.state.page + 1});
  this.updateNews();
}
  render() {
    return (
      <div className='container'>
        This is News Component
        <div className='row'>
          {this.state.loading && <Spinner />}
          <h1 className='text-center'>News - Top Headlines</h1>
            {!this.state.loading && this.state.articles.map((element) => {
                return <div className='col-lg-4'>
                <NewsItem key={element.url} title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,88):''} imageUrl={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} />
                </div>
            })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.preClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button>
        </div>
      </div>
      
    )
  }
}
