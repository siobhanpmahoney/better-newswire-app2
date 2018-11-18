import React from 'react'

class ViewedItem extends React.Component {
  render() {
    return (
      <div className="viewed-item-wrapper">
      <li className="viewed-item">
        {this.props.viewedItem.title}
      </li>
    </div>
    )
  }
}

export default ViewedItem
