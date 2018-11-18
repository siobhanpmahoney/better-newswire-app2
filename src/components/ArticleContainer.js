import React from 'react'
import {withRouter} from 'react-router'
import ArticleList from './Articles/ArticleList'


class ArticleContainer extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.sections != this.props.sections) {

    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.updateWireType(this.props.location.pathname.slice(1))
    }
  }


  render() {
  let {bookmarkIDs, viewed, bookmarks} = this.props

    return (
      <div className="article-container-wrapper">
        {this.props.sections.map((sec) => {
          return <ArticleList key={sec} section={sec} title={sec =="all" ? "latest" : sec} onToggleBookmark={this.props.onToggleBookmark}  bookmarkIDs={this.props.bookmarkIDs} viewed={this.props.viewed} bookmarks={this.props.bookmarks} onViewArticle={this.props.onViewArticle}/>
        })}
      </div>
    )
  }
}

export default withRouter(ArticleContainer)
