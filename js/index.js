function getEle(ele) {
    return document.querySelector(ele);
}
var head = getEle("#head");
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 960;
if (winW / winH < desW / desH) {
    head.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    head.style.webkitTransform = "scale(" + winW / desW + ")";
}

var soundTwo = getEle("#soundTwo");

//1、首页扫描加载
var load = getEle("#loading");
var processBox = getEle("#processBox");
var process = getEle("#process");
var scanning = getEle("#scanning");
var contents = document.getElementById('contents');
loading();
function loading() {
    processBox.addEventListener("touchstart", touch, false);
    processBox.addEventListener("touchend", endTouch, false);
}
function touch(e) {
    soundTwo.play();//播放
    var target = e.target;
    if (target.parentNode.className === "processBox") {
        scanning.style.display = 'block';
        process.style.display = 'block';
        function first(callback) {
            var timer1 = window.setTimeout(function lazy() {
                process.style.webkitTransform = 'translate(0,-300px)';
                process.style.webkitTransition = "1s";
                window.clearInterval(timer1);
            }, 0);
            var timer2 = window.setTimeout(function dis() {
                callback && callback();
                contents.style.display = 'block';
                page1();
                window.clearInterval(timer2);
            }, 800);
            var timer3 = window.setTimeout(function () {
                $('.homePage').remove();
                window.clearInterval(timer3);

            }, 1500)
        }

        first(callback);
        function callback() {
            load.className = 'loading';
            soundTwo.pause();

            ~function () {
                var music = document.getElementById("music"), audioFir = document.getElementById("audioFir");

                //->给页面的加载缓冲500MS时间
                window.setTimeout(function () {
                    audioFir.play();

                    //->当音频文件可以播放(出声了)的时候:canplay/canplaythrough
                    audioFir.addEventListener("canplay", function () {
                        music.style.display = "block";
                        music.className = "music musicMove";
                    }, false);
                }, 500);

                //->移动端使用CLICK存在300MS的延迟
                music.addEventListener("click", function () {
                    //->当前是暂停的
                    if (audioFir.paused) {
                        audioFir.play();
                        music.className = "music musicMove";
                        return;
                    }
                    //->当前是播放的
                    audioFir.pause();
                    music.className = "music";
                }, false);
            }();



        }
    }
    slidePage();
}
function endTouch() {
    contents.className = "";
}
//基本信息
var eye = getEle("#eye");
function page1() {
    var font = getEle("#font");
    var flower = getEle("#flower");
    var p1_bg = getEle("#p1_bg");
    var timer = window.setTimeout(function () {
        eye.className = 'eye';
        p1_bg.className = 'lazy';
        font.className = 'lazy';
        flower.className = 'flower';
        list();
    }, 800);
}
function list() {
    var list = document.getElementById('list');
    var oLs = list.getElementsByTagName('li');
    var index = 0;
    var timer1 = window.setInterval(function () {
        zhufengAnimate(oLs[index], {opacity: 1},300);
        index++;
        if (index >= oLs.length) {
            window.clearInterval(timer1);
        }
    }, 700)
}
function slidePage() {
    var step = 1 / 2;
    var oLis = document.querySelectorAll('#main>li');
    console.log(oLis);
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });
    function start(e) {
        if (this.flag)return;
        this.startY = e.changedTouches[0].pageY;
    }

    function move(e) {
        this.flag = true;
        e.preventDefault();
        var moveY = e.changedTouches[0].pageY;
        var movePos = moveY - this.startY;
        var index = this.index;
        [].forEach.call(oLis, function () {
            if (arguments[1] != index) {
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
            arguments[0].firstElementChild.id = "";
        });
        if (movePos > 0) {
            //this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
            this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
            oLis[this.prevsIndex].style.webkitTransform = "translate(0," + (-winH + movePos) + "px)";
        } else if (movePos < 0) {
            this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
            //this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
            oLis[this.prevsIndex].style.webkitTransform = "translate(0," + (winH + movePos) + "px)";
        }
        else {
            this.flag = false;
        }
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].className = "zIndex";
        oLis[index].style.webkitTransform = 'translate(0,' + movePos + 'px) scale(' + (1 - Math.abs(movePos) / winH * step) + ')';
    }

    function end(e) {
        if (this.flag) {
            oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.index].style.webkitTransform = 'translate(0,0) scale(' + (1 - step) + ')';
            oLis[this.index].style.webkitTransition = "0.3s";
            oLis[this.prevsIndex].style.webkitTransition = "0.3s";
            oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                this.firstElementChild.id = "a2";
            });
            this.flag = false;
        }
    }
}


function fnCube(){
    var cubeBox = getEle("#cubeBox");
    cubeBox.style.webkitTransform = "scale(0.7) rotateX(-135deg) rotateY(-165deg)";
    //滑动的距离就是魔方转动的角度
    var startX = -135; /*记录初始X轴滑动的距离*/
    var startY = -145;/*记录初始y轴滑动的距离*/
    var x = null;/*记录x轴移动的距离*/
    var y = null;/*记录y轴移动的距离*/
    document.addEventListener("touchstart",start,false);
    document.addEventListener("touchmove",move,false);
    document.addEventListener("touchend",end,false);
    function start(e){
        this.startTouch = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        }
    }
    function move(e){
        this.flag = true;
        e.preventDefault();
        var moveTouch = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        }
        x = moveTouch.x-this.startTouch.x;
        y = moveTouch.y-this.startTouch.y;
        cubeBox.style.webkitTransform = "scale(0.7) rotateX("+(-startY-y)+"deg) rotateY("+(-startX-x)+"deg)";
    }
    function end(e){
        if(this.flag) {
            //重新初始化起始的值
            startX += x;
            startY += y;
            this.flag = false;
        }
    }

}
fnCube();

document.addEventListener("touchmove",function(){},false)


