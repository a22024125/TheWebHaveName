let monthArea=document.querySelector(".month");
let yearArea=document.querySelector(".year");
let calendarTable=document.querySelector(".calendar");
let count=1;
let lastMonthBtn=document.querySelector(".lastMonthBtn");
let nextMonthBtn=document.querySelector(".nextMonthBtn");
var toDoList=document.querySelector(".toDoList");
let allToDoList=[];

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
let dayTd=document.querySelectorAll(".dayTd");




// //建立動態變化的日期
// function setCalender(){
//     yearArea.innerHTML=year;
//     monthArea.innerHTML=todayMonth;

//     for(let i=0;i<6;i++){
//     let tr=document.createElement('tr');
//     for(let j=0;j<7;j++){
//         let td=document.createElement('td');
//         if((j>=thisMonthFirstDay||i>0)&&count<=maxDay[date.getMonth()]){
//             td.innerHTML=count;
//             count++;
//         }else{
//             td.innerHTML="&nbsp";
//         }
//         tr.appendChild(td);
//     }
//     calendarTable.appendChild(tr);
//     };
//     count=1;
// }

//檢查是否閏年
function ifLeapYear(){
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        maxDay[1]=29;
    } else {
        maxDay[1]=28;
    }
}

//建立動態變化的日期
function setCalender(){
    yearArea.innerHTML=year;
    monthArea.innerHTML=todayMonth;

    for(let i=0;i<6;i++){
    let tr=document.createElement('tr');
    for(let j=0;j<7;j++){
        let td=document.createElement('td');
        if((j>=thisMonthFirstDay||i>0)&&count<=maxDay[date.getMonth()]){
            if(count==date.getDate()){
                lableDay(td);
            }
            td.setAttribute("class","dayTd");
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

    //可以改變標記的日期
    let allTd=document.querySelectorAll(".dayTd");
    for(let i=0;i<allTd.length;i++){
        allTd[i].addEventListener("click",e=>{
            let oldtarget=document.querySelector("#targetDay");
            allTd[i].setAttribute("id","targetDay");
            oldtarget.removeAttribute("id");
            target=allTd[i];
        })
    }
    
}

//設置標記日期
function lableDay(targetDay){
    targetDay.setAttribute("id","targetDay");
    target=targetDay;
}



load();

// console.log(localStorage.getItem("list"));
//載入localStorage資料
function load(){
    let loadList=localStorage.getItem("list");
    if (loadList !== null) {
        let loadListArray = JSON.parse(loadList);
        loadListArray.forEach(item => {
            //取得輸入值
            let todoText = item.text;

            //取得指定日期
            let today=item.day;

            let todo = document.createElement("div");
            todo.classList.add("todo");
            let p=document.createElement('p');
            p.setAttribute('class','list');
            let p2=document.createElement('p');
            p2.setAttribute('class','time')
            p.innerHTML=todoText;
            p2.innerHTML=today;

            // //刪除代辦事項按鈕
            // let deleteBtn=document.createElement('button');
            // deleteBtn.setAttribute('class','deleteBtn');
            // deleteBtn.addEventListener("click",e=>{
            // let deleteTarget=e.target.parentElement.children[1];
            // console.log(deleteTarget);
            // localStorage.removeItem(deleteTarget.innerHTML);
            // deleteTarget.parentElement.remove();
            // })
            todo.appendChild(p);
            todo.appendChild(p2);
            // todo.appendChild(deleteBtn);
            toDoList.appendChild(todo);
        });
    }
    console.log(loadList);
}

