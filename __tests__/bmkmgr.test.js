const fs = require("fs");
const path = require("path");
const { loadBookmarks, saveBookmarks } = require("../bmkmgr");

const TEST_FILE_PATH = path.join(__dirname, "../test-data/bookmarks.json");

const mockData = [
    {
        name: "Hacker News",
        hyperlink: "https://news.ycombinator.com",
        category: "News"
    },
    {
        name: "MDN Web Docs",
        hyperlink: "https://developer.mozilla.org",
        category: "Development"
    }
];

//afterAll(() => {
//    if (fs.existsSync(TEST_FILE_PATH)) fs.unlinkSync(TEST_FILE_PATH);
//});

test("saveBookmarks writes bookmarks to file, loadBookmarks reads them back", () => {
    saveBookmarks(mockData, TEST_FILE_PATH);
    const loaded = loadBookmarks(TEST_FILE_PATH);
    expect(loaded).toEqual(mockData);
});

