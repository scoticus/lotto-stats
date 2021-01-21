module.exports = {
  siteMetadata: {
    title: 'Lotto Stats',
    titleTemplate: '%s | Lotto Stats',
    description:
      'Get results for all National Lottery draw based games including Lotto, Thunderball, EuroMillions, and Set For Life.',
  },
  plugins: [
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: `fnAD4NrLNXACB1nA9QbusJV0UnT5zgsfN4H74eGr`,
        index: `all_thunderball`,
        type: 'thunderball',
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: `fnAD4NrLNXACB1nA9QbusJV0UnT5zgsfN4H74eGr`,
        index: `all_lotto`,
        type: 'lotto',
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: `fnAD4NrLNXACB1nA9QbusJV0UnT5zgsfN4H74eGr`,
        index: `all_euromillions`,
        type: 'euromillions',
      },
    },
    {
      resolve: `gatsby-source-faunadb`,
      options: {
        secret: `fnAD4NrLNXACB1nA9QbusJV0UnT5zgsfN4H74eGr`,
        index: `all_setforlife`,
        type: 'setForLife',
      },
    },
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true,
        formatting: {
          format: 'DD MMM YYYY',
        },
      },
    },
  ],
};
