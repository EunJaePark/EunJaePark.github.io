
let htmlEl = document.querySelector('html');
let portNav = document.querySelector('.port_nav');
let portNavBtn = document.querySelectorAll('.port_nav > button');
let navBtn = document.querySelectorAll('nav button');
// let main = document.querySelector('main')
let intro = document.querySelector('.intro');
// let introTitle = intro.querySelector('.title_box');
// let introTitleText = introTitle.querySelector('.title');
let scrollBtn = intro.querySelector('.scrollBtn');
// let aboutMe = intro.querySelector('.aboutMe');
let portfolio = document.querySelector('.portfolio');
let portListBox = document.querySelectorAll('.portListBox');
// let portFirst = document.querySelector('.portListBox:first-child');
// let footer = document.querySelector('footer');
let topBtn = document.querySelector('.top_btn');


// ******(100vh일때)resize될때마다 height값 찾기.******
let vhHeight;
let portHeight;
let introHeight;
resize();
function resize() {
    let sizeCheck;  
    resizeHeight();

    window.addEventListener('resize', function resizeWork() {
        this.clearTimeout(sizeCheck);
        sizeCheck = setTimeout(function() {
            resizeHeight();
        }, 100);
    });

    function resizeHeight() {
        vhHeight = window.innerHeight;
        console.log(`vhHeight(현재창세로높이) : ${vhHeight}`); 
        introHeight = intro.clientHeight;
        console.log(`introHeight(intro높이) : ${introHeight}`);
        
        for(let i = 0; i < portListBox.length; i++) {
            portHeight = portListBox[i].clientHeight; 
        }
        console.log(`portHeight(포폴칸높이) : ${portHeight}`); 
        
        //height이 800px 이하일 경우에는 800으로 vhHeight 정해줌.(portfolio내용이 뒤죽박죽되기 때문에 정해준것) 
        // if(vhHeight < 800) {
        //     vhHeight = 800;
        // }     
    }
}
console.log(portfolio.offsetTop);

// ******resize끝******

// // ******(portListBox)resize될때마다 height값 찾기.******
// let portHeight;
// resize();
// function resize() {
//     let sizeCheck;  
//     resizeHeight();

//     window.addEventListener('resize', function resizeWork() {
//         this.clearTimeout(sizeCheck);
//         sizeCheck = setTimeout(function() {
//             resizeHeight();
//         }, 100);
//     });

//     function resizeHeight() {
//         portHeight = portListBox.innerHeight;
//         console.log(portHeight); 
//         //height이 800px 이하일 경우에는 800으로 vhHeight 정해줌.(portfolio내용이 뒤죽박죽되기 때문에 정해준것) 
//         // if(portHeight < 800) {
//         //     portHeight = 800;
//         // }     
//     }
// }
// console.log(portfolio.offsetTop);

// // ******resize끝******


// .portfolio로 스크롤하면 header 고정되게 함.
let header = document.querySelector('header');
console.log(intro.clientHeight);

window.addEventListener('scroll', function() {
    let scrollValue = document.documentElement.scrollTop ;
    if(scrollValue > 20/*intro.clientHeight*/) {
        header.classList.add('fixed');
        header.classList.add('fixed2');
        scrollBtn.classList.add('hide');
        topBtn.classList.add('show');
    } else /*if(scrollValue < intro.clientHeight)*/ {
        header.classList.remove('fixed');
        header.classList.remove('fixed2');     
        scrollBtn.classList.remove('hide');
        topBtn.classList.remove('show'); 
    }
    if(scrollValue > intro.clientHeight) {
        portNav.classList.add('fixed');
    } else if(scrollValue < intro.clientHeight) {
        this.setTimeout(function() {
            portNav.classList.remove('fixed');
        }, 500);
    }
});



// //895px 이상에서 적용. //895px 이하에서 적용.
// window.addEventListener('load', function() {
//     if(window.innerWidth > 895) {
//         pcMouseWheel()
//     }
//     if(window.innerWidth < 895) {
//         phoneScript()
//     }
// });
// //resize시 895px이상, 이하별로 js 다르게 주기.
// window.addEventListener('resize', function() {
//     if(window.innerWidth > 895) {
//         console.log('895보다 크다##');
//         pcMouseWheel()
//     }  else {
//         console.log('895보다 작아졌따!!!!!!!!!!!!!!!');
//         phoneScript();
//     }
// });

pcMouseWheel();
function pcMouseWheel() {

    //nav .intro, .portfolio클릭시 해당 위치로 스크롤.
    for(let i = 0; i < navBtn.length; i++) {
        navBtn[i].addEventListener('click', function(e) {
            //.intro
            if(e.target.classList.contains('introBtn')) {                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                // introReset();
            //.portfolio
            } else if(e.target.classList.contains('portBtn')) {
                // scrollStyle();
                header.classList.add('fixed');
                setTimeout(function() {
                    topBtn.classList.add('show');
                }, 1000)
                // portNavBtn[0].style.backgroundColor = '#000';  
                window.scrollTo({
                    top: introHeight,
                    behavior: 'smooth'
                });
                // portNav.classList.add('fixed');
                console.log(document.body.scrollTop);
                
                // if(document.body.scrollTop >= vhHeight) {
                //     header.classList.add('fixed');
                //     setTimeout(function() {
                //         topBtn.classList.add('show');
                //     }, 500)
                // }
            }
                
        });
    }

    portNum = 1; //portfolio갯수 세기 위함.
    for(let i = 0; i < portNavBtn.length; i++) {
        //port_nav 버튼 클릭시 해당 포폴 위치로 스크롤되게함. + 클릭한 버튼 색채움.
        portNavBtn[i].addEventListener('click', function() {
            window.scrollTo({          
                top: introHeight + (portHeight * i) + 200/* introHeight * (i + 1) + (110 * i) + h2(274px)*/,
                behavior: 'smooth',
            });
            console.log(portHeight * (i + 1));     
        });
        
        portNum++;
        

        //해당 포폴위치로 스크롤 될 때, port_nav버튼에 배경색 채워줌.
        window.addEventListener('scroll', function() {
            for(let i = 0; i < portNavBtn.length; i++) {
                if(window.scrollY === (portHeight * i)) {
                    for(let i = 0; i < portNavBtn.length; i++) {
                        portNavBtn[i].classList.remove('show');
                    }                  
                }
                portNavBtn[i].classList.add('show');
            }
            // let scrollValue = document.documentElement.scrollTop || document.body.scrollTop;
            // let colorRemove = function() {
            //     for(let i = 0; i < portNavBtn.length; i++) {
            //         portNavBtn[i].style.backgroundColor = 'transparent';
            //     }
            // }
            // for(let i = 0; i < portNavBtn.length; i++) {  
            //     if(scrollValue > (vhHeight * 1)) {
            //         colorRemove();          
            //         portNavBtn[0].style.backgroundColor = '#4A41AB';           
            //     }  
            //     if(scrollValue > (vhHeight * 2)) {
            //         colorRemove();             
            //         portNavBtn[1].style.backgroundColor = '#4A41AB';
            //     } 
            //     if(scrollValue > (vhHeight * 3)) {
            //         colorRemove();             
            //         portNavBtn[2].style.backgroundColor = '#4A41AB';
            //     }
            //     if(scrollValue > (vhHeight * 4)) {
            //         colorRemove();             
            //         portNavBtn[3].style.backgroundColor = '#4A41AB';
            //     }
            //     if(scrollValue > (vhHeight * 5)) {
            //         colorRemove();             
            //         portNavBtn[4].style.backgroundColor = '#4A41AB';
            //     }
            // }
        }); 
    }

//     // portfolio중 첫번째에서 스크롤위로 올리면 intro의 title 스타일 원래대로 돌아오게.     
//     portFirst.addEventListener('mousewheel', function(e) {
//         console.log(e.wheelDelta);
//         console.log(portFirst.scrollTop);
            
//         if(portFirst.scrollTop === 0 && e.wheelDelta > 3) {
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth',
//             });   
//             introReset();
//         }                     
//     });

//     //'intro에서 scroll했을 때, 테두리 등의 style변경'하는 함수 선언.(여기저기에 쓸것임.)
//     let scrollStyle = function() {
//         main.style.width = '100%'; 
//         main.style.margin = '0'; 
//         scrollBtn.style.opacity = '0';       
//         scrollBtn.style.bottom= '20px';
//         footer.style.height = '0';      
//         setTimeout(function() {          
//             introTitle.style.width = '100%';
//             introTitleText.style.left = '200px';          
//         },500);
//         setTimeout(function() {           
//             scrollBtn.style.left = '25px';  
//             scrollBtn.style.color = '#1c1b20'; 
//             aboutMe.style.opacity = '1'; 
//             aboutMe.style.right = '5%'; 
//         },900);
//         setTimeout(function() {          
//             main.style.position = 'static';
//             scrollBtn.style.opacity = '1'; 
//             scrollBtn.style.position = 'fixed'; 
//             scrollBtn.style.bottom = '30px'; 
                
//         },1700);
//     }

//     //topBtn버튼에서도 써야해서 따로 선언해줌.
//     let introReset = function() {
//         portNav.style.opacity = '0';
//         portNav.style.bottom = '-20px';
//         scrollBtn.style.opacity = '0';       
//         scrollBtn.style.bottom= '35px'; 
//         aboutMe.style.opacity = '0'; 
//         aboutMe.style.right = '-10%'; 
//         topBtn.style.opacity = '0';
//         topBtn.style.bottom = '0';
//         setTimeout(function() {
//             introTitle.style.width = '50%';
//             introTitleText.style.left = '50%';
//         },1300);
//         setTimeout(function() {
//             main.style.width = 'calc(100% + -110px)'; 
//             main.style.margin = '0 55px'; 
//             scrollBtn.style.color = '#1c1b20'; 
//             scrollBtn.style.left = 'calc(50% + -30px)'; 
//             footer.style.height = '55px';  
//         },1700);
//         setTimeout(function() {          
//             main.style.position = 'fixed';
//             scrollBtn.style.opacity = '1'; 
//             scrollBtn.style.bottom = '60px'; 
//         },2100);
//     }

//     // top_btn클릭시 화면 상단으로 스크롤되게 함.
//     topBtn.addEventListener('click', function(e) { 
//         e.preventDefault();
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth',
//         });
//         if(window.innerWidth > 895) {
//         introReset(); 
//         } 
//     });

//     //.portfolio마지막 페이지 가면 .scrollBtn버튼 사라지게함.  
//     window.addEventListener('scroll', function() {
//         let scrollValue = document.documentElement.scrollTop || document.body.scrollTop;
//         if(scrollValue > (vhHeight * portListBox.length)) {     
//             scrollBtn.style.opacity = '0';
//         } else {
//             scrollBtn.style.opacity = '1';
//         }
//     });
    
} //pcMouseWheel() 끝.



// phoneScript();
function phoneScript() { 
    window.addEventListener('scroll', function() {
        let scrollValue = document.documentElement.scrollTop || document.body.scrollTop;

        //.portfolio부분 시작되면 top_btn보이게 함. {
        if(scrollValue > vhHeight) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }

        //.portfolio마지막 페이지 가면 .scrollBtn버튼 사라지게함.
        if(scrollValue > (vhHeight * (portListBox.length - 0.5))) {
            scrollBtn.classList.add('hide');
        } else {
            scrollBtn.classList.remove('hide');
        }     
        

        //nav .intro, .portfolio클릭시 해당 위치로 스크롤.
        for(let i = 0; i < navBtn.length; i++) {
            navBtn[i].addEventListener('click', function(e) {
                //.intro
                if(e.target.classList.contains('introBtn')) {                  
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                //.portfolio
                } else if(e.target.classList.contains('portBtn')) {
                    window.scrollTo({
                        top: vhHeight,
                        behavior: 'smooth'
                    });
                }                  
            });
        }

        //.top_btn 누르면 top으로 스크롤.
        topBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    });
    
} //phoneScript() 끝.






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







