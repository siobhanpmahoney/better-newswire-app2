import React from 'react'
import {withRouter} from 'react-router'
import ArticleList from './Articles/ArticleList'


class ArticleContainer extends React.Component {

  componentDidUpdate(prevProps) {

  }


  render() {
  let {articleIDs, viewed, bookmarks} = this.props

    return (
      <div className="article-container-wrapper">
        {this.props.sections.map((sec) => {
          return <ArticleList section={sec} title={sec =="all" ? "latest" : sec} onToggleBookmark={this.props.onToggleBookmark}  articleIDs={this.props.articleIDs} viewed={this.props.viewed} bookmarks={this.props.bookmarks} />
        })}
      </div>
    )
  }
}

export default withRouter(ArticleContainer)
