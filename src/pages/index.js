import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import formatISODate from '../utils/formatISODate';
import formatJackpot from '../utils/formatJackpot';

export default function Home({ data }) {
  const lottoResult = data.allLotto.nodes[0];
  const thunderballResult = data.allThunderball.nodes[0];
  const euromillionsResult = data.allEuromillions.nodes[0];
  const setForLifeResult = data.allSetForLife.nodes[0];
  const buildDate = data.currentBuildDate.currentDate;
  return (
    <Layout buildDate={buildDate}>
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
  );
}

function TableGameRow({ gameResult }) {
  return (
    <tr>
      <td>{gameResult.internal.type}</td>
      <td>{gameResult.drawNumber}</td>
      <td>{formatISODate(gameResult.date)}</td>
      <td>{formatJackpot(gameResult.jackpot)}</td>
      <td>
        <ul>
          {gameResult.numbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ul>
      </td>
      <td>
        {gameResult.bonusNumber || (
          <ul>
            {gameResult.bonusNumbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        )}
      </td>
    </tr>
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
    currentBuildDate {
      currentDate
    }
  }
`;
