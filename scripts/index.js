
//For convenience, a function that immediately creates an element in the DOM.
function create(element){
    return document.createElement(element);
}

//For convenience, a function is used that immediately adds the class to the element.
function addClass(element, ...classL){
    return element.classList.add(...classL);
}

//The main container where our attachment will be recorded after app initialization.
function createContainer(titleHeader){
    const wrapper = create('div');
    const wrapperHeader = create('h1');

    wrapper.append(wrapperHeader, initFormTodo(), getList());

    addClass(wrapper, 'container');
    addClass(wrapperHeader, 'mb-3', 'title');
    wrapperHeader.textContent = titleHeader;

    return wrapper
}

//The function will create form elements
function  createElForm(){
    const form  = create('form');
    const input = create('input');
    const textArea = create('textarea');
    const submit = create('button');

    return { form, input, textArea, submit };
}

//The function will create list elements
function createElList(){
    const div = create('div');
    const ul = create('ul');
    const li = create('li');

    return { div, ul, li };
}

function getList(){
    const { ul } = createElList();
    return ul
}

//Creating a form that we will use as initialization in the to-do list DOM.
function initFormTodo(){
    const formList = createElForm();
    const { form, input, textArea, submit } = formList;

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

function addTodoListItem(e, form){
    e.preventDefault();
    const { text } = getReg();
    const input = form.children[0];
    const textarea = form.children[1];

    if (text.test(input.value)){
        const { li } = createElList();
        const ul = getList();
        ul.append(li);
        li.textContent = input.value;
        console.log(ul);
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

   formSubmit.addEventListener('submit', (event) => addTodoListItem(event, formSubmit));

   app.append(container);
}

initTodo('todo', 'Дела');