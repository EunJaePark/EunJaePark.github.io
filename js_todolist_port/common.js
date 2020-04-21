const greetingsBox = document.querySelector('.greetingsBox');
const nameForm = greetingsBox.querySelector('.nameForm');
const name = nameForm.querySelector('input');

const todolistBox = document.querySelector('.todolistBox');
const todoForm = todolistBox.querySelector('.todoForm');
const todolistInput = todoForm.querySelector('input');
const inputSubmitBtn = todoForm.querySelector('button');
const title = todolistBox.querySelector('.title');
const todoList = document.querySelector('.todoList');


userNameSave();
todolistSave();

// 사용자 이름 저장.
function userNameSave() {
    const UserName = 'currentUser'

    function saveName(text) {
        localStorage.setItem(UserName, text);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(name.value === null || typeof name.value == 'string' && name.value.trim() == '') {
            alert('이름을 입력해 주세요');
            name.value = null;
            greetingsBox.classList.add('greetingsBox');
        } else {
            const currentValue = name.value;

            paintingTodolistBox(currentValue);
            saveName(currentValue);
        }
    }

    function paintingTodolistBox(text) {
        greetingsBox.classList.add('greetingsBoxReduc');
        todolistBox.classList.add('show');
        setTimeout(function() {
            todolistBox.classList.add('opacity1');
        }, 400);
        title.innerText = `${text}'s TodoList`;
    }

    function loadName() {
        const currentUser = localStorage.getItem(UserName);
        if(currentUser === null) { // localStorage에 currentUser가 없을 때.
            name.focus();
            nameForm.addEventListener('submit', handleSubmit);       
        } else { // localStorage에 currentUser가 있을 때,
            paintingTodolistBox(currentUser); // todolist가 보이게 함.
        }
    }   

    loadName();
}

// todolist 저장.
function todolistSave() {
    const TodosList = 'toDos';
    let toDos = [];

    // local Storage에 저장하는 함수.
    function saveToDos() {
        localStorage.setItem(TodosList, JSON.stringify(toDos))
    }

    // 오늘 날짜 구하는 함수
    function dateCheck() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const date = today.getDate();
        const day = today.getDay();
        const week = ['일', '월', '화', '수', '목', '금', '토', ];

        const writeDate = `${year}년 ${month + 1}월 ${date}일 ${week[day]}요일`;
        
        const dateBox = document.querySelectorAll('.date');
        for(let i = 0; i < dateBox.length; i++) {
            dateBox[i].innerText = writeDate;
        }
    }

    // 현재 시간 체크하는 함수
    let nowTime;
    function timeCheck() {
        const today = new Date();

        const ampm = today.getHours() < 12 ? '오전' : '오후';
        const hh = (today.getHours().toString() % 12) ? today.getHours().toString() % 12 : 12;
        const mm = today.getMinutes();
        const ss = today.getSeconds();

        nowTime = `${ampm} ${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss}`;

        const timeBox = document.querySelector('.time');
        timeBox.innerText = nowTime;
    }

    // 삭제 버튼 클릭시 해당 리스트 삭제 함수.
    function deleteToDo(e) {
        const btn = e.target;
        const li = btn.parentNode;

        todoList.removeChild(li);

        // filter조건에 맞는 리스트들만 출력.
        const cleanToDo = toDos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id)
        })

        toDos = cleanToDo;

        // 삭제된 리스트들을 다시 local storage에 저장시켜주는 함수 실행.
        saveToDos();
    }

    // 체크박스 함수
    let checkTF;
    function checkToDo(e) {
        checkTF = e.target.checked;
        console.log(`checkTF값${checkTF}`);

        let checkLi = e.target.parentNode.parentNode;
        let checkLiId = checkLi.id;
        console.log(checkLi);
        console.log(`클릭한체크박스li: ${checkLi}, 해당체크박스id:${checkLiId}`);
            
        if(checkTF === true) {
            checkLi.classList.add('checked');
            
            toDos[checkLiId - 1].checkStatus = true;
            
            // saveToDos();

            const localTodo = localStorage.getItem(TodosList);
            const parseTodo = JSON.parse(localTodo);

            saveToDos();
        } else {
            checkLi.classList.remove('checked');
            toDos[checkLiId - 1].checkStatus = false;
            saveToDos();
        }
        
    }

    // local storage의 체크박스 정보에 넣어줌.(처음 페이지로드될 때 + 매번 새로고침될 때)
    function checkPush(checkNow, liElm , li, checkBox) {        
        console.log(li);      
        console.log(checkBox);           
        if(checkNow === true) {
            checkTF = true;
            console.log('li에 체크되어있다!!!!!!');          
            checkBox.checked = checkTF;
            liElm.classList.add('checked');             
        } else {
            checkTF = false;
            checkBox.checked = false;
            liElm.classList.remove('checked');
        }
    }

    // todo리스트 생성 함수
    function paintToDo(text, checkNow) {
        console.log(checkNow);
        
        const liElm = document.createElement('li');
        const delBtn = document.createElement('button');
        const spanBox = document.createElement('div');
        spanBox.classList.add('spanBox');
        const span = document.createElement('span');
        const checkboxBox = document.createElement('div');
        checkboxBox.classList.add('checkboxBox');
        const checkBox = document.createElement('input');
        const checkBoxLabel = document.createElement('label')
        const edit = document.createElement('button');
        const time = document.createElement('span');
        time.classList.add('time');
        const newId = toDos.length + 1;
        
        checkboxBox.appendChild(checkBox);
        checkboxBox.appendChild(checkBoxLabel);
        liElm.appendChild(spanBox);
        spanBox.appendChild(span);
        liElm.appendChild(edit);
        liElm.appendChild(delBtn);
        // liElm.appendChild(time);
        liElm.insertBefore(checkboxBox, liElm.firstElementChild);

    
        checkBox.type = 'checkbox';
        edit.innerText = '✎';
        delBtn.innerText = '✕';
        // timeCheck();
        // time.innerText = nowTime;

        delBtn.classList.add('delete_btn');

        span.innerText = text;

        delBtn.addEventListener('click', deleteToDo)
        checkBox.addEventListener('click', checkToDo)


        liElm.id = newId;

        todoList.appendChild(liElm)

        //----checkPush용----
        let li = document.querySelectorAll('li');       
        if(li) {
            checkPush(checkNow, liElm , li, checkBox);
        } //----------------
        


        const toDoObj = {
            text: text,
            id: newId,
            checkStatus: checkTF
        }

        toDos.push(toDoObj);

        saveToDos();
    }

    function formHandleSubmit(e) {
        e.preventDefault();
        if(todolistInput.value === null || typeof todolistInput.value == 'string' && todolistInput.value.trim() == '') {         
            alert('할 일을 입력해 주세요!');
        } else {
            const currentValue = todolistInput.value;
            const checkStatus = checkTF;
            
            paintToDo(currentValue, checkStatus);

            todolistInput.value = '';
        }
    }

    // localStorage에 있는 투두리스트 불러옴.
    function loadToDos() {
        const loadedToDos = localStorage.getItem(TodosList);
        if(loadedToDos !== null) {
            const parsedToDos = JSON.parse(loadedToDos);

            parsedToDos.forEach(function(toDo) {
                localStorage.getItem(toDo);
                console.log(toDo);
                
                paintToDo(toDo.text, toDo.checkStatus);
            })
        }
    }

    function init() {
        loadToDos();
        todoForm.addEventListener('submit', formHandleSubmit);
        inputSubmitBtn.addEventListener('click', formHandleSubmit);

        setInterval(function() {
            timeCheck();
        }, 1000)
        timeCheck();
        dateCheck();
    }
    init();
}


// close버튼(local storage 초기화 버튼) 함수
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', function reset() {
    const UserName = 'currentUser';

    localStorage.clear();
    name.value = null;
    todolistBox.classList.remove('show');
    todolistBox.classList.remove('opacity1');
    greetingsBox.classList.remove('greetingsBoxReduc');
    name.focus();
})
