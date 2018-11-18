import React from 'react';
import { Route, Link } from 'react-router-dom';
import ls from 'local-storage';

const NavListItem = ({ to, children }) => {
  return (
    <Route
      path={to}
      exact
      children={({ match }) => (
        <li className={`nav__list-item${match ? ' nav__list-item--active' : ''}`}>
          <Link className='nav__list-item__link' to={to}>
            {children}
          </Link>
        </li>
      )}
    />
  )
};

export default function NavList({ list }) {
  return (
    <ul className='nav__list'>
      {list.map(({ text, to }) => (
        <NavListItem key={text} to={to}>
          <i className='navIcon' /> {text}
        </NavListItem>
      ))}
    </ul>
  );
}
