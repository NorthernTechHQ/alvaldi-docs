const fs = require('fs');
const path = require('path');

const contentPath = path.resolve(__dirname + '/../content');
const menuHtmlPath = path.resolve(__dirname + '/../layouts/partials/mainMenu.html');

const contentFilesTreeToJson = function (filename) {
    // skip if not directory or .md file
    if (!['', '.md', '.markdown'].includes(path.extname(filename)) || path.basename(filename) == '_index.md') {
        return;
    }

    let result = {
        url: filename.replace(contentPath, '').replace(path.extname(filename), '') + '/',
        title: null,
        sorting: 100
    };

    const fileStat = fs.lstatSync(filename);
    let content = '';

    const titleRegex = /^title:(.*)$/m;
    const sortingRegex = /^sorting:*.(\d+)$/m;
    const unpublishedRegex = /^published:*.+(false)$/m;

    if (fileStat.isDirectory()) {
        const indexFilePath = filename + '/_index.md';
        try {
            content = fs.readFileSync(indexFilePath, "utf8");
        } catch (e) {
            console.log(`Directory index file '${indexFilePath}' is not found.`)
        }
        result.dir = 'trye';
        result.children = fs.readdirSync(filename).map(childItem => contentFilesTreeToJson(filename + '/' + childItem));
    } else {
        try {
            content = fs.readFileSync(filename, "utf8");
        } catch (e) {
            console.log(`File '${filename}' cannot be opened: ${e.toString()}`)
        }
    }

    if (unpublishedRegex.test(content)) {
        return;
    }

    if (titleRegex.test(content)) {
        result.title = content.match(titleRegex)[1].trim();
    }

    if (sortingRegex.test(content)) {
        result.sorting = parseInt(content.match(sortingRegex)[1]);
    }

    return result;
}

const orderJsonTree = function (tree) {
    if (Array.isArray(tree)) {
        tree = tree.filter(item => item !== undefined).sort((a, b) => a.sorting - b.sorting);

        for (const key in tree) {
            if (tree[key].hasOwnProperty('children')) {
                tree[key].children = orderJsonTree(tree[key].children);
            }
        }

    } else if (tree.hasOwnProperty('children')) {
        tree.children = orderJsonTree(tree.children);
    }

    return tree;
}

const buildHtmlMenuFromJsonTree = function (jsonTree, level) {
    let html = '';

    if (Array.isArray(jsonTree)) {
        for (const key in jsonTree) {
            const item = jsonTree[key];
            if (item.url == '/api/enterprise-api-examples') {
                console.log(item)
            }
            // console.log(item, item.hasOwnProperty('children'))
            const isParent = item.hasOwnProperty('children');
            html += `<li class="${isParent ? 'parent' : ''} level-${level}" data-url="${item.url}">${isParent ? '<i></i>' : ''}<a href="${item.url}">${item.title}</a>`;
            if (isParent) {
                html += '<ul>';
                html += buildHtmlMenuFromJsonTree(item.children, level++);
                html += '</ul>';
            }
            html += '</li>';
        }

    } else if (jsonTree.hasOwnProperty('children')) {
        html += buildHtmlMenuFromJsonTree(jsonTree.children, level++);
    }

    return html;
}

const orderedJsonFilesTree = orderJsonTree(contentFilesTreeToJson(contentPath));
const menuHtml = buildHtmlMenuFromJsonTree(orderedJsonFilesTree, 1);
fs.writeFileSync(menuHtmlPath, menuHtml);

