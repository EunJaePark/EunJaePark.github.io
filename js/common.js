
let htmlEl = document.querySelector('html');
let main = document.querySelector('main')
let intro = document.querySelector('.intro');
let introTitle = intro.querySelector('.title_box');
let introTitleText = introTitle.querySelector('.title');
let scrollBtn = intro.querySelector('.scrollBtn');
let aboutMe = intro.querySelector('.aboutMe');
let portFirst = document.querySelector('.portListBox:first-child');
let footer = document.querySelector('footer');

//페이지 접속하면 intro 글자 나오게함.
let introText = introTitle.querySelectorAll('span');
console.log(introText);
for(let i = 0; i < introText.length; i++) {
    console.log(introText[i].innerText);
    console.log(introText[i].innerText.toString());
    console.log(introText[i].value);
}




//intro에서 마우스휠하면 intro의 title 스타일 변경되게(아래로 스트롤은 안됌)
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
    scrollBtn.style.opacity = '0';       
        scrollBtn.style.bottom= '35px'; 
        aboutMe.style.opacity = '0'; 
        aboutMe.style.right = '-10%'; 
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




// top_btn클릭시 화면 상단으로 스크롤되게 함.
let topBtn = document.querySelector('.top_btn');

topBtn.addEventListener('click', function(e) { 
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    introReset();
});


//scrollBtn, topBtn 화살표 계속 움직이게하기.



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