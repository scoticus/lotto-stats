import React from 'react';

import formatISODate from '../utils/formatISODate';

export default function GameResultsTable({ results }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Draw</th>
          <th>Date</th>
          <th>Jackpot</th>
          <th>Ball Set</th>
          <th>Machine</th>
          <th>Numbers</th>
          <th>Bonus</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id}>
            <td>{result.drawNumber}</td>
            <td>{formatISODate(result.date)}</td>
            <td>{result.jackpot}</td>
            <td>{result.ballSet}</td>
            <td>{result.machine}</td>
            <td>
              {result.numbers.map((number) => (
                <span id={number} style={{ padding: '0 5px' }}>
                  {number}
                </span>
              ))}
            </td>
            <td>{result.bonusNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}