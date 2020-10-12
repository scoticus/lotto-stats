# Scheduled Trigger Scripts

The scripts in this folder are triggers for the scraping functions on Netlify. We want to be able to schedule the scraping scripts to run at a particular time but we can't do with Netlify by itself.

Instead we can use Cloudflare as it offers cron scheduling for workers.

## Setup

As the scripts are so basic it is easiest to just use the Cloudflare web GUI to get them running.

1. Create a new worker on the Cloudflare website
2. Enter the quick editor and paste in the script
3. Hit "Save and deploy" button
4. Return to the worker settings page and enter the required environment variables ([see below](##environment-variables))
5. Go to the worker triggers page and enter the cron triggers ([see below](##cron-timings))

## Testing

Workers that use scheduled triggers can be tested while in the quick editor by going to the "Schedule" tab and clicking the "Trigger scheduled event" button.

## Environment Variables

Scripts require two envs to run

| Name           | Type           | Description                                                |
| -------------- | -------------- | ---------------------------------------------------------- |
| TRIGGER_SECRET | string: secret | Auth secret to prevent anyone else triggering the function |
| ENDPOINT       | string: url    | The target endpoint (available from Netlify)               |

## Cron Timings

| Draw  | Draw Time          | Scrape Time   | Cron           |
| ----- | ------------------ | ------------- | -------------- |
| Lotto | Wed 8pm (UK local) | Thu 2am (UTC) | 0 02 \* \* THU |
| Lotto | Sat 8pm (UK local) | Sun 2am (UTC) | 0 02 \* \* SUN |

_I decided to trigger the scrapers a few hours after the draws take place to give time for the National Lottery website to update. You could almost certainly scrape closer to the draw but may want to add a check to handle any case where the page hasn't yet been updated._
