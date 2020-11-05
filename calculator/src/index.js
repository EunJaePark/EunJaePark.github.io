const topResetZone = document.querySelector('.topResetZone'),
    operationZone = document.querySelector('.operationZone'),
    numberZone = document.querySelector('.numberZone');
let berofeResult = document.querySelector('.beforeResult'),
    resultNum = document.querySelector('.resultNum'),
    number = '',
    operationNow = 'empty',
    operationBefore = 'empty',
    result = 0;


function reset() {
    resultNum.innerText = result;   
}


// 화면에 숫자/연산자 출력.
function insertIntoPrint(num) {
    resultNum.innerText = num;
}

// 계산.
function calculation(item) {
    console.log(item);
    insertIntoPrint(result);
    const beforeNum = Number(result);
    const clickNum = Number(number);
    console.log(`beforeNum: ${beforeNum}, ${typeof beforeNum}`);
    console.log(`clickNum: ${clickNum}, ${typeof clickNum}`);

    if(item === '+') {
        result = beforeNum + clickNum;      
    } else if(item === '-') {
        result = beforeNum - clickNum;
    } else if(item === '*') {
        result = beforeNum * clickNum;
    } else if(item === '/') {
        result = beforeNum / clickNum;
    } else if(item === '=') {
    }   

    insertIntoPrint(result);
    number = '';
}

function handleTopResetZone(event) {
    const clickResetDel = event.target;
    if(clickResetDel.value === 'AC') {
        number = '';
        operationNow = 'empty';
        result = 0;
        berofeResult.innerText = '';
        insertIntoPrint(result);
    } else if(clickResetDel.value === 'DEL') {
        // 현재 입력한 숫자 지워줌.
        insertIntoPrint(result);
        number = '';
    }
}

function handleOperationZone(event) {
    const clickOperation = event.target;
    if(clickOperation.localName !== 'input') return; // operationZone에서 input이 아닌 여백 클릭시 return.
   
    if(result === 0) {  // result가 0이면 -,*,/연산자 계산시 0이 앞에서 영향주지 않음.
        result = number; // 접속 후 처음 누른 숫자 result에 배당.
        berofeResult.innerText = `${result}`; // 이전결과 보여주는 태그에 result 출력.
        number = ''; // 2번째 클릭부터 처음 클릭한 숫자가 합쳐지지 않도록 배워줌.
        operationNow = clickOperation.value; // 두번째 연산자 클릭부터 operationBefore가 적용되도록 Now에 연산자 넣어줌.
    } else { // result가 0이 아닐 경우.
        console.log(result);
        console.log(`opration여부=${operationNow}`);
        if(operationNow === 'empty') { // 첫 연산자 클릭 시.
            console.log(`operationNow로 적용`);
            operationNow = clickOperation.value; 
            calculation(operationNow);
        } else { // 연산자 두번째 클릭부터 적용.
            console.log(`operationBefore로 적용`);
            operationBefore = operationNow; 
            operationNow = clickOperation.value;
            calculation(operationBefore);
        }
        berofeResult.innerText = `${result}`;
    }
}

function handleNumberZone(event) {
    const clickNum = event.target;
    if(clickNum.localName !== 'input') return; // numberZone에서 input이 아닌 여백 클릭시 return.

    number = number + clickNum.value;
    insertIntoPrint(number);

    // if(operationNow === 'empty') {
    //     number = number + clickNum.value;
    //     insertIntoPrint(number);
    // } else {
    //     number = number + clickNum.value;
    //     insertIntoPrint(number);
    // }
}

function init() {
    reset();
    topResetZone.addEventListener('click', handleTopResetZone);
    operationZone.addEventListener('click', handleOperationZone);
    numberZone.addEventListener('click', handleNumberZone);
}

init();