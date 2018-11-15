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

  updateFeedState = () => {
    fetchArticles(this.props.section)
    .then(json => {
      let feedState = [...this.state.feed]
      json.forEach((article) => {
        if (!feedState.find((a) => a.slug_name == article.slug_name)) {
          feedState.push(article)
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
      <div><h2>ArticleList!!!</h2>
      {this.state.feed.map((a) => {
        return <ArticleItem article={a} onToggleBookmark={this.props.onToggleBookmark} bookmarked={!!this.props.bookmarks[a.slug_name] && this.props.bookmarks[a.slug_name] == "bookmarked"}/>
      })}
    </div>
  )
}
}

export default ArticleList
