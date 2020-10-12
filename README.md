# lotto-stats

---

## FaunaDB Indexes

```
CreateIndex({
  name: "last_lotto_draw_no",
  source: Collection("lotto-results"),
  values: [
    {field: ["data", "drawNumber"], reverse: true},
  ],
})
```
