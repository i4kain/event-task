function createSelect(data, option){    
    const select = document.createElement('select');    
    select.size = data.length < option.maxSize ? data.length : option.maxSize;
    
    fillSelect(select, data);
    return select;
}

function fillSelect(select, data) {
    data.forEach((elem) => {
        select.add(new Option(elem.label, elem.id));
    });
}

function refreshSelect(select, data) {
    cleanElement(select);
    fillSelect(select, data);
}

function cleanElement(elem) {
    while (elem.firstChild)
        elem.removeChild(elem.firstChild);
}
