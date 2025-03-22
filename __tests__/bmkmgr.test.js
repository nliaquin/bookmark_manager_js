const fs = require("fs");
const path = require("path");
const { loadBookmarks, saveBookmarks, addBookmark, printBookmarks } = require("../bmkmgr");

const TEST_FILE_PATH = path.join(__dirname, "../test-data/bookmarks.json");
/*
afterAll(() => {
    if (fs.existsSync(TEST_FILE_PATH)) fs.unlinkSync(TEST_FILE_PATH);
});
*/

test("printBookmarks displays bookmarks grouped and sorted", () => {
    const mockData = [
        { name: "Google", hyperlink: "https://google.com", category: "Search Engines" },
        { name: "DuckDuckGo", hyperlink: "https://duckduckgo.com", category: "Search Engines" },
        { name: "Outlook", hyperlink: "https://outlook.com", category: "Microsoft 365" },
        { name: "Office", hyperlink: "https://office.com", category: "Microsoft 365" },
        { name: "Facebook", hyperlink: "https://facebook.com", category: "Social Media" }
    ]

    saveBookmarks(mockData, TEST_FILE_PATH);

    const output = [];
    const mockLog = msg => output.push(msg);

    printBookmarks(TEST_FILE_PATH, mockLog);

    expect(output).toEqual([
        "\n Microsoft 365:",
        "Office - https://office.com",
        "Outlook - https://outlook.com",
        "\n Search Engines:",
        "DuckDuckGo - https://duckduckgo.com",
        "Google - https://google.com",
        "\n Social Media:",
        "Facebook - https://facebook.com",
        "\n"
    ]);
});
