const fs = require("fs");
const path = require("path");
const {
    addBookmark,
    printBookmarks,
    updateBookmark,
    deleteBookmark,
    saveBookmarks,
    loadBookmarks
} = require("../bmkmgr");

const TEST_FILE_PATH = path.join(__dirname, "../test-data/bookmarks.json");
const OUTPUT_FILE = path.join(__dirname, "../test-data/print-output.txt");

beforeEach(() => {
    if (fs.existsSync(TEST_FILE_PATH)) fs.unlinkSync(TEST_FILE_PATH);
});

afterAll(() => {
    if (fs.existsSync(TEST_FILE_PATH)) fs.unlinkSync(TEST_FILE_PATH);
    if (fs.existsSync(OUTPUT_FILE)) fs.unlinkSync(OUTPUT_FILE);
});

// 1. saveBookmarks + loadBookmarks
test("saveBookmarks and loadBookmarks work together", () => {
    const data = [{ name: "Test", hyperlink: "https://test.com", category: "General" }];
    saveBookmarks(data, TEST_FILE_PATH);
    const result = loadBookmarks(TEST_FILE_PATH);
    expect(result).toEqual(data);
});

// 2. addBookmark
test("addBookmark adds new bookmark", () => {
    const added = addBookmark("New", "https://new.com", "General", TEST_FILE_PATH);
    expect(added).toBe(true);
    const result = loadBookmarks(TEST_FILE_PATH);
    expect(result[0].name).toBe("New");
});

test("addBookmark prevents duplicates (case-insensitive)", () => {
    addBookmark("GitHub", "https://github.com", "Dev", TEST_FILE_PATH);
    const added = addBookmark("github", "https://github.com", "Dev", TEST_FILE_PATH);
    expect(added).toBe(false);
});

// 3. updateBookmark
test("updateBookmark modifies specified field", () => {
    addBookmark("Site", "https://old.com", "Tools", TEST_FILE_PATH);
    const updated = updateBookmark("Site", "hyperlink", "https://new.com", TEST_FILE_PATH);
    expect(updated).toBe(true);
    const result = loadBookmarks(TEST_FILE_PATH);
    expect(result[0].hyperlink).toBe("https://new.com");
});

test("updateBookmark fails with invalid field", () => {
    addBookmark("Invalid", "https://test.com", "Dev", TEST_FILE_PATH);
    const result = updateBookmark("Invalid", "notAField", "value", TEST_FILE_PATH);
    expect(result).toBe(false);
});

// 4. deleteBookmark
test("deleteBookmark removes an existing bookmark", () => {
    addBookmark("ToDelete", "https://del.com", "Junk", TEST_FILE_PATH);
    const deleted = deleteBookmark("ToDelete", TEST_FILE_PATH);
    expect(deleted).toBe(true);
    const result = loadBookmarks(TEST_FILE_PATH);
    expect(result).toEqual([]);
});

test("deleteBookmark fails if bookmark not found", () => {
    const deleted = deleteBookmark("NoExist", TEST_FILE_PATH);
    expect(deleted).toBe(false);
});

// 5. printBookmarks
test("printBookmarks groups and sorts correctly", () => {
    const bookmarks = [
        { name: "1", hyperlink: "https://1.com", category: "Category 1" },
        { name: "2", hyperlink: "https://2.com", category: "Category 1" },
        { name: "3", hyperlink: "https://3.com", category: "Category 2" }
    ];
    saveBookmarks(bookmarks, TEST_FILE_PATH);

    const output = [];
    printBookmarks(TEST_FILE_PATH, msg => output.push(msg));

    const expected = [
        "\n Category 1:",
        "1 - https://1.com",
        "2 - https://2.com",
        "\n Category 2:",
        "3 - https://3.com",
        "\n"
    ];

    expect(output).toEqual(expected);
    fs.writeFileSync(OUTPUT_FILE, output.join("\n"));
});

