import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const StyledTable = styled.div`
  width: 100%;
  max-width: 600px;
  font-size: 0.8rem;
`;

export const StyledFakeTableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  font-variation-settings: 'wght' 500;
  font-size: 0.9rem;

  > div {
    width: 50%;

    > div {
      width: 30%;
    }
  }

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .draw {
      width: 20%;
    }
    .deets {
      width: 40%;
    }
    .tech {
      width: 32%;
    }
    > div {
      width: 36%;
    }
  }

  .right {
    padding-left: 6px;
  }

  @media (max-width: 600px) {
    justify-content: center;
    .left {
      width: 300px;
    }
    .right {
      display: none;
    }
  }
`;

export const StyledRow = styled.div`
  height: 52px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .left {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;

    .draw {
      width: 20%;
      font-variation-settings: 'wght' 500;
      font-size: 0.9rem;
    }
    .deets {
      width: 40%;
    }
    .tech {
      width: 32%;
    }
  }
  .right {
    width: 50%;
  }

  @media (max-width: 600px) {
    height: 98px;
    flex-direction: column;
    justify-content: space-evenly;

    .left,
    .right {
      width: 300px;
    }

    .right {
      text-align: center;
    }
  }
`;

export const Ball = styled.span`
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

export const Bonus = styled(Ball)`
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
