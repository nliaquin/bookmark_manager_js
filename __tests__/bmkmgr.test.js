const fs = require("fs");
const path = require("path");
const { loadBookmarks, saveBookmarks, addBookmark, printBookmarks, updateBookmark, deleteBookmark } = require("../bmkmgr");

const TEST_FILE_PATH = path.join(__dirname, "../test-data/bookmarks.json");
/*
afterAll(() => {
    if (fs.existsSync(TEST_FILE_PATH)) fs.unlinkSync(TEST_FILE_PATH);
});
*/

test("deleteBookmark removes a given bookmark by name", () => {
    const mockData = [
        { name: "Google", hyperlink: "https://google.com", category: "Search Engines" },
        { name: "DuckDuckGo", hyperlink: "https://duckduckgo.com", category: "Search Engines" },
        { name: "Outlook", hyperlink: "https://outlook.com", category: "Microsoft 365" },
        { name: "Office", hyperlink: "https://office.com", category: "Microsoft 365" },
        { name: "Facebook", hyperlink: "https://facebook.com", category: "Social Media" }
    ]

    saveBookmarks(mockData, TEST_FILE_PATH);

    const deleted = deleteBookmark("Facebook", TEST_FILE_PATH);
    expect(deleted).toBe(true);

    const bookmarks = loadBookmarks(TEST_FILE_PATH);
    expect(bookmarks).toEqual([
        { name: "Google", hyperlink: "https://google.com", category: "Search Engines" },
        { name: "DuckDuckGo", hyperlink: "https://duckduckgo.com", category: "Search Engines" },
        { name: "Outlook", hyperlink: "https://outlook.com", category: "Microsoft 365" },
        { name: "Office", hyperlink: "https://office.com", category: "Microsoft 365" },
    ]);
});

test("deleteBookmark returns false if bookmark not found", () => {
    saveBookmarks([], TEST_FILE_PATH);
    const result = deleteBookmark("Reddit", TEST_FILE_PATH);
    expect(result).toBe(false);
});

