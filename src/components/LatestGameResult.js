import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import formatISODate from '../utils/formatISODate';
import formatJackpot from '../utils/formatJackpot';

const ResultContainer = styled.div`
  height: 180px;
  max-width: 600px;
  margin: 2rem auto;
  border-radius: var(--br);
  color: white;
  padding: clamp(6px, 5vw, 20px) clamp(8px, 6vw, 36px);
  box-shadow: 3px 3px 6px 1px rgba(229, 1, 59, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) => variants[props.game]}

  @media (max-width: 380px) {
    flex-direction: row;
  }
`;

const Ball = styled.span`
  height: clamp(32px, 8vw, 46px);
  width: clamp(32px, 8vw, 46px);
  border-radius: 23px;
  background-color: var(--lotto-white);
  font-size: 20px;
  font-size: clamp(14px, 3.6vw, 20px);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 7px;
  margin: 0 clamp(3px, 1vw, 7px);
  color: var(--lotto-red);
  font-weight: 600;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* flex-basis: 380px; */

  div:first-child {
    h2 {
      line-height: 1;
      min-width: 150px;
      font-weight: 800;
      margin: 0;
    }
    p {
      font-weight: 600;
      font-size: 17px;
      margin: 0;
    }
  }
  div:last-child {
    font-size: 14px;
    text-align: right;

    p {
      margin: 0;
    }
  }
  @media (max-width: 380px) {
    align-content: space-between;
    div:last-child {
      text-align: left;
    }
  }
`;

const Balls = styled.div`
  span:first-child {
    margin-left: 0;
  }
  span:last-child {
    margin-right: 0;
  }

  @media (max-width: 380px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

const BonusBall = styled(Ball)`
  border: 3px solid var(--lotto-white);
  color: white;
  ${(props) => variants[props.game]}
`;

const thunderballStyles = css`
  background-color: var(--thunderball-purple);
  box-shadow: 3px 3px 6px 1px rgba(188, 19, 173, 0.4);
  .ball {
    color: var(--thunderball-purple);
  }
`;

const lottoStyles = css`
  background-color: var(--lotto-red);
  box-shadow: 3px 3px 6px 1px rgba(229, 1, 59, 0.4);
  .ball {
    color: var(--lotto-red);
  }
`;

const setForLifeStyles = css`
  background-color: var(--setforlife-blue);
  box-shadow: 3px 3px 6px 1px rgba(0, 214, 218, 0.4);
  color: var(--text-color);
  .ball {
    color: var(--setforlife-blue);
    color: var(--text-color);
  }
`;

const euromillionsStyles = css`
  background-color: var(--euromillions-yellow);
  box-shadow: 3px 3px 6px 1px rgba(248, 180, 0, 0.4);
  color: var(--text-color);
  .ball {
    color: var(--euromillions-yellow);
    color: var(--text-color);
  }
`;

const variants = {
  lotto: lottoStyles,
  thunderball: thunderballStyles,
  setForLife: setForLifeStyles,
  euromillions: euromillionsStyles,
};

function capFirstLetter(string) {
  const firstLetter = string.slice(0, 1);
  return firstLetter.toUpperCase() + string.slice(1);
}

const TitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export default function LatestGameResult({ gameResult }) {
  return (
    <ResultContainer game={gameResult.internal.type}>
      <Meta>
        <div>
          <TitleLink to={gameResult.internal.type.toLowerCase()}>
            <h2>{capFirstLetter(gameResult.internal.type)}</h2>
          </TitleLink>
          <p>{gameResult.drawNumber}</p>
        </div>
        <div>
          <p>{formatISODate(gameResult.date)}</p>
          <p>
            {gameResult.internal.type === 'setForLife'
              ? '£10,000 / mo'
              : formatJackpot(gameResult.jackpot)}
          </p>
        </div>
      </Meta>
      <Balls>
        {gameResult.numbers.map((number) => (
          <Ball key={number} className="ball">
            {number}
          </Ball>
        ))}
        {gameResult.bonusNumber && (
          <BonusBall game={gameResult.internal.type}>
            {gameResult.bonusNumber}
          </BonusBall>
        )}
        {gameResult.bonusNumbers &&
          gameResult.bonusNumbers.map((number) => (
            <BonusBall key={number} game={gameResult.internal.type}>
              {number}
            </BonusBall>
          ))}
      </Balls>
    </ResultContainer>
  );
}
