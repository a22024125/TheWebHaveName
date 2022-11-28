let monthArea=document.querySelector(".month");
let yearArea=document.querySelector(".year");
let calendarTable=document.querySelector(".calendar");
let count=1;
let lastMonthBtn=document.querySelector(".lastMonthBtn");
let nextMonthBtn=document.querySelector(".nextMonthBtn");


//日期來源
let date=new Date();
let thisMonthFirstDayfile=new Date(date.getFullYear(),date.getMonth());
let thisMonthFirstDay=thisMonthFirstDayfile.getDay();
let year=date.getFullYear();
let day=date.getDate();
let allMonth=['January','February','March','April','May','June','July','August','September','October','November','December'];
let todayMonth=allMonth[date.getMonth()];
let maxDay=[31,28,31,30,31,30,31,31,30,31,30,31];//2月天數記得改

ifLeapYear();
setCalender();

//月份往前按鈕
lastMonthBtn.addEventListener("click",e=>{
    date=new Date(date.getFullYear(),date.getMonth()-1);
    thisMonthFirstDayfile=new Date(date.getFullYear(),date.getMonth());
    thisMonthFirstDay=thisMonthFirstDayfile.getDay();
    year=date.getFullYear();
    day=date.getDate();
    todayMonth=allMonth[date.getMonth()];
    ifLeapYear();

    for(let i=2;i<=7;i++){
        calendarTable.removeChild(calendarTable.childNodes[2]);
    }
    setCalender();
})

//月份往後按鈕
nextMonthBtn.addEventListener("click",e=>{
    date=new Date(date.getFullYear(),date.getMonth()+1);
    thisMonthFirstDayfile=new Date(date.getFullYear(),date.getMonth());
    thisMonthFirstDay=thisMonthFirstDayfile.getDay();
    year=date.getFullYear();
    day=date.getDate();
    todayMonth=allMonth[date.getMonth()];
    ifLeapYear();
    
    for(let i=2;i<=7;i++){
        calendarTable.removeChild(calendarTable.childNodes[2]);
    }
    setCalender();
})





//建立動態變化的日期
function setCalender(){
    yearArea.innerHTML=year;
    monthArea.innerHTML=todayMonth;

    for(let i=0;i<6;i++){
    let tr=document.createElement('tr');
    for(let j=0;j<7;j++){
        let td=document.createElement('td');
        if((j>=thisMonthFirstDay||i>0)&&count<=maxDay[date.getMonth()]){
            td.innerHTML=count;
            count++;
        }else{
            td.innerHTML="&nbsp";
        }
        tr.appendChild(td);
    }
    calendarTable.appendChild(tr);
    };
    count=1;
}

//檢查是否閏年
function ifLeapYear(){
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        maxDay[1]=29;
    } else {
        maxDay[1]=28;
    }
}
