

let wrap = document.querySelector('.wrap');

//---------menu---------
menuScript();
function menuScript(e) {
    let header = document.querySelector('header');
    // let navBtn = document.querySelector('.navBtn');
    // let menuBtn = document.querySelector('.menuBtn');
    // let navBox = document.querySelector('nav');
    // let hamBtn = document.querySelector('.hamBtn');
    let mainMenu = document.querySelectorAll('li.mainMenu > span');
    let subMenu = document.querySelectorAll('ul.subMenu');
    let main = document.querySelector('main');
    let footer = document.querySelector('footer');
    

    // eulsoo 20200206
    // 전 복잡하게 생각안하구 그냥 main에 리스너 걸고 여기안에서 감지 되는 클릭에
    // 메뉴를 닫았습니다. 제생각는 리스너를 wrap에 걸어서 모든 걸 하기에는 너무 복잡할 것 같아요
    // 그냥 menuBtn에 리스너 걸어서 열고 닫고 하고, main에 걸어서 닫게 하는 방식으로
    // 수정 하시는게 수월할 것 같아요~

    // header를 제외한 모든 부분 클릭 시 메뉴박스가 닫히게 만들어야 합니다.
    header.addEventListener('click', function(e) {
        //860px 이하에서는 .hamBtn버튼 클릭시 nav + header > ul 보이게 함.
        if(e.target.classList.contains('menuBtn') || e.target.classList.contains('hamBtn')) {
            menuOpenClose();
        }
        
        function menuOpenClose() {
            if(header.classList.contains('menuShow')) {
                header.classList.remove('menuShow');
            } else {
                header.classList.add('menuShow');
        }
    }
     
    });


    //-----searchBtn 클릭시 검색창 뜨도록.-----
    //1. 검색창 태그 생성.
    var search_box = document.querySelector('.search_box');
    var searchClose = document.querySelector('.searchClose');  
     
    // searchBtn클릭 = 검색창 뜸.
    let searchBtn = document.querySelector('.searchBtn');
    searchBtn.addEventListener('click', function() {
        if(header.classList.contains('menuShow')) {
            header.classList.remove('menuShow')
        }
        return search_box.style.display = 'block';        
    });

    searchClose.addEventListener('click', function() {
        search_box.style.display = 'none';
    });


    // -----menu, search 공통-----
    //main, footer의 여백을 클릭할 경우, nav박스, search박스 닫히게함.
    main.addEventListener('click', function() {
        if(header.classList.contains('menuShow')) {
            header.classList.remove('menuShow'); 
        } else if(search_box.style.display === 'block') {
            search_box.style.display = 'none';
        }
    });
    footer.addEventListener('click', function() {
        if(header.classList.contains('menuShow')) {
            header.classList.remove('menuShow');
        } else if(search_box.style.display === 'block') {
            search_box.style.display = 'none';
        }
    });
    

    //860px 이하일 경우 열렸던 nav 안보이게함.
    window.addEventListener('resize', function() {
        if (window.innerWidth < 860) {
            header.className = 'clear';
            search_box.style.display = 'none';
        }           
    });

    //860px이하 - .mainMenu클릭시 .subMenu 보이게함.
    for(let i = 0; i < mainMenu.length; i++) {
        mainMenu[i].addEventListener('click', function() { 
            if(subMenu[i].className === 'subMenu') {
                mainMenu[i].className = 'imgChange'; 
                subMenu[i].className = 'subMenu subShow'; 
            } else {
                mainMenu[i].className = ''; 
                subMenu[i].className = 'subMenu'; 
            }  
        });
    }
    

}




//---------1 .intro, 3 .sotre bgImg - width별로 바꿈---------
bgChange();
function bgChange() {
    let slideImg = document.querySelectorAll('.introSlideBox .slide img');
    let storeImg = document.querySelector('.store img');

    window.addEventListener('resize', function() {
        console.log(window.innerWidth);
        resizeImg();
    });

   function resizeImg() {
       for(let i = 0; i < slideImg.length; i++) {
            if(window.innerWidth > 1082) {
                console.log('1082up!!!!!!');  
                slideImg[i].src = `images/intro_bg${[i + 1]}.webp`;
                storeImg.src = 'images/store_bg.webp';
            } 
            if(window.innerWidth < 1082) {
                console.log('1082down!!!!!!'); 
                slideImg[i].src = 'images/intro_bg' + [i + 1] + '_1082.webp';
                storeImg.src = 'images/store_bg_1082.webp';
            } 
            if(window.innerWidth < 767) {
                console.log('767down!!!!!!');              
                slideImg[i].src = 'images/intro_bg' + [i + 1] + '_767.webp';
                storeImg.src = 'images/store_bg_767.webp';
            }
        }
   } 
    
}



//---------1 intro---------
introScript();
function introScript() {
    //---------.introSlideBox에 height값을 slide의 height값으로 주기.----------
    let introSlideBox = document.querySelector('.introSlideBox');
    let slides = document.querySelectorAll('.slide');
    window.addEventListener('resize', function() {
        slideHeight();
    });
    slideHeight();
    function slideHeight() {
        for(let i = 0; i < slides.length; i++) {
            console.log(slides[i].clientHeight);
            let slideHeight = slides[i].clientHeight;
            introSlideBox.style.height = `${slideHeight}px`;
        }
    }

    //introSlideBox에 마우스오버시 prevBtn, nextBtn 보이게함.
    let prevNextBtns = document.querySelectorAll('.prevNextBtn > button');
    introSlideBox.addEventListener('mouseover', function() {
        for(let i = 0; i < prevNextBtns.length; i++) {
            prevNextBtns[i].classList.add('show');
        }
    });
    introSlideBox.addEventListener('mouseout', function() {
        for(let i = 0; i < prevNextBtns.length; i++) {
            prevNextBtns[i].classList.remove('show');
        }
    });


    //----------.intro slider-----------
    let SHOW_CLASS = 'show';
    let firstSlide = document.querySelector('.slide:first-child');
    let pageNum = document.querySelectorAll('.pageNum');

    function slideJs() {
        let currentSlide = document.querySelector(`.${SHOW_CLASS}`);
        if(currentSlide) {
            currentSlide.classList.remove(SHOW_CLASS);
            let nextSlide = currentSlide.nextElementSibling;
            if(nextSlide) {
                nextSlide.classList.add(SHOW_CLASS);
            } else {
                firstSlide.classList.add(SHOW_CLASS);
            }
        } else {
            firstSlide.classList.add(SHOW_CLASS);
        }
        slideCircle();
    }
    slideJs();
    let set = window.setInterval(slideJs, 2000);

    //prev, next버튼 클릭시 슬라이드 넘어가게함.
    let prevBtn = document.querySelector('.prev');
    let nextBtn = document.querySelector('.next');

    prevBtn.addEventListener('click', function() {
        let currentSlide = document.querySelector('.slide.show');
        let lastSlide = document.querySelector('.slide:last-child');
        if(currentSlide) {
            currentSlide.classList.remove('show');
            let prevSlide = currentSlide.nextElementSibling;
            if(prevSlide) {
                prevSlide.classList.add('show');
            } else {
                lastSlide.classList.add('show');
            }
        } else {
            lastSlide.classList.add('show');
        }
        slideCircle();
    });

    nextBtn.addEventListener('click', function() {
        slideJs();
    });


    //슬라이드 하단 페이지표시 원과 slide번호 맞춰 이어줌.
    function slideCircle() {
        for(let i = 0; i < slides.length; i++) {
            pageNum[i].classList.remove('on');
            if(slides[i].classList.contains('show')) {
                pageNum[i].classList.add('on');
            }
        }
    }
    //슬라이드 하단 원 클릭시 해당 슬라이드로 넘어가게함.
    for(let i = 0; i < pageNum.length; i++) {
        pageNum[i].addEventListener('click', function() {
            for(let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('show');
            }
            slides[i].classList.add('show');
            slideCircle();
        });
    }

    //play, stop버튼
    let playBtn = document.querySelector('.play');
    let stopBtn = document.querySelector('.stop');

    stopBtn.addEventListener('click', function(e) {
        clearInterval(set);
        if(e.target.style.display === 'none') {
            e.target.style.display = 'block'
        } else {
            e.target.style.display = 'none';
            playBtn.style.display = 'block';
        }
        console.log(set);  
        console.log('멈췄다');  
    });

    playBtn.addEventListener('click', function(e) {
        set = setInterval(slideJs, 2000);
        if(e.target.style.display === 'none') {
            e.target.style.display = 'block'
        } else {
            e.target.style.display = 'none';
            stopBtn.style.display = 'block';
        }
        console.log(set);
        console.log('다시시작');  
    });


}


