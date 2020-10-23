import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Heading from '../components/Heading';
import GameResultsTable from '../components/gameResultsTable';

export default function Lotto({ data }) {
  const lottoResults = data.allLotto.nodes;
  return (
    <>
      <SEO pageTitle="Lotto" />
      <Layout>
        <Heading label="Lotto Results" />
        <GameResultsTable results={lottoResults} game="lotto" />
      </Layout>
    </>
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
