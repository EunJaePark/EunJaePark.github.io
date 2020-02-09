
//----------header------------
window.addEventListener('scroll', scrollHeaderBg);
    var htmlEl = document.querySelector('html');
    var header = htmlEl.querySelector('header');
        
    //스크롤시 header 배경색, 글씨색 변경
    function scrollHeaderBg() {
        var top = htmlEl.scrollTop;
        // console.log(top);
        if (top > 50) {
            header.classList.add('on');        
        }
        if (top < 51) {
            header.classList.remove('on');
        }
    }


    //메뉴에 마우스오버시 header 배경색, 글씨색 변경
    var liEls = htmlEl.querySelectorAll('.submenu_box');

    overMenu();

    function overMenu() {
        header.addEventListener('mouseover', overWork);
        header.addEventListener('mouseout', outWork);

        var openedSub;

        function overWork(e) {
            if (e.target.tagName !== 'A') return;

            var subBox = e.target.parentNode.querySelector('div.submenu_box');

            if (subBox) {
                subBox.classList.add('active');
                header.classList.add('on');
                openedSub = subBox;
            } 
        }

        function outWork(e) {         
            if (e.relatedTarget === null || openedSub === undefined) return;   
            var oldSub = openedSub;  

            if(e.relatedTarget.className === 'link') {
                oldSub.classList.remove('active');
            }

            if (!check( e.relatedTarget)) { //메뉴+서브메뉴 전체를 감싼 큰 통이랑 릴레이티드타겟이랑 비교해라.
                openedSub.classList.remove('active');
                header.classList.remove('on');
            } 

            function check(moved) {            
                while(moved.tagName !== 'HTML') {
                    if (header === moved) {
                        return true;
                    } 
                    moved = moved.parentNode;
                }
                return false;
            }

            var top = htmlEl.scrollTop;
            if(top > 50) {
                header.classList.add('on');
            }
        }
    }




//----------main------------
//deposit
    var depositImg = document.querySelector('img.deposit_move_img');

    window.addEventListener('scroll', scrollWork_deposit);

    function scrollWork_deposit() {
        var top = htmlEl.scrollTop;

        if (top > 800) {
            depositImg.classList.add('scroll_move');
        }
        if (top > 2115 || top < 670) {
            depositImg.classList.remove('scroll_move');
        }
    }


//wu
    var wuImg = document.querySelector('div.wu > div > img');

    window.addEventListener('scroll', scrollWork_wu);

    function scrollWork_wu() {
        var top = htmlEl.scrollTop;
        console.log(top);

        if (top > 3200) {
            wuImg.classList.add('scroll_move');
        }
        if (top > 4500 || top < 2912) {
            wuImg.classList.remove('scroll_move')
        }
            
    }


//loan
    var loan = document.querySelector('div.loan');
    var loan_bg = loan.querySelector('div.scroll_bg');
    var sunMoon = loan.querySelector('div.sun_moon > .moon');
    var moonShadow = loan.querySelector('div.moon_shadow');
    var stars = loan.querySelectorAll('div.star');

    window.addEventListener('scroll', scrollWork_loan);

    function scrollWork_loan() {
        var top = htmlEl.scrollTop;
            
        if (top > 4220) {
            loan_bg.classList.add('scroll_move');
            sunMoon.classList.add('moon_white');
            moonShadow.classList.add('move');
            for(var i = 0; i < stars.length; i++) {
                stars[i].classList.add('show', 'twinkle');
            }
        }
        if (top > 5420 || top < 3692) {
            loan_bg.classList.remove('scroll_move');
            sunMoon.classList.remove('moon_white');
            moonShadow.classList.remove('move');
            for(var i = 0; i < stars.length; i++) {
                stars[i].classList.remove('show', 'twinkle');
            }
        }
            
    }


//checkcard
    $(document).ready( function() {
        var slideLis = document.querySelectorAll('.card_box > ul > li');
        var imgs = document.querySelectorAll('.card_box img')  
        var num;
        var bigImg;
        
    
        $('.card_box > ul').bxSlider( {
            minSlides : 3,
            maxSlides : 3,
            slideWidth : 280,
            slideMargin : 0,
            moveSlides : 1,
            infiniteLoop : true,
            onSlideBefore : function(/*oldIndex, newIndex*/){
                // console.log(oldIndex, newIndex)
                num = this.getCurrentSlide() + 1;
                // console.log(this.getCurrentSlide())

                if (num === 4) {
                    num = 0
                }
                
                for (var i = 0; i < slideLis.length; i++) {
                    slideLis[i].classList.remove('active');
                }
                console.log(num);
                slideLis[num].classList.add('active');
            },
            onSliderLoad: function() {
                // for (var i = 0; i < slideLis.length; i++) {
                //     slideLis[i].style.width = '240px';
                //     slideLis[i + 1].style.marginLeft = '-70px';
                // }
                slideLis[1].classList.add('active');
            }
        });
    });

