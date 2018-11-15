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
    if ((Object.keys(prevProps.articleIDs) != Object.keys(this.props.articleIDs)) || (prevProps.bookmarked.length != this.props.bookmarked.length) || prevProps.viewed.length != this.props.viewed.length) {
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
    console.log("bookmarks: ", this.props.articleIDs)
    return (
      <div><h2>ArticleList!!!</h2>
      {this.renderFeed().map((a) => {
        console.log("in list map")
        console.log("articleIds: ", this.props.articleIDs)
        console.log("a.slug_name: ", a.slug_name)
        console.log("article in articleIds?", !!this.props.articleIDs[a.slug_name] && this.props.articleIDs[a.slug_name] == "bookmarked")
        return <ArticleItem article={a} onToggleBookmark={this.props.onToggleBookmark} bookmarked={!!this.props.articleIDs[a.slug_name] && this.props.articleIDs[a.slug_name] == "bookmarked"}/>
      })}
    </div>
  )
}
}

export default ArticleList
