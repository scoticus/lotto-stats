import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import './base.css';

const Viewport = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.logo {
    font-size: 1.75rem;
    font-weight: 900;
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  max-width: 900px;
  border-top: 1px solid #dcdcdc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
  font-size: 0.7rem;

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonLink = styled(Link)`
  margin: 0 1rem;
  border-radius: 6px;
  padding: 0.7rem 1.4rem;
  text-decoration: none;
  color: inherit;
  transition: 0.1s all;

  &:hover {
    background-color: #dcdcdc;
    background-color: var(${(props) => props.hover});

    &.contrast {
      color: white;
    }
  }
`;

export default function Layout({ children }) {
  const { currentBuildDate } = useStaticQuery(query);
  const { currentDate } = currentBuildDate;

  return (
    <Viewport>
      <StyledHeader>
        <div className="logo">
          <ButtonLink to="/">LottoStats</ButtonLink>
        </div>
        <nav>
          <ButtonLink to="/lotto" hover="--lotto-red" className="contrast">
            Lotto
          </ButtonLink>
          <ButtonLink
            to="/thunderball"
            hover="--thunderball-purple"
            className="contrast"
          >
            Thunderball
          </ButtonLink>
          <ButtonLink to="/euromillions" hover="--euromillions-yellow">
            EuroMillions
          </ButtonLink>
          <ButtonLink to="/setforlife" hover="--setforlife-blue">
            SetForLife
          </ButtonLink>
        </nav>
      </StyledHeader>
      <main style={{ flexGrow: '1', padding: '10px' }}>{children}</main>
      <StyledFooter>
        <div>Site last updated: {currentDate}</div>
        <div>
          <a href="https://github.com/scoticus/lotto-stats">Edit on Github</a>
        </div>
      </StyledFooter>
    </Viewport>
  );
}

const query = graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`;
