const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  keepAlive: false,
});

exports.handler = async (event, context) => {
  // Check request includes correct auth secret
  const reqBody = JSON.parse(event.body);
  if (reqBody.auth !== process.env.TRIGGER_SECRET) {
    console.log('Incorrect auth');
    return {
      statusCode: 404,
    };
  }
  console.log('Correct auth');

  // Get the previous draw number from DB
  const getLastDraw = await client.query(
    q.Get(q.Match(q.Index('last_lotto_draw_no')))
  );
  const lastDrawNo = getLastDraw.data.drawNumber;
  const newDrawNo = parseInt(lastDrawNo) + 1;
  const queryUrl =
    'https://www.national-lottery.co.uk/results/lotto/draw-history/draw-details/' +
    newDrawNo;
  console.log({ queryUrl });
};
