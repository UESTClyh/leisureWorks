const body = document.querySelector("body");
const cover = document.querySelector(".coverMark");
const coverImage = document.querySelector(".coverMark img");
const bgc = document.querySelector(".bgcMark");
const bgcClick = document.querySelector(".clickFuncMark");
var oWrap = document.querySelector('.boxMark');
var oWrapImage = document.querySelector('.boxMark img');

function IsPc() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'];
    let flag = true;
    for (let i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            flag = false;
            break;
        }
    }
    if (window.screen.width >= 768) {
        flag = true;
    }
    return flag;
}
//赋类名
if (IsPc()) {
    cover.classList = 'coverPc'
    bgc.classList = 'bgcPc'
    bgcClick.classList = 'clickFuncPc'
    oWrap.classList = 'boxPc'
} else {
    cover.classList = 'cover'
    bgc.classList = 'bgc'
    bgcClick.classList = 'clickFunc'
    oWrap.classList = 'box'
}

//字体大小设置
// (() => {
//     // 设置字体大小
//     function calcFontSize() {
//         const zoom = window.innerWidth / 1920;
//         const size = zoom * 16;
//         document.documentElement.style.fontSize = size + "px";
//         console.log('设置字体大小', size);
//     }

//     window.onload = () => {
//         console.log("页面加载完成")
//         let resize_timer = null;
//         const resize = () => {
//             if (resize_timer) {
//                 clearTimeout(resize_timer);
//             }
//             resize_timer = setTimeout(() => {
//                 resize_timer = null;
//                 calcFontSize();
//             }, 500);
//         }
//         window.onresize = resize;
//     }

// })()
function calcFontSize() {
    const zoom = window.innerWidth / 1920;
    const size = zoom * 16;
    document.documentElement.style.fontSize = size + "px";
    // console.log('设置字体大小', size);
}
window.onresize = function () {
    // consolo.log($(window).width());
    // consolo.log($(window).height());
    bgcClick.style.top = window.innerHeight * 0.5 - bgcClick.clientHeight * 0.5 + "px"
    // bgcClick.style.top = bgcClick.offsetTop - bgcClick.clientHeight * 0.5 + "px"
    bgcClick.style.left = window.innerWidth * 0.5 - bgcClick.clientWidth * 0.5 + "px"
    let resize_timer = null;
    if (resize_timer) {
        clearTimeout(resize_timer);
    }
    resize_timer = setTimeout(() => {
        resize_timer = null;
        calcFontSize();
    }, 500);

}
// coverImage.style.height = coverImage.style.width;
//匹配位置
// bgcClick.style.top = bgcClick.offsetTop - bgcClick.clientHeight * 0.5 + "px"
// bgcClick.style.top = bgcClick.offsetTop - bgcClick.clientHeight * 0.5 + "px"
bgcClick.style.top = window.innerHeight * 0.5 - bgcClick.clientHeight * 0.5 + "px"
bgcClick.style.left = window.innerWidth * 0.5 - bgcClick.clientWidth * 0.5 + "px"



const hrefList = [
    './conlist/picture.html',
    // 'https://tva1.sinaimg.cn/large/0073e8Dlgy1h8hmv6tyf2j30u00y8n5k.jpg',
    './conlist/competition.html',
    './conlist/culture.html',
    // '#',
    './conlist/social.html',
    './conlist/party.html'
];
//校徽浮现后消失
if (cover.style.opacity = '0')
    setTimeout(function () {
        cover.style.display = 'none'
    }, 6000)
//校徽消失后
if (cover.style.opacity = '0')
    setTimeout(function () {
        //出现点击
        bgcClick.style.animation = 'gradient1 4s forwards'

        setTimeout(function () {
            bgcClick.addEventListener('click', function () {
                bgc.style.animation = 'gradient3 1s forwards'
                bgcClick.style.display = 'none'
                setTimeout(function () {
                    //1.获取元素
                    oWrap.style.display = 'block'
                    if (IsPc()) {
                        setTimeout(function () {
                            var oImg = oWrap.children;
                            // var oImgLen=oImg.length;
                            var deg = 360 / oImg.length;//3.每个需要旋转的度数
                            // 定义一个开始的度数
                            var roX = -10;
                            var roY = 0;
                            var x, y, x_, y_, xN, yN, time = null;
                            //2.遍历所有的img标签
                            for (let i = 0; i < oImg.length; i++) {
                                // oImg[i].style.cssText='transform:rotateY('+i*deg+'deg ) translateZ(350px);transition:1s'+ (oImgLen-i)*0.1 +'s;';
                                oImg[i].style.transform = 'rotateY(' + i * deg + 'deg) translateZ(350px)';
                                oImg[i].style.transition = ' all 1s ' + (oImg.length - i - 1) * 0.1 + 's';
                                //transition:设置过渡
                                oImg[i].ondragstart = function () {
                                    return false;
                                }
                                oImg[i].addEventListener('click', function () {
                                    // console.log(i);
                                    // console.log(hrefList[i]);
                                    window.location.href = hrefList[i]
                                })
                            }
                            //3.事件处理
                            document.onmousedown = function (e) {
                                clearInterval(time);
                                e = e || window.event;
                                x_ = e.clientX;
                                y_ = e.clientY;
                                // console.log ( "鼠标按下了" )
                                this.onmousemove = function (e) {
                                    e = e || window.event;
                                    //获取滚动的X和Y轴
                                    //client:鼠标触发点相对于页面可视区域左上角距离
                                    x = e.clientX;
                                    y = e.clientY;
                                    //两点之间的差值:第一次走的时候两值相等,第二次走的时候x已经更新,但x_没更新,所以两个差值就是xN;
                                    xN = x - x_;
                                    yN = y - y_;
                                    //差值拼接到旋转的Y里面去
                                    roY += xN * 0.2;//水平拖影响Y轴;
                                    roX -= yN * 0.2;
                                    oWrap.style.transform = 'perspective(800px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';
                                    // var oDiv =document.createElement('div');
                                    // this.body.appendChild(oDiv);
                                    // oDiv.style.cssText='width:5px;height:5px; background:red;position:absolute;left:'+x+"px;top:"+y+"px";这三行是测试用的
                                    x_ = e.clientX;
                                    y_ = e.clientY;
                                }
                                this.onmouseup = function () {
                                    //  console.log ( "鼠标抬起了" )
                                    this.onmousemove = null;
                                    //设置一个定时器,实现后面惯性效果8
                                    time = setInterval(function () {

                                        //无限乘以零点95它会接近0的状态
                                        xN *= 0.95;
                                        yN *= 0.95;
                                        //当它小到0.1时停止计时器
                                        if (Math.abs(xN) < 0.1 && Math.abs(yN) < 0.1) {//Math.abs()是返回绝对值
                                            clearInterval(time);
                                        }
                                        //差值拼接到旋转的Y里面去
                                        roY += xN * 0.2;//水平拖影响Y轴;
                                        roX -= yN * 0.2;
                                        oWrap.style.transform = 'perspective(800px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

                                    }, 30)
                                }
                                // }
                            }
                        }, 10)
                    } else {
                        setTimeout(function () {
                            var oImg = oWrap.children;
                            // var oImgLen=oImg.length;
                            var deg = 360 / oImg.length;//3.每个需要旋转的度数
                            // 定义一个开始的度数
                            var roX = -10;
                            var roY = 0;
                            var x, y, x_, y_, xN, yN, time = null;
                            //2.遍历所有的img标签
                            for (let i = 0; i < oImg.length; i++) {
                                // oImg[i].style.cssText='transform:rotateY('+i*deg+'deg ) translateZ(350px);transition:1s'+ (oImgLen-i)*0.1 +'s;';
                                oImg[i].style.transform = 'rotateY(' + i * deg + 'deg) translateZ(350px)';
                                oImg[i].style.transition = ' all 1s ' + (oImg.length - i - 1) * 0.1 + 's';
                                //transition:设置过渡
                                oImg[i].ondragstart = function () {
                                    return false;
                                }
                                oImg[i].addEventListener('click', function () {
                                    // window.location.href = 'http://119.91.225.190/0915display/social/social.html'
                                    // window.location.href = 'http://127.0.0.1:5500/0915display/images/photo.jpg'
                                    window.location.href = hrefList[i]
                                })
                            }
                            //3.事件处理
                            document.ontouchstart = function (e) {
                                // alert(e.changedTouches[0].clientX)
                                clearInterval(time);
                                e = e || window.event;

                                x_ = e.changedTouches[0].clientX;
                                y_ = e.changedTouches[0].clientY;
                                // console.log ( "鼠标按下了" )
                                this.ontouchmove = function (e) {
                                    e = e || window.event;
                                    //获取滚动的X和Y轴
                                    //client:鼠标触发点相对于页面可视区域左上角距离
                                    x = e.changedTouches[0].clientX;
                                    y = e.changedTouches[0].clientY;
                                    //两点之间的差值:第一次走的时候两值相等,第二次走的时候x已经更新,但x_没更新,所以两个差值就是xN;
                                    xN = x - x_;
                                    yN = y - y_;
                                    //差值拼接到旋转的Y里面去
                                    roY += xN * 0.2;//水平拖影响Y轴;
                                    roX -= yN * 0.2;
                                    oWrap.style.transform = 'perspective(800px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';
                                    // var oDiv =document.createElement('div');
                                    // this.body.appendChild(oDiv);
                                    // oDiv.style.cssText='width:5px;height:5px; background:red;position:absolute;left:'+x+"px;top:"+y+"px";这三行是测试用的
                                    x_ = e.changedTouches[0].clientX;
                                    y_ = e.changedTouches[0].clientY;
                                }
                                this.ontouchup = function () {
                                    //  console.log ( "鼠标抬起了" )
                                    this.ontouchup = null;
                                    //设置一个定时器,实现后面惯性效果8
                                    time = setInterval(function () {

                                        //无限乘以零点95它会接近0的状态
                                        xN *= 0.95;
                                        yN *= 0.95;
                                        //当它小到0.1时停止计时器
                                        if (Math.abs(xN) < 0.1 && Math.abs(yN) < 0.1) {//Math.abs()是返回绝对值
                                            clearInterval(time);
                                        }
                                        //差值拼接到旋转的Y里面去
                                        roY += xN * 0.2;//水平拖影响Y轴;
                                        roX -= yN * 0.2;
                                        oWrap.style.transform = 'perspective(800px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)';

                                    }, 30)
                                }
                                // }
                            }
                        }, 10)
                    }
                }, 10)



            })
        }, 1500)
    }, 4000)

if (bgc.style.opacity = '1')
    setTimeout(function () {
        bgc.style.animation = IsPc() ? 'zoomPc 2.8s ease-in-out' : 'zoom 2.8s ease-in-out'
        bgc.style.animationIterationCount = 'infinite'
    }, 3000)

//禁止页面滑动
document.body.style.overflow = 'hidden';
document.addEventListener("touchmove", function (e) {
    e.preventDefault();
}, false);
/*
Designed by
    @Yuhang Liu
    @Yulin Hu
    @Yongkang Li
    @Huaxin Ding
    @Maosheng Li
*/