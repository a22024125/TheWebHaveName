var upload_pic_btn;
var show_pic_div;        
var total_pic_count = 0;   

function start(){
    upload_pic_btn = document.getElementById("upload_pic_btn");
    
    //讓user上傳照片
    //Save The Data URL String in localStorage
    upload_pic_btn.addEventListener("change", (event) => {
        const ig = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(ig);

        reader.addEventListener("load", ()=> {
            localStorage.setItem("Image_"+total_pic_count, reader.result);
            showPic();
        });
    })
    show_pic_div = document.getElementById("show_pic_div");
    showPic();
}

//在show_pic_div顯示所有上傳的照片
function showPic(){
    let content = "";
    let rem_num = new Array();
    total_pic_count = 0;
    for(let i = 0;i < localStorage.length;i++){
        if(localStorage.key(i).substring(0,6)=="Image_"){
            //計算上傳過幾張照片
            total_pic_count++;
        }
    }
    console.log(total_pic_count);
    let cnt = 0;
    for(let i = 0;i < total_pic_count;i++){
        for(let j = 0;j < localStorage.length;j++){
            let key = localStorage.key(j);
            if(key=="Image_"+i){
                cnt++;
                content += "<div class = 'oneline'><img class = 'big_img' id = 'Image_" + j + "' width = '100px' height = '100px' src = '" + localStorage.getItem(key) + "'><img class = 'small_img'src = 'img/trash_img.png' id = 'del_img_" + i + "'></div>";
                break;
            }        
        }
    }
    show_pic_div.innerHTML = content;
    //註冊刪除照片的事件處理器
    for(let i = 0;i < total_pic_count;i++){
        let del_img = document.getElementById("del_img_"+i);
        del_img.addEventListener("click", function(){ del_choose_img(i)}, false);
    }
}

function del_choose_img(img_num){
    localStorage.removeItem("Image_"+img_num);
    rewrite_img(img_num);
    showPic();
}

function rewrite_img(img_num){
    let already_appear = false;

    for(let i = 0;i<total_pic_count;i++){
        for(let j = 0;j<localStorage.length;j++){
            
            if(i==img_num){
                already_appear = true;
                continue;
            }
            if(already_appear){
                let key = localStorage.key(j);
                if(key=="Image_"+i){
                    console.log("Image_"+(i-1));
                    let value = localStorage.getItem(key);
                    localStorage.removeItem(key);
                    localStorage.setItem("Image_"+(i-1), value);
                }
            }
            
        }
    }
}

window.addEventListener("load", start, false);