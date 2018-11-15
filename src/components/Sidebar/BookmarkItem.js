import React from 'react'

class BookmarkItem extends React.Component {
  render() {
    const {bookmark} = this.props

    const articleDate = `${(new Date(bookmark.updated_date)).getMonth() + 1}/${(new Date(bookmark.updated_date)).getDate()}/${(new Date(bookmark.updated_date)).getFullYear()}`;
    return (
      <div className="bookmark-item-wrapper">
        <div className="bookmark-img-section">
          <img src={bookmark.image} className="bookmark-img" />
        </div>
        <div className="bookmark-item-section">
          {bookmark.section}
        </div>

        <div className="bookmark-item-title">
          {bookmark.title}
        </div>

        <div className="bookmark-item-date">
          {articleDate}
        </div>
      </div>
    )
  }
}

export default BookmarkItem
