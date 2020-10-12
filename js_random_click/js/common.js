/* 공통 변수 */
let menuPlusForm = document.querySelector('form.menuPlus');
let input = document.querySelector('input');
let menuPlusBtn = document.querySelector('.plusBtn');
let menuPlus = document.querySelector('.menuPlus');
let listBox = document.querySelector('ul.listBox');


// ------ click 버튼 클릭시.(랜덤메뉴 실행 버튼) ------
function randomBtnClick() {
    const clickBtn = document.querySelector('button.click');
    clickBtn.addEventListener('click', function() {
        menuClick();
    });
}

// ------ menu 선택 함수. ------
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
    const confirmBox = document.querySelector('.confirm');
    const confirmText = document.querySelector('.confirm > p');
    const afterBtns = document.querySelectorAll('.afterBtns > .btn');
    const mapBtn = document.querySelector('.mapBtn');
    console.log(afterBtns);
    afterBtns.forEach((ele) => {
        ele.addEventListener('click', (event) => {
            event.preventDefault();
            if(ele.classList.contains('ok')) {
                confirmText.innerHTML = `오늘 메뉴는 <strong>${menuList[number]}</strong>입니다 !`;

                result.classList.add('hide');
                confirmBox.classList.add('show');
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
menuPlusForm.addEventListener('submit', addMenu);
menuPlusBtn.addEventListener('click', addMenu);

function addMenu(event) {
    event.preventDefault();
    const newID = makeDateListID(); // 메뉴마다 부여해줄 id생성함수 실행.
    const savedMenu = separateMenuFromId();
    const savedId = separateId();
    let inputMenu = input.value;
    const newMenu = {
        menu: inputMenu,
        id: newID,
    };

    const addMenuArr = [];
    for(let i = 0; i < savedMenu.length; i++) {
        let resaveMenu = '';
        let resaveId = '';

        resaveMenu = savedMenu[i];
        resaveId = savedId[i];
        addMenuArr.push({menu: resaveMenu, id: resaveId});
    }
    addMenuArr.push(newMenu);
    localStorage.setItem('menuList', JSON.stringify(addMenuArr));

    // 새로 추가된 메뉴 화면에 나타나게 함.
    insertSavedMenu(newMenu);

    // input칸 비워줌.
    input.value = '';
}



// ------ listBox 속 메뉴 각각의 [x]버튼 클릭 시 해당 메뉴 삭제. ------
function removeMenu() {
    const menulist = document.querySelectorAll('.menu');
    const idList = document.querySelectorAll('.id');
    const deleteBtns = document.querySelectorAll('.delBtn');
    const savedMenu = separateMenuFromId();
    const savedId = separateId();
    
    for(let i = 0; i < menulist.length; i++) {
        deleteBtns[i].addEventListener('click', (event) => {
            event.preventDefault();
            // 삭제버튼 클릭한 메뉴명.
            const clickMenuName = menulist[i].innerText.slice(0, -1).replace(/(\s*)/g, ""); 
            // 삭제버튼 클릭한 메뉴 id.
            const clickMenuId = idList[i].innerText;

            // 삭제버튼 누른 메뉴 빠진 메뉴배열 새로 생성.
            let resaveMenuArr = [];
            for(let i = 0; i < savedMenu.length; i++) {
                let resaveMenu = '';
                let resaveId = '';

                if(clickMenuName !== savedMenu[i] && clickMenuId === savedId[i]) {
                    resaveMenu = savedMenu[i];
                    resaveId = savedId[i];

                    resaveMenuArr.push({menu: resaveMenu, id: resaveId});
                }
            }
            console.log(resaveMenuArr);

            // 삭제 완료된 메뉴리스트 다시 local storage에 저장.
            localStorage.setItem('menuList', JSON.stringify(resaveMenuArr));

            console.log(separateMenuFromId());
            // 1) 화면에 보였던 li(메뉴)들 모두 지우고, 
            while(listBox.hasChildNodes()) {
                listBox.removeChild(listBox.children[0]);
            }
            // 2) 삭제된 메뉴 제외한 li(메뉴)들 다시 화면에 뿌려줌.
            insertSavedMenu();
        });
    }
}


// ------ 메뉴 목록 데이터 li에 삽입. ------
function insertSavedMenu(newMenu) {
    // separateMenuFromId(), separateId()는 공통 변수로 빼면 작동이 제대로 안되는 부분이 생김.
    const menu = separateMenuFromId();
    const id = separateId();

    if(newMenu) {  // 새롭게 추가된 메뉴만 화면에 더하는 경우.
        const li = document.createElement('li');
        const idSpan = document.createElement('span');
        const delBtn = document.createElement('button');

        li.innerText = newMenu.menu; 
        li.className = 'menu';

        idSpan.innerText = newMenu.id;
        idSpan.className = 'id'

        delBtn.innerText = '✕';
        delBtn.className = 'delBtn';

        listBox.appendChild(li);
        li.appendChild(idSpan);
        li.appendChild(delBtn);
    } else {  // local storage에 저장된 메뉴들 화면에 뿌리는 경우.
        for(let i = 0; i < menu.length; i++) {
            const li = document.createElement('li');
            const idSpan = document.createElement('span');
            const delBtn = document.createElement('button');

            li.innerText = menu[i]; 
            li.className = 'menu';

            idSpan.innerText = id[i];
            idSpan.className = 'id'

            delBtn.innerText = '✕';
            delBtn.className = 'delBtn';

            listBox.appendChild(li);
            li.appendChild(idSpan);
            li.appendChild(delBtn);
        }
    }
}


// ------ local storage에 저장 된 메뉴들 각 id와 분리.(메뉴 이름만 추출) ------
function separateMenuFromId() {
    const savedMenuWithId = divideLsMenu();
    const savedMenuNoId = savedMenuWithId.map(ele => {
        const firstSeparate = ele.substring(0, ele.indexOf(','));
        const finalSeparate = firstSeparate.substr(firstSeparate.indexOf(':"')+2, firstSeparate.length-1).replace('"', '');
        return finalSeparate;
    });
    return savedMenuNoId;
}

// ------ local storage에 저장 된 id만 분리. ------
function separateId() {
    const getSavedMenuArr  = getLSmenu().split(/},/);
    const idArr = [];
    for(let i = 0; i < getSavedMenuArr.length; i++) {
        /* ----- 정규식 작성 방법 다시 생각하자...!ㅠㅠ ----- */
        const idArrObj = getSavedMenuArr[i].replace('{', '').replace('}', '').replace(' ', '');
        idArr.push(idArrObj);
    }
    const savedId = idArr.map(ele => {
        const firstSeparateId = ele.substring(ele.indexOf(','), ele.length);
        const finalSeparateId = firstSeparateId.substr(firstSeparateId.indexOf(':"')+2, firstSeparateId.length-1).replace('"', '');
        return finalSeparateId;
    });
    return savedId;
}

// ------ local storage에 저장 된 메뉴 하나하나 분리.(메뉴 + id) ------
function divideLsMenu() {
    const savedMenuArr  = getLSmenu().split(/},/);
    const saveMenuNewArr = [];
    for(let i = 0; i < savedMenuArr.length; i++) {
        /* ----- 정규식 작성 방법 다시 생각하자...!ㅠㅠ ----- */
        const newMenuArrObj = savedMenuArr[i].replace('{', '').replace('}', '');
        saveMenuNewArr.push(newMenuArrObj);
    }
    return saveMenuNewArr;
}

// ------ local storage에 저장 된 메뉴목록 불러옴. ------
function getLSmenu() {
    /*----[]를 한번에 적는 정규식을 알아내면 수정할것.....ㅠㅠ ----*/ 
    return localStorage.getItem('menuList').replace('[', '').replace(']', '');
}


// ------ 기본 메뉴 local storage에 저장. ------
function saveBaseMenu() {
    makeDateListID(); // 메뉴마다 부여해줄 id생성함수 실행.

    const baseMenu = [
        {
            menu: '김치찌개',
            id: makeDateListID(),
        }, 
        {
            menu: '된장찌개',
            id: makeDateListID(),
        }, 
        {
            menu: '돈까스',
            id: makeDateListID(),
        }, 
        {
            menu: '피자',
            id: makeDateListID(),
        }, 
        {
            menu: '치킨',
            id: makeDateListID(),
        }, 
        {
            menu: '파스타',
            id: makeDateListID(),
        }, 
        {
            menu: '초밥',
            id: makeDateListID(),
        }, 
        {
            menu: '샌드위치',
            id: makeDateListID(),
        }, 
        {
            menu: '비지찌개',
            id: makeDateListID(),
        }, 
        {
            menu: '돌솥밥',
            id: makeDateListID(),
        }, 
        {
            menu: '더덕구이',
            id: makeDateListID(),
        },
    ]

    localStorage.setItem('menuList', JSON.stringify(baseMenu));
}


// ------ cookie에 저장할 때 부여해줄 id 생성 ------
function makeDateListID() {
    // date 구함.
    let getDate = new Date();
    let year = String(getDate.getFullYear()).substr(2, 2);
    let month =
    getDate.getMonth() + 1 < 10
        ? `0${getDate.getMonth() + 1}`
        : getDate.getMonth() + 1;
    let date =
        getDate.getDate() < 10
        ? `0${getDate.getDate()}`
        : getDate.getDate();
  
    let hh = new Date().getHours().toString();
    let mm = new Date().getMinutes().toString();
    let ss = new Date().getSeconds().toString();
  
    const nowTime = `${hh < 10 ? `0${hh}` : hh}${mm < 10 ? `0${mm}` : mm}${
      ss < 10 ? `0${ss}` : ss
    }`;
  
    // type + date + 시분초 조합해 id생성.
    let idDate = `${year}${month}${date}${nowTime}`;
    console.log(idDate, typeof idDate);
  
    return idDate;
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

// ------ menuClick(), reselectConfirmMenu()에서 사용하기 위함. ------
// (divideLsMenu()함수 때문에 생성주기 꼬여서 해당 변수들만 제일 아래에서 선언한 것.)
let btnBox = document.querySelector('.btnBox');
let number = Math.floor(Math.random() * divideLsMenu().length); 
let menuList = divideLsMenu(); 

function init() {
    if(getLoadCount() < 1) {
        // 처음 접속시에 loadCount에 '0'부여.
        saveFirstLoadCount();
        // 처음 접속시에만 base menu 추가해줌.
        saveBaseMenu();
    } 
    addLoadCount(); // 매번 접속시마다 loadCount를 1씩 늘려줌.
    // inputSubmit();
    insertSavedMenu();
    removeMenu();
    reselectConfirmMenu();
    randomBtnClick();

    // separateMenuFromId();
    // console.log(separateId());
}

init();

