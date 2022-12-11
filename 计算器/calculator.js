// 保持顶部换图
var keep = document.querySelector('#keep');
keep.addEventListener('mouseover', function () {
    if(markCo==0)
        keep.src = 'images/保持顶部.png';
    else
        keep.src = 'images/保持顶部白灰.png';
    })
keep.addEventListener('mouseout', function () {
    if(markCo==0)
        keep.src = 'images/保持顶部1.png';
    else
         keep.src = 'images/保持顶部白.png';
    })
//菜单出现消失
// var flag2 = 0;
// var menu = document.querySelector('.mid-inleft');
// var menus = document.querySelector('.mid-left');
// menu.addEventListener('click', function () {
//     if (flag2 == 0) {
//         this.src = 'images/菜单换.png';
//         this.parentNode.classList.add("mid-left-change");
//         flag2 = 1;
//     }
//     else {
//         this.src = 'images/更多.png';
//         this.parentNode.classList.remove('mid-left-change');
//         flag2 = 0;
//     }
// })


//菜单
var menu = document.querySelector('.mid-inleft');
var menu_content = document.querySelector('.menu');
var flag2 = 0;
menu.addEventListener('click', function () {
    if(flag2==0)
    {
        menu_content.style.display = 'block';
        flag2 = 1;
    }
    else {
         menu_content.style.display = 'none';
        flag2 = 0;
    }
})
//不可选中
document.addEventListener('selectstart', function (e) {
    e.preventDefault();
})

//清除
var clear = document.querySelector('#clear');
clear.addEventListener('click', function () {
                if (flag == 1)
                {
                    if (results.innerHTML.length == 1)
                    {
                        results.innerHTML = '0';
                        flag = 0;
                        }

                    else
                        results.innerHTML = results.innerHTML.slice(0, results.innerHTML.length-1);
                }
})

//开方
var sqrt = document.querySelector('#sqrt');
sqrt.addEventListener('click', function () {
    memory.innerHTML = '√(' + results.innerHTML + ')';
    results.innerHTML = Math.sqrt(Number(results.innerHTML));
    if (results.innerHTML.toString().split(".")[1].length >= 9)
    results.innerHTML=Number(results.innerHTML).toFixed(9);
                flag = 0;
})
//取相反数
var jiajian = document.querySelector('#jiajian');
jiajian.addEventListener('click', function () {
                if (memory.innerHTML.indexOf('negate') == -1)
                    flag1 = 0;
                if (memory.innerHTML.indexOf('=') != -1)//按了=
                {
                    if (results.innerHTML.indexOf('-') != -1) {
                        results.innerHTML = results.innerHTML.replace('-', '');
                        memory.innerHTML = 'negate(' + results.innerHTML + ')';
                        flag1 = 1;
                    }
                    else {
                        results.innerHTML = '-' + results.innerHTML;
                        memory.innerHTML = 'negate(' + results.innerHTML + ')';
                        flag1 = 1;
                    }
                }
                else if (flag1 == 1)//按了=之后且已有negate
                {
                    if (results.innerHTML.indexOf('-') != -1) {
                        results.innerHTML = results.innerHTML.replace('-', '');
                        memory.innerHTML = 'negate(' + results.innerHTML + ')';
                    }
                    else {
                        results.innerHTML = '-' + results.innerHTML;
                        memory.innerHTML = 'negate(' + results.innerHTML + ')';
                    }
                    }
                else
                {
                    if (results.innerHTML.indexOf('-') != -1)
                    {
                        results.innerHTML = results.innerHTML.replace('-', '');
                    }
                    else
                    results.innerHTML = '-' + results.innerHTML;
                }

})

//普遍
var btn = document.querySelector('.bottom');
var results = document.querySelector('.results');
var memory = document.querySelector('.memory');
var flag = 0, flag1 = 0,mark=0, sum=0,temp,times=0,mark0=0,mark_re=0;
btn.addEventListener('click', function (e) {
    if((e.target.innerHTML>='0'&&e.target.innerHTML<='9')&&e.target.innerHTML!='1/x'&&e.target.innerHTML!='.')
    {

        if (results.innerHTML != '0' || e.target.innerHTML != '0')
        {

            if (flag == 0)
            {
            flag = 1;
            results.innerHTML = e.target.innerHTML;
            }
            else
            results.innerHTML += e.target.innerHTML;
            if (results.innerHTML == '0')
                mark0 = 1;
        }
        if (mark_re != 0)
        {
            mark_re = 0;
            results.innerHTML = e.target.innerHTML;
            memory.innerHTML = '';
            }
    }
    else
    {
        switch (e.target.innerHTML)
        {
            case '+':
                if (times != 0)
                {
                    if (memory.innerHTML.indexOf('÷') != -1 && mark0 != 0) {
                        results.innerHTML = '除数不能为零';
                        break;
                    }
                    while (memory.innerHTML.indexOf('✕') != -1) { memory.innerHTML = memory.innerHTML.replace('✕', '*'); }
                    while (memory.innerHTML.indexOf('÷') != -1) { memory.innerHTML = memory.innerHTML.replace('÷', '/'); }
                    memory.innerHTML += results.innerHTML;
                    while (memory.innerHTML.indexOf('--') != -1) { memory.innerHTML = memory.innerHTML.replace('--', '+'); }

                    results.innerHTML = eval(memory.innerHTML);
                    }
                memory.innerHTML = results.innerHTML + e.target.innerHTML;
                flag = 0;
                mark = 0;
                times = 1;mark_re = 0;
                if (results.innerHTML.toString().split(".")[1].length >= 9)
                {results.innerHTML = Number(results.innerHTML).toFixed(9);}
                break;
            case '-':
                if (times != 0)
                {
                    if (memory.innerHTML.indexOf('÷') != -1 && mark0 != 0) {
                        results.innerHTML = '除数不能为零';
                        break;
                    }
                    while (memory.innerHTML.indexOf('✕') != -1) { memory.innerHTML = memory.innerHTML.replace('✕', '*'); }
                    while (memory.innerHTML.indexOf('÷') != -1) { memory.innerHTML = memory.innerHTML.replace('÷', '/'); }
                    memory.innerHTML += results.innerHTML;
                    while (memory.innerHTML.indexOf('--') != -1) { memory.innerHTML = memory.innerHTML.replace('--', '+'); }
                    results.innerHTML = eval(memory.innerHTML);
                    }
                memory.innerHTML = results.innerHTML + e.target.innerHTML;
                flag = 0; mark = 0; times = 1;mark_re = 0;
                if (results.innerHTML.toString().split(".")[1].length >= 9)
                {results.innerHTML = Number(results.innerHTML).toFixed(9);}
                break;
            case '÷':
                if (memory.innerHTML.indexOf('÷') != -1 && mark0 != 0) {
                        results.innerHTML = '除数不能为零';
                        break;
                    }
                if (times != 0)
                {
                    memory.innerHTML += results.innerHTML;
               while (memory.innerHTML.indexOf('✕') != -1) {memory.innerHTML=memory.innerHTML.replace('✕', '*'); }
                    while (memory.innerHTML.indexOf('÷') != -1) { memory.innerHTML = memory.innerHTML.replace('÷', '/'); }
                    while (memory.innerHTML.indexOf('--') != -1) { memory.innerHTML = memory.innerHTML.replace('--', '+'); }
                    results.innerHTML = eval(memory.innerHTML);
                }
                memory.innerHTML = results.innerHTML + e.target.innerHTML;
                flag = 0; mark = 0; times = 1;mark_re = 0;
                if (results.innerHTML.toString().split(".")[1].length >= 9)
                {results.innerHTML = Number(results.innerHTML).toFixed(9);}
                break;
            case '✕':
                if (times != 0)
                {
                    if (memory.innerHTML.indexOf('÷') != -1 && mark0 != 0) {
                        results.innerHTML = '除数不能为零';
                    }
                    memory.innerHTML += results.innerHTML;
                    while (memory.innerHTML.indexOf('✕') != -1) {memory.innerHTML=memory.innerHTML.replace('✕', '*'); }
                    while (memory.innerHTML.indexOf('÷') != -1) { memory.innerHTML = memory.innerHTML.replace('÷', '/'); }
                    while (memory.innerHTML.indexOf('--') != -1) { memory.innerHTML = memory.innerHTML.replace('--', '+'); }
                    results.innerHTML = eval(memory.innerHTML);
                }
                memory.innerHTML = results.innerHTML + e.target.innerHTML;
                flag = 0; mark = 0; times = 1;mark_re = 0;
                if (results.innerHTML.toString().split(".")[1].length >= 9)
                {results.innerHTML = Number(results.innerHTML).toFixed(9);}
                break;
            case '.':
                if (mark == 0) {
                    console.log('h');
                    results.innerHTML = results.innerHTML + e.target.innerHTML;
                    flag = 1;
                    mark = 1;}
                    break;

            case '1/x':
                memory.innerHTML = '1/(' + results.innerHTML + ')';
                if (results.innerHTML == '0')
                {
                    results.innerHTML = '除数不能为零';
                break;
                    }
                results.innerHTML = eval(memory.innerHTML);
                if (results.innerHTML.toString().split(".")[1].length >= 9)
                results.innerHTML =Number(results.innerHTML).toFixed(9);
                // eval(memory.innerHTML);
                // results.innerHTML = parseFloat((eval(temp))).toFixed(10);
                flag = 0;mark = 0;
                break;
            case 'x²':
                memory.innerHTML = 'sqr(' + results.innerHTML + ')';
                results.innerHTML = eval(results.innerHTML+'*'+results.innerHTML);
                flag = 0; mark = 0;
                break;

            case 'C':
                memory.innerHTML = '';
                results.innerHTML = '0';
                flag = 0; mark = 0; times = 0; mark_re = 0; mark0 = 0; break;
            case 'CE':
                if (memory.innerHTML.indexOf('=')!=-1) {
                    memory.innerHTML = '';
                    results.innerHTML = '0';
                }
                else
                    results.innerHTML = '0';
                flag = 0;
                break;
            case '=':
                memory.innerHTML += results.innerHTML;
                temp = memory.innerHTML;
                if (memory.innerHTML.indexOf('÷') != -1 && mark0 != 0)
                {
                    results.innerHTML = '除数不能为零';
                    mark_re = 1;
                break;
                    }
                while (temp.indexOf('✕') != -1) {temp=memory.innerHTML.replace('✕', '*'); }
                while (temp.indexOf('÷') != -1) { temp = memory.innerHTML.replace('÷', '/'); }
                while (temp.indexOf('--') != -1) { temp = memory.innerHTML.replace('--', '+'); }
                results.innerHTML = eval(temp);
                memory.innerHTML += '=';
                times = 0; mark0 = 0;mark_re = 1;
                if (results.innerHTML.toString().split(".")[1].length >= 9)
                { results.innerHTML = Number(results.innerHTML).toFixed(9); }

                break;

            default:
                break;

        }
        }

})
//点击变色
var markCo = 0;
var Bgc = document.querySelector('.index');
var index = document.querySelector('.index');
document.addEventListener('click',function(e){
    if (e.pageX > 685 && e.pageX < 1018 && e.pageY > 130 && e.pageY < 685) {
        Bgc.style.backgroundColor = '#eef5f9';
        index.style.boxShadow='0px 0px 40px  rgba(0,0,0,0.25)';
        keep.src = 'images/保持顶部1.png';
        markCo = 0;
    }
    else {
        Bgc.style.backgroundColor = '#f3f3f3';
        keep.src = 'images/保持顶部白.png';
        index.style.boxShadow='0px 0px 20px  rgba(0,0,0,0.25)';
        markCo = 1;
    }
})
var menuGray = document.querySelector('.mid-left')
menuGray.addEventListener('mouseover', function () {
    if (markCo == 1)
        this.style.backgroundColor = '#eaeaea';
    else
        this.style.backgroundColor = '#e3edf0';
})
menuGray.addEventListener('mouseout', function () {
    if (markCo == 0)
        this.style.backgroundColor = '';
    else
        this.style.backgroundColor = '';
})
var record = document.querySelector('.record')
record.addEventListener('mouseover', function () {
    if (markCo == 1)
        this.style.backgroundColor = '#eaeaea';
    else
        this.style.backgroundColor = '#e3edf0';
})
record.addEventListener('mouseout', function () {
    // if (markCo == 0)
    //     this.style.backgroundColor = '';
    // else
        this.style.backgroundColor = '';
})
var ul = document.querySelector('.ul');
ul.addEventListener('mouseover', function (e) {
    if(e.target!=ul)
    {if (markCo == 0)
        e.target.style.backgroundColor = '#e5ecef';
    else
        e.target.style.backgroundColor = '#eaeaea';}
})
ul.addEventListener('mouseout', function (e) {
    // if (markCo == 1)
    //     e.style.backgroundColor = '';
    // else
        e.target.style.backgroundColor = '';
})
// <!-- 1026 190 -->

// 510 842