import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, url, author, publishedAt} = this.props;
    return (
      <div className='container my-3'>
            <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author?"Unknow":author} Last updated {new Date(publishedAt).toGMTString()} mins ago</small></p>
                <a href={url} className="btn btn-primary">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}
