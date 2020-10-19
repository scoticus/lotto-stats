addEventListener('scheduled', (event) => {
  event.waitUntil(handleSchedule(event.scheduledTime));
});

async function handleSchedule() {
  const url = ENDPOINT;
  let trigger = await fetch(url, {
    method: 'POST',
  });
  console.log(trigger.status);
  return new Response('Rebuild LottoStats site', { status: 200 });
}
