function createElements(...elements){
    return elements.map(el => document.createElement(el));
}

//For convenience, a function is used that immediately adds the class to the element.
function addClass(element, ...classL){
    return element.classList.add(...classL);
}

//The main container where our attachment will be recorded after app initialization.
function createContainer(titleHeader){
    const [wrapper, wrapperHeader, list] = createElements('div', 'h1', 'ul');

    wrapper.append(wrapperHeader, initFormTodo(), list);

    addClass(wrapper, 'container');
    addClass(wrapperHeader, 'mb-3', 'title');
    wrapperHeader.textContent = titleHeader;

    return wrapper
}

//Creating a form that we will use as initialization in the to-do list DOM.
function initFormTodo(){
    const [ form, input, textArea, submit ] = createElements('form', 'input', 'textarea', 'button');

    addClass(form, 'form-group', 'form');
    addClass(input, 'form-control', 'mb-4', 'form__input');
    addClass(textArea, 'form-control', 'mb-4', 'form__text');
    addClass(submit, 'btn', 'btn-primary', 'btn-lg', 'form__submit');

    submit.type = 'submit';
    submit.textContent = 'Завести дело';
    input.placeholder = 'Новое дело';
    textArea.placeholder = 'Описание';

    form.append(input, textArea, submit);

    return form;
}

//Initializing a list in the DOM.
function initList(parent, value){
    const [ li ] = createElements('li');
    const ul = parent.children[2];

    li.textContent = value;

    ul.append(li);

    return ul;
}

//We add a case to our list if the check was successful.
function getWriteList(e, container, form){
    e.preventDefault();
    const { text } = getReg();
    const input = form.children[0];
    const textarea = form.children[1];

    if (text.test(input.value)){
        const list = initList(container, input.value);
        container.append(list);
    }
}

function getReg(){
    return {
        text: /[a-zа-яё]/i
    }
}

//Initializing a component in the DOM
function initTodo(id, title){
   const app = document.getElementById(id);
   const container = createContainer(title);
   const formSubmit = container.children[1];

   formSubmit.addEventListener('submit', (event) => getWriteList(event, container, formSubmit));

   app.append(container);
}

initTodo('todo', 'Дела');