            var add_post_btn;       //新增貼文button   
            var content;            //貼文內容
            var totalPost = 0;      //總共post數

            //get object and register event handler
            function start(){
                add_post_btn = document.getElementById("add_post_btn");
                add_post_btn.addEventListener("click", addPostContent, false);
                content = document.getElementById("content");
                loadPost();
            }

            //local storage??
            //載入所有貼文
            function loadPost(){
                let posts = "";
                totalPost = 0;
                let post_idx = 1;
                for(let i = 0; i < localStorage.length; i++){
                    let key = localStorage.key(i);
                    if(key.substring(0,4)=="post"){
                        totalPost++;
                    }
                }
                for(let i = totalPost;i >= 1;i--){
                    for(let j=0; j<localStorage.length; j++){
                        let key = localStorage.key(j);
                        if(key=="post"+i){
                            //照片Q user name
                            //設定id的號碼和key值localStorage post號碼同
                            let imgID = "edit_post_" + i;
                            let trashID = "del_post_" + i;
                            posts += "<div class = 'post' id = 'post_div_" + i + "'> <img src = 'img/defult_user_pic.jpg' width = '30px' height = '30px'>" + localStorage.getItem("name") + "<img src = 'img/edit_tag.jpg' id = '" + imgID + "' width = '20px' height = '20px' class = 'edit_img'><img src = 'img/trash_img.png' id = '" + trashID + "' width = '25px' height = '25px' class = 'del_img'><div class = 'post_content'>" + "<textarea class = 'post_text' id = 'post_text_" + i + "' disabled>"+  localStorage.getItem(key)+ "</textarea></div></div>";
                            break;
                        }
                    }
                }
                content.innerHTML = posts;
                //設定編輯、刪除貼文事件處理器
                for(let i = 1;i<=totalPost;i++){
                    let imgID = "edit_post_" + i;
                    let trashID = "del_post_" + i;
                    document.getElementById(imgID).addEventListener("click", function () { editPostContent(imgID)}, false);
                    document.getElementById(trashID).addEventListener("click", function () { delPost(trashID)}, false);
                }
                add_post_btn.disabled = false;
            }

            //輸入新增貼文內容
            function addPostContent(){
                add_post_btn.disabled = true;
                let edit = "<div class = 'div_textarea'><label for = 'new_post_content'>Enter new post content:</label></br><textarea id = 'new_post_content' rows = '4' cols = '50' placeholder = '點選輸入貼文內容'></textarea><br><input type='button' id = 'addPost_confirm_btn' value='確定新增'><input type='button' id = 'addPost_reject_btn' value='取消新增'></div>";
                content.innerHTML = edit + content.innerHTML;
                document.getElementById("new_post_content").autofocus = true;
                document.getElementById("addPost_confirm_btn").addEventListener("click", addPost, false);           //新增貼文事件處理器
                document.getElementById("addPost_reject_btn").addEventListener("click", () => loadPost(), false);   //取消新增貼文
            }

            //寫入新增的貼文
            function addPost(){
                //取得textarea內容
                let add_content = document.getElementById("new_post_content").value;
                console.log(totalPost);
                totalPost++;
                localStorage.setItem("post"+totalPost, add_content);
                loadPost();
            }

            //輸入編輯貼文內容
            function editPostContent(edit_post_num){
                //要編輯的那個貼文
                let num = edit_post_num.substring(10,11);
                console.log(num);
                document.getElementById("post_text_"+num).disabled = false;

                let posts = "";
                totalPost = 0;
                let post_idx = 1;
                for(let i = 0; i < localStorage.length; i++){
                    let key = localStorage.key(i);
                    if(key.substring(0,4)=="post"){
                        totalPost++;
                    }
                }
                for(let i = totalPost;i >= 1;i--){
                    for(let j=0; j<localStorage.length; j++){
                        let key = localStorage.key(j);
                        if(key=="post"+i){
                            //照片Q user name
                            //設定id的號碼和key值localStorage post號碼同
                            let imgID = "edit_post_" + i;
                            //要編輯的textarea disable設為false
                            if(i!=num)
                                posts += "<div class = 'post' id = 'post_div_" + i + "'> <img src = 'img/defult_user_pic.jpg' width = '30px' height = '30px'>" + localStorage.getItem("name") + "<img src = 'img/edit_tag.jpg' id = '" + imgID + "' width = '20px' height = '20px' class = 'edit_img'><div class = 'post_content'>" + "<textarea class = 'post_text' id = 'post_text_" + i + "' disabled>"+  localStorage.getItem(key)+ "</textarea></div></div>";
                            else
                                posts += "<div class = 'post' id = 'post_div_" + i + "'> <img src = 'img/defult_user_pic.jpg' width = '30px' height = '30px'>" + localStorage.getItem("name") + "<img src = 'img/edit_tag.jpg' id = '" + imgID + "' width = '20px' height = '20px' class = 'edit_img'><div class = 'post_content'>" + "<textarea class = 'post_text' autofocus id = 'post_text_" + i + "' placeholder = '點選輸入貼文內容'>"+  localStorage.getItem(key)+ "</textarea></div><input type = 'button' class = 'edit_post_btn' id = 'edit_confirm_btn" + num + "' value = '確定編輯'></div>";
                        }
                    }
                }
                content.innerHTML = posts;
                //設定編輯貼文事件處理器
                for(let i = 1;i<=totalPost;i++){
                    let imgID = "edit_post_" + i;
                    document.getElementById(imgID).addEventListener("click", function () { editPostContent(imgID)}, false);
                }
                add_post_btn.disabled = false;

                //設定確定編輯貼文的事件處理器
                document.getElementById("edit_confirm_btn" + num).addEventListener("click", function () { editPost(num)}, false);
            }


            //編輯貼文內容，寫入localStorage
            function editPost(edit_post_num){
                let post_num = edit_post_num;
                console.log(post_num);
                //取得使用者輸入內容
                let edit_content = document.getElementById("post_text_" + edit_post_num).value;
                console.log(edit_content);
                localStorage.removeItem("post" + post_num);
                //少修改內容
                localStorage.setItem("post" + post_num, edit_content);
                loadPost();
            }

            //刪除貼文
            function delPost(del_post_num){
                let post_num = del_post_num.substring(9,del_post_num.length);   //del_post_
                let key = "post" + post_num;
                localStorage.removeItem(key);
                loadPost();
            }

            window.addEventListener("load", start, false);