            var WhoIsMe;
            var myPage;
            var Album;
            var Video;
            var Calander;
            var main_iframe;
            var log_out;
            var name;

            function start(){
                //點擊a後設定iframe網頁
                main_iframe = document.getElementById("main_iframe");
                myPage = document.getElementById("MyPage");
                myPage.addEventListener("click", function (){ main_iframe.src = "myPage.html";}, false);
                WhoIsMe = document.getElementById("WhoIsMe");
                WhoIsMe.addEventListener("click", function (){ main_iframe.src = "WIM.html";}, false);
                Album = document.getElementById("Album");
                Album.addEventListener("click", function (){ main_iframe.src = "album.html" ;}, false);
                Calander = document.getElementById("Calander");
                Calander.addEventListener("click", function(){ main_iframe.src = "calendar.html" ;}, false);
                log_out = document.getElementById("log_out");
                log_out.addEventListener("click", logOut, false);
                //判斷有無輸入姓名
                if(!localStorage.getItem("name"))
                    localStorage.setItem("name", "我是大美女");
                document.getElementById("name").innerHTML = localStorage.getItem("name");
            }

            function logOut(){


            }

            window.addEventListener("load", start, false);