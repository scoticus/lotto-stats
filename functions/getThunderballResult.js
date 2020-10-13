const faunadb = require('faunadb');
const q = faunadb.query;
const fetch = require('node-fetch');
const cheerio = require('cheerio');

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
    q.Get(q.Match(q.Index('last_thunderball_draw_no')))
  );
  const lastDrawNo = getLastDraw.data.drawNumber;
  const newDrawNo = parseInt(lastDrawNo) + 1;
  const queryUrl =
    'https://www.national-lottery.co.uk/results/thunderball/draw-history/draw-details/' +
    newDrawNo;
  console.log({ queryUrl });

  // Fetch new result page content
  let pageContent = await fetch(queryUrl).catch((error) =>
    console.error(error)
  );
  const latestResultsPage = await pageContent.text();

  // Parse page content and shape data
  const $ = cheerio.load(latestResultsPage);

  function findSimpleData(selector) {
    return $(selector).text().trim().split(' ').pop();
  }

  const drawStr = findSimpleData('#header_draw_number');
  const jackpotStr = findSimpleData('#game_header_intro');
  const ballSetStr = findSimpleData('#header_ball_set');

  const drawNumber = parseFloat(drawStr);
  const jackpot = parseFloat(jackpotStr.slice(1).replace(/,/g, ''));
  const ballSet = ballSetStr;

  const machine = $('#header_draw_machine')
    .text()
    .trim()
    .split(':')
    .pop()
    .trim();

  const dateStr = $('#section_header').children('h1').text().trim().slice(4);
  const dateObj = new Date(`${dateStr} UTC`);
  const date = dateObj.toISOString();

  const numberList = $('.draw_numbers_list')
    .children('li')
    .map(function (i, el) {
      return $(this).text();
    })
    .get()
    .join(' ');
  const splitNumbers = numberList.split(' ');
  const numbers = [];
  for (i = 0; i < 5; i++) {
    numbers.push(parseFloat(splitNumbers[i]));
  }
  const bonusNumber = parseFloat(splitNumbers.pop());

  const newResult = {
    drawNumber,
    date,
    jackpot,
    machine,
    ballSet,
    numbers,
    bonusNumber,
  };

  // Write new results to DB
  await client.query(
    q.Create(q.Collection('thunderball-results'), {
      data: newResult,
    })
  );
};
