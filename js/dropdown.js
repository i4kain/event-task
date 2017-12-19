const SELECT_MAX_SIZE = 5;

function createDropDown(container, data) {    
    let cache = '';
    let isRefreshed = false;

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const dropdownInput = document.createElement('input');
    dropdownInput.type = 'text';
    dropdownInput.classList.add('dropdown__input');
    
    const dropdownButton = document.createElement('button')
    dropdownButton.classList.add('dropdown__btn');

    const select = createSelect(
        data, 
        {   
            maxSize: SELECT_MAX_SIZE
        }
    );
    select.classList.add('dropdown__select');
    select.classList.add('display-none');

    dropdown.appendChild(dropdownInput);
    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(select);

    dropdown.addEventListener('click', clickOnDDHandler);
    dropdownInput.addEventListener('keyup', keyUpOnDDInputHandler);
    select.addEventListener('click', clickOnSelectHandler);   

    container.appendChild(dropdown);

    function clickOnDDHandler(event) {    
        const target = event.target;   
    
        event.stopPropagation();
        
        if((target !== dropdownInput && target !== dropdownButton) || !select.classList.contains('display-none'))
            return;   
        
        select.classList.remove('display-none')
        if(isRefreshed) {
            refreshSelect(select, data);
            isRefreshed = false;
        }        
    
        cache = dropdownInput.value;
        dropdownInput.value = '';
        dropdownInput.focus();   
        
        window.addEventListener('resize', toCloseSelectHandler);
        window.addEventListener('scroll', toCloseSelectHandler);
        document.body.addEventListener('click', toCloseSelectHandler);
    }
    
    function toCloseSelectHandler(event) {
        if(select.classList.contains('display-none')) return;         
        dropdownInput.value = cache;
        select.classList.add('display-none');
        deleteHandlers();
    }
    
    function clickOnSelectHandler(event) {        
        const target = event.target;    
        if(target.tagName.toLowerCase() !== "option")
            return;        
              
        cache = target.text;
        dropdownInput.value = cache;
        select.classList.add('display-none');
        refreshSelect(this, data);
        deleteHandlers();
    }

    function keyUpOnDDInputHandler(){
        const value = dropdownInput.value;
        const searchedData = data.filter((elem) => {
            return elem.label.toLowerCase().indexOf(value.toLowerCase()) === 0;
        });
    
        refreshSelect(select, searchedData);
        isRefreshed = true;
    }
    
    function deleteHandlers(){
        window.removeEventListener('resize', toCloseSelectHandler);
        window.removeEventListener('scroll', toCloseSelectHandler);
        document.body.removeEventListener('click', toCloseSelectHandler);
    }    
}
