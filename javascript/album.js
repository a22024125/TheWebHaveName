            var upload_pic_btn;
            var show_pic_div;        
            var total_pic_count = 0;   

            function start(){
                upload_pic_btn = document.getElementById("upload_pic_btn");
                upload_pic_btn.addEventListener("click", uploadPic, false);
                show_pic_div = document.getElementById("show_pic_div");
                showPic();
            }

            //讓user上傳照片
            function uploadPic(){
                upload_pic_btn.onchange = evt => {
                    const [file] = upload_pic_btn.files;
                    console.log(file);
                    if (file) {
                        //blah.src = URL.createObjectURL(file)
                        console.log(file);
                        localStorage.setItem("Image_"+total_pic_count, URL.createObjectURL(file));
                        showPic();
                    }
                }
            }

            //在show_pic_div顯示所有上傳的照片
            function showPic(){
                let content = "";
                for(let i = 0;i < localStorage.length;i++){
                    if(localStorage.key(i).substring(0,6)=="Image_"){
                        //計算上傳過幾張照片
                        total_pic_count++;
                    }
                }
                console.log(total_pic_count);
                for(let i = 0;i < total_pic_count;i++){
                    for(let j = 0;j < localStorage.length;j++){
                        let key = localStorage.key(j);
                        if(key=="Image_"+i){
                            content += "<img id = 'Image_" + j + "' width = '100px' height = '100px' src = '" + localStorage.getItem(key) + "'>";
                            break;
                        }        
                    }
                }
                show_pic_div.innerHTML = content;
            }

            window.addEventListener("load", start, false);