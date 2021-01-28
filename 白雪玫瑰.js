$(".listbox").click(function(){
    $("#list").fadeToggle()
})
let bigimg=$(".biglist")[0]
let small=$(".smalllist li img")[0]
let glassimg=$(".glass img")[0]
let glass=$(".glass")[0]
let mask=$(".mask")[0]
bindEvent(small,"onclick",function(){
    bigimg.src=this.src
    glassimg.src=this.src
})
bigimg.onmouseenter=function(){
    all(".glass").style.display="block"
    all(".mask").style.display="block"
}
bigimg.onmouseleave=function(){
    all(".glass").style.display="none"
    all(".mask").style.display="none"
}
bigimg.onmousemove=function(event){
     let point={
         x:event.offsetX,
         y:event.offsetY
     }
     let xishu={
         x:point.x/bigimg.offsetWidth,
         y:point.y/bigimg.offsetHeight
     }
    //  边缘检测
    if(!(point.x+mask.offsetWidth/2>=bigimg.offsetWidth||point.x<mask.offsetWidth/2)){
        mask.style.left=point.x-mask.offsetWidth/2+"px"
        glassimg.style.left=-glassimg.offsetWidth*xishu.x+glass.offsetWidth/2+"px"
    }
    if(!(point.y+mask.offsetHeight/2>=bigimg.offsetHeight||point.y<mask.offsetHeight/2)){
        mask.style.top=point.y-mask.offsetHeight/2+"px"
     glassimg.style.top=-glassimg.offsetHeight*xishu.y +glass.offsetHeight/2+"px"
    }    
}
// 省市联动
let cityPicker = {
    province:document.querySelectorAll("#province")[0],
    city:document.querySelectorAll("#city")[0],
    area:document.querySelectorAll("#area")[0],
    // 更新城市数据
    updateCity(index){
        var index = index || 0;
        this.city.innerHTML = "";
        citys[index].mallCityList.forEach(item=>{
            let option = document.createElement("option");
            option.innerHTML = item.cityName;
            this.city.appendChild(option)
        })
    },
    // 更新区数据
    updateArea(provinceIndex,cityIndex){
        area.innerHTML = "";
        citys[provinceIndex].mallCityList[cityIndex].mallAreaList.forEach(item=>{
            let option = document.createElement("option");
            option.innerHTML = item.areaName;
            area.appendChild(option)
        })
    },
    // 初始化
    init(){
        // 初始化数据
        citys.forEach(item=>{
            let option = document.createElement("option");
            option.innerHTML = item.provinceName;
            this.province.appendChild(option)
        })
        this.updateCity(0)
        this.updateArea(0,0)
        this.province.onchange = ()=>{
            this.updateCity(this.province.selectedIndex)
            this.updateArea(this.province.selectedIndex,this.city.selectedIndex)
        }
        this.city.onchange = ()=>{
            this.updateArea(this.province.selectedIndex,this.city.selectedIndex)
        }
    }
}

cityPicker.init()
