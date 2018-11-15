import React from 'react'
import ViewedItem from './ViewedItem'

class ViewedList extends React.Component {
  render() {
    return (
      <div className="viewed-list">
      <div className="sidebar-header">History</div>
        {this.props.viewed.map((item) => {
          return <ViewedItem viewedItem={item} key={item.slug} onViewArticle={this.onViewArticle} />
        })}
      </div>
    )
  }
}

export default ViewedList
