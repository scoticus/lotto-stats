addEventListener('scheduled', (event) => {
  event.waitUntil(handleSchedule(event.scheduledTime));
});

async function handleSchedule() {
  const url = ENDPOINT;
  const authBody = {
    auth: TRIGGER_SECRET,
  };

  let trigger = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(authBody),
  });
  console.log(trigger.status);
  return new Response('Get lotto result', { status: 200 });
}
