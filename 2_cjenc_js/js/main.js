//------------header------------
    var htmlEl = document.querySelector('html');
    var header = htmlEl.querySelector('header');
    var gnb = header.querySelector('ul.gnb');
    var lang = header.querySelector('div.lang');

    pcScreen();
    phoneScreen();

    function pcScreen() {
        //스크롤시 header 배경색 하얗게. + 글자색 변경
        window.addEventListener('scroll', scrollWork);

        function scrollWork() {
            var top = htmlEl.scrollTop;
            console.log(window.innerWidth);
            if (window.innerWidth > 800) {
                if (top > 1000) {
                    header.classList.add('bg');
                    gnb.classList.add('black');
                    lang.classList.add('black');
                    gnb.classList.remove('white');
                }
                if (top < 1000) {
                    header.classList.remove('bg');
                    gnb.classList.remove('black');
                    lang.classList.remove('black');
                    gnb.classList.add('white');
                }
            } else {
                if (top > 50) {
                    header.classList.add('bg', 'on799');
                }
                if (top < 50) {
                    header.classList.remove('bg', 'on799');
                }

            }
        }


        //마우스오버시 header 전체 보이게함(서브메뉴보임+흰배경길어짐)
        var menu = header.querySelectorAll('ul.gnb > li');

        for(var i = 0; i < menu.length; i++) {
            menu[i].addEventListener('mouseenter', enterWork);
            menu[i].addEventListener('mouseleave', leaveWork);
        }

        function enterWork(e) {
            var submenu = e.target.querySelector('div.submenu_box');
                header.classList.add('on', 'bg');
                header.classList.add('bg');
                gnb.classList.add('black');
            }
            function leaveWork(e) {
                var submenu = e.target.querySelector('div.submenu_box');
                var top = htmlEl.scrollTop;
                // if(submenu) {
                    header.classList.remove('on', 'bg');
                // }
                header.classList.remove('bg');
                gnb.classList.remove('black');

                if (top > 1000) {
                    header.classList.add('bg');
                }
            }

            // lang
            // 만약에 click이 있으면 click을 지우고
            // 만약에 click이 없으면 click을 넣어라
            var langBtn = lang.querySelector('a');
            langBtn.addEventListener('click', function(e){
                e.preventDefault();
                if (lang.classList.contains('click')) {
                    lang.classList.remove('click');
                } else {
                    lang.classList.add('click');
                }
            });
            
        }
        


        function phoneScreen() {
            //799px 이하인 폰화면에서 햄버거커튼 클릭시 메뉴창보이게함.
            var navBtn799 = document.querySelector('a.nav_btn_open');    
            navBtn799.addEventListener('click', openWork);

            function openWork(e) {
                e.preventDefault();
                header.classList.add('on799', 'show');
                htmlEl.style.overflow = 'hidden';
                if (innerWidth > 799) {
                    htmlEl.style.overflow = 'scroll';
                }
            }

            //799px 이하인 폰화면에서 메뉴닫기버튼 클릭시 메뉴창닫음.
            var closeBtn799 = document.querySelector('a.nav_btn_close');
            closeBtn799.addEventListener('click', closeWork);

            function closeWork(e) {
                e.preventDefault();
                header.classList.remove('on799', 'show');
                htmlEl.style.overflow = 'scroll';
                
                closeBtn799.addEventListener('click', function() {
                    var top = htmlEl.scrollTop;
                    console.log(top);
                    
                    if (top > 50) {
                        header.classList.add('on799');
                    }
                })
                
            }
        }
        



//------------main------------
//intro
    introSlider();

    function introSlider() {
        
        var introBoxes = document.querySelectorAll('.img_text_box');
        //intro 4페이지 slider
        $(document).ready(function() {
            let introslide = $('.introSlider').bxSlider();

            sliderSetting(window.innerWidth);
            window.addEventListener('resize', function() {
                sliderSetting(window.innerWidth);
            });

            function sliderSetting(w) {
                if (window.innerWidth < 799) {
                    introslide.reloadSlider({
                        mode : 'fade',
                        speed : 1000,
                        infiniteLoop : true,
                        auto : true,
                        pause : 5000  
                    });
                } else {
                    introslide.reloadSlider({
                        mode : 'fade',
                        speed : 1000,
                        infiniteLoop : true,
                        auto : true,
                        pause : 5000,
                        onSlideAfter : function(){
                            //video위에 있는 text 나타날때 효과.
                            var num = this.getCurrentSlide();
                            console.log(num);
                            if (num === 4) {
                                num = 0;
                            }
                            for(var i = 0; i < introBoxes.length; i++) {
                                introBoxes[i].classList.remove('active');
                            }
                            introBoxes[num].classList.add('active');  
                        },
                        onSliderLoad : function() {
                            //사이트 load시 intro1 - video위에 있는 text 나타날때 효과.
                            introBoxes[0].classList.add('active');
                        }    
                    });
                }
            }
        })

        //2번째페이지가 상단에오면 intro내용 안보이게.
        window.addEventListener('scroll', scrollWork_intro);
        var introInners = document.querySelectorAll('.intro div.inner');
        var introBtn = document.querySelector('div.page_btn');
           
        function scrollWork_intro() {
            var top = htmlEl.scrollTop;
            console.log(top);

            if (top > 500) {
                for(var i = 0; i < introInners.length; i++) {
                    introInners[i].style.opacity = '0';
                    introInners[i].style.transition = 'all .5s ease-out';
                    introBtn.style.opacity = '0';
                }
            }
            if (top < 500) {
                for (var i = 0; i < introInners.length; i++) {
                    introInners[i].style.opacity = '1';
                    introInners[i].style.transition = 'all .5s ease-out'
                    introBtn.style.opacity = '1';
                }
            }
        }
    }


//building
    window.addEventListener('scroll', scrollWork_bd);

    function scrollWork_bd() {
        var top = htmlEl.scrollTop;
        var buildings = htmlEl.querySelectorAll('div.building > div > ul > li')

        for(var i = 0; i < buildings.length; i++) {
            console.log(window.innerWidth);
            if (window.innerWidth < 1281) {
                if (top > 1500) {
                    buildings[i].classList.add('up');
                }
            }

            if (top > 1650) {
                buildings[i].classList.add('up');
            }
            if (top < 1350) {
                buildings[i].classList.remove('up');
            }
        }
    }




//------------footer------------
//footer의 'CJ그룹 계열사 바로가기' 버튼 클릭시.
    var cjBtn = document.querySelector('ul.footer2 > li:nth-child(2)')
    var cjBtnA = cjBtn.querySelector('a');

    cjBtnA.addEventListener('click', function(e) {
        e.preventDefault();
        if(cjBtn.classList.contains('click')) {
            cjBtn.classList.remove('click');
        } else {
            cjBtn.classList.add('click');
        }
    })


//top버튼 클릭시 상단으로 스크롤이동.
    let topBtn = document.querySelector('.top_btn');

    topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top : 0,
            behavior : 'smooth'
        });
    });


//799px일때 우측하단버튼
    var btn799 = document.querySelector('div.phone_btn > a.phone_btn_show');
    var btn400Sub = document.querySelector('div.phone_btn > div.phone_btn_sub');

    //우측하단 '사업분야'버튼 클릭시 버튼 3개 보이게.
    btn799.addEventListener('click', function(e) {
        e.preventDefault();
        btn799.parentNode.className = 'phone_btn click';
    });

    //close btn 클릭시 버튼3개 안보이게.
    var closeBtn = btn400Sub.querySelector('a.close');
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        btn799.parentNode.className = 'phone_btn close';
    });
        
        
        






