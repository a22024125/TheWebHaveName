let monthArea=document.querySelector(".month");
let yearArea=document.querySelector(".year");
let calendarTable=document.querySelector(".calendar");
let count=1;
let lastMonthBtn=document.querySelector(".lastMonthBtn");
let nextMonthBtn=document.querySelector(".nextMonthBtn");
let target;
let toDoList=document.querySelector(".toDoList");
let add=document.querySelector(".add");
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
// console.log(dayTd);




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

//檢查是否閏年
function ifLeapYear(){
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        maxDay[1]=29;
    } else {
        maxDay[1]=28;
    }
}

//設置標記日期
function lableDay(targetDay){
    targetDay.setAttribute("id","targetDay");
    target=targetDay;
}

// localStorage.clear();
load();
//Todo List功能
add.addEventListener("click",e=>{

    //讓按鈕不跳轉
    e.preventDefault();

    //新增代辦事項
    //取得輸入值
    let form=e.target.parentElement;
    let todoText = form.children[0].children[0].value;

    //取得指定日期
    // console.log(target.innerHTML);
    let today=year + " " + todayMonth + " " + target.innerHTML;
    // console.log(today);

    let todo = document.createElement("div");
    todo.classList.add("todo");
    let p=document.createElement('p');
    p.setAttribute('class','list');
    let p2=document.createElement('p');
    p2.setAttribute('class','time')
    p.innerHTML=todoText;
    p2.innerHTML=today;

    let myToDo={
        text:todoText,
        day:today
    }
    
    allToDoList.push(myToDo);
    // console.log(allToDoList);

    //刪除代辦事項按鈕
    let deleteBtn=document.createElement('button');
    deleteBtn.setAttribute('class','deleteBtn');
    deleteBtn.addEventListener("click",e=>{
        let deleteTarget=e.target.parentElement.children[1];
        console.log(deleteTarget);

        let todoItem = e.target.parentElement;
        // remove from local storage
        let text = todoItem.children[0].innerText;
        console.log("This todoItem.children[1].innerText:"+text);
        let myListArray = JSON.parse(localStorage.getItem("list"));
        console.log("myListArray:"+localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
            console.log("myListArrayItem:"+item+"  index"+index);
            if (item.text == text) {
                myListArray.splice(index, 1);
                localStorage.setItem("list", JSON.stringify(myListArray));
            }
        })
    
        deleteTarget.parentElement.remove();
    })

    todo.appendChild(p);
    todo.appendChild(p2);
    todo.appendChild(deleteBtn);
    toDoList.appendChild(todo);

    store(myToDo);
})



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

            //刪除代辦事項按鈕
            let deleteBtn=document.createElement('button');
            deleteBtn.setAttribute('class','deleteBtn');
            deleteBtn.addEventListener("click",e=>{
                let deleteTarget=e.target.parentElement.children[1];
                console.log(deleteTarget);

                let todoItem = e.target.parentElement;
                // remove from local storage
                let text = todoItem.children[0].innerText;
                console.log("This todoItem.children[1].innerText:"+text);
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    console.log("myListArrayItem:"+item+"  index"+index);
                    if (item.text == text) {
                        myListArray.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(myListArray));
                    }
                })
            
                deleteTarget.parentElement.remove();
            })

            todo.appendChild(p);
            todo.appendChild(p2);
            todo.appendChild(deleteBtn);
            toDoList.appendChild(todo);
        });
    }
    console.log(loadList);
}

//儲存資料
function store(myToDo){
    let myList = localStorage.getItem("list");
    if(myList==null){
        localStorage.setItem("list",JSON.stringify([myToDo]));
    }else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myToDo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }
}