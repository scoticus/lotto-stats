import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const linkStyles = {
  margin: '0 1rem',
};

export default function Layout({ children }) {
  const { currentBuildDate } = useStaticQuery(query);
  const { currentDate } = currentBuildDate;

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
      <footer>Site last updated: {currentDate}</footer>
    </>
  );
}

const query = graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`;
