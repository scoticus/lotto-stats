import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Heading from '../components/Heading';
import GameResultsTable from '../components/gameResultsTable';

export default function EuroMillions({ data }) {
  const euromillionsResults = data.allEuromillions.nodes;
  return (
    <>
      <SEO pageTitle="EuroMillions" />
      <Layout>
        <Heading label="EuroMillions Results" />
        <GameResultsTable results={euromillionsResults} game="euromillions" />
      </Layout>
    </>
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
