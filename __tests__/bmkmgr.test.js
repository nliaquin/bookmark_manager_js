const fs = require("fs");
const path = require("path");
const { loadBookmarks, saveBookmarks, addBookmark, printBookmarks, updateBookmark } = require("../bmkmgr");

const TEST_FILE_PATH = path.join(__dirname, "../test-data/bookmarks.json");
/*
afterAll(() => {
    if (fs.existsSync(TEST_FILE_PATH)) fs.unlinkSync(TEST_FILE_PATH);
});
*/

test("updateBookmark modified the user-specified field of a given bookmark by name", () => {
    const initialBookmark = [
        { name: "Outlook", hyperlink: "https://outlook.com", category: "Email" }
    ];

    saveBookmarks(initialBookmark, TEST_FILE_PATH);

    const updatedBookmark = updateBookmark("Outlook", "category", "Microsoft 365", TEST_FILE_PATH);
    expect(updatedBookmark).toBe(true);

    const result = loadBookmarks(TEST_FILE_PATH);
    expect(result[0].category).toBe("Microsoft 365");
});

