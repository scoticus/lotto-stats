import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import TableGameRow from '../components/TableGameRow';

export default function Home({ data }) {
  const lottoResult = data.allLotto.nodes[0];
  const thunderballResult = data.allThunderball.nodes[0];
  const euromillionsResult = data.allEuromillions.nodes[0];
  const setForLifeResult = data.allSetForLife.nodes[0];

  return (
    <>
      <SEO />
      <Layout>
        <h1>Latest Results</h1>
        <TableGameRow gameResult={lottoResult} />
        <TableGameRow gameResult={thunderballResult} />
        <TableGameRow gameResult={euromillionsResult} />
        <TableGameRow gameResult={setForLifeResult} />
      </Layout>
    </>
  );
}

export const query = graphql`
  {
    allThunderball(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumber
      }
    }
    allLotto(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumber
      }
    }
    allSetForLife(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumber
      }
    }
    allEuromillions(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumbers
      }
    }
  }
`;
