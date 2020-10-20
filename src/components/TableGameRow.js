import React from 'react';
import { Link } from 'gatsby';

import formatISODate from '../utils/formatISODate';
import formatJackpot from '../utils/formatJackpot';

export default function TableGameRow({ gameResult }) {
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
      <td>
        <Link to={`/${gameResult.internal.type.toLowerCase()}`}>
          View all {gameResult.internal.type} results
        </Link>
      </td>
    </tr>
  );
}
