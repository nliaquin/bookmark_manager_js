const fs = require("fs");
const path = require("path");
const { loadBookmarks, saveBookmarks, addBookmark } = require("../bmkmgr");

const TEST_FILE_PATH = path.join(__dirname, "../test-data/bookmarks.json");

afterAll(() => {
    if (fs.existsSync(TEST_FILE_PATH)) fs.unlinkSync(TEST_FILE_PATH);
});

test("addBookmark adds a bookmark to the file.", () => {
    const added = addBookmark(
        "Google",
        "https://google.com",
        "Search Engines",
        TEST_FILE_PATH
    );
    expect(added).toBe(true);

    const bookmarks = loadBookmarks(TEST_FILE_PATH);
    expect(bookmarks.length).toBe(1);
    expect(bookmarks[0]).toEqual({
        name: "Google",
        hyperlink: "https://google.com",
        category: "Search Engines"
    });
});

test("addBookmarks prevents duplicate entries", () => {
    const firstAdd = addBookmark("Google", "https://google.com", "Search Engines", TEST_FILE_PATH);
    const secondAdd = addBookmark("Google", "https://google.com", "Search Engines", TEST_FILE_PATH);
    expect(secondAdd).toBe(false);
    const bookmarks = loadBookmarks(TEST_FILE_PATH);
    expect(bookmarks.length).toBe(1);
});

