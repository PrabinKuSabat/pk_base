const DEFAULT_ORIGIN = "https://prabins.vercel.app";

function asIsoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
}

function noteTitle(note) {
  return (
    (typeof note.data?.title === "string" && note.data.title.trim()) ||
    (typeof note.fileSlug === "string" && note.fileSlug.trim()) ||
    note.url
  );
}

function buildPortfolioNoteIndex(notes, siteBaseUrl = DEFAULT_ORIGIN) {
  const origin = siteBaseUrl || DEFAULT_ORIGIN;
  return (notes || [])
    .filter((note) => note?.data?.["dg-publish"] && !note.data.hide && note.url && note.url !== "/")
    .map((note) => ({
      title: noteTitle(note),
      href: new URL(note.url, origin).href,
      description:
        (typeof note.data.description === "string" && note.data.description.trim()) ||
        (typeof note.data.summary === "string" && note.data.summary.trim()) ||
        undefined,
      updated: asIsoDate(note.data.updated),
      tags: Array.isArray(note.data.tags)
        ? note.data.tags.filter((tag) => typeof tag === "string" && tag !== "note")
        : [],
    }))
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
}

module.exports = { buildPortfolioNoteIndex };
