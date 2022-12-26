let userName=document.querySelector(".name");
let birthday=document.querySelector(".date");
let selfIntro=document.querySelector(".selfIntroduce");
let subBtn=document.querySelector(".subBtn");

subBtn.addEventListener("click",e=>{
    e.preventDefault();
    let gender=document.querySelector('input[name="gender"]:checked').value;


    // upload_pic_btn = document.getElementById("upload_pic_btn");
    // //讓user上傳照片
    // //Save The Data URL String in localStorage
    // upload_pic_btn.addEventListener("change", (event) => {
    //     const ig = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(ig);
    //     reader.addEventListener("load", ()=> {
    //         localStorage.setItem("bigPic", reader.result);
    //         showPic();
    //     });
    // })


    localStorage.setItem("name",userName.value);
    localStorage.setItem("birthday",birthday.value);
    localStorage.setItem("gender",gender);
    localStorage.setItem("self-introducing",selfIntro.value);
})