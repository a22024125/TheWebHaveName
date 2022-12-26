let userName=document.querySelector(".name");
let birthday=document.querySelector(".date");
let selfIntro=document.querySelector(".selfIntroduce");
let subBtn=document.querySelector(".subBtn");

subBtn.addEventListener("click",e=>{
    e.preventDefault();
    let gender=document.querySelector('input[name="gender"]:checked').value;
    localStorage.setItem("userName",userName.value);
    localStorage.setItem("birthday",birthday.value);
    localStorage.setItem("gender",gender);
    localStorage.setItem("self-introducing",selfIntro.value);
})