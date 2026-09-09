import { describe, expect, it } from "vitest";
import portfolioNotes from "./portfolioNotes.js";

const { buildPortfolioNoteIndex } = portfolioNotes;

describe("buildPortfolioNoteIndex", () => {
  it("exports only visible published notes with stable absolute links", () => {
    const notes = [
      {
        url: "/notes/kernel/",
        fileSlug: "Kernel",
        data: {
          "dg-publish": true,
          title: "Kernel measurement",
          description: "A measured kernel note.",
          updated: "2026-09-01",
          tags: ["risc-v", "note"],
        },
      },
      { url: "/notes/private/", fileSlug: "Private", data: { "dg-publish": false } },
      { url: "/notes/hidden/", fileSlug: "Hidden", data: { "dg-publish": true, hide: true } },
      { url: "/", fileSlug: "Home", data: { "dg-publish": true } },
    ];

    expect(buildPortfolioNoteIndex(notes, "https://journal.example")).toEqual([
      {
        title: "Kernel measurement",
        href: "https://journal.example/notes/kernel/",
        description: "A measured kernel note.",
        updated: "2026-09-01T00:00:00.000Z",
        tags: ["risc-v"],
      },
    ]);
  });
});
