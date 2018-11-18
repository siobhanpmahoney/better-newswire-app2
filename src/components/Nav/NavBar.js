import React from 'react';
import NavList from './NavList';

class NavBar extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.favCount != this.props.favCount) {
      return this.favCount();
    }
  }

  favCount = () => {
    return this.props.favCount;
  };

  render() {
    return (
      <nav className='nav'>
        <NavList
          list={[
            { to: '/latest', text: `Latest` },
            { to: '/recommended', text: `Recommended` },

          ]}
        />
      </nav>
    );
  }
}

export default NavBar;
