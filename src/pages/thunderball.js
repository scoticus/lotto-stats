import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Heading from '../components/Heading';
import GameResultsTable from '../components/ResultsTable';

export default function Thunderball({ data }) {
  const thunderballResults = data.allThunderball.nodes;
  return (
    <>
      <SEO pageTitle="Thunderball" />
      <Layout>
        <Heading label="Thunderball Results" />
        <GameResultsTable results={thunderballResults} game="thunderball" />
      </Layout>
    </>
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
