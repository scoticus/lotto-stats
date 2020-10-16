import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import GameResultsTable from '../components/gameResultsTable';

export default function EuroMillions({ data }) {
  const euromillionsResults = data.allEuromillions.nodes;
  return (
    <Layout>
      <h1>EuroMillions Results</h1>
      <GameResultsTable results={euromillionsResults} />
    </Layout>
  );
}

export const query = graphql`
  {
    allEuromillions(sort: { order: DESC, fields: drawNumber }) {
      nodes {
        drawNumber
        date
        jackpot
        numbers
        bonusNumbers
        id
        machine
        ballSet
      }
    }
  }
`;
