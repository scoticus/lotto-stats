import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import GameResultsTable from '../../components/gameResultsTable';

export default function Thunderball({ data }) {
  const thunderballResults = data.allThunderball.nodes;
  return (
    <Layout>
      <h1>Thunderball Results</h1>
      <GameResultsTable results={thunderballResults} />
    </Layout>
  );
}

export const query = graphql`
  {
    allThunderball(sort: { order: DESC, fields: drawNumber }) {
      nodes {
        drawNumber
        date
        jackpot
        numbers
        bonusNumber
        id
        machine
        ballSet
      }
    }
  }
`;
