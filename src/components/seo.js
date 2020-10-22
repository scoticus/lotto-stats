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
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%221em%22 font-size=%2281%22>🎲</text></svg>"
      />
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
