import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Heading from '../components/Heading';
import LatestGameResult from '../components/LatestGameResult';

export default function Home({ data }) {
  const lottoResult = data.allLotto.nodes[0];
  const thunderballResult = data.allThunderball.nodes[0];
  const euromillionsResult = data.allEuromillions.nodes[0];
  const setForLifeResult = data.allSetForLife.nodes[0];

  return (
    <>
      <SEO />
      <Layout>
        <Heading label="Latest Results" />
        <LatestGameResult gameResult={lottoResult} />
        <LatestGameResult gameResult={thunderballResult} />
        <LatestGameResult gameResult={euromillionsResult} />
        <LatestGameResult gameResult={setForLifeResult} />
      </Layout>
    </>
  );
}

export const query = graphql`
  {
    allThunderball(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumber
      }
    }
    allLotto(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumber
      }
    }
    allSetForLife(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumber
      }
    }
    allEuromillions(sort: { order: DESC, fields: drawNumber }, limit: 1) {
      nodes {
        internal {
          type
        }
        drawNumber
        date
        jackpot
        numbers
        bonusNumbers
      }
    }
  }
`;
