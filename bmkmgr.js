const fs = require("fs");
//We're not hardcoding the file path right now for the sake of running tests.
//const FILE_PATH = "bookmarks.json";

function loadBookmarks(filePath = "bookmarks.json") {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveBookmarks(bookmarks, filePath = "bookmarks.json") {
    fs.writeFileSync(filePath, JSON.stringify(bookmarks, null, 4), "utf8");
}

module.exports = { loadBookmarks, saveBookmarks };
