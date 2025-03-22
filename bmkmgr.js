const fs = require("fs");
const FILE_PATH = "bookmarks.json";

function loadBookmarks() {
    if (!fs.existsSync(FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}


