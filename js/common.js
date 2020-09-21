
let htmlEl = document.querySelector('html');
let portNav = document.querySelector('.port_nav');
let portNavBtn = document.querySelectorAll('.port_nav  button');
let navBtn = document.querySelectorAll('nav button');
let wrap = document.querySelector('.wrap');
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
let loadingView = document.querySelector('.loadingView');


// ******(100vh일때)resize될때마다 height값 찾기.******
let vhHeight;
let introHeight;
let portHeight;
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
    }
}
console.log(portfolio.offsetTop);

// ******resize끝******



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
 
                window.scrollTo({
                    top: introHeight,
                    behavior: 'smooth'
                });
                // console.log(document.body.scrollTop);
            }              
        });
    }


    //port_nav 버튼 클릭시 해당 포폴 위치로 스크롤되게함. + 클릭한 버튼 색채움.
    for(let i = 0; i < portNavBtn.length; i++) {
        portNavBtn[i].addEventListener('click', function(e) { 
            if(e.target.classList.contains('jsNav')) {           
                window.scrollTo({          
                    top: introHeight + (portHeight * i) + 200/* introHeight * (i + 1) + (110 * i) + h2(274px)*/,
                    behavior: 'smooth',
                });
            }
            if(e.target.classList.contains('portNav')) {
                window.scrollTo({          
                    top: introHeight + (portHeight * i) + 200 + 300,
                    behavior: 'smooth',
                });
            }
            console.log(portHeight * (i + 1));     
        });

        // portNum++;
        

        //해당 포폴위치로 스크롤 될 때, port_nav버튼에 배경색 채워줌.
        window.addEventListener('scroll', function() {
            for(let i = 0; i < portNavBtn.length; i++) {
                console.log(window.scrollY);
                
                if(window.scrollY >= introHeight + (portHeight * i) + 200/*(portHeight * i)*/) {
                    for(let i = 0; i < portNavBtn.length; i++) {
                        portNavBtn[i].classList.remove('show');
                    }  
                    portNavBtn[i].classList.add('show');                
                }              
            }          
        }); 
    }    
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


//화면 loading이 다 될때까지 보여지는 로딩화면.
window.onload = function() {
    this.setTimeout(function() {
        loadingView.style.opacity = 0;
        setTimeout(function() {
            loadingView.style.display = 'none';
        }, 100)
    }, 0)
}







