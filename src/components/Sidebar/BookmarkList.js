import React from 'react'
import BookmarkItem from './BookmarkItem'

class BookmarkList extends React.Component {
  render() {
    return (
      <div className="bookmark-list">
        <div className="sidebar-header">Bookmarks</div>
        {this.props.bookmarks.map((bookmark) => {
          return <BookmarkItem bookmark={bookmark} key={bookmark.slug} onViewArticle={this.onViewArticle} onToggleBookmark={this.onToggleBookmark} />
        })}
      </div>
    )
  }
}

export default BookmarkList
