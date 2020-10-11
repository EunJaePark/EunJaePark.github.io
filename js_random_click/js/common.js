// click 버튼 클릭시.(랜덤메뉴 실행 버튼)
function randomBtnClick() {
    const clickBtn = document.querySelector('button.click');
    clickBtn.addEventListener('click', function() {
        menuClick();
    });
}


// ------ menu 선택 함수. ------
let btnBox = document.querySelector('.btnBox');
let listBox = document.querySelector('.listBox');
let menuPlus = document.querySelector('.menuPlus');
let number = Math.floor(Math.random() * divideLsMenu().length); 
let menuList = divideLsMenu(); 
function menuClick() {
    const audio = document.querySelector('audio');
    audio.play();   

    const result = document.querySelector('.result');
    // 랜덤선정된 메뉴 보이게 함.
    setTimeout(() => {
        result.innerHTML = menuList[number];
        console.log(menuList[number]);
        result.classList.add('show');
        btnBox.classList.add('hide');
        listBox.classList.add('hide');
        menuPlus.classList.add('hide');
    }, 700)
    // 하단의 [메뉴확정], [다시선택] 버튼 시간차 두고 나타나게함.
    setTimeout(() => {
        btnBox.classList.add('hide2');
    }, 1400);    
}

// ------ [메뉴확정], [다시선택], [매장찾기] 버튼 클릭시. ------
function reselectConfirmMenu() {
    const result = document.querySelector('.result');
    const confirmText = document.querySelector('.confirm');
    const afterBtns = document.querySelectorAll('.afterBtns > .btn');
    const mapBtn = document.querySelector('.mapBtn');
    console.log(afterBtns);
    afterBtns.forEach((ele) => {
        ele.addEventListener('click', (event) => {
            event.preventDefault();
            if(ele.classList.contains('ok')) {
                confirmText.innerHTML = `<span>오늘 메뉴는 <strong>${menuList[number]}</strong>입니다 !<span>`;

                // listBox.classList.add('hide');
                // menuPlus.classList.add('hide');
                result.classList.add('hide');
                confirmText.classList.add('show');
                btnBox.classList.add('hide3');
                mapBtn.classList.add('show');
            } else if(ele.classList.contains('replay')) {
                console.log('다시선택!!!!');
                location.reload();
            } else {
                const googleMap = 'https://www.google.co.kr/maps/search/';
                window.open(`${googleMap}${menuList[number]}`, '_blank');
            }
        })
    });
}


// ------ 메뉴추가 버튼 클릭시 Input에 적은 메뉴 추가되게 함. ------
const menuPlusForm = document.querySelector('form.menuPlus');
const input = document.querySelector('input');
const menuPlusBtn = document.querySelector('.plusBtn');

function inputSubmit() {
    menuPlusForm.addEventListener('submit', addMenu);
    menuPlusBtn.addEventListener('click', addMenu);
}

function addMenu(event) {
    event.preventDefault();
    const menuPlus = document.querySelector('.menuPlus');
    let inputMenu = input.value;
    console.log(inputMenu);
    const savedMenu = getLSmenu();

    localStorage.setItem('menuList', `${savedMenu},${inputMenu}`);
    console.log(getLSmenu());
}




// ------ listBox 속 메뉴 각각의 [x]버튼 클릭 시 해당 메뉴 삭제. ------
function removeMenu() {
    const menulist = document.querySelectorAll('.menu');
    const deleteBtns = document.querySelectorAll('.delBtn');
    const savedMenu = divideLsMenu();
    
    for(let i = 0; i < menulist.length; i++) {
        deleteBtns[i].addEventListener('click', (event) => {
            event.preventDefault();

            // 삭제하려는 메뉴명.
            const clickMenuName = menulist[i].innerText.slice(0, -1); 
            // 삭제하려는 메뉴 순번.
            const delMenuNum = savedMenu.indexOf(clickMenuName);
            // 삭제버튼 누른 메뉴명 메뉴리스트에서 삭제.
            savedMenu.splice(delMenuNum, 1);
            // 삭제 완료된 메뉴리스트 다시 local storage에 저장.
            localStorage.setItem('menuList', savedMenu);
        });
    }
}

// ------ listBox에 저장 된 메뉴 목록 데이터 li에 삽입. ------
function insertSavedMenu() {
    const menu = divideLsMenu();
    const listBox = document.querySelector('ul.listBox');

    // li들 화면에 다시 뿌려줌.
    menu.forEach(ele => {
        const li = document.createElement('li');
        const delBtn = document.createElement('button');

        li.innerText = ele; 
        li.className = 'menu';

        delBtn.innerText = '✕';
        delBtn.className = 'delBtn';

        listBox.appendChild(li);
        li.appendChild(delBtn);
    });
}


// ------ local storage에 저장 된 메뉴 하나하나 분리. ------
function divideLsMenu() {
    return getLSmenu().split(',');
}

// ------ local storage에 저장 된 메뉴목록 불러옴. ------
function getLSmenu() {
    return localStorage.getItem('menuList');
}


// ------ 기본 메뉴 local storage에 저장. ------
function saveBaseMenu() {
    const baseMenu = ['김치찌개', '된장찌개', '돈까스', '피자', '치킨', '파스타', '초밥', '샌드위치', '비지찌개', '돌솥밥', '더덕구이']

    localStorage.setItem('menuList', baseMenu);
}



// ------ 접속 횟수 확인(처음 접속시에만 base menu 저장되도록 하기 위함) ------
function saveFirstLoadCount() {
    localStorage.setItem('loadCount', 0);
}
function getLoadCount() {
    return Number(localStorage.getItem('loadCount'));
}
function addLoadCount() {
  const count = getLoadCount();
    localStorage.setItem('loadCount', count + 1);
    console.log(count, typeof count);
}



function init() {
    if(getLoadCount() < 1) {
        // 처음 접속시에 loadCount에 '0'부여.
        saveFirstLoadCount();
        // 처음 접속시에만 base menu 추가해줌.
        saveBaseMenu();
    }
    addLoadCount(); // 매번 접속시마다 loadCount를 1씩 늘려줌.
    inputSubmit();
    insertSavedMenu();
    removeMenu();
    reselectConfirmMenu();
    randomBtnClick();
}

init();

