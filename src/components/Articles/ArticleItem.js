import React from 'react'

class ArticleItem extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.bookmarked != this.props.bookmarked) {
      this.dynamicIcon();
    }
  }

  _onToggleBookmark = () => {
    this.props.onToggleBookmark(this.props.article)
  }

  dynamicIcon = () => {
    if (this.props.bookmarked) {
      return (<i className="material-icons bookmark" id={this.props.article.slug_name}>bookmark</i>)
    } else {
      return (<i className="material-icons bookmark_border" id={this.props.article.slug_name}>bookmark_border</i>)
    }
  }


  render() {
    console.log("item bookmarked?", this.props.bookmarked)
    const articleDate = `${(new Date(this.props.article.updated_date)).getMonth() + 1}/${(new Date(this.props.article.updated_date)).getDate()}/${(new Date(this.props.article.updated_date)).getFullYear()}`;

    return (
      <div className="article-item-wrapper">
        <div className="article-item-container">

          <div className="article-item-img-section">
            <img src={this.props.article.image} alt="" className="article-item-img" />



          </div>

          <div className="article-item-all-text">
            <div className="wire-item-section">
              {this.props.article.section}
            </div>

            <div className="wire-item-title" id={this.props.article.slug_name} onClick={this.props.viewArticle}>
              {this.props.article.title}
            </div>

            <div className="wire-item-abstract">
              {this.props.article.abstract}
            </div>

            <div className="wire-item-bottom">
              <div className="wire-item-date">
                {articleDate}
              </div>

              <span className="wire-item-buttons">
                <button className="readLater" id={this.props.article.slug_name} className={this.props.article.section} onClick={this._onToggleBookmark}>
                  {this.dynamicIcon()}
                </button>
              </span>
            </div>
          </div>




        </div>


      </div>
    )
  }
}

export default ArticleItem
