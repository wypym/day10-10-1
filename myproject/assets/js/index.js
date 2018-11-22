class Slider{
	constructor(id) {
	    this.ele = $id(id);
		//获取大图
		//this.ullis = $get($get(this.ele,'ul')[0],'li');
		this.ullis = this.ele.children[0].children;
		//大图数量
		this.num = this.ullis.length;
		//创建元素，并返回所有的ol中的li
		this.ollis = this.createEle();
		//当前下标 
		this.indexA = 0;
		//获取文字信息div
		this.div = $id('msg');
		//设置轮播
		this.slide();
		//设置事件
		this.ltBtn = $id('ltBtn');
		this.rtBtn = $id('rtBtn');
		this.setEvent();
		this.timer = null;
		this.autoPlay();
	}
	createEle(){
		//左按钮
		let ltSpan = $create('span');
		ltSpan.id = 'ltBtn';
		ltSpan.innerHTML = "&lt;";
		this.ele.appendChild(ltSpan);
		//右按钮
		let rtSpan = $create('span');
		rtSpan.id = 'rtBtn';
		rtSpan.innerHTML = '&gt;';
		this.ele.appendChild(rtSpan);
		//ol及li
		let ol = $create('ol');
		let arr = [];
		for(let i = 0;i < this.num;i ++){
			let li = $create('li');
			arr.push(li);
			ol.appendChild(li);
		}
		this.ele.appendChild(ol);
		
		return arr;
	}
	slide(){
		//所有大图display : none ,所有小圆点红色
		for(let i = 0;i < this.num;i ++){
			this.ullis[i].style.display = 'none';
			this.ollis[i].style.backgroundColor = '#fff';
		}
		//当前大图block，当前小圆点蓝色
		this.ullis[this.indexA].style.display = 'block';
		this.ollis[this.indexA].style.backgroundColor = "#999";
	}
	setEvent(){
		//给左按钮添加点击事件
		this.ltBtn.onclick = ()=>{
			this.indexA --;
			if(this.indexA == -1){
				this.indexA = this.num - 1;
			}
			this.slide();
		};
		//给右按钮添加点击事件
		this.rtBtn.onclick = ()=>{
			this.indexA ++;
			if(this.indexA == this.num){
				this.indexA = 0;
			}
			this.slide();
		};
		//给小圆点加移入事件
		for(let i = 0;i < this.num;i ++){
			this.ollis[i].onmouseenter = ()=>{
				this.indexA = i;
				this.slide();
			}
		}
	}
	autoPlay(){
		this.timer = setInterval(()=>{
			this.indexA ++;
			if(this.indexA == this.num){
				this.indexA = 0;
			}
			this.slide();
		},3000);
		this.ele.onmouseenter = ()=>{
			clearInterval(this.timer);
		};
		this.ele.onmouseleave = ()=>{
			this.autoPlay();
		}
	}
}

//工具箱
function $id(id){
	return document.getElementById(id);
}
//通过byTagName获取指定对象中的所有的元素
function $get(obj,tagName){
	if(typeof obj === 'string' && $id(obj)){
		return $id(obj).getElementsByTagName(tagName);
	}else if(typeof obj === 'object'){
		return obj.getElementsByTagName(tagName);
	}
}
function $create(tagName){
	return document.createElement(tagName);
}