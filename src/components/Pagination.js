import React from 'react';
import styled from '@emotion/styled';

const ButtonBox = styled.div`
  margin: 1rem 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    margin: 0 1rem;
    font-size: 0.8rem;
  }
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  padding: 0;
  color: rgba(0, 0, 0, 0.8);

  &:hover:not(:disabled) {
    background-color: #dcdcdc;
    cursor: pointer;
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.4);
  }
`;

export default function Pagination({
  tablePage,
  setTablePage,
  maxRows,
  length,
}) {
  const maxPages = Math.floor(length / maxRows + 1);

  function handlePageChange(direction) {
    if (direction === 'down' && tablePage !== 0) {
      setTablePage(tablePage - 1);
    }
    if (direction === 'up' && tablePage < maxPages - 1) {
      setTablePage(tablePage + 1);
    }
  }

  return (
    <ButtonBox>
      <IconButton
        type="button"
        onClick={() => handlePageChange('down')}
        disabled={tablePage === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </IconButton>
      <p>
        {tablePage * maxRows} -{' '}
        {tablePage * maxRows + maxRows - 1 < length
          ? tablePage * maxRows + maxRows - 1
          : length}{' '}
        of {length}
      </p>
      <div>
        <IconButton
          type="button"
          onClick={() => handlePageChange('up')}
          disabled={tablePage === maxPages - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </IconButton>
      </div>
    </ButtonBox>
  );
}
