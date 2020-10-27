import React, { useState } from 'react';

import IncompleteResults from './IncompleteResults';
import Pagination from './Pagination';

import formatISODate from '../../utils/formatISODate';
import formatJackpot from '../../utils/formatJackpot';

import {
  StyledTable,
  StyledFakeTableHead,
  StyledRow,
  Ball,
  Bonus,
} from './styles';

export default function GameResultsTable({ results, game }) {
  const [tablePage, setTablePage] = useState(0);

  const maxRows = 25;
  const loRow = tablePage * maxRows;
  const hiRow = tablePage * maxRows + maxRows - 1;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <IncompleteResults dateTo={results[results.length - 1].date} />
      <Pagination
        tablePage={tablePage}
        maxRows={maxRows}
        length={results.length}
        setTablePage={setTablePage}
      />

      <StyledTable>
        <StyledFakeTableHead>
          <div className="left">
            <div className="draw">Draw</div>
            <div className="deets">
              <div>Date/</div>
              <div>Jackpot</div>
            </div>
            <div className="tech">
              <div>Machine/</div>
              <div>Ball Set</div>
            </div>
          </div>
          <div className="right">Numbers</div>
        </StyledFakeTableHead>
        {results.map(
          (result, i) =>
            i >= loRow &&
            i <= hiRow && (
              <StyledRow key={result.id}>
                <div className="left">
                  <div className="draw">{result.drawNumber}</div>
                  <div className="deets">
                    <div>{formatISODate(result.date)}</div>
                    <div>
                      {
                        // Override SetForLife jackpot string as it's obnoxiously long
                        game === 'setForLife'
                          ? '£10,000 / mo'
                          : formatJackpot(result.jackpot)
                      }
                    </div>
                  </div>
                  <div className="tech">
                    <div>{result.machine}</div>
                    <div>Set {result.ballSet}</div>
                  </div>
                </div>
                <div className="right">
                  {result.numbers.map((number) => (
                    <Ball key={number} game={game}>
                      {number}
                    </Ball>
                  ))}
                  {
                    // EuroMillions uses a "bonusNumbers" key instead of just "bonusNumber"
                    'bonusNumber' in result ? (
                      <Bonus className="bonus" game={game}>
                        {result.bonusNumber}
                      </Bonus>
                    ) : (
                      result.bonusNumbers.map((bonus) => (
                        <Bonus className="bonus" game={game}>
                          {bonus}
                        </Bonus>
                      ))
                    )
                  }
                </div>
              </StyledRow>
            )
        )}
      </StyledTable>

      <Pagination
        tablePage={tablePage}
        maxRows={maxRows}
        length={results.length}
        setTablePage={setTablePage}
      />
    </div>
  );
}
