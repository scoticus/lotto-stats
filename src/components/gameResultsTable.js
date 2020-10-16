import React, { useState } from 'react';

import formatISODate from '../utils/formatISODate';
import formatJackpot from '../utils/formatJackpot';

export default function GameResultsTable({ results }) {
  const [tablePage, setTablePage] = useState(0);

  const maxRows = 25;
  const maxPages = Math.floor(results.length / maxRows + 1);
  const loRow = tablePage * maxRows;
  const hiRow = tablePage * maxRows + maxRows - 1;

  function handlePageChange(direction) {
    if (direction === 'down' && tablePage !== 0) {
      setTablePage(tablePage - 1);
    }
    if (direction === 'up' && tablePage < maxPages - 1) {
      setTablePage(tablePage + 1);
    }
  }

  return (
    <div>
      <p>There are {results.length} results.</p>
      <p>
        Viewing page {tablePage + 1} of {maxPages}
      </p>
      <p>
        Displaying rows: {tablePage * maxRows} -{' '}
        {tablePage * maxRows + maxRows - 1}
      </p>
      <div>
        <button
          type="button"
          onClick={() => handlePageChange('down')}
          disabled={tablePage === 0}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => handlePageChange('up')}
          disabled={tablePage === maxPages - 1}
        >
          Next
        </button>
      </div>

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
          {results.map(
            (result, i) =>
              i >= loRow &&
              i <= hiRow && (
                <tr key={result.id}>
                  <td>{result.drawNumber}</td>
                  <td>{formatISODate(result.date)}</td>
                  <td>{formatJackpot(result.jackpot)}</td>
                  <td>{result.ballSet}</td>
                  <td>{result.machine}</td>
                  <td>
                    {result.numbers.map((number) => (
                      <span key={number} style={{ padding: '0 5px' }}>
                        {number}
                      </span>
                    ))}
                  </td>
                  <td>{result.bonusNumber}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
