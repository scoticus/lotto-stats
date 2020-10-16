import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import GameResultsTable from '../components/gameResultsTable';

export default function SetForLife({ data }) {
  const setForLifeResults = data.allSetForLife.nodes;
  return (
    <>
      <SEO pageTitle="Set For Life" />
      <Layout>
        <h1>SetForLife Results</h1>
        <GameResultsTable results={setForLifeResults} />
      </Layout>
    </>
  );
}

export const query = graphql`
  {
    allSetForLife(sort: { order: DESC, fields: drawNumber }) {
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
