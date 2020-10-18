 const userNameZone = document.querySelector('.userNameZone'),
    nameInputForm = userNameZone.querySelector('form'),
    nameInput = userNameZone.querySelector('input'),
    mainBox = document.querySelector('.mainBox'),
    welcomeSpan = document.querySelector('.welcomeZone > span'),   
    toDoForm = document.querySelector('.toDoListZone > form'),
    toDoInput = toDoForm.querySelector('input'),
    notDoneUl = document.querySelector('.toDoListZone  ul.notDone'),
    doneUl = document .querySelector('.toDoListZone  ul.done'),
    USER_NAME = 'userName',
    TODOLIST = 'toDoList',
    TODO_DONE = 'todoDone',
    todoLS = localStorage.getItem(TODOLIST),
    doneLS = localStorage.getItem(TODO_DONE);
let todoArr = [],
    doneArr = [];


function saveTodoLS() {
    localStorage.setItem(TODOLIST, JSON.stringify(todoArr));
}

function saveDoneLS() {
    localStorage.setItem(TODO_DONE, JSON.stringify(doneArr));
}

function findReturnList(taskId) {
    console.log('find return ');
    return doneArr.find(task => {
        return task.id === Number(taskId);
    });
}

function findDoneList(taskId) {
    return todoArr.find(task => {
        return task.id === Number(taskId);
    });
}

function rearrangeDoneArr(id) {
    const doneArrFilter = doneArr.filter(task => {
        return task.id !== Number(id);
    });
    doneArr = doneArrFilter;
    saveDoneLS();
}

function rearrangeTodoArr(taskId) {
    const todoArrFilter = todoArr.filter(task => {
        return task.id !== Number(taskId);
    });
    todoArr = todoArrFilter;
    saveTodoLS();
}

function todoReturn(event) {
    const returnLi = event.target.parentNode;
    const returnTarget = findReturnList(returnLi.id);
    console.log(returnTarget);
    doneUl.removeChild(returnLi);
    rearrangeDoneArr(returnLi.id);
    printToDoList(returnTarget.taskText);
}

function todoDelete(event) {
    const delLi = event.target.parentNode;
    if(delLi.parentNode.classList.contains('notDone')) {
        notDoneUl.removeChild(delLi);
        rearrangeTodoArr(delLi.id);
    } else if(delLi.parentNode.classList.contains('done')) {
        doneUl.removeChild(delLi);
        rearrangeDoneArr(delLi.id);
    }
}

function todoDone(e) {
    const doneLi = e.target.parentNode;
    const doneTarget = findDoneList(doneLi.id);
    notDoneUl.removeChild(doneLi);
    rearrangeTodoArr(doneLi.id);
    printDoneList(doneTarget.taskText);
}

function printDoneList(done) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const reBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    reBtn.addEventListener('click', todoReturn);
    delBtn.addEventListener('click', todoDelete);
    const newID = doneArr.length + 1;

    li.id = newID;
    span.innerText = done;
    reBtn.innerText = '⤺';
    delBtn.innerText = '✕';

    doneUl.appendChild(li);
    li.appendChild(span);
    li.appendChild(reBtn);
    li.appendChild(delBtn);
    const doneInfo = {
        taskText: done,
        id: newID,
    };
    doneArr.push(doneInfo);
    saveDoneLS();
}

function printToDoList(task) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const doneBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    doneBtn.addEventListener('click', todoDone);
    delBtn.addEventListener('click', todoDelete);
    const newID = todoArr.length + 1;

    li.id = newID;
    span.innerText = task;
    doneBtn.innerText = 'ok';
    delBtn.innerText = '✕';

    notDoneUl.appendChild(li);
    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);

    const taskInfo = {
        taskText: task,
        id: newID,
    };
    todoArr.push(taskInfo);
    saveTodoLS();
}

function toDoInputFunc(event) {
    event.preventDefault();
    const task = toDoInput.value;
    console.log(task, task.length);
    if(task.replace(/\s|  /gi, '').length === 0) {
        alert('please write what to do');
        toDoInput.value = '';
    } else {
        printToDoList(task);
        toDoInput.value = '';
    }
}

function welcome(name) {
    welcomeSpan.innerText = `Hello, ${name} !`;
    userNameZone.classList.add('hide');
    userNameZone.classList.remove('show');
    mainBox.classList.add('show');
    mainBox.classList.remove('hide');
}

function nameInputFunc(event) {
    event.preventDefault();
    const name = nameInput.value;
    console.log(name);
    localStorage.setItem(USER_NAME, name);
    welcome(name);
    nameInput.value = '';
}

function resetPrint() {
    // local storage에 저장 된 todolist 화면에 뿌려줌.
    if(todoLS) {
        const todoFromLS = JSON.parse(todoLS);
        todoFromLS.forEach(ele => {
            printToDoList(ele.taskText);
        });
    }
    // local storage에 저장 된 donelist 화면에 뿌려줌.
    if(doneLS) {
        const doneFromLS = JSON.parse(doneLS);
        doneFromLS.forEach(ele => {
            printDoneList(ele.taskText);
        });
    }
}

function connetionCheck() {
    const lsName = localStorage.getItem(USER_NAME);
    if(!lsName) {
        userNameZone.classList.add('show');
        mainBox.classList.add('hide');
        userNameZone.classList.remove('hide');
        mainBox.classList.remove('show');
        resetPrint(); // local storage에 저장 된 todolist 화면에 뿌려줌.
        nameInputForm.addEventListener('submit', nameInputFunc);
    } else {
        // welcome인사 실행.(mainBox 보이게 함)
        welcome(lsName);
        // local storage에 저장 된 todolist 화면에 뿌려줌.
        resetPrint()
        
        // submit 이벤트 실행.
        toDoForm.addEventListener('submit', toDoInputFunc);
    }
}


function init() {
    connetionCheck();  
    toDoForm.addEventListener('submit', toDoInputFunc);   
}

init();