import React from 'react'
import ArticleItem from './ArticleItem'
import { fetchArticles } from '../../fetchArticles'

class ArticleList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      feed: []
    }
  }

  componentDidMount() {
    fetchArticles(this.props.section)
    .then(json => this.setState({
      feed: json
    }, this.startInterval))
  }

  componentDidUpdate(prevProps) {
    if ((Object.keys(prevProps.bookmarkIDs) != Object.keys(this.props.bookmarkIDs)) || (prevProps.bookmarked.length != this.props.bookmarked.length) || prevProps.viewed.length != this.props.viewed.length) {
      this.renderFeed()
    }
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
      }, () => console.log(this.state))
    })
  }

  startInterval = () => {
    this.interval = setInterval(() => this.updateFeedState(), 10000)
  }


  render() {
    return (
      <div className="article-list">
        <span className="list-title">{this.props.title.toUpperCase()}</span>
      {this.renderFeed().map((a) => {
        return <ArticleItem article={a} on onToggleBookmark={this.props.onToggleBookmark} onViewArticle={this.props.onViewArticle} bookmarked={!!this.props.bookmarkIDs[a.slug_name]}/>
      })}
    </div>
  )
}
}

export default ArticleList
