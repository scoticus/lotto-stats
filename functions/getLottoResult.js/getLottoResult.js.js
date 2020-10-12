// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  const reqBody = JSON.parse(event.body);
  if (reqBody.auth !== process.env.TRIGGER_SECRET) {
    console.log('Incorrect auth');
    return {
      statusCode: 404,
    };
  }
  console.log('Correct auth');
};
