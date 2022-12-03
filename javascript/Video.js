var upload_video_btn;
var show_video_div;
var video_list;
var total_video_count = 0;

function start(){
    upload_video_btn = document.getElementById("upload_video_btn");
    //show_video_div = document.getElementById("show_video_div");
    video_list = document.getElementById("video_list");

    upload_video_btn.addEventListener("change", (event) => {
        const vd = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(vd);
        //console.log(vd);
        
        reader.addEventListener("load", ()=> {
            console.log(reader.result);
            //localStorage.setItem("Video_"+total_video_count, reader.result);
            //showVideoList();
        });
    })

}

function showVideoList(){
    let content = "";
    total_video_count = 0;
    for(let i = 0;i < localStorage.length;i++){
        if(localStorage.key(i).substring(0,6)=="Video_"){
            //計算上傳過幾張照片
            total_video_count++;
        }
    }
    console.log(total_video_count);
    for(let i = 0;i < total_video_count;i++){
        for(let j = 0;j < localStorage.length;j++){
            let key = localStorage.key(j);
            if(key=="Video_"+i){
                content += "<a id = 'video_" + i + "'>" + localStorage.getItem(key) + "'><br>";
                break;
            }        
        }
    }
    video_list.innerHTML = content;
    //註冊刪除照片的事件處理器
    for(let i = 0;i < total_video_count;i++){
        let del_video = document.getElementById("del_video_"+i);
        del_video.addEventListener("click", function(){ del_choose_video(i)}, false);
    }
}

function del_choose_video(num){

}

window.addEventListener("load", start, false);