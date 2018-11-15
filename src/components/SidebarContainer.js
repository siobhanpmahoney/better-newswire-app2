import React from 'react'
import BookmarkList from './Sidebar/BookmarkList'
import ViewedList from './Sidebar/ViewedList'

class SidebarContainer extends React.Component {
  render() {
    return (
      <div className="sidebar-container-wrapper">
        <div className="bookmark-container">
          <BookmarkList bookmarks={this.props.bookmarks} onViewArticle={this.props.onViewArticle} onToggleBookmark={this.props.onToggleBookmark}  />
        </div>

        <div className="viewed-container">
          <ViewedList viewed={this.props.viewed} onViewArticle={this.props.onViewArticle} />
        </div>
      </div>
    )
  }
}

export default SidebarContainer
