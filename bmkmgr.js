const fs = require("fs");
const FILE_PATH = "bookmarks.json";

function loadBookmarks() {
    if (!fs.existsSync(FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

function saveBookmarks(bookmarks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(bookmarks, null, 4), "utf8");
}

function addBookmark(name, hyperlink, category) {
    const bookmarks = loadBookmarks();

    if (bookmarks.some(b => b.name.toLowerCase() === name.toLowerCase())) {
        console.log(`Bookmark "${name}" already exists. Use update instead.\n`);
        return false;
    }

    bookmarks.push({ name, hyperlink, category });
    saveBookmarks(bookmarks, FILE_PATH);
    console.log(`Bookmark "${name}" added.\n`);
    return true;
}

function printBookmarks() {
    const bookmarks = loadBookmarks();
    if (bookmarks.length === 0) {
        console.log("No bookmarks found.\n");
        return;
    }

    bookmarks.sort((a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );

    const grouped = {};
    bookmarks.forEach(({ name, hyperlink, category }) => {
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(`${name} - ${hyperlink}\n`);
    });

    Object.keys(grouped).forEach(category => {
        console.log(`\n ${category}:`);
        grouped[category].forEach(entry => console.log(entry));
    });
}

function updateBookmark(name, field, newValue) {
    const bookmarks = loadBookmarks();
    const index = bookmarks.findIndex(b => b.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
        console.log(`Bookmark "${name}" not found.`);
        return false;
    }

    const validFields = ["name", "hyperlink", "category"];
    if (!validFields.includes(field)) {
        console.log(`Invalid field "${field}".`);
        return false;
    }

    bookmarks[index][field] = newValue;
    saveBookmarks(bookmarks);
    console.log(`Updated ${field} of "${name}" to "${newValue}".`);
    return true;
}

function deleteBookmark(name) {
    const bookmarks = loadBookmarks();
    const newBookmarks = bookmarks.filter(
        b => b.name.toLowerCase() !== name.toLowerCase()
    );

    if (newBookmarks.length === bookmarks.length) {
        console.log(`Bookmark "${name}" not found.`);
        return false;
    }

    saveBookmarks(newBookmarks);
    console.log(`Deleted bookmark "${name}".`);
    return true;
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "add":
        if (args.length !== 4) {
            console.log("Usage: node bmkmgr.js add <name> <hyperlink> <category>");
        } else {
            addBookmark(args[1], args[2], args[3]);
        }
        break;

    case "print":
        printBookmarks();
        break;

    case "update":
        if (args.length !== 4) {
            console.log("Usage: node bmkmgr.js update <name> <field> <newValue>");
        } else {
            const [ , name, field, newValue ] = args;
            updateBookmark(name, field, newValue);
        }
        break;

    case "delete":
        if (args.length !== 2) {
            console.log("Usage: node bmkmgr.js delete <name>");
        } else {
            deleteBookmark(args[1]);
        }
        break;

    default:
        console.log("Invalid command. Use: add, print, update, delete.");
}

