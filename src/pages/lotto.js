import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import GameResultsTable from '../components/gameResultsTable';

export default function Lotto({ data }) {
  const lottoResults = data.allLotto.nodes;
  return (
    <Layout>
      <h1>Lotto Results</h1>
      <GameResultsTable results={lottoResults} />
    </Layout>
  );
}

export const query = graphql`
  {
    allLotto(sort: { order: DESC, fields: drawNumber }) {
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
