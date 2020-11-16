# Lotto Stats 🎲

Originally created to try out serverless functions, this project scrapes draw game results from the UK National Lottery website.

It collects results for all four draw-based games:

- Lotto (Wed, Sat)
- Thunderball (Tue, Wed, Fri, Sat)
- EuroMillions (Tue, Fri)
- Set For Life (Mon, Thu)

## How It Works

The process begins with a cron scheduled Cloudflare worker that triggers a serverless function hosted on Netlify. The Netlify function makes a basic GET request and returns the page HTML as text. The data is extracted using Cheerio and shaped before being written to FaunaDB.

Every morning a second cron scheduled Cloudflare worker triggers a rebuild of the Gatsby client using the latest game results.

Further information on the triggers can be found in the [triggers directory](https://github.com/scoticus/lotto-stats/tree/main/triggers)

## Tooling

| Service Provider   | Purpose                                                          |
| :----------------- | :--------------------------------------------------------------- |
| Cloudflare Workers | Scheduling and running the serverless trigger functions          |
| Netlify            | Hosting serverless scraping functions as well as the Gatsby site |
| FaunaDB            | Storing game data                                                |
| GatsbyJS           | Web client to view game results                                  |

You will need accounts with Cloudflare, Netlify, and Fauna.

## Getting Started

_For simplicity I only cover how to set things up to gather the Lotto game results. If you would like to collect results for all four games then just run through the following steps again for the other games. As each game has slightly different structure for scraping, I've put functions for all of the games into the `functions` directory._

We need to set things up on FaunaDB, Netlify, and Cloudflare to be able to begin collecting results. We'll use the web GUI of each service.

### 1. Setup FaunaDB

From the Fauna dashboard, create a new empty database (name doesn't matter) and inside it create a new collection with the name `lotto-results`.

#### 1.1 Create initial values

The National Lottery provides game results on individual draw web pages that are located at URLs that use the draw number. For example, the result of lotto game 1234 can be found at the URL `https://www.national-lottery.co.uk/results/lotto/draw-history/draw-details/1234`.

For the scraping functions to be able to reach the results page of the latest draw we need to provide the draw number. Draw numbers increase sequentially so we can simply check the draw number of the previous result, add 1, and then provide it to the function.

Even before we have generated any data we need an initial draw number value in the database that we can provide as the initial value to the scraper. To do this, add a new document to the `lotto-results` collection with the following data `{ drawNumber: 1234 }`. Substitute in a suitable initial draw number for the game (the National Lottery website can be used to find draw numbers of recent game draws).

#### 1.2 Create drawNumber indexes

FaunaDB uses indexes to query data. Each time our scraping functions run, they query Fauna to find the draw number of the previous set of results. We need to create an index to allow this to happen.

It isn't possible to create the index we need using the FaunaDB web GUI so we will need to use the Fauna Shell and create the indexes using Fauna's query langauge (FQL).

Fauna provides [a useful page](https://docs.fauna.com/fauna/current/start/fql_for_sql_users) in their docs to convert SQL to FQL.

Navigate to the Fauna Shell (sidebar of web console) and enter the following FQL statement. This will create an index called `last_lotto_draw_no` that returns a list of drawNumbers sorted in descending order. We can then pick the first one on the list and know that it is the highest value.

```
CreateIndex({
  name: "last_lotto_draw_no",
  source: Collection("lotto-results"),
  values: [
    {field: ["data", "drawNumber"], reverse: true},
  ],
})
```

#### 1.3 Create data indexes for Gatsby

We also need to create an index for Gatsby to be able to query data during build. For simplicity we will just create an index that returns all of the results of that game.

This can be done using the GUI. Create a new index with the source collection of the game you want to query and the name `all_lotto`.

Example: `source collection: lotto-results, index name: all_lotto`

You will end up with two indexes for each draw, one to get the last result draw number and one to get all the results for the game.

#### 1.4 Create API key

To finish off setting up Fauna we need to create an API key that our functions and Gatsby can use to access Fauna. This is done from the Security area of the FaunaDB webapp.

Create a new key which can access the database you created at the start of step 1. Give the key the role of Server. Take a note of your key when shown as it isn't possible to see keys again after they have been created.

### 2. Setup Netlify

Now we need to get the functions up and running on Netlify. There is nothing special to do here. Set up the site as you would any other on Netlify and let them work their magic.

Once the site is established and you can access the build settings on Netlify we need to add some environment variables

```
FAUNADB_SECRET: <THE API KEY YOU CREATED IN THE FAUNA WEB CONSOLE>
TRIGGER_SECRET: <PASSPHRASE TO PROTECT FUNCTION ENDPOINT>
```

The build may fail the first time because there is no data available for it to build with, but that'll change soon.

### 3. Setup Cloudflare

Finally we need to get Cloudflare sorted to finish off getting everything up and running.

#### 3.1 Setup scraping worker

Navigate to the workers area of the Cloudflare console and create a new worker. Clear out the boilerplate and replace with the contents of [`/triggers/get-lotto-results-trigger.js`](https://github.com/scoticus/lotto-stats/tree/main/triggers/get-lotto-results-trigger.js). Then click save at the bottom of the editor.

##### 3.1.1 Add cron timings

Now exit the quick editor using the left arrow button in the top left of the window. This will take you to the worker overview. Select the triggers tab and add a new cron trigger.

The Lotto is drawn on Wednesday and Saturday evenings. To give time for the site to update we will run the scraper at 2am the following mornings (Thursday and Sunday).

Enter the following cron expression and save

```
0 2 * * THU,SUN
```

##### 3.1.2 Add environment variables

Next we need to add our environment variables. This is done in the settings tab.

```
ENDPOINT: <THE SCRAPING FUNCTION ENDPOINT FROM NETLIFY>
TRIGGER_SECRET: <THE SAME PASSPHRASE YOU USED ON NETLIFY>
```

#### 3.2 Setup rebuild worker

We want the frontend Gatsby site to rebuild each day so that the newly scraped results appear. Netlify offers build hooks that can be used to trigger rebuilds.

From your site overview on the Netlify web console, navigate to `Site settings > Build & deploy > Build hooks`. Select 'Add build hook' and copy the URL provided.

Now create another worker on Cloudflare, this time replacing the boilerplate with the contents of [`/triggers/rebuild-lottostats-site.js`](https://github.com/scoticus/lotto-stats/blob/main/triggers/rebuild-lottostats-site.js).

This trigger also needs cron timings and enviromnent variables. The values for these should be

```
0 6 * * TUE-SUN
# No draws take place on Sundays so there is no need to rebuild on Mondays.

ENDPOINT: <THE BUILD HOOK ENDPOINT FROM NETLIFY>
```

That should now be everything up and running. If you want to test the function works then this can be done from the "Schedule" tab in the quick editor.

## Gotchas

- Cron timings must be entered in a specific format for them to work. [CronTab](https://crontab.guru) is a useful site to make sure your cron format is correct.
- Only three cron triggers can be added to a worker that is on the free plan.

## A note on web scraping

This project scrapes data from the National Lottery website. Depending on your stance you may or may not be okay with that. I've deliberately made the scraping action as simple (a basic GET request) and infrequent as possible (once or twice a day).

If you use the functions from this repo, keep in mind that you will be hitting someone else's site and consuming their resources.
