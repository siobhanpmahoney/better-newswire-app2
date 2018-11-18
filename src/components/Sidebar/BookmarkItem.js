import React from 'react'

class BookmarkItem extends React.Component {

  _onViewArticle = () => {
    this.props.onViewArticle(this.props.bookmark)
  }

  _onToggleBookmark = () => {
    this.props.onToggleBookmark(this.props.bookmark)
  }


  render() {
    const {bookmark} = this.props

    const articleDate = `${(new Date(bookmark.updated_date)).getMonth() + 1}/${(new Date(bookmark.updated_date)).getDate()}/${(new Date(bookmark.updated_date)).getFullYear()}`;
    return (
      <div className="bookmark-item-wrapper">
        <div className="bookmark-img-section">
          <img src={bookmark.image} className="bookmark-img" />
        </div>
        <div className="bookmark-item-top">
          <span className="bookmark-item-section">{bookmark.section}</span>
          <span className="bookmark-item-button"> <button onClick={this._onToggleBookmark}>x</button></span>
        </div>

        <div className="bookmark-item-title" onClick={this._onViewArticle}>
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
