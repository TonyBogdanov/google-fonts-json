This is a simple repository utilizing the power of [GitHub Actions](https://github.com/features/actions)
and [BrowserStack](https://www.browserstack.com) to regularly (once a day) scrape
[Google Fonts](https://fonts.google.com) and create a JSON file containing font definitions
**along with preview texts** - the one feature lacking in the
[Google Fonts API](https://developers.google.com/fonts).

This can be useful when you need to create a font picker and need preview texts that can properly showcase each
font's features & custom glyphs.

The process generates a file called `fonts.json` available in the `gh-pages` branch and online at:
https://tonybogdanov.github.io/google-fonts-json/fonts.json

The structure of the file is very similar to the one returned by the API, except each entry has the name of the
font as key and an additional property called `preview`, an array of available preview texts for the font.
