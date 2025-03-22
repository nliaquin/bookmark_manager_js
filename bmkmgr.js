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
    console.log(` Added: ${name}\n`);
    return true;
}

function printBookmarks(filePath = "bookmarks.json", output = console.log) {
    const bookmarks = loadBookmarks(filePath);
    if (bookmarks.length === 0) {
        output("No bookmarks found.\n");
        return;
    }

    bookmarks.sort((a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );

    const grouped = {};
    bookmarks.forEach(({ name, hyperlink, category }) => {
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(`${name} - ${hyperlink}`);
    });

    Object.keys(grouped).forEach(category => {
        output(`\n ${category}:`);
        grouped[category].forEach(entry => output(entry));
    });
    output("\n");
}

module.exports = { loadBookmarks, saveBookmarks, addBookmark, printBookmarks };
