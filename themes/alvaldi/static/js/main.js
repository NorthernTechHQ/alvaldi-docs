'use strict';
const currentUrl = document.location.pathname;

(function addCopyToClipboardButtonToCode() {
    document.querySelectorAll('pre').forEach(function (pre) {
        let closest = pre.closest('div.highlight');
        if (!closest) {
            // code blocks without highlighting do not have wrapper that is using to contain copy button
            closest = document.createElement('div');
            closest.classList.add('highlight')
            pre.parentNode.insertBefore(closest, pre);
            closest.appendChild(pre);
        }

        closest.innerHTML += '<i data-closest=".highlight" data-copyfrom="code" class="bi bi-clipboard copy-to-clipboard"></i>';
    });

    document.querySelectorAll(".copy-to-clipboard").forEach(function (el) {
        el.addEventListener("click", function (event) {
            event.preventDefault();
            let target = event.target;
            let copyText = target
                .closest(event.target.dataset.closest)
                .querySelector(event.target.dataset.copyfrom)
                .innerText
                .replace(/\n+$/, ""); // remove trailing newlines from the copied text
            navigator.clipboard.writeText(copyText);
            target.classList.remove('bi-clipboard');
            target.className += ' bi-check2 ';
            setTimeout(function () {
                target.className = 'bi bi-clipboard copy-to-clipboard'
            }, 2000);
        })
    });
})();


(function tocToggleHandler() {
    const tableOfContents = document.querySelector('.table-of-contents .TOC');
    if (tableOfContents) {
        window.onclick = function (e) {
            if (!e.target.closest('.TOC') && !tableOfContents.querySelector('.closed')) {
                tableOfContents.classList.add('closed');
            }
        };
        tableOfContents.onclick = function () {
            tableOfContents.classList.toggle('closed');
        };
    }
})();

const menu = document.querySelector('.top_menu ul');
const overlay = document.querySelector('#overlay');
const openedClass = "opened";

const openNavigationHandler = function () {
    document.querySelector('.left-menu').classList.add(openedClass);
    overlay.style.display = "block";
}

const openMenuHandler = function (collapseMenu) {
    if (collapseMenu.className.indexOf(openedClass) == -1) {
        collapseMenu.classList.add(openedClass);
        menu.classList.add('d-b');
        overlay.style.display = "block";
    } else {
        collapseMenu.classList.remove(openedClass);
        menu.classList.remove('d-b');
        overlay.style.display = "none";
    }
}


document.querySelector('.left-menu .menu-close').onclick = function () {
    document.querySelector('.left-menu').classList.remove(openedClass);
    overlay.style.display = "none";
}

overlay.onclick = function () {
    document.querySelector('.collapse').classList.remove(openedClass);
    document.querySelector('.left-menu').classList.remove(openedClass);
    menu.classList.remove('d-b');
    overlay.style.display = "none";
}


const mainMenuCopy = document.querySelector('.left-menu ul.mainMenu').cloneNode(true);
const clickedMenuHistory = [{href: '/', name: 'Home'}];
const renderNestedMenu = function (href) {

    if (href == null) {
        document.querySelector('.left-menu ul.mainMenu').replaceWith(mainMenuCopy);
    } else {
        const selectedLi = mainMenuCopy.querySelector('li[data-url="' + href + '"]');
        let ul = selectedLi.querySelector('ul') ?
            selectedLi.querySelector('ul').cloneNode(true) :
            selectedLi.closest('ul').cloneNode(true);

        ul.classList.add('mainMenu');
        document.querySelector('.left-menu ul.mainMenu').replaceWith(ul);
    }

    applyOnclickToMenuItems();
}
const menuItemClickFn = function (e) {
    if (window.innerWidth < 1024) { // if the window width is less than 1024 then treat the menu as mobile one
        if (e.target.closest('li').classList.contains('parent')) {
            e.preventDefault();
            renderNestedMenu(e.target.getAttribute('href'));
            clickedMenuHistory.push({href: e.target.getAttribute('href'), name: e.target.innerText});
            buildBreadcrumbs(clickedMenuHistory);
        }
    }
};

const applyOnclickToMenuItems = function () {
    document
        .querySelector('.left-menu')
        .querySelectorAll('ul li.parent > a')
        .forEach(function (item) {
            item.onclick = menuItemClickFn
        });
}
applyOnclickToMenuItems();

const selectedMenu = document.querySelector('.selectedMenu');
const leftMenuBreadcrumbs = document.querySelector('.left-menu-breadcrumbs');
const buildBreadcrumbs = function (items) {
    let html = '';
    if (items.length > 3) {
        items = items.slice(-3);
        html = '<li>...</li><li>/</li>';
    }
    items.forEach(function (item, index) {
        if (index > 0) {
            html += '<li>/</li>';
        }
        html += `<li title="${item.name}"><a href="${item.href}"><span>${item.name}</span></a></li>`;
    })
    leftMenuBreadcrumbs.innerHTML = html;
    let lastItem = items[items.length - 1];
    selectedMenu.innerHTML = lastItem.name !== 'Home' ?
        '<a href="' + lastItem.href + '">' + lastItem.name + ' <i class="bi bi-box-arrow-up-right"></i></a>' :
        '';
}


document.querySelector('.menu-back').onclick = function () {
    if (clickedMenuHistory.length != 1) {
        clickedMenuHistory.pop();
        let lastHistoryElement = clickedMenuHistory[clickedMenuHistory.length - 1];
        renderNestedMenu(lastHistoryElement['name'] !== 'Home' ? lastHistoryElement['href'] : null);
        buildBreadcrumbs(clickedMenuHistory);
    }
}

const processCurrentMenuItem = function () {
    const currentMenuItem = document.querySelector('.left-menu li[data-url="' + document.location.pathname + '"]');

    if (currentMenuItem != null) {
        currentMenuItem.className += ' opened current';

        if (window.innerWidth > 1023) { // if the window width more than 1023 then treat the menu as desktop one
            let closest = currentMenuItem.closest('ul').closest('li');
            while (true) {
                if (!closest) break;
                closest.classList.add('opened');
                closest = closest.closest('ul').closest('li');
            }
        }
    }
}
processCurrentMenuItem();

if (window.innerWidth > 1023) {
    document.querySelectorAll('.mainMenu li.parent > i').forEach(function (element) {
        element.onclick = function (event) {
            event.stopImmediatePropagation();
            element.closest('li.parent').classList.toggle('opened');
        }
    });
} else {
    let historyUrl = '/';
    let urlParts = currentUrl.replace(/^\//, '').replace(/\/$/, '').split('/');
    const selectedLi = document.querySelector('.left-menu ul.mainMenu li[data-url="' + currentUrl + '"]');
    if (selectedLi) {
        if (!selectedLi.classList.contains('parent')) {
            urlParts.pop()
        }

        urlParts.forEach((item) => {
            if (item == '') return;
            historyUrl += item + '/';
            clickedMenuHistory.push({
                href: historyUrl,
                name: mainMenuCopy.querySelector('li[data-url="' + historyUrl + '"] > a').text
            });
        })
        renderNestedMenu(currentUrl);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".article h1, .article h2, .article h3, .article h4, .article h5, .article h6").forEach(function (el) {
        let url = new URL(window.location.href);
        el.insertAdjacentHTML('beforeend', '<a class="anchor" href="' + url.origin + url.pathname + '#' + el.id + '"><i class="bi bi-link-45deg"></i></a>');
    });

    document.querySelectorAll('a.anchor').forEach(function (a) {
        a.onclick = function (e) {
            e.preventDefault();
            navigator.clipboard.writeText(a.href);
            a.classList.add('url-copied');
            history.replaceState(null,null, a.href);
            setTimeout(function () {
                a.classList.remove('url-copied')
            }, 2000);
        }
    })
});

buildBreadcrumbs(clickedMenuHistory);
