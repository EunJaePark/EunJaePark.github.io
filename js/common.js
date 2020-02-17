
let htmlEl = document.querySelector('html');
let portNav = document.querySelector('.port_nav');
let main = document.querySelector('main')
let intro = document.querySelector('.intro');
let introTitle = intro.querySelector('.title_box');
let introTitleText = introTitle.querySelector('.title');
let scrollBtn = intro.querySelector('.scrollBtn');
let aboutMe = intro.querySelector('.aboutMe');
let portFirst = document.querySelector('.portListBox:first-child');
let footer = document.querySelector('footer');
let topBtn = document.querySelector('.top_btn');


// ******resize될때마다 height값 찾기.******
let portfolio = document.querySelector('.portfolio');
let portListBox = document.querySelectorAll('.portListBox');
let contentHeight;
resize();
function resize() {
    let sizeCheck;  

    resizeCheck();

    window.addEventListener('resize', resizeWork);

    function resizeWork() {
        clearTimeout(sizeCheck);
        sizeCheck = setTimeout(function() {
            resizeCheck();
        }, 100);
    }

    function resizeCheck() {
        contentHeight = `${window.innerHeight}`;

        for(let i = 0; i < portListBox.length; i++) {
            portListBox[i].style.height = contentHeight;
        }

        console.log(contentHeight);
        
    }
}
console.log(portfolio.offsetTop);

// ******resize끝******


// //페이지 접속하면 intro 글자 나오게함.
// let introText = introTitle.querySelectorAll('span');
// console.log(introText);
// for(let i = 0; i < introText.length; i++) {
//     console.log(introText[i].innerText);
//     console.log(introText[i].innerText.toString());
//     console.log(introText[i].value);
// }


// //scrollBtn 클릭시 포폴첫번쨰(kakao)로 스크롤.
// let scrollBtnSpan = intro.querySelectorAll('.scrollBtn  span');
// for(let i = 0; i < scrollBtnSpan.length; i++) {
//     scrollBtnSpan[i].addEventListener('click', function(e) {
//         console.log(e.target.tagName);
        
//         window.scrollTo(0, 100);
//     }); 
// }


//nav .intro, .portfolio클릭시 해당 위치로 스크롤.
let navBtn = document.querySelectorAll('nav button');
console.log(navBtn);

for(let i = 0; i < navBtn.length; i++) {
    navBtn[i].addEventListener('click', function(e) {
        //.intro
        if(e.target.classList.contains('introBtn')) {
            console.log('intro');
            console.log(e.target.num);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            introReset();
        //.portfolio
        } else if(e.target.classList.contains('portBtn')) {
            console.log('prot');
            window.scrollTo({
                top: contentHeight,
                behavior: 'smooth'
            });
            console.log(document.body.scrollTop);
            
            if(document.body.scrollTop >= contentHeight) {
                setTimeout(function() {
                    portNav.style.opacity = '1';
                    portNav.style.bottom = '-50px';
                    topBtn.style.opacity = '1';
                    topBtn.style.bottom = '30px';
                }, 500)
            }
            //.portfolio부분에서 포폴Btn클릭해서 스크롤시 topBtn이랑 portBtn에 조건걸어줬는데 안됌...ㅠ..... intro에서 한번 스크롤 한 뒤에 눌럿을떄만 뜨게 하려고 하는 건데 조건걸면 안나옴. 조건 안걸면 처음 로딩창에서 페이지는 스크롤되지도 않는데 버튼만 나타남,.....
        }
            
    });
}


//port_nav 버튼 클릭시 해당 포폴 위치로 스크롤되게함.
let portNavBtn = document.querySelectorAll('.port_nav > button');
for(let i = 0; i < portNavBtn.length; i++) {
    portNavBtn[i].addEventListener('click', function() {
        window.scrollTo({          
            top: contentHeight * (i + 1) + (110 * i),
            behavior: 'smooth',
        });
        console.log(contentHeight * (i + 1));      
    });
}

for(let i = 0; i < portListBox.length; i++) {
   window.addEventListener('scroll', function() {
       console.log(window.scrollY);
       console.log(document.body.clientHeight);
       //해당 포폴위치로 스크롤 될 때, port_nav버튼에 배경색 채워줌.
       //만약 스크롤한 위치가 포폴한부분 안에 속해 있디면 색을 줘라
       //전체길이 스크롤한값 
       // 한부분의바닥값 = 전체길이 - (100vh높이(=contentHeight) * (내순서 + 1)) 
       // 한부분의top값 = 전체길이 - (내순서 + 1)
       // top값 < portListBox[i] 하나당 높이범위는 < 바닥값
       let bottom = document.body.clientHeight - (contentHeight * (portListBox[i] + 1));
       let top = document.body.clientHeightt - (portListBox[i] + 1);
       if(top[i] < document.body.scrollTop < bottom[i]) {
           for(let i = 0; i < portNavBtn.length; i++) {
                portNavBtn[i].style.backgroundColor = '#000';
            }
       }
        

        // if(window.scrollY === portListBox[i].scrollTop) {
        //    window.scrollBy(0, contentHeight);        
        // }
        
    }); 
}


//895px 이상에서 적용.
window.addEventListener('load', function() {
    if(window.innerWidth > 895) {
        pcMouseWheel()
    }
});

window.addEventListener('resize', function() {
    if(window.innerWidth > 895) {
        console.log('895보다 크다##');
        pcMouseWheel()
    }  else{
        console.log('895보다 작아졌따!!!!!!!!!!!!!!!');
        !pcMouseWheel();
    }
});

pcMouseWheel();
//intro에서 마우스휠하면 intro의 title 스타일 변경되게(아래로 스트롤은 안됌)
function pcMouseWheel() {
    intro.addEventListener('mousewheel', function(e) {
        if(e.wheelDelta < 0 && htmlEl.scrollTop === 0) {
            main.style.width = '100%'; 
            main.style.margin = '0'; 
            scrollBtn.style.opacity = '0';       
            scrollBtn.style.bottom= '20px';
            footer.style.height = '0';      
            setTimeout(function() {          
                introTitle.style.width = '100%';
                introTitleText.style.left = '200px';          
            },500);
            setTimeout(function() {           
                scrollBtn.style.left = '25px';  
                scrollBtn.style.color = '#1c1b20'; 
                aboutMe.style.opacity = '1'; 
                aboutMe.style.right = '5%'; 
            },900);
            setTimeout(function() {          
                main.style.position = 'static';
                scrollBtn.style.opacity = '1'; 
                scrollBtn.style.position = 'fixed'; 
                scrollBtn.style.bottom = '30px'; 
                    
            },1700);
        } else if(e.wheelDelta < 0 && main.style.width === '100%') {
            window.scrollTo({
                top: contentHeight,
                behavior: 'smooth',
            });
            setTimeout(function() {
                portNav.style.opacity = '1';
                portNav.style.bottom = '-50px';
                topBtn.style.opacity = '1';
                topBtn.style.bottom = '30px';
            }, 1500)
        }
        else if(e.wheelDelta > 0 && intro.scrollTop >= 0) {
            scrollBtn.style.opacity = '0';       
            scrollBtn.style.bottom= '35px';
            aboutMe.style.opacity = '0'; 
            aboutMe.style.right = '-10%'; 
            setTimeout(function() {
                introTitle.style.width = '50%';
                introTitleText.style.left = '50%';
                scrollBtn.style.color = '#1c1b20'; 
                scrollBtn.style.left = 'calc(50% + -30px)'; 
            },500);
            setTimeout(function() {
                main.style.width = 'calc(100% + -110px)'; 
                main.style.margin = '0 55px'; 
                scrollBtn.style.opacity = '1'; 
                scrollBtn.style.bottom = '60px'; 
                footer.style.height = '55px'; 
            },900);
            setTimeout(function() {          
                main.style.position = 'fixed';                     
            },1700);
        }                        
    });
    
     // portfolio중 첫번째에서 스크롤위로 올리면 intro의 title 스타일 원래대로 돌아오게.                
    portFirst.addEventListener('mousewheel', function(e) {
        console.log(e.wheelDelta);
        console.log(portFirst.scrollTop);
            
        if(portFirst.scrollTop === 0 && e.wheelDelta > 3) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });   
            introReset();
        }                     
    });

//topBtn버튼에서도 써야해서 따로 선언해줌.
let introReset = function() {
    portNav.style.opacity = '0';
    portNav.style.bottom = '-20px';
    scrollBtn.style.opacity = '0';       
    scrollBtn.style.bottom= '35px'; 
    aboutMe.style.opacity = '0'; 
    aboutMe.style.right = '-10%'; 
    topBtn.style.opacity = '0';
    topBtn.style.bottom = '0';
    setTimeout(function() {
        introTitle.style.width = '50%';
        introTitleText.style.left = '50%';
    },1300);
    setTimeout(function() {
        main.style.width = 'calc(100% + -110px)'; 
        main.style.margin = '0 55px'; 
        scrollBtn.style.color = '#1c1b20'; 
        scrollBtn.style.left = 'calc(50% + -30px)'; 
        footer.style.height = '55px';  
    },1700);
    setTimeout(function() {          
        main.style.position = 'fixed';
        scrollBtn.style.opacity = '1'; 
        scrollBtn.style.bottom = '60px'; 
    },2100);
}


// top_btn클릭시 화면 상단으로 스크롤되게 함.
topBtn.addEventListener('click', function(e) { 
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    if(window.innerWidth > 895) {
       introReset(); 
    } 
});

} //pcMouseWheel() 끝.

//포폴 img, text에 마웃스오버시 img바뀌게함.
let imgTitle = document.querySelectorAll('.imgTitle > a');
let portText = document.querySelectorAll('.portfolio .text_box');
let portConts = document.querySelectorAll('.portfolio_content');

for(let i = 0; i < imgTitle.length; i++) {
    imgTitle[i].addEventListener('mouseenter', function() {
        portConts[i].classList.add('on');
    });
    imgTitle[i].addEventListener('mouseleave', function() {
        portConts[i].classList.remove('on');
    });
}









// ================수정 전 버전 js=========================
// //.secion_nav button클릭 시 해당 section 보이게함.
// sectionNavJs();
// function sectionNavJs() {  
//     let sectionNavBtn = document.querySelectorAll('.section_nav button');
//     let section = document.querySelectorAll('section');    

// 	for (var i = 0; i < sectionNavBtn.length; i++) {
//         sectionNavBtn[i].addEventListener('click', function (num) {  
//             return function () {  
//                 console.log(num);
//                 for(let j = 0; j < sectionNavBtn.length; j++) {  
//                     sectionNavBtn[j].classList.remove('show'); 
//                     section[j].classList.remove('show'); 
//                 }
//                 sectionNavBtn[num].classList.add('show');
//                 section[num].classList.add('show');
//             }
// 	    } (i));
// 	}
// }

// //section 속 button 클릭시 하단 내용 보이게함.
// sectionBtnJs();
// function sectionBtnJs() {
//     let sectionBtn = document.querySelectorAll('section button > span');
//     let portfolioBox = document.querySelectorAll('.portfolio_list > div');

//     for(let i = 0; i < sectionBtn.length; i++) {
//         sectionBtn[i].addEventListener('click', function(e) {
//             let parentTag = e.target.parentNode.parentNode;  
//             let nextConts = e.target.parentNode.parentNode.children[1];  

//             if( nextConts ) {
//                 if( !parentTag.classList.contains('show') ) {
//                     // portfolioBox[i].classList.remove('show');
//                     parentTag.classList.add('show');
//                 } else  {
//                     parentTag.classList.remove('show');
//                 } 
//             }    
                
//         });
//     }
// }