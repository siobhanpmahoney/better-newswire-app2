import React from 'react'
import {withRouter} from 'react-router'
import ArticleList from './Articles/ArticleList'


class ArticleContainer extends React.Component {

  componentDidUpdate(prevProps) {

  }


  render() {
  let {bookmarkIDs, viewed, bookmarks} = this.props

    return (
      <div className="article-container-wrapper">
        {this.props.sections.map((sec) => {
          return <ArticleList section={sec} title={sec =="all" ? "latest" : sec} onToggleBookmark={this.props.onToggleBookmark}  bookmarkIDs={this.props.bookmarkIDs} viewed={this.props.viewed} bookmarks={this.props.bookmarks} onViewArticle={this.props.onViewArticle}/>
        })}
      </div>
    )
  }
}

export default withRouter(ArticleContainer)
