var img = document.querySelector('.mid');
var em = document.querySelectorAll('em');
var ems = document.querySelector('.more');
var input = document.querySelector('.quick-menu input');
var searchFrame = document.querySelector('.quick-menu .search');
var carousel = document.querySelector('.swiper-wrapper');
//‘更多’变色
ems.addEventListener('mouseover', function () {
    for (let i = 0; i < em.length; i++) {
        em[i].style.background = '#fff';
    }
})
ems.addEventListener('mouseout', function () {
    for (let i = 0; i < em.length; i++) {
        em[i].style.background = 'rgba(255, 255, 255, .5)';
    }
})

//搜索框箭头旋转
var searchLeft = document.querySelector('.searchLeft');
var searchIcon = document.querySelector('#searchIcon');
var searchDropdown = document.querySelector('.searchDropdown');
var arrow = document.querySelector('.arrow');
var dropdownArrow = document.querySelector('.dropdownArrow');
var dropdownMenu = document.querySelector('.dropdown-menu');
var dropdownMenuCharacter = document.querySelector('.character');
var dropdownSearchText = document.querySelector('.searchText');
var searchDropdown = document.querySelector('.searchDropdown');
var dropdownMenuA = document.querySelectorAll('.dropdown-menu a');
var markArrow1 = 0;
var markArrow2 = 0;
//选搜索对象
searchLeft.onclick = function (e) {
    e.stopPropagation();
    if (markArrow1 == 0) {
        arrow.style.transform = 'rotate(180deg)';
        dropdownMenu.style.display = 'block';
        markArrow1 = 1;
    }
    else {
        arrow.style.transform = 'rotate(0)';
        dropdownMenu.style.display = 'none';
        markArrow1 = 0;

    }
}

dropdownMenu.addEventListener('click', function (e) {
    dropdownMenuCharacter.innerHTML = e.target.innerHTML;
})
//选搜索对象
searchIcon.onclick = function (e) {
    e.stopPropagation();
    if (markArrow2 == 0) {
        dropdownArrow.style.transform = 'rotate(180deg)';
        searchDropdown.style.display = 'block';
        markArrow2 = 1;
    }
    else {
        dropdownArrow.style.transform = 'rotate(0)';
        searchDropdown.style.display = 'none';
        markArrow2 = 0;
    }
}
searchDropdown.addEventListener('click', function (e) {
    dropdownSearchText.innerHTML = e.target.innerHTML;
})
//点击屏幕隐藏
document.onclick = function () {
    if (markArrow1 == 1) {
        dropdownArrow.style.transform = 'rotate(0)';
        markArrow1 = 0;
    }
    if (markArrow2 == 1) {
        searchDropdown.style.display = 'none';
        dropdownArrow.style.transform = 'rotate(0)';
        markArrow2 = 0;
    }

}
//下拉菜单
var dropdowns = document.querySelectorAll('.dropdown');
for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('mouseover', function (e) {

        dropdowns[i].lastElementChild.style.display = 'block';
        dropdowns[i].firstElementChild.style.color = '#fff';
        if (e.target != dropdowns[4].firstElementChild)
            dropdowns[4].firstElementChild.style.color = 'rgba(255, 255, 255, .5)';

    })
    dropdowns[i].addEventListener('mouseout', function () {
        dropdowns[i].lastElementChild.style.display = 'none';
        dropdowns[i].firstElementChild.style.color = 'rgba(255, 255, 255, .5)';

    })
}
// console.log(dropdowns.length);

//轮播图
//动态生成小圆点
var circle = document.querySelector('.circle');
for (let i = 0; i < carousel.children.length; i++) {

    let createEm = document.createElement('em');
    circle.appendChild(createEm);
}
circle.firstChild.style.background = '#ff807f';
//小圆点点击变色 换图
var circles = document.querySelectorAll('.circle em');
for (let i = 0; i < circles.length; i++) {
    circles[i].addEventListener('click', function () {
        for (let i = 0; i < circles.length; i++) {
            circles[i].style.background = '#e5e5e5';
        }
        this.style.background = '#ff807f';
        animate(carousel, 1050 * (i), 1);
    })
}
//自动播放
var i = 1;
var timer = setInterval(function () {

    if (i == 3) {
        animate(carousel, -1050 * 3, 1);
        i = 0;
    }
    animate(carousel, 1050 * i, 1);
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.background = '#e5e5e5';
    }
    circles[i].style.background = '#ff807f';
    i++;
}, 3100);
//鼠标经过停止
carousel.addEventListener('mouseover', function () {
    clearInterval(timer);
})
carousel.addEventListener('mouseout', function () {
    timer = setInterval(function () {

        if (i == 3) {
            animate(carousel, -1050 * 3, 1);
            i = 0;
        }
        animate(carousel, 1050 * i, 1);
        for (let i = 0; i < circles.length; i++) {
            circles[i].style.background = '#e5e5e5';
        }
        circles[i].style.background = '#ff807f';
        i++;
    }, 3100);
})
//侧边栏
var sidebar = document.querySelector('.sidebar');
document.addEventListener('scroll', function () {
    if (window.pageYOffset > 215) {
        sidebar.style.display = 'block';
    }
    else
        sidebar.style.display = 'none';
})
//购物车
var maskShow = document.querySelector('.maskShow');
var mask = document.querySelector('.mask');
var upshopCar = document.querySelector('.upshopCar');
var carArrow = document.querySelector('.carArrow');
var shopCar = document.querySelector('.shopCar');
var body = document.querySelector('body');
maskShow.addEventListener('click', function () {
    //禁用滚动条
    body.style.overflow = 'hidden';
    upshopCar.style.transform = 'translateX(-300px)';
    mask.style.display = 'block';
})
shopCar.addEventListener('click', function () {
    maskShow.click();
})
mask.addEventListener('click', function () {
    //滚动条恢复
    body.style.overflow = 'auto';
    upshopCar.style.transform = 'translateX(300px)';
    mask.style.display = 'none';
})
carArrow.addEventListener('click', function () {
    //滚动条恢复
    body.style.overflow = 'auto';
    upshopCar.style.transform = 'translateX(300px)';
    mask.style.display = 'none';
})
//返回顶部

var index = document.querySelector('.index');
var sidebarBtn = document.querySelectorAll('.sidebarItem');
sidebarBtn[2].addEventListener('click', function () {
    //禁止滚轮

    var timer = setInterval(function () {
        var step = window.scrollY / 20;
        step = Math.ceil(step);
        if (window.scrollY == 0) {
            clearInterval(timer);
            window.onload = scrollFunc(window);
        }
        window.scroll(0, window.scrollY - step);
    }, 1);

})

//tab
//循环渲染
let a = 0;
var smallCard = document.querySelectorAll('.smallCard');
for (let i = 0; i < smallCard.length; i++) {
    var html = '';
    let p = i > 2 ? i+1 : i + 7;
    for (let j = 0; j < 6; j++)
       { html += '<li class="UlLi"><img class="imgInLi" data-src="img/smallCard' + p + '-' + (j + 1) + '.png"></img></li>';
    a++;}
    smallCard[i].lastElementChild.firstElementChild.innerHTML = html;
}
console.log(a);
// console.log(smallCard[0].lastElementChild.firstElementChild);
var tabs = document.querySelectorAll('.roundTop ul li');
var tabPits = document.querySelectorAll('#tab');
var pictures = document.querySelectorAll('.imgInLi');
// console.log(pictures);
//懒加载？
var flag = [0, 0, 0, 0];
for (let i = 0; i < tabs.length; i++) {
    tabs[i].onmouseover = function () {
        for (let i = 0; i < tabs.length; i++) {
            tabPits[i].style.display = 'none';
            tabs[i].firstElementChild.style.backgroundColor = 'rgba(255, 255, 255, .2)';
            tabs[i].firstElementChild.firstElementChild.style.display = 'block';
            tabs[i].firstElementChild.lastElementChild.style.display = 'none';
        }
        tabs[i].firstElementChild.style.backgroundColor = '#fff';
        tabs[i].firstElementChild.firstElementChild.style.display = 'none';
        tabs[i].firstElementChild.lastElementChild.style.display = 'block';
        tabPits[i].style.display = 'block';
        switch (i) {
            case 0:
                if (flag[i] == 0)
                    for (let j = 0; j < 45; j++) {
                        pictures[j].src = pictures[j].getAttribute('data-src');
                    }
                flag[i] = 1;
                break;
            case 1:
                if (flag[i] == 0)
                    for (let j = 45; j < 63; j++) {
                        pictures[j].src = pictures[j].getAttribute('data-src');
                    }
                flag[i] = 1;
                break;
            case 2:
                if (flag[i] == 0)
                    for (let j = 63; j < 81; j++) {
                        pictures[j].src = pictures[j].getAttribute('data-src');
                    }
                flag[i] = 1;
                break;
            case 3:
                if (flag[i] == 0)
                    for (let j = 81; j < 99; j++) {
                        pictures[j].src = pictures[j].getAttribute('data-src');
                    }
                flag[i] = 1;
                break;
        }
    }


}
tabs[0].onmouseover();

//中部搜索
var searchIcon = document.querySelector('.midSearch input');
var inputCover = document.querySelector('.inputCover');
inputCover.addEventListener('click', function () {
    inputCover.style.display = 'none';
    searchIcon.focus();
})
searchIcon.addEventListener('blur', function () {
    if (searchIcon.value == "")
        inputCover.style.display = 'block';
})
window.onblur = function () {
    searchIcon.blur();
}