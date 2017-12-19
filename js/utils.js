function createElement(tagName) {
    const elem = document.createElement(tagName);
    return (elem) ? elem : null;
}

function createSelect(data, option){    
    const select = createElement('select');
    select.style.width = option.width;
    select.size = data.length < option.maxSize ? data.length : option.maxSize;

    fillSelect(select, data);

    return select;
}

function closeSelect() {
    container.removeChild(select);
    select = null; 
    window.onresize = window.onscroll = document.body.onclick = null;
}

function fillSelect(select, data) {
    data.forEach((elem) => {
        select.add(new Option(elem.label, elem.id));
    });
}

function deleteElement(parent, child) {
    parent.removeChild(child);
    child = null;
}

function refreshSelect(select, data) {
    cleanElement(select);
    fillSelect(select, data);
}

function cleanElement(elem) {
    while (elem.firstChild)
        elem.removeChild(elem.firstChild);
}

function isFit(element) {    
    return element.getBoundingClientRect().bottom < window.innerHeight;
}
