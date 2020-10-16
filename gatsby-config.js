module.exports = {
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
