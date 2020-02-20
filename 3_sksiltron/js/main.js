

//---------------header--------------
let htmlEl = document.querySelector('html');
let header = document.querySelector('header');
let langBox = document.querySelector('.langBox');
let langOther = document.querySelector('.lang_other');
// let langOtherA = langOther.querySelectorAll('a');

headerScript();
gnbBoxScript();

function headerScript() {
    langBox.addEventListener('mouseover', langOtherShow);
    langBox.addEventListener('mouseout', langOtherHide);

    let openedLang;
        
    function langOtherShow(e) {
        if (langOther) {
            langBox.classList.add('active'); 
            openedLang = langOther;
        }  
    }

    function langOtherHide(e) {
        var oldLang = openedLang;

        if (!check(e.relatedTarget)) {
        langBox.classList.remove('active');
        }

        function check(moved) {
            while(moved.tagName !== 'HTML') {
                if (langBox === moved) {
                    return true;
                }
                moved = moved.parentNode;                  
            }
            return false;
        }
        
    }

    window.addEventListener('scroll', function() {
        if (htmlEl.scrollTop > 90) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    });
}


function gnbBoxScript() {
    let gnbBtn = document.querySelector('.gnbBtn');
    let gnbBoxLis = document.querySelectorAll('.gnbBox .main > li'); 

    /*gnbBtn버튼 클릭시 메뉴창 오픈*/
    gnbBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if(header.classList.contains('gnbOpen') === true) {
            header.classList.remove('gnbOpen');
            htmlEl.style.overflow = 'scroll';
        } else {
            header.classList.add('gnbOpen');
            htmlEl.style.overflow = 'hidden';
        }
        
    }); 

    /*gnbBox의 메뉴에 마우스오버시 sub메뉴 보이게함.*/
    for(let i = 0; i < gnbBoxLis.length; i++) {
        gnbBoxLis[i].addEventListener('mouseover', showSub);
        gnbBoxLis[i].addEventListener('mouseout', hideSub);
    }
    
    function showSub(e) {
        if (e.target.tagName === 'A') {
            e.target.parentNode.classList.add('show');   
        }            
    }

    function hideSub(e) {
        if (!check(e.relatedTarget)) {
            for(let i = 0; i < gnbBoxLis.length; i++) {
                gnbBoxLis[i].classList.remove('show'); 
            }
        }
        
        function check(moved) {
            while(moved.tagName !== 'BODY') {
                for(let i = 0; i < gnbBoxLis.length; i++) {
                    if(gnbBoxLis[i] === moved) {
                        return true;
                    }
                }
                moved = moved.parentNode;
            }
            return false;
        }
        
    }
}




//--------------main--------------
//intro
let scrollBtn = document.querySelector('.scrollBtn');  
let otherMain = document.querySelector('.other_main_contents');
let intro = document.querySelector('.intro');
let contentHeight;

scrollBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // let otherMainTop = $(otherMain).offset().top;
    window.scrollTo({
        top : contentHeight,
        behavior : 'smooth'
    });            
}); 

//resize될 때마다 intro-height값 구함.
resize();
function resize() {
    let sizeCheck;
    resizeCheck();
    window.addEventListener('resize', function() {
        this.clearTimeout(sizeCheck);
        sizeCheck = setTimeout(function() {
            resizeCheck();
        }, 100);
    });
    function resizeCheck() {
        contentHeight = window.innerHeight;
        intro.style.height = contentHeight;
        console.log(contentHeight);           
    }   
}



//journey
let journey = document.querySelector('.journey');
 window.addEventListener('scroll', function() {
    if (htmlEl.scrollTop > 1100) {
        journey.classList.add('scroll');
    }
});


//highlights
highLightsShow();

function highLightsShow() {
    let highLightsSlider = document.querySelector('.highlights > .slider');
    let hightLightsLis = highLightsSlider.querySelectorAll('li');

    window.addEventListener('load', function() {               
        highLightsSlider.style.background = "url('images/hightlights01.jpg') no-repeat";
        highLightsSlider.style.backgroundSize = 'cover';
        hightLightsLis[0].classList.add('show');
    });          

    // let showed;

    for(let i = 0; i < hightLightsLis.length; i++) {
        hightLightsLis[i].addEventListener('mouseover', showBg);

        function showBg() {
            remove();
            hightLightsLis[i].classList.add('show');
            highLightsSlider.style.background = `url('images/hightlights0${i + 1}.jpg') no-repeat`;
            highLightsSlider.style.backgroundSize = 'cover';
        }

        function remove() {
            for(let i = 0; i < hightLightsLis.length; i++) {
                hightLightsLis[i].classList.remove('show');
            }                       
        }
    }
}


//people
let people = document.querySelector('.people');

window.addEventListener('scroll', function() {
    if(htmlEl.scrollTop > 2400) {
        people.classList.add('scroll');
    }
});


//network
let officeCountry = document.querySelectorAll('.office_box > span');
let officePhoto = document.querySelectorAll('.office_photo');

for(let i = 0; i < officeCountry.length; i++) {
    officeCountry[i].addEventListener('mouseenter', function() {
        officePhoto[i].classList.add('show');
    }); 
    officeCountry[i].addEventListener('mouseleave', function() {
        officePhoto[i].classList.remove('show');
    });
}




//--------------footer--------------
let footer = document.querySelector('footer');
let siteBtn = document.querySelector('.family_site');
let siteList = document.querySelector('.siteList');
let closeBtn = siteList.querySelector('.closeBtn');
let siteLis = siteList.querySelectorAll('li');

familySiteShow();
familySiteLink();

function familySiteShow() {
    siteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        footer.style.overflow = 'visible';
        siteBtn.style.opacity = '0';
        siteBtn.classList.remove('delay');
        siteList.classList.add('show');
    });

    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        footer.style.overflow = 'hidden';
        siteBtn.style.opacity = '1';
        siteBtn.classList.add('delay');
        siteList.classList.remove('show');
    });
}

function familySiteLink() {
    for(let i = 0; i < siteLis.length; i++) {
        siteLis[i].addEventListener('mouseenter', function() {
            siteLis[i].classList.add('on');   
        });
        siteLis[i].addEventListener('mouseleave', function() {
            siteLis[i].classList.remove('on');
        });
    }

    let sk = siteList.querySelector('.sk');
    sk.addEventListener('mouseenter', function() {
        sk.style.color = '#000';
    });
    sk.addEventListener('mouseleave', function() {
        sk.style.color = '#666';
    });
}




