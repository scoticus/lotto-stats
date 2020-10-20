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
        <h1>Welcome to LottoStats</h1>
        <h2>Latest Results</h2>
        <table>
          <thead>
            <tr>
              <td>Game</td>
              <td>Draw</td>
              <td>Date</td>
              <td>Jackpot</td>
              <td>Numbers</td>
              <td>Bonus</td>
              <td>View all</td>
            </tr>
          </thead>
          <tbody>
            <TableGameRow gameResult={lottoResult} />
            <TableGameRow gameResult={thunderballResult} />
            <TableGameRow gameResult={euromillionsResult} />
            <TableGameRow gameResult={setForLifeResult} />
          </tbody>
        </table>
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
