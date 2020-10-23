import React, { useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import IncompleteResults from './IncompleteResults';
import Pagination from './Pagination';

import formatISODate from '../utils/formatISODate';
import formatJackpot from '../utils/formatJackpot';

const StyledTable = styled.table`
  width: 100%;
  max-width: 600px;
  font-size: 0.8rem;

  th {
    text-align: start;
    font-variation-settings: 'wght' 500;
    font-size: 0.9rem;
  }
  th:first-child {
    padding-left: 12px;
  }
  th:last-child {
    padding-right: 12px;
  }
`;

const StyledTableRow = styled.tr`
  height: 52px;
  border-bottom: 1px solid #dcdcdc;

  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.06);
  }

  td:first-child {
    padding-left: 12px;
    font-variation-settings: 'wght' 500;
    font-size: 0.9rem;
  }
  td:last-child {
    width: 50%;
    padding-right: 12px;
  }
`;

const Ball = styled.span`
  margin: 0 4px;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  border: 2px solid;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 0.9rem;
  font-variation-settings: 'wght' 600;
  ${({ game }) => variants[game]}
`;

const Bonus = styled(Ball)`
  ${(props) => variants[props.game]}
`;

const lottoStyles = css`
  border-color: var(--lotto-red);
  color: var(--lotto-red);
  &.bonus {
    background-color: var(--lotto-red);
    color: white;
  }
`;

const thunderballStyles = css`
  border-color: var(--thunderball-purple);
  color: var(--thunderball-purple);
  &.bonus {
    background-color: var(--thunderball-purple);
    color: white;
  }
`;

const euromillionsStyles = css`
  border-color: var(--euromillions-yellow);
  color: var(--text-color);
  &.bonus {
    background-color: var(--euromillions-yellow);
    color: var(--text-color);
  }
`;

const setForLifeStyles = css`
  border-color: var(--setforlife-blue);
  color: var(--text-color);
  &.bonus {
    background-color: var(--setforlife-blue);
    color: var(--text-color);
  }
`;

const variants = {
  lotto: lottoStyles,
  thunderball: thunderballStyles,
  setForLife: setForLifeStyles,
  euromillions: euromillionsStyles,
};

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
        <thead>
          <StyledTableRow>
            <th>Draw</th>
            <th>
              <div>Date/</div>
              <div>Jackpot</div>
            </th>
            <th>
              <div>Machine/</div>
              <div>Ball Set</div>
            </th>
            <th>Numbers</th>
          </StyledTableRow>
        </thead>
        <tbody>
          {results.map(
            (result, i) =>
              i >= loRow &&
              i <= hiRow && (
                <StyledTableRow key={result.id}>
                  <td>{result.drawNumber}</td>
                  <td>
                    <div>{formatISODate(result.date)}</div>
                    <div>
                      {
                        // Override SetForLife jackpot string as it's obnoxiously long
                        game === 'setForLife'
                          ? '£10,000 / mo'
                          : formatJackpot(result.jackpot)
                      }
                    </div>
                  </td>
                  <td>
                    <div>{result.machine}</div>
                    <div>Set {result.ballSet}</div>
                  </td>
                  <td>
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
                  </td>
                </StyledTableRow>
              )
          )}
        </tbody>
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
