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

function updateBookmark(name, field, newValue, filePath = "bookmarks.json") {
    const bookmarks = loadBookmarks(filePath);
    const index = bookmarks.findIndex(b => b.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
        console.log(`Bookmakr "${name}" not found.`);
        return false;
    }

    const validFields = ["name", "hyperlink", "category"];
    if (!validFields.includes(field)) {
        console.log(`Invalid field "${field}".`);
        return false;
    }

    bookmarks[index][field] = newValue;
    saveBookmarks(bookmarks, filePath);
    console.log(`Updated ${field} of "${name}" to "${newValue}".`);
    return true;
}

function deleteBookmark(name, filePath = "bookmarks.json") {
    const bookmarks = loadBookmarks(filePath);
    const newBookmarks = bookmarks.filter(
        b => b.name.toLowerCase() !== name.toLowerCase()
    );

    if (newBookmarks.length === bookmarks.length) {
        console.log(`Bookmark "${name}" not found.`);
        return false;
    }

    saveBookmarks(newBookmarks, filePath);
    console.log(`Deleted bookmark "${name}".`);
    return true;
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "add":
        if (args.length !== 4) {
            console.log("Usage: node bookmarks.js add <name> <hyperlink> <category>");
        } else {
            addBookmark(args[1], args[2], args[3]);
        }
        break;

    case "print":
        printBookmarks();
        break;

    case "update":
        if (args.length !== 4) {
            console.log("Usage: node bookmarks.js update <name> <field> <newValue>");
        } else {
            const [ , name, field, newValue ] = args;
            updateBookmark(name, field, newValue);
        }
        break;

    case "delete":
        if (args.length !== 2) {
            console.log("Usage: node bookmarks.js delete <name>");
        } else {
            deleteBookmark(args[1]);
        }
        break;

    default:
        console.log("Invalid command. Use: add, print, update, delete.");
}

module.exports = { loadBookmarks, saveBookmarks, addBookmark, printBookmarks, updateBookmark, deleteBookmark };
