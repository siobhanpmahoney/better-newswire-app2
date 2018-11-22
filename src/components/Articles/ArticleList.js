import React from 'react'
import { withRouter } from 'react-router'
import ArticleItem from './ArticleItem'
import { fetchArticles } from '../../fetchArticles'


class ArticleList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      feed: [],
      isDisplayingList: true
    }
  }

  componentDidMount() {
    fetchArticles(this.props.section)
    .then(json => this.setState({
      feed: json,
      isDisplayingList: true
    }, this.startInterval))
  }

  componentDidUpdate(prevProps, prevState) {
    if ((Object.keys(prevProps.bookmarkIDs) != Object.keys(this.props.bookmarkIDs)) || (prevProps.bookmarked.length != this.props.bookmarked.length) || prevProps.viewed.length != this.props.viewed.length) {
      this.renderFeed()
    }
    if (prevProps.location.pathname != this.props.location.pathname) {
      this.setState({
        feed: [],
        isDisplayingList: true
      }, this.startInterval)
    }

    if (prevState.feed.length != this.state.feed.length) {
      console.log("FEEDUPDATE")
      console.log("section: ", this.props.title)
      console.log("previous feed count: ", prevState.feed.length)
      console.log("current feed count: ", this.state.feed.length)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  renderFeed = () => {
    return this.state.feed
  }



  updateFeedState = () => {
    fetchArticles(this.props.section)
    .then(json => {
      let feedState = [...this.state.feed]
      json.forEach((article) => {
        if (!feedState.find((a) => a.slug_name == article.slug_name)) {
          feedState.unshift(article)
        }
      })
      this.setState({
        feed: feedState
      })
    })
  }

  startInterval = () => {
    this.interval = setInterval(() => this.updateFeedState(), 10000)
  }

  hideList = () => {
    let displayState = !this.state.isDisplayingList
    this.setState({
      isDisplayingList: displayState
    })
  }


  render() {
    let display = !!this.state.isDisplayingList ? "block" : "none"
    let buttonText = !!this.state.isDisplayingList ? "-" : "+"
    let buttonStyle = this.props.title == "latest" ? "none" : "inline"
    return (
      <div className="article-list">
        <div className="list-title">
          {this.props.title.toUpperCase()}
          <button className="feed-list-expand-button" onClick={this.hideList} style={{display: `${buttonStyle}`}}>
            {buttonText}
          </button>
        </div>
        <div className="article-list" style={{display: `${display}`}}>
      {this.renderFeed().map((a) => {
        return <ArticleItem key={a.slug_name + " " + a.updated_date} article={a} onToggleBookmark={this.props.onToggleBookmark} onViewArticle={this.props.onViewArticle} bookmarked={!!this.props.bookmarkIDs[a.slug_name]}/>

      })}
              </div>
    </div>
  )
}
}

export default withRouter(ArticleList)
