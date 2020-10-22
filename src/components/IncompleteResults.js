import React from 'react';
import styled from '@emotion/styled';

import formatISODate from '../utils/formatISODate';

const Container = styled.div`
  max-width: 300px;
  margin: 2rem auto;
  border: 2px solid rgb(1, 101, 193);
  border-radius: var(--br);
  box-shadow: 3px 3px 6px rgba(1, 101, 193, 0.4);
  background-color: rgb(243, 249, 255);
  padding: 1.4rem 2rem 0.8rem;
  color: rgb(1, 72, 138);
  font-size: 0.8rem;

  div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
      font-size: 1.4rem;
      font-variation-settings: 'wght' 600;
    }
  }
`;

export default function IncompleteResults({ dateTo }) {
  return (
    <Container>
      <div>
        <p>Info</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <p>
        The result history for this game is incomplete. We currently have
        results from {formatISODate(dateTo)} on.
      </p>
      <p>
        If you can help populate earlier results{' '}
        <a href="https://github.com/scoticus/lotto-stats/issues">
          please get in touch
        </a>
      </p>
    </Container>
  );
}
