

let wrap = document.querySelector('.wrap');

//---------menu---------
menuScript();
function menuScript(e) {
    let header = document.querySelector('header');
    // let navBtn = document.querySelector('.navBtn');
    let menuBtn = document.querySelector('.menuBtn');
    let navBox = document.querySelector('nav');
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

    //main, footer의 여백을 클릭할 경우, nav박스, search박스 닫히게함.
    main.addEventListener('click', function() {
        if(header.classList.contains('menuShow')) {
            header.classList.remove('menuShow'); 
        } else if(searchBox.style.display === 'block') {
            searchBox.style.display = 'none';
        }
    });
    footer.addEventListener('click', function() {
        if(header.classList.contains('menuShow')) {
            header.classList.remove('menuShow');
        } else if(searchBox.style.display === 'block') {
            searchBox.style.display = 'none';
        }
    });

    

    



    //860px 이하일 경우 열렸던 nav 안보이게함.
    window.addEventListener('resize', function() {
        if (window.innerWidth < 860) {
            header.className = 'clear';
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
    

    
    //-----searchBtn 클릭시 검색창 뜨도록.-----
    //html,css로 다시 만들기.
    //1. 검색창 태그 생성.
    var searchBox = document.createElement('div.searchBox');
    var searchText = document.createElement('input');
    var searchIcon = document.createElement('div.searchIcon');
    var searchClose = document.createElement('button.searchClose');  

    header.appendChild(searchBox);
    searchBox.appendChild(searchText);
    searchBox.appendChild(searchIcon);
    searchBox.appendChild(searchClose);
    searchText.type = 'text';
    searchText.placeholder = 'Microsoft.com 검색';
    searchClose.textContent = '취소';


    searchBox.style.display = 'none';
    searchBox.style.position = 'absolute';
    searchBox.style.left = '110px';
    searchBox.style.width = 'calc(100% + -100px)'; //left
    searchBox.style.height = '100%';
    searchBox.style.backgroundColor = '#fff';

    searchText.style.border = '2px solid #000';
    searchText.style.width = 'calc(100% + -30px + -100px)'; //margin,우측closebtn
    searchText.style.margin = '9px 0 0 30px';
    searchText.style.padding = '7px 10px';  
    searchText.style.fontSize = '13px';

    searchIcon.style.width = '19px';
    searchIcon.style.height = '19px';
    searchIcon.style.background = "url('images/search.png') no-repeat";
    searchIcon.style.backgroundSize = "19px";
    searchIcon.style.position = 'absolute';
    searchIcon.style.right = '90px';
    searchIcon.style.top = '17px';
    searchIcon.style.top = '17px';
    searchIcon.style.cursor = 'pointer';

    searchClose.style.width = '70px';
    searchClose.style.height = '100%';
    searchClose.style.marginLeft = '5px';
    searchClose.style.paddingTop = '15px';
    searchClose.style.color = '#666';
    searchClose.style.fontSize = '13px';
    searchClose.style.textAlign = 'center';
    searchClose.style.backgroundColor = '#fff';
    searchClose.style.position = 'absolute';
    searchClose.style.cursor = 'pointer';

    //1-2. 860px 이하일 경우에는 검색창 스타일 변경.
    window.addEventListener('resize', function () {
        search860();
    });
    function search860() {
        if(window.innerWidth < 860) {
            searchClose.textContent = '';

            searchBox.style.width = 'calc(100% + -70px)';
            searchBox.style.left = '60px';

            searchText.style.width = 'calc(100% + -30px)';
            searchText.style.margin = '9px 0 0 0';
            searchText.style.left = '20px';

            searchIcon.style.right = '30px';
            
            searchClose.style.width = '60px';
            searchClose.style.background = "url('images/close_arrow.png') no-repeat 7px 5px";
            searchClose.style.backgroundSize = "100%";
            searchClose.style.left = '-70px';

            //4. 860px 이하일 경우 열렸던 searchBox 안보이게함.
            searchBox.style.display = 'none';
        } else {
            searchClose.textContent = '취소';

            searchBox.style.width = 'alc(100% + -100px)';
            searchBox.style.left = '110px';

            searchText.style.width = 'calc(100% + -30px + -100px)';
            searchText.style.margin = '9px 0 0 30px';
            searchText.style.left = '';

            searchIcon.style.right = '90px';
            
            searchClose.style.width = '70px';
            searchClose.style.background = "#fff";
            searchClose.style.backgroundSize = "0";
            searchClose.style.left = '';
        }
    }
      
    //2. searchBtn클릭 = 검색창 뜸.
    let searchBtn = document.querySelector('.searchBtn');
    searchBtn.addEventListener('click', function() {
        if(header.classList.contains('menuShow')) {
            header.classList.remove('menuShow')
        }
        return searchBox.style.display = 'block';        
    });

    //3. searchBox를 제외한 곳을 클릭하면 검색창 닫히게함.
       searchClose.addEventListener('click', function() {
           searchBox.style.display = 'none';
       }); 
    
    // //4. 860px 이하일 경우 열렸던 searchBox 안보이게함.
    // window.addEventListener('resize', function() {
    //     if (window.innerWidth < 860) {
    //         // searchBox.style.display = 'none';
    //     }      
    // });
    

}




//---------1 .intro, 3 .sotre bgImg - width별로 바꿈---------
bgChange();
function bgChange() {
    let slideImg = document.querySelectorAll('.introSlideBox > .slide img');
    let storeImg = document.querySelector('.store img');

    window.addEventListener('resize', function() {
        console.log(window.innerWidth);
        resizeImg();
    });

   function resizeImg() {
       for(let i = 0; i < slideImg.length; i++) {
            if(window.innerWidth > 1082) {
                slideImg[i].src = `images/intro_bg${[i + 1]}.webp`;
                storeImg.src = 'images/store_bg.webp';
            } 
            if(window.innerWidth < 1082) {
                slideImg[i].src = 'images/intro_bg' + [i + 1] + '_1082.webp';
                storeImg.src = 'images/store_bg_1082.webp';
            } 
            if(window.innerWidth < 767) {
                slideImg[i].src = 'images/intro_bg' + [i + 1] + '_767.webp';
                storeImg.src = 'images/store_bg_767.webp';
            }
        }
   } 
    
}




//---------bx slider---------
introSlider();
function introSlider() {
    $(document).ready(function() {
        var opt = {
            speed: 100,
            auto: true,
            infiniteLoop: true,
            pause: 3500,
            autoControls: true
        }
        $('.introSlideBox').bxSlider(opt);
    })
    
    let stopBtn = document.querySelector('a.bx-stop');
    let startBtn = document.querySelector('a.bx-start');
    // console.log(stopBtn);
    
}

