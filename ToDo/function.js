const input = document.querySelector(".newWork input");
const classPlans = document.querySelector(".class-plans");
const classMyDay = document.querySelector(".class-myDay");
let listPlans = document.querySelector(".list-plans");
let listMyDay = document.querySelector(".list-myDay");
const allWorks = document.querySelector(".allWorks");
const newList = document.querySelector(".newList");
const classes = document.querySelector(".left ul");
let coverWorks = document.querySelector(".coverWorks");
let coverClass = document.querySelector(".coverClass");
const btnForward = document.querySelector("#forward");
const btnReverse = document.querySelector("#reverse");
let furtherInfo = document.querySelector(".right");
let remark = document.querySelector(".right textarea");
let createTime = document.querySelector(".right span");
//初始化
var node;
var key;
//标记类别
let mark = 0;
//记录storage
let storage = window.localStorage;
if (!storage.classNum)
    storage.classNum = 2;
//设置固定类别work数量
if (!storage['class0-num'])
    storage.setItem('class0-num', '0');
if (!storage['class1-num'])
    storage.setItem('class1-num', '0');
//绑定点击事件,初始化
var init = function () {
    //渲染已有数据

    //渲染类别列表
    for (let i = 2; i < Number(storage.classNum); i++) {
        let li = document.createElement('li');
        li.textContent = storage['class' + i];
        classes.appendChild(li);
    }

    //渲染works
    for (let i = 0; i < Number(storage.classNum); i++) {
        let ul = document.createElement("ul");
        ul.classList = 'works';
        allWorks.appendChild(ul);
        for (let j = 0; j < storage['class' + i + '-num']; j++) {
            let li = document.createElement('li');
            li.textContent = storage['work' + i + '-' + j];
            li.oncontextmenu = function (e) {
                e.preventDefault();
                coverWorks.style.display = 'block';
                coverWorks.style.left = e.clientX + 'px';
                coverWorks.style.top = e.clientY + 'px';
                node = e.target;
                key = 'work' + i + ' -' + j;

            }
            allWorks.children[i].appendChild(li);
        }
    }

    //给类别绑定点击事件
    for (let i = 0; i < classes.children.length; i++)
        classes.children[i].onclick = function () {
            mark = i;
            for (let i = 0; i < classes.children.length; i++)
                allWorks.children[i].style.display = 'none';
            allWorks.children[i].style.display = 'block';
            input.focus();
        }
    //展示当前类别workList
    for (let i = 0; i < classes.children.length; i++)
        allWorks.children[i].style.display = 'none';
    allWorks.children[0].style.display = 'block';
    //获取焦点
    input.focus();
}
init();

//点击新建类别
newList.onclick = function () {
    let li = document.createElement('li');
    value = prompt('请输入新建列表标题：');
    li.textContent = value;
    classes.appendChild(li);
    let ul = document.createElement('ul');
    ul.classList = 'works';
    allWorks.appendChild(ul);
    let a = classes.children.length - 1;//作用域理解不够透彻
    classes.children[a].onclick = function () {
        mark = a;
        input.focus();//为啥放下面就没效果？？？
        for (let i = 0; i < classes.children.length; i++)
            allWorks.children[i].style.display = 'none';
        allWorks.children[mark].style.display = 'block';
    }
    li.click();
    storage.setItem('class' + a + '-num', '0');
    storage.setItem('class' + a, value);
    storage.classNum = Number(storage.classNum) + 1;

    //右键功能
    li.oncontextmenu = function (e) {
        e.preventDefault();
        coverClass.style.display = 'block';
        coverClass.style.left = e.clientX + 'px';
        coverClass.style.top = e.clientY + 'px';
        node = e.target;
        keyName = 'class' + a;
        keyNum = 'class' + a + '-num';
    }
}

//回车创建新任务
document.onkeyup = function (e) {
    if (e.key == 'Enter' && input == document.activeElement && input.value != '') {// if (e.keyCode == 13) {
        //创建li
        let li = document.createElement('li');
        li.textContent = input.value;
        allWorks.children[mark].appendChild(li);
        //存储
        let k = mark + '-' + storage['class' + mark + '-num'];
        storage.setItem('work' + k, input.value);
        //存储记录
        var date = new Date();
        storage['time' + k] = date.getTime();
        storage['class' + mark + '-num'] = Number(storage['class' + mark + '-num']) + 1;
        input.value = '';
        //呼出右键菜单
        li.oncontextmenu = function (e) {
            e.preventDefault();
            coverWorks.style.display = 'block';
            coverWorks.style.left = e.clientX + 'px';
            coverWorks.style.top = e.clientY + 'px';
            node = e.target;
            key = k;

        }
        li.onclick = function () {
            furtherInfo.style.display = 'block';
            furtherInfo.children[0].innerHTML = storage['work' + k];
            createTime.innerHTML = getDateTime(Number(storage['time' + k]));
            // remark.value
        }
    }
}

// 阻止默认行为
document.oncontextmenu = function (e) {
    e.preventDefault();
}

//右键的菜单消失,详细信息消失
document.onmousedown = function (e) {
    if (e.target.parentNode != coverWorks)
        coverWorks.style.display = 'none';
    if (e.target != furtherInfo)
        furtherInfo.style.display = 'none';
}

//绑定works右键功能
//删除work
coverWorks.children[2].onclick = function () {
    //删除存储storage
    storage.removeItem('work' + key);
    storage.removeItem('time' + key);
    storage['class' + mark + '-num'] = Number(storage['class' + mark + '-num']) - 1;
    //删除节点
    node.remove();
    coverWorks.style.display = 'none';

}

//绑定class右键功能
// 删除class
coverClass.children[1].onclick = function (e) {
    //删除存储storage
    //删除其class附属works
    for (let i = 0; i < storage[keyNum]; i++) {
        storage.removeItem('work' + mark + '-' + i);
        storage.removeItem('time' + mark + '-' + i);
    }
    storage.removeItem(keyNum);
    storage.removeItem(keyName);
    storage.classNum = Number(storage.classNum) - 1 + '';
    //删除节点
    node.remove();
    allWorks.children[mark].remove();
    coverClass.style.display = 'none';

}

//点击排序
//对象数组排序
let arrObjectSort = function (a) {
    let arr = [];
    for (let j = 0; j < Number(storage['class' + mark + '-num']); j++) {
        let obj = {};
        obj.time = storage['time' + mark + '-' + j];
        obj.text = storage['work' + mark + '-' + j];
        arr[j] = obj;

    }
    let compare = function (obj1, obj2) {
        let time1 = obj1.time;
        let time2 = obj2.time;
        if (time1 < time2) {
            return -a;
        } else if (time1 > time2) {
            return a;
        } else {
            return 0;
        }
    }
    return arr.sort(compare);
}
//逆序
btnReverse.onclick = function () {
    let a = -1;
    let arr = arrObjectSort(a);
    for (let j = 0; j < Number(storage['class' + mark + '-num']); j++)
    {
        allWorks.children[mark].children[j].textContent = arr[j].text;
        storage['work' + mark + '-' + j] = arr[j].text;
        storage['time' + mark + '-' + j] = arr[j].time;
        }

}
//正序
btnForward.onclick = function () {
    let a = 1;
    let arr = arrObjectSort(a);
    for (let j = 0; j < Number(storage['class' + mark + '-num']); j++) {
        allWorks.children[mark].children[j].textContent = arr[j].text;
        storage['work' + mark + '-' + j] = arr[j].text;
        storage['time' + mark + '-' + j] = arr[j].time;
    }
}

//格式化时间戳
let getDateTime=function(value) {
    let time = new Date(value);
    let year = time.getFullYear() + '/';
    let month = (time.getMonth() + 1);
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    month = month < 10 ? '0' + month + '/' : month + '/';
    date = date < 10 ? '0' + date : date;
    hour = hour < 10 ? '0' + hour + ":" : hour + ":";
    minute = minute < 10 ? '0' + minute : minute + ":";
    second = second < 10 ? '0' + second : second;
    let str = String(year) + String(month) + String(date) + ' ' + String(hour) + String(minute) + String(second);
    return str;
}
