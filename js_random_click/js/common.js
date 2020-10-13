/* 변수 */
let menuArr = [],
    pickMenu = '',
    number = 0;
const MENULIST = 'menuList', // local storage 저장명.
    menuPlusForm = document.querySelector('form.menuPlus'),
    input = document.querySelector('input'),
    menuPlus = document.querySelector('.menuPlus'),
    clickBtn = document.querySelector('button.click'),
    listBox = document.querySelector('ul.listBox'),
    result = document.querySelector('.result'),
    confirmBox = document.querySelector('.confirm'),
    confirmText = document.querySelector('.confirm > p'),
    afterBtns = document.querySelectorAll('.afterBtns > .btn'),
    mapBtn = document.querySelector('.mapBtn'),
    btnBox = document.querySelector('.btnBox');;



// ------ click 버튼 클릭시.(랜덤메뉴 실행 버튼) ------
function randomBtnClick() {
    clickBtn.addEventListener('click', function() {
        menuClick();
    });
}

// ------ menu 선택 함수. ------
function menuClick() {
    const audio = document.querySelector('audio');
    audio.play();   
    console.log(number);
    pickMenu = menuArr[number].menu;

    // const result = document.querySelector('.result');
    // 랜덤선정된 메뉴 보이게 함.
    setTimeout(() => {
        result.innerHTML = pickMenu;
        console.log(pickMenu);
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
    console.log(afterBtns);
    afterBtns.forEach((ele) => {
        ele.addEventListener('click', (event) => {
            event.preventDefault();
            if(ele.classList.contains('ok')) {
                confirmText.innerHTML = `오늘 메뉴는 <strong>${pickMenu}</strong>입니다 !`;

                result.classList.add('hide');
                confirmBox.classList.add('show');
                btnBox.classList.add('hide3');
                mapBtn.classList.add('show');
            } else if(ele.classList.contains('replay')) {
                console.log('다시선택!!!!');
                location.reload();
            } else {
                const googleMap = 'https://www.google.co.kr/maps/search/';
                window.open(`${googleMap}${pickMenu}`, '_blank');
            }
        })
    });
}





// ------ 👍🏼listBox 속 메뉴 각각의 [x]버튼 클릭 시 해당 메뉴 삭제. ------
function removeMenu(event) {
    const clickBtn = event.target;
    const clickLi = clickBtn.parentNode;
    const clickMenuName = clickLi.innerText.replace('✕', '');

    listBox.removeChild(clickLi);

    const cleanMenuArr = menuArr.filter(ele => {
        console.log(ele);
        console.log(ele.id, clickLi.id);
        console.log(ele.menu, clickMenuName);
        return ele.id !== clickLi.id;
    });

    menuArr = cleanMenuArr;
    saveMenu();

    // menuArr의 개수 다시 설정.
    number = Math.floor(Math.random() * menuArr.length);
    // menu 개수가 0개일 경우 [click]버튼 숨기고 알림창 띄움.
    checkMenuNumAlert(); 
}


// ------ 👍🏼input에 새롭게 입력한 메뉴 추가. ------
function addNewMenu(event) {
    event.preventDefault();
    localStorage.setItem(MENULIST, JSON.stringify(menuArr));

    const newMenu = input.value;
    insertSavedMenu(newMenu);

    // input칸 비워줌.
    input.value = '';
}

// ------ 👍🏼local storage에 메뉴목록 저장. ------
function saveMenu() {
    localStorage.setItem(MENULIST, JSON.stringify(menuArr));

}

// ------ 👍🏼메뉴 목록 데이터 li에 삽입. ------
function insertSavedMenu(receiveMenu) {
    console.log(receiveMenu);
    if(receiveMenu !== undefined) {
        const li = document.createElement('li');
        const delBtn = document.createElement('button');
        // ID는 기본적으로 해당 '날짜+시간'이 들어가고 '-'뒤에 순번이 들어가도록 함.(중복 방지)
        const newId = `${makeDateListID()}-${menuArr.length + 1}`;

        li.innerText = receiveMenu;
        li.id = newId; 
        li.className = 'menu';

        delBtn.innerText = '✕';
        delBtn.className = 'delBtn';
        delBtn.addEventListener('click', removeMenu);

        listBox.appendChild(li);
        li.appendChild(delBtn);

        const menuObj = {
            menu: receiveMenu,
            id: newId,
        }

        menuArr.push(menuObj);
        saveMenu();

        // menu 개수가 0개일 경우 [click]버튼 숨기고 알림창 띄움.
        checkMenuNumAlert(); 
    }

}



// ------ 👍🏼local storage에 저장 된 메뉴목록 불러옴. ------
function getLSmenu() {
    const lsMenu = localStorage.getItem(MENULIST);
    if (lsMenu !== null) {
        const parseMenu = JSON.parse(lsMenu);
        parseMenu.forEach(menuEle => {
            console.log(menuEle.menu);
            insertSavedMenu(menuEle.menu);
        });
    }
}


// ------ 기본 메뉴 local storage에 저장. ------
function saveBaseMenu() {
    const baseMenu = ['김치찌개', '된장찌개', '돈까스', '피자', '치킨', '파스타', '초밥', '샌드위치', '비지찌개', '돌솥밥', '더덕구이',]

    baseMenu.forEach(ele => {
        console.log(ele);
        insertSavedMenu(ele);
    });
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


// menu 개수가 0개일 경우 [click]버튼 숨기고 알림창 띄움.
function checkMenuNumAlert() {
    const alertText = document.querySelector('.alertText');
    // 메뉴가 0개일 경우 알림창 뜨도록 함.
    if(menuArr.length === 0) {
        console.log('0개다!!');
        // 알림창 뜨도록 하자!!
        clickBtn.classList.add('hide');
        alertText.classList.add('show');
        return;
    } else {
        console.log('1개 이상이다!');
        clickBtn.classList.remove('hide');
        alertText.classList.remove('show');
    }
    // 이 함수는 기본적으로 화면 랜더링 될때 작동하도록 실행시켰고,
    // insertSavedMenu(), removeMenu()함수에서도 작동시켜 메뉴가 추가/삭제될 때도 작동하도록 해줬다.
    // (화면에 실시간으로 바로 반영될 수 있도록 하기 위함)
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
}


function init() {
    if(getLoadCount() < 1) {
        // 처음 접속시에 loadCount에 '0'부여.
        saveFirstLoadCount();
        // 처음 접속시에만 base menu 추가해줌.
        saveBaseMenu();
        // 랜덤선택 숫자.(모든 메뉴목록이 생성된 후에 length를 구해야해서 메뉴저장 함수 이후로 배치)
        number = Math.floor(Math.random() * menuArr.length);  
        // menu 개수가 0개일 경우 [click]버튼 숨기고 알림창 띄움.
    checkMenuNumAlert(); 
    } else {
        // 두 번째 접속부터 화면에 메뉴목록 뿌리는 함수 기본실행시켜줌.(base menu 저장할 때 화면에 뿌려지는 과정이 2번 반복되는 현상 막기 위함.)
        getLSmenu();
        // 랜덤선택 숫자.(모든 메뉴목록이 생성된 후에 length를 구해야해서 메뉴저장 함수 이후로 배치)
        number = Math.floor(Math.random() * menuArr.length); 
        // menu 개수가 0개일 경우 [click]버튼 숨기고 알림창 띄움.
        checkMenuNumAlert(); 
    }

    addLoadCount(); // 매번 접속시마다 loadCount를 1씩 늘려줌.    
    reselectConfirmMenu();
    randomBtnClick();
    menuPlusForm.addEventListener('submit', addNewMenu);
}

init();

