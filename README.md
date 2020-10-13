# Lotto Stats

## Motivation

Originally created to try out serverless functions, this project aims to scrape game results from the UK National Lottery website.

It scrapes results for all four draw-based games:

- Lotto (Wed, Sat)
- Thunderball (Tue, Wed, Fri, Sat)
- EuroMillions (Tue, Fri)
- Set For Life (Mon, Thu)

_At some point I'll add a frontend into the mix so the results and game statistics can be viewed._

## How It Works

This project uses Cloudflare Workers to trigger Netlify Functions that scrape the National Lottery website, parse and shape the results, and store them on FaunaDB.

Further information on the triggers can be found in the [triggers directory](https://github.com/scoticus/lotto-stats/triggers)

---

## Temp Notes

### FaunaDB Indexes

```
CreateIndex({
  name: "last_lotto_draw_no",
  source: Collection("lotto-results"),
  values: [
    {field: ["data", "drawNumber"], reverse: true},
  ],
})
```
