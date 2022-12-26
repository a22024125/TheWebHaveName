let userName=document.querySelector(".name");
let birthday=document.querySelector(".date");
let selfIntro=document.querySelector(".selfIntroduce");
let subBtn=document.querySelector(".subBtn");
var upload_pic = document.getElementById("upload_pic");

//讓user上傳照片
    //Save The Data URL String in localStorage
    upload_pic.addEventListener("change", (event) => {
        const ig = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(ig);
        //localStorage.setItem("bigPic", reader.result);
        console.log(reader.result);
        reader.addEventListener("load", ()=> {
            console.log("HI");
            localStorage.setItem("bigPic", reader.result);
        });
    });

subBtn.addEventListener("click",e=>{
    e.preventDefault();
    let gender=document.querySelector('input[name="gender"]:checked').value;

    localStorage.setItem("name",userName.value);
    localStorage.setItem("birthday",birthday.value);
    localStorage.setItem("gender",gender);
    localStorage.setItem("self-introducing",selfIntro.value);
    alert("資料已儲存！請重新整理頁面更新資訊");
});