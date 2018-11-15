import React from 'react'

class ArticleItem extends React.Component {

  _onToggleBookmark = () => {
    this.props.onToggleBookmark(this.props.article)
  }

  dynamicIcon = () => {
  if (this.props.bookmarked) {
    return (<i className="material-icons bookmark" id={this.props.article.slug_name}>bookmark</i>)
  } else {
    return (<i className="material-icons bookmark_border" id={this.props.article.slug_name} className={this.props.article.section}>bookmark_border</i>)
  }
}


  render() {
    const articleDate = `${(new Date(this.props.article.updated_date)).getMonth() + 1}/${(new Date(this.props.article.updated_date)).getDate()}/${(new Date(this.props.article.updated_date)).getFullYear()}`;

    return (
      <div className="wire-item-container-block-wrapper">
        <div className="wire-item-container">

          <div className="wire-item-img-section">

            {this.props.article.multimedia &&
              <img src={this.props.article.image} alt="" className="wire-item-img" />
            }


          </div>

          <div className="wire-item-all-text">
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
