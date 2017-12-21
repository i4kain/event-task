const SELECT_MAX_SIZE = 5;

function createDropDown(container, data) {    
    let cache = '';    

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const dropdownInput = document.createElement('input');
    dropdownInput.type = 'text';
    dropdownInput.classList.add('dropdown__input');
    
    const dropdownButton = document.createElement('button')
    dropdownButton.classList.add('dropdown__button');

    const select = createSelect(
        data, 
        {   
            maxSize: SELECT_MAX_SIZE
        }
    );
    select.classList.add('dropdown__select');
    hideSelect();

    dropdown.appendChild(dropdownInput);
    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(select);

    dropdown.addEventListener('click', dropdownClickHandler);
    dropdownInput.addEventListener('keyup', inputHandler);
    select.addEventListener('click', itemSelectHandler);   

    container.appendChild(dropdown);

    function dropdownClickHandler(event) {    
        const target = event.target;   
    
        event.stopPropagation();
        
        if((target !== dropdownInput && target !== dropdownButton) || isSelectVisible())
            return;   
        
        showSelect();                
    
        cache = dropdownInput.value;
        dropdownInput.value = '';
        dropdownInput.focus();   
        
        window.addEventListener('resize', closeDropdown);
        window.addEventListener('scroll', closeDropdown);
        document.body.addEventListener('click', closeDropdown);
    }
    
    function closeDropdown(event) {
        if(!isSelectVisible()) return;         
        dropdownInput.value = cache;
        
        hideSelect();        
        refreshSelect(select, data);            
        deleteHandlers();
    }
    
    function itemSelectHandler(event) {        
        const target = event.target;    
        if(target.tagName.toLowerCase() !== "option")
            return;        
              
        cache = target.text;
        dropdownInput.value = cache;

        hideSelect();        
        refreshSelect(select, data);            
        deleteHandlers();
    }

    function inputHandler(){
        const value = dropdownInput.value;
        const searchedData = data.filter((elem) => {
            return elem.label.toLowerCase().indexOf(value.toLowerCase()) === 0;
        });
    
        refreshSelect(select, searchedData);        
    }
    
    function deleteHandlers(){
        window.removeEventListener('resize', closeDropdown);
        window.removeEventListener('scroll', closeDropdown);
        document.body.removeEventListener('click', closeDropdown);
    }
    
    function hideSelect() {
        select.classList.add('dropdown__select--hidden');
    }
    
    function showSelect() {
        select.classList.remove('dropdown__select--hidden');
    }
    
    function isSelectVisible() {
        return !select.classList.contains('dropdown__select--hidden');
    }
}
