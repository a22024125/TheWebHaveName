            var WhoIsMe;
            var myPage;
            var Album;
            var Video;
            var Calander;
            var main_iframe;
            var log_out;
            var name;
            var birthday_song;

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

                //判斷有無輸入姓名
                if(!localStorage.getItem("name"))
                    localStorage.setItem("name", "我是大美女");
                document.getElementById("name").innerHTML = localStorage.getItem("name");
            
                //check_birthday();
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

            function logOut(){


            }

            window.addEventListener("load", start, false);