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

function addBookmark(name, hyperlink, category, filePath = "bookmarks.json") {
    const bookmarks = loadBookmarks(filePath);

    if (bookmarks.some(b => b.name.toLowerCase() === name.toLowerCase())) {
        console.log(`Bookmark "${name}" already exists. Use update instead.`);
        return false;
    }

    bookmarks.push({ name, hyperlink, category });
    saveBookmarks(bookmarks, filePath);
    console.log(` Added: ${name}`);
    return true;
}

module.exports = { loadBookmarks, saveBookmarks, addBookmark };
