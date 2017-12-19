const container = document.querySelector('.container');
const dropdown = document.querySelector('.dropdown');
const input = document.querySelector('.dropdown__input');
const btn = document.querySelector('.dropdown__btn');
let prevValue = '';
let isChecked = false;
let select;

dropdown.onclick = (event) => {    
    const target = event.target;
    const tagName = target.tagName.toLowerCase();

    event.stopPropagation();
    
    if(select || (tagName !== "input" && tagName !== "button"))
        return;

    select = createSelect(
        data, 
        {   
            width: window.getComputedStyle(dropdown).width,
            maxSize: 5
        }
    );    
    select.onclick = (event) => {
        const target = event.target;    
        if(target.tagName.toLowerCase() !== "option")
            return;
        
        isChecked = true;
        input.value = target.text;
        closeSelect();               
    };

    container.appendChild(select);   
    
    if(!isFit(select))
        container.insertBefore(select, dropdown);

    //input.value = '';
    input.focus();   
    
    window.onresize = window.onscroll = document.body.onclick =  () => {
        if(!select) return;
        if(!isChecked) input.value = '';
        closeSelect();
    }
};

input.onkeyup = (event) => {    
    const value = input.value;

    if(value === prevValue) return;

    isChecked = false;
    prevValue = value;

    const searchedData = data.filter((elem) => {
        return elem.label.toLowerCase().indexOf(value.toLowerCase()) === 0;
    });

    refreshSelect(select, searchedData);
}
