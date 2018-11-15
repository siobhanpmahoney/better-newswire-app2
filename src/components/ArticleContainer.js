import React from 'react'
import {withRouter} from 'react-router'
import ArticleList from './Articles/ArticleList'


class ArticleContainer extends React.Component {


  render() {
  let {articleIDs, viewed, bookmarks} = this.props

    return (
      <div>
        {this.props.sections.map((sec) => {
          return <ArticleList section={sec} onToggleBookmark={this.props.onToggleBookmark}  articleIDs={articleIDs} viewed={viewed} bookmarks={bookmarks} />
        })}
      </div>
    )
  }
}

export default withRouter(ArticleContainer)
