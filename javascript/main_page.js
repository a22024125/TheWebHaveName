var WhoIsMe;
var myPage;
var Album;
var Video;
var Calander;
var main_iframe;
var log_out;
var name;
var birthday_song;
var birthday_hat;
var toDoList;
function start(){

    //點擊a後設定iframe網頁
    main_iframe = document.getElementById("main_iframe");
    myPage = document.getElementById("MyPage");
    myPage.addEventListener("click", function (){ check_birthday("myPage.html");}, false);
    WhoIsMe = document.getElementById("WhoIsMe");
    WhoIsMe.addEventListener("click", function (){ check_birthday("WIM.html");}, false);
    Album = document.getElementById("Album");
    Album.addEventListener("click", function (){ check_birthday("album.html");}, false);
    Video = document.getElementById("Video");
    Video.addEventListener("click", function (){ check_birthday("Video.html");}, false )
    Calander = document.getElementById("Calander");
    Calander.addEventListener("click", function(){ check_birthday("calendar.html");}, false);
    log_out = document.getElementById("log_out");
    log_out.addEventListener("click", logOut, false);
    birthday_song = document.getElementById("birthday_song");
    birthday_hat = document.getElementById("birthday_hat");
                
    //判斷有無輸入姓名 
    if(!localStorage.getItem("name"))
        localStorage.setItem("name", "我是大美女");
    document.getElementById("name").innerHTML = localStorage.getItem("name");
            
    //設定生日帽
    if(localStorage.getItem("birthday")){
        let birth = localStorage.getItem("birthday");
        let now = new Date();
        birth = birth.split("-");
        if((now.getMonth()+1) == birth[1] && now.getDate() == birth[2]){
            $("#birthday_hat").attr("src","img/hat.png");
            $("#birthday_hat").attr("class","hat");
        }else{
            $("#birthday_hat").attr("src","img/background_color.PNG");
            $("#birthday_hat").hide();
            //$("#birthday_hat").attr("class","no_hat");
        }
    }else{
        $("#birthday_hat").hide();
    }
    //check_birthday();

    toDoList=document.querySelector("#test");
    console.log(document.querySelector("#test"))
    load();

    console.log(localStorage.getItem("list"));
    console.log(toDoList);

}

//判斷生日
function check_birthday(source){
                
    if(localStorage.getItem("birthday")){
        let birth = localStorage.getItem("birthday");
        let now = new Date();
        birth = birth.split("-");
        if((now.getMonth()+1) == birth[1] && now.getDate() == birth[2]){
            if(!localStorage.getItem("already_sing")){
                console.log(birthday_song);
                birthday_song.play();
                localStorage.setItem("already_sing", true);
            }
        }
    }
    main_iframe.src = source ;
}

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

        todo.appendChild(p);
        todo.appendChild(p2);
        console.log(toDoList)
        toDoList.appendChild(todo);
    });
}
console.log(loadList);

//設置大頭貼
let userPicture=document.querySelector("#user_picture");
if(localStorage.getItem("bigPic")!=null){
    userPicture.setAttribute("src",localStorage.getItem("bigPic"));
}

}

function logOut(){

}

window.addEventListener("load", start, false);

