import React, { useState } from 'react';

import IncompleteResults from './IncompleteResults';
import Pagination from './Pagination';

import formatISODate from '../utils/formatISODate';
import formatJackpot from '../utils/formatJackpot';

export default function GameResultsTable({ results }) {
  const [tablePage, setTablePage] = useState(0);

  const maxRows = 25;
  const loRow = tablePage * maxRows;
  const hiRow = tablePage * maxRows + maxRows - 1;

  return (
    // TODO: Styles below are temporary
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <IncompleteResults dateTo={results[results.length - 1].date} />
      <Pagination
        tablePage={tablePage}
        maxRows={maxRows}
        length={results.length}
        setTablePage={setTablePage}
      />

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

      <Pagination
        tablePage={tablePage}
        maxRows={maxRows}
        length={results.length}
        setTablePage={setTablePage}
      />
    </div>
  );
}
