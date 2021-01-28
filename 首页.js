
// 轮播图

let picturelist = $(".picture li");
let picture = $(".picture");
let dot = $(".dot")[0];
let n = 0;
// 点击出现所有列表
$(".listchange").onclick = function () {
    $(".list").slideToggle()
}
// 轮播图
let liList = document.querySelectorAll("#imgWrap li");
let next = document.querySelectorAll("#next")[0];
let prev = document.querySelectorAll("#prev")[0];
let dotWrap = document.querySelectorAll("#dotWrap")[0];
let wrap = document.querySelectorAll("#wrap");
let isAnimation = false;

// 动态生成小圆点
for (let i = 0; i < liList.length; i++) {
    let span = document.createElement('li')
    span.setAttribute("data-index", i)
    dotWrap.appendChild(span)
    if (i === 0) {
        span.className = "focus"
    }
}

let dotList = $("#dotWrap li")
let num=0;
function changeImg() {
   
    // 隐藏所有图片 
    for (let i = 0; i < liList.length; i++) {
        liList[i].className = ""
        dotList[i].className = ""
    }

    dotList[num].className = "focus";
    // 显示第n张图片
    liList[num].className = "show";
    liList[num].style.opacity = 0;
    isAnimation = true;
    let fade = setInterval(function () {
        let o = parseFloat(liList[num].style.opacity);
        if (o >= 1) {
            clearInterval(fade);
            isAnimation = false;
            return;
        }
        liList[num].style.opacity = o + 0.02;
    }, 16)

}

next.onclick = function () {
    if (isAnimation) {
        return;
    }

    if (num < liList.length - 1) {
        num++
    }
    else {
        num = 0
    }

    changeImg()
}

prev.onclick = function () {
    if (isAnimation) {
        return;
    }

    if (num === 0) {
        num = liList.length - 1
    }
    else {
        num--
    }

    changeImg()
}

bindEvent(dotList, "onclick", function () {
    if (isAnimation) {
        return;
    }
    num = this.getAttribute("data-index");
    changeImg()
})
function bindEvent(list,event,fn){
	for(var i = 0; i < list.length;i++){
		list[i][event] = fn;
	}
}




let autoPlay = setInterval(function () {
    next.click()
}, 3000)

wrap.onmouseenter = function () {
    clearInterval(autoPlay)
}

wrap.onmouseleave = function () {
    autoPlay = setInterval(function () {
        next.click()
    }, 3000)
}
let play = setInterval(function () {
    next.click()
}, 2000)

let login = document.querySelectorAll("#login")[0]
login.onclick=function(){
    // document.querySelectorAll("#mask")[0 ].className=""
    
    location.href = "http://192.168.10.13/毕设/login.html";
}

let register = document.querySelectorAll("#register")[0]
register.onclick=function(){
    
    location.href = "http://192.168.10.13/毕设/register.html";
}
