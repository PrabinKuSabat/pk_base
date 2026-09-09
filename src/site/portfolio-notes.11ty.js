const { buildPortfolioNoteIndex } = require("../helpers/portfolioNotes");

module.exports = class PortfolioNotesIndex {
  data() {
    return {
      permalink: "/portfolio-notes.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections, meta }) {
    return JSON.stringify({
      version: 1,
      notes: buildPortfolioNoteIndex(collections.note, meta.siteBaseUrl),
    });
  }
};
