let htmlEl = document.querySelector("html");
let portNav = document.querySelector(".port_nav");
let portNavBtn = document.querySelectorAll(".port_nav  button");
let portNavBtnArr = [];
for (let i = 0; i < portNavBtn.length; i++) {
  portNavBtnArr.push(portNavBtn[i]);
}
let navBtn = document.querySelectorAll("nav button");
let wrap = document.querySelector(".wrap");
// let main = document.querySelector('main')
let intro = document.querySelector(".intro");
// let introTitle = intro.querySelector('.title_box');
// let introTitleText = introTitle.querySelector('.title');
let scrollBtn = intro.querySelector(".scrollBtn");
// let aboutMe = intro.querySelector('.aboutMe');
let portfolio = document.querySelector(".portfolio");
let portListBox = document.querySelectorAll(".portListBox");
// let portFirst = document.querySelector('.portListBox:first-child');
// let footer = document.querySelector('footer');
let topBtn = document.querySelector(".top_btn");
let loadingView = document.querySelector(".loadingView");

// ******(100vh일때)resize될때마다 height값 찾기.******
let vhWidth;
let vhHeight;
let introHeight;
let portHeightPC; // 1040px 이상일 때 포폴박스 높이.
let portHeight = []; // 1040px 이하일 때 포폴박스 높이 배열.
resize();
function resize() {
  let sizeCheck;
  resizeHeight();

  window.addEventListener("resize", function resizeWork() {
    this.clearTimeout(sizeCheck);
    sizeCheck = setTimeout(function () {
      resizeHeight();
    }, 100);
  });

  function resizeHeight() {
    vhWidth = window.innerWidth;
    vhHeight = window.innerHeight;
    introHeight = intro.clientHeight;
    console.log(
      `vhWidth(현재창가로폭) : ${vhWidth}, vhHeight(현재창세로높이) : ${vhHeight}, introHeight(intro높이) : ${introHeight}`
    );

    console.log(portListBox.length);
    for (let i = 0; i < portListBox.length; i++) {
      // portHeight = portListBox[i].clientHeight;
      console.log(
        `portHeight.length: ${portHeight.length}, portHeight: ${portHeight}`
      );

      // 1040px보다 작으면서 배열이 비었을 경우.
      if (
        (vhWidth < 1040 && portHeight.length === 0) ||
        portHeight.length === 1
      ) {
        portHeight.push(portListBox[i].offsetHeight);
      }
      // 1040px보다 작으면서 배열에 객체가 있을 경우.
      if (vhWidth < 1040 && portHeight.length > 1) {
        // portHeight = [];
        portHeight.push(portListBox[i].offsetHeight);
      }
      // 1040px보다 클 경우.
      if (vhWidth > 1040) {
        portHeightPC = portListBox[i].offsetHeight;
      }
    }
    console.log(`portHeight(포폴칸높이) : ${portHeight} ${portHeightPC}`);
  }
}
console.log(portfolio.offsetTop);

// ******resize끝******

// .portfolio로 스크롤하면 header 고정되게 함.
let header = document.querySelector("header");
console.log(intro.clientHeight);

window.addEventListener("scroll", function () {
  let scrollValue = document.documentElement.scrollTop;
  if (scrollValue > 20 /*intro.clientHeight*/) {
    header.classList.add("fixed");
    header.classList.add("fixed2");
    scrollBtn.classList.add("hide");
    topBtn.classList.add("show");
  } /*if(scrollValue < intro.clientHeight)*/ else {
    header.classList.remove("fixed");
    header.classList.remove("fixed2");
    scrollBtn.classList.remove("hide");
    topBtn.classList.remove("show");
  }
  if (scrollValue > intro.clientHeight) {
    portNav.classList.add("fixed");
    header.classList.add("fixedShowPortNav");
    navBtn[0].classList.remove("select");
    navBtn[1].classList.add("select");
  } else if (scrollValue < intro.clientHeight) {
    navBtn[0].classList.add("select");
    navBtn[1].classList.remove("select");
    this.setTimeout(function () {
      portNav.classList.remove("fixed");
      header.classList.remove("fixedShowPortNav");
    }, 500);
  }
});

pcMouseWheel();
function pcMouseWheel() {
  //nav .intro, .portfolio클릭시 해당 위치로 스크롤.
  for (let i = 0; i < navBtn.length; i++) {
    navBtn[i].addEventListener("click", function (e) {
      //.intro
      if (e.target.classList.contains("introBtn")) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        // introReset();
        //.portfolio
      } else if (e.target.classList.contains("portBtn")) {
        // scrollStyle();
        header.classList.add("fixed");
        setTimeout(function () {
          topBtn.classList.add("show");
        }, 1000);

        window.scrollTo({
          top: introHeight,
          behavior: "smooth",
        });
        // console.log(document.body.scrollTop);
      }
    });
  }

  //port_nav 버튼 클릭시 해당 포폴 위치로 스크롤되게함. + 클릭한 버튼 색채움.
  for (let i = 0; i < portNavBtn.length; i++) {
    portNavBtn[i].addEventListener("click", function (e) {
      console.log(vhHeight);
      console.log(e.target.innerText);
      // 1040px보다 작을 경우.
      if (
        vhWidth < 1040 &&
        e.target.innerText.substring(0, 2) ===
          portNavBtnArr[i].innerText.substring(0, 2)
      ) {
        if (e.target.classList.contains("jsNav")) {
          window.scrollTo({
            // top: introHeight + (portHeight * i) + 200/* introHeight * (i + 1) + (110 * i) + h2(274px)*/,
            top: introHeight + portHeight[i] * i + 200,
            behavior: "smooth",
          });
        } else if (e.target.classList.contains("portNav")) {
          window.scrollTo({
            top: introHeight + portHeight[i] * i + 200 + 300,
            behavior: "smooth",
          });
        }
      }
      // 1040px보다 클 경우.
      if (
        vhWidth > 1040 &&
        e.target.innerText.substring(0, 2) ===
          portNavBtnArr[i].innerText.substring(0, 2)
      ) {
        if (e.target.classList.contains("jsNav")) {
          window.scrollTo({
            top:
              introHeight +
              portHeightPC * i +
              200 /* introHeight * (i + 1) + (110 * i) + h2(274px)*/,
            behavior: "smooth",
          });
        } else if (e.target.classList.contains("portNav")) {
          window.scrollTo({
            top: introHeight + portHeightPC * i + 200 + 300,
            behavior: "smooth",
          });
        }
      }
      console.log(
        `클릭한 포폴 높이: ${introHeight + portHeight[i] * i + 200} ${
          introHeight + portHeightPC * i + 200
        }`
      );
    });

    // portNum++;

    //해당 포폴위치로 스크롤 될 때, port_nav버튼에 배경색 채워줌.
    window.addEventListener("scroll", function () {
      for (let i = 0; i < portNavBtn.length; i++) {
        // console.log(window.scrollY);

        // 1040px보다 작을 경우.
        if (
          vhWidth < 1040 &&
          window.scrollY >= introHeight + portHeight[i] * i /*(portHeight * i)*/
        ) {
          for (let i = 0; i < portNavBtn.length; i++) {
            portNavBtn[i].classList.remove("show");
          }
          portNavBtn[i].classList.add("show");
        }
        // 1040px보다 클 경우.
        if (
          vhWidth > 1040 &&
          window.scrollY >=
            introHeight + portHeightPC * i + 100 /*(portHeight * i)*/
        ) {
          for (let i = 0; i < portNavBtn.length; i++) {
            portNavBtn[i].classList.remove("show");
          }
          portNavBtn[i].classList.add("show");
        }
      }
    });
  }
} //pcMouseWheel() 끝.


// aboutMeCover의 [click!]버튼 클릭 시 aboutMeCont(상세 정보) 보이게 함. + contactBox 안보이게 함.
let introTitle = document.querySelector(".intro > .inner > .title");
let introBG = document.querySelector(".intro > .inner > .introBG");
let aboutMeBtn = document.querySelector(".aboutMeCover > button");
let aboutMeCover = document.querySelector(".aboutMeCover");
let aboutMeCont = document.querySelector(".aboutMeCont");
let aboutMeContClose = document.querySelector(".aboutMeCont > .closeBtn");
let contactBox = document.querySelector(".contactBox");
aboutMeBtn.addEventListener("click", function () {
  aboutMeCover.classList.add("hide");
  aboutMeCont.classList.add("show");
  contactBox.classList.add("hide");
  if (window.innerWidth < 1270) {
    introTitle.classList.add("smallSize");
    introBG.classList.add("smallSize");
  }
});

// aboutMeCont의 [closeBtn]버튼 클릭 시 aboutMeCover가 보이도록 함.
aboutMeContClose.addEventListener("click", function () {
  aboutMeCover.classList.remove("hide");
  aboutMeCont.classList.remove("show");
  contactBox.classList.remove("hide");
  if (
    introTitle.classList.contains("smallSize") &&
    introBG.classList.contains("smallSize")
  ) {
    introTitle.classList.remove("smallSize");
    introBG.classList.remove("smallSize");
  }
});

// aboutMeCont가 열려있을 때 pc화면에서 1270px로 resize했을 경우.
window.addEventListener("resize", function () {
  if (aboutMeCont.classList.contains("show") && window.innerWidth < 1270) {
    console.log("resize했다 수정하다!!!");
    introTitle.classList.add("smallSize");
    introBG.classList.add("smallSize");
  }
});

//포폴 img, text에 마웃스오버시 img바뀌게함.
let imgTitle = document.querySelectorAll(".portListBox > .imgTitle");
let siteImg = document.querySelectorAll(".siteImg");
console.log(imgTitle);
console.log(siteImg);
for (let i = 0; i < siteImg.length; i++) {
  siteImg[i].addEventListener("mouseenter", function () {
    imgTitle[i].classList.add("on");
  });
  siteImg[i].addEventListener("mouseleave", function () {
    imgTitle[i].classList.remove("on");
  });
}

// Layout Sketch 마우스오버시 도안 보이도록 함.
let layoutBtn = document.querySelectorAll(".layout > span");
let sketchImg = document.querySelectorAll(".layout > img");
for (let i = 0; i < layoutBtn.length; i++) {
  layoutBtn[i].addEventListener("mouseenter", function () {
    sketchImg[i].classList.add("locationChange");
    sketchImg[i].classList.add("showEffect");
  });
  layoutBtn[i].addEventListener("mouseleave", function () {
    sketchImg[i].classList.remove("showEffect");
    sketchImg[i].classList.remove("locationChange");
  });
}

//화면 loading이 다 될때까지 보여지는 로딩화면.
window.onload = function () {
  this.setTimeout(function () {
    loadingView.style.opacity = 0;
    setTimeout(function () {
      loadingView.style.display = "none";
    }, 100);
  }, 0);
};

// intro - BG컬러박스 height를 width랑 같도록 해줌.
window.addEventListener("resize", introBgHegith);
introBgHegith();
function introBgHegith() {
  let bgColorBox = document.querySelector(".bgColorBox");
  const bgColorBoxWidth = bgColorBox.clientWidth;
  bgColorBox.style.height = `${bgColorBoxWidth}px`;
}
