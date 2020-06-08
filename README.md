### Start Services

```bash
$ yarn start
```

### Run Tests

```bash
$ yarn test
```

### Files

The routes defined in `./routes.json` are controlling the bahavior of the express app
in `index.js`.

If the `routes.json` is changed the trigger `/config/reload` has to be called to reload
the routes from the config file.

### Urls

- `/shelly1/settings` - url redirect to `shelly1.js` app
- `/shelly2/settings` - url redirect to `shelly2.js` app
- `/config/reload` - trigger to reload routes from the config file