const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");  //canvas의 context를 불러냄.
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = "#2c2c2c"; //반복되는 defalut값을 정해줌. ctx.strokeStyle과 ctx.fillStyle에 같은 디폴트컬러값을 줘야하기 때문에, variables값을 따로 선언해서 사용되야할 곳에다 선언된 이름으로 넣어주면, 나중에 디폴트값을 변경해야할 때, 편하게 한번만 수정할 수 있다.
const CANVAS_SIZE = 700;

// canvas의 pixel을 다룰수 있는 element로서 만드는 것이기 때문에, element에도 width, height를 줘야작동할것. 즉, 픽셀이 다루는 윈도우의 사이즈를 canvas에게 알려주기 위해 width, height를 주는 것.
canvas.width = CANVAS_SIZE/*700*/;
canvas.height = CANVAS_SIZE/*700*/;

//context의 default를 설정.(canvas안에서만 적용되는 것이다.)
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR/*"#2c2c2c"*/;
ctx.fillStyle = INITIAL_COLOR/*"#2c2c2c"*/;
ctx.lineWidth = 2.5; //선의 넓이가 2.5px
// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 49);  // (x, y, width, height)

//기본적으로 false이지만 canvas에서 mousedown 되었을 때 true로 변하게 할것임.
let painting = false; 
let filling = false;

// 아래의 다양한 경우에서 paining=true의 상황에서 다시 false로 돌아오게 하려는 함수.
function stopPainting() {
    painting = false;
}
//painting = true.로 만드는 함수.
function startPainting() {
    painting = true;
}

function handleColorClick(event) {
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;  // path 색 바꿔줌!!
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event);
    //path의 굵기를 찾아야하니까 event의 target의 value를 찾아야함.
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
        canvas.style.cursor = "";
        // ctx.fillStyle = ctx.strokeStyle; // 캔버스를 채울 색의 컬러를 정하는 것. 이걸 위의 handleColorClick(){}함수로 이동시켜서 더 깔끔하고 간당하게 작성하자.
    }
}

function handleCanvasClick() {
    if(filling === true) {
        // ctx.fillRect(0, 0, canvas.width, canvas.height); //이렇게 써도 당근 됨.
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    console.log(event);
    event.preventDefault(); //마우스 우클릭시 뜨는 창(이미지 저장 등) 방지.
}

function handleSaveClick() {
    // canvas의 그림을 jpeg 이미지로 만들어줌.
    // const image = canvas.toDataURL('image/jpeg');
    const image = canvas.toDataURL(''); //defalut값이 png임. 따라서, png로 파일값 적을떄는 그냥 비워두면 됨.
    console.log(image);
    //위의 image를 하이퍼링크(a)로 만들어줄 것임. 
    const link = document.createElement('a');
    link.href = image;
    link.download = 'paingJS[🎨]'; //<a download></a> 라고 작성한 것과 같다. download에는 link.href의 이름을 줘야함.
    console.log(link);
    link.click();
}


if(canvas) {
    // mouse가 canvas 위에서 움직일때 마우스커서의 좌표구함.
    canvas.addEventListener('mousemove', onMouseMove);
    // mouse가 canvas에 올라와서 누르는 그순간 발생하는 이벤트.(click과 달리 press되는 그 순간)
    canvas.addEventListener('mousedown', startPainting);
    // mouse가 클릭되고있지 않을 때 painting을 다시 flase로 돌리기 위한 이벤트.
    canvas.addEventListener('mouseup', stopPainting);
    // mouse가 canvas를 벗어났을 때, painting를 false로 돌리기 위한 이벤트.
    canvas.addEventListener('mouseleave', stopPainting);
    // canvas를 클릭시 canvas에 색이 fill 되도록.
    canvas.addEventListener('click', handleCanvasClick);
    // canvas에서 마우스 우클릭 시 실행되는 함수.(contentmenu = 우클릭)
    canvas.addEventListener('contextmenu', handleCM);
}

function onMouseMove(event) {
    // console.log(event);
    //clientX,Y는 해당 윈도우 전체의 범위 내에서 마우스 위치값을 나타내는 것.
    //offsetX,Y는 해당 이벤트를 건 태그 안에서 마우스 위치값을 나타냄. 
    const x = event.offsetX;
    const y = event.offsetY
    // console.log(x, y);
    if(!painting) { //!painting는 painting = false라는 의미.
        //path는 just line이다. path를 만드는 건 기본적으로 선(line)의 시작점을 만드는 것. 시작점은 마우스가 움직이는 곳 어디든지 가능(canvas 속에서).
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        console.log("creating path in", x, y);
        
        ctx.lineTo(x, y);  //path의 이전위치에서 현재위치까지 이동하며 선을 만듦.  
        ctx.stroke(); // ctx에 준 path에 관한 스타일을 적용한다는 뜻.
    }
}

// function onMouseDown(event) {
//     // console.log(event);
//     // painting = true;
//     stopPainting();
// }

// function onMouseUp(event) {
//     // painting = false;
//     stopPainting();
// }

// function onMouseLeave(event) {
//     // painting = false;
// }

console.log(Array.from(colors)); //console에섯 볼 때 array로 나오게 만들기위해 이렇게 적음. 근데 나는 그냥 colors만 콘솔로 불러와도 배열로 나오는데...노마드강의에서는 안돼네..?

if(colors) {
    // Array.from(colors).forEach(color => 
    //     color.addEventListener("click"), handleColorClick);
    // 위의 forEach문으로 작성한게 안돼서 for문 돌려서 이벤트추가함.
    for(let i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', handleColorClick);
    }
}


if(range) {
    range.addEventListener('input', handleRangeChange);
}


if(mode) {
    mode.addEventListener('click', handleModeClick);
}


if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}
