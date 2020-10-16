import React from 'react';
import { Link } from 'gatsby';

const linkStyles = {
  margin: '0 1rem',
};

export default function Layout({ buildDate, children }) {
  return (
    <>
      <header>
        <nav>
          <Link to="/" style={linkStyles}>
            Home
          </Link>
          <Link to="/lotto" style={linkStyles}>
            Lotto
          </Link>
          <Link to="/thunderball" style={linkStyles}>
            Thunderball
          </Link>
          <Link to="/euromillions" style={linkStyles}>
            EuroMillions
          </Link>
          <Link to="/setforlife" style={linkStyles}>
            SetForLife
          </Link>
        </nav>
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer>Last updated: {buildDate}</footer>
    </>
  );
}
