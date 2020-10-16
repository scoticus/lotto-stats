import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ pageTitle }) {
  const { site } = useStaticQuery(query);
  const { defaultTitle, titleTemplate, description } = site.siteMetadata;
  const seo = { title: pageTitle, description };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
    >
      <meta name="description" content={seo.description} />
    </Helmet>
  );
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        description
      }
    }
  }
`;
