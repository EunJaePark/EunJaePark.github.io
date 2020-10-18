const dateText = document.querySelector('.clockZone > .dateText'),
    timeText = document.querySelector('.clockZone > .timeText');
let ampmCheck;

function clock() {
    let newDate = new Date(),
        year = newDate.getFullYear(),
        month = newDate.getMonth(),
        date = newDate.getDate(),
        hours = newDate.getHours(),
        hh = hours > 12 ? hours - 12 : (hours == 0 ? 12 : hours),
        mm = newDate.getMinutes(),
        ss = newDate.getSeconds(),
        day = newDate.getDay(),
        week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    
    month = month > 9 ? month : `0${month}`;
    date = date > 9 ? date : `0${date}`;
    hh = hh > 9 ? hh : `0${hh}`;
    mm = mm > 9 ? mm : `0${mm}`;
    ss = ss > 9 ? ss : `0${ss}`;
    ampmCheck = hours > 12 ? 'pm' : 'am';

    dateText.innerText = `${year}. ${month}. ${date} ${week[day]}`;
    if(ampmCheck === 'am') {
        timeText.innerText = `AM ${hh} : ${mm} : ${ss}`;
    } else {
        timeText.innerText = `PM ${hh} : ${mm} : ${ss}`;
    }    
}

function init() {
    clock();
    setInterval(clock, 1000);
}

init();