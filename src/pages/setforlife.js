import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Heading from '../components/Heading';
import GameResultsTable from '../components/gameResultsTable';

export default function SetForLife({ data }) {
  const setForLifeResults = data.allSetForLife.nodes;
  return (
    <>
      <SEO pageTitle="Set For Life" />
      <Layout>
        <Heading label="SetForLife Results" />
        <GameResultsTable results={setForLifeResults} game="setForLife" />
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
