let menuPlus = document.querySelector('.menuPlus');
let menuCloseBtn = document.querySelector('.close');
// 메뉴추가 버튼 클릭시 Input에 적은 메뉴 추가되게 함.

// 메뉴추가 버튼 클릭시 input 창 보이게 함. (close버튼 클릭하며 input안보이게함.)
menuPlus.addEventListener('click', function(e) {
    if(e.target.classList.contains('menuBtn')) {
        menuPlus.querySelector('button').innerHTML = '추가';
        menuPlus.querySelector('button').style = 'color:#fff; border-color:#fff;';
        menuPlus.classList.add('show');  
    } else if(e.target.classList.contains('close')) {
        menuPlus.querySelector('button').innerHTML = '메뉴추가';
        menuPlus.querySelector('button').style = '';
        menuPlus.classList.remove('show');
    }
    
});



//click 버튼 클릭시.
let clickBtn = document.querySelector('button.click');
clickBtn.addEventListener('click', function() {
    menuClick();
});

//다시선택 버튼 클릭시.
let btnBox = document.querySelector('.btnBox');
let afterBtns = document.querySelectorAll('.afterBtns > a');
for(let i = 0; i < afterBtns.length; i++) {
    afterBtns[i].addEventListener('click', function() {
        if(afterBtns[i].classList.contains('ok')) {
            // alert(`오늘 식사메뉴는 "${menu}" 입니다!`);
            let confirm = document.querySelector('.confirm');
            confirm.innerHTML = `<span>오늘 메뉴는 <strong>${menu}</strong>입니다 !</span>`;
            confirm.classList.add('show');
            btnBox.classList.add('hide3');
        } else if(afterBtns[i].classList.contains('replay')) {
            menuClick();
            
        }
    });
}

let menu; // 메뉴확정 버튼 클릭시에 사용하기 위해 menuClick()함수 바깥에다 선언해준 것.


// menu 선택 함수.
function menuClick() {
    let audio = document.querySelector('audio');
    audio.play();

    let number = Math.floor(Math.random() * 30);
    // Math.ceil() : 반올림
    // Math.floor() : 소수점 이하를 버림한다.
    // Math.random() :  소숫점이 많이 붙은 난수가 무작위로 형성
    console.log(number);
    
    
    // let menu;
    setTimeout(function(){
        if( number === 0 ) {
            menu = '김치찌개';
        } else if( number === 1 ) {
            menu = '순두부찌개';
        } else if( number === 2 ) {
            menu = '된장찌개';
        } else if( number === 3 ) {
            menu = '돈까스';
        } else if( number === 4 ) {
            menu = '비지찌개';
        } else if( number === 5 ) {
            menu = '피자';
        } else if( number === 6 ) {
            menu = '치킨';
        } else if( number === 7 ) {
            menu = '파스타';
        } else if( number === 8 ) {
            menu = '스테이크';
        } else if( number === 9 ) {
            menu = '샐러드';
        } else if( number === 10 ) {
            menu = '김밥';
        } else if( number === 11 ) {
            menu = '떡볶이';
        } else if( number === 12 ) {
            menu = '보쌈';
        } else if( number === 13 ) {
            menu = '보리밥정식';
        } else if( number === 14 ) {
            menu = '굴비정식';
        } else if( number === 15 ) {
            menu = '갈치조림';
        } else if( number === 16 ) {
            menu = '초밥';
        } else if( number === 17 ) {
            menu = '라면';
        } else if( number === 18 ) {
            menu = '토스트';
        } else if( number === 19 ) {
            menu = '돼지국밥';
        } else if( number === 20 ) {
            menu = '콩나물국밥';
        } else if( number === 21 ) {
            menu = '샌드위치';
        } else if( number === 22 ) {
            menu = '라볶이';
        } else if( number === 23 ) {
            menu = '쫄면';
        } else if( number === 24 ) {
            menu = '굴전';
        } else if( number === 25 ) {
            menu = '짜장면';
        } else if( number === 26 ) {
            menu = '돌솥밥';
        } else if( number === 27 ) {
            menu = '만둣국';
        } else if( number === 28 ) {
            menu = '김치찜';
        } else if( number === 29 ) {
            menu = '제육볶음';
        } else if( number === 30 ) {
            menu = '덮밥';
        }

        console.log(menu);
        

        let result = document.querySelector('.result');
        result.innerHTML = menu;
        
        result.classList.add('hide');
        btnBox.classList.add('hide');
    },700);

    setTimeout(function() {
        btnBox.classList.add('hide2');
    }, 1400);
}
