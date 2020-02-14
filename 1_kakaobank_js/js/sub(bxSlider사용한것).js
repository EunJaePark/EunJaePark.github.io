//------------header------------
window.addEventListener('scroll', scrollHeaderBg);
    var htmlEl = document.querySelector('html');
    var header = htmlEl.querySelector('header');

    //스크롤시 header 배경색, 글씨색 변경
    function scrollHeaderBg() {
        var top = htmlEl.scrollTop;
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




//------------main------------
//.img_slide 배경이미지 추가.
    let bgBoxes = document.querySelectorAll('.img_slide > .bgBox');
            
    for(let i = 0; i < bgBoxes.length; i++) {
        //bgBox에 bgImage주기.
        bgBoxes[i].style.background = `url('images/img_${i + 1}_20180109.jpg') no-repeat -0px -220px`;
        bgBoxes[i].style.backgroundSize = `105%`;
    }

//.img_slide slider(바닐라js)
    let SHOW_CLASS = 'show';
    let firstSlide = document.querySelector('.bgBox:first-child');
    function slide() {
        let currentSlide = document.querySelector(`.${SHOW_CLASS}`);
        if(currentSlide) {         
            window.setTimeout(function() {
                currentSlide.classList.remove(SHOW_CLASS);
            }, 800);
            let nextSlider = currentSlide.nextElementSibling;
            if(nextSlider) {              
                nextSlider.classList.add(SHOW_CLASS);
            } else {
                firstSlide.classList.add(SHOW_CLASS);
            }
        } else{
            firstSlide.classList.add(SHOW_CLASS);
        }
        
        
    }
    slide();
    setInterval(slide, 2500);

    // 마지막 슬라이드에서 처음슬라이드로 넘어갈 때, 배경이미지 움직임이 반대로 작동.

    


//brand_video
    //video마다 해당비디오이미지 넣기.
    let videoImg = document.querySelectorAll('.slide_box > .video > a');
    for(let i = 0; i < videoImg.length; i++) {
        videoImg[i].style.background = `url('images/brand_movie_${i + 1}.jpg') no-repeat`;
    }

    $(document).ready( function() {
        var option = {
            maxSlides : 3,
            slideWidth : 306,
            infiniteLoop : false,
            slideMargin : 16,
            moveSlides : 1,
        };
        $('.slide_box').bxSlider( option );
    } );