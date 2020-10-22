import React from 'react';
import styled from '@emotion/styled';

export const FancyHeading = styled.h1`
  max-width: 600px;
  margin: 2vw auto;
  border-bottom: 1px solid #b6c1cc;
  font-weight: 400;
  font-size: 1.6rem;
`;

export default function Heading({ label }) {
  return <FancyHeading>{label}</FancyHeading>;
}
