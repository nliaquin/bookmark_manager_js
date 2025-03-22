const fs = require("fs");
const path = require("path");
const { loadBookmarks } = require("../bmkmgr");

const TEST_FILE_PATH = path.join(__dirname, "../test-data/bookmarks.json");

beforeAll(() => {
    //Mock data
    fs.writeFileSync(TEST_FILE_PATH, JSON.stringify([
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
    ]));
});

afterAll(() => {
    fs.unlinkSync(TEST_FILE_PATH);
});

test("loadBookmarks reads bookmarks from file with name, hyperlink, category", () => {
    const bookmarks = loadBookmarks(TEST_FILE_PATH);
    expect(bookmarks).toEqual([
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
    ]);
});

