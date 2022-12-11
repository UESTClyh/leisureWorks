const btn = document.querySelector('button');
const input = document.querySelector('input');
const result = document.querySelector('.result');
let flag = 0;
//清空
input.oninput = function () {
    if (input.value == '')
        result.innerHTML = '';
}
//封装
function ajax(url, type) {
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const reg = /\d+/;
        if (reg.test(input.value)) {
            flag = 1;
            xhr.open(type, url + '?citykey=' + input.value);
        }
        else
            xhr.open(type, url + '?city=' + input.value);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    //处理字符串数据
                    // console.log(xhr.response);
                    let response = JSON.parse(xhr.response);
                    console.log(response);
                    resolve(response);
                } else {
                    reject(xhr.status);
                }
            }
        }
    });
    p.then(value => {
        //判断status是否为1000   即正确找到
        if (value['status'] === 1000) {
            //城市名
            let city = document.createElement('span');
            city.className = 'city';
            city.innerHTML = value['data']['city'];
            if (flag == 0 && input.value != value['data']['city'])
                city.innerHTML = '相关搜索：' + city.innerHTML;
            result.appendChild(city);
            //

            let ul = document.createElement('ul');
            result.appendChild(ul);
            //控制输出顺序
            const arrY = [0, 5, 1, 3, 2, 4];
            const arr = [0, 5, 1, 3, 4, 2];

            //yesterday
            let arrYesterday = [];
            const regF = /^\<!\[CDATA.+\]\]\>$/;
            arrYesterday = Object.values(value['data']['yesterday']);
            //处理数据
            for (let i in arrY) {
                if (regF.test(arrYesterday[arrY[i]]) || arrYesterday[arrY[i]].indexOf('温')) {
                    arrYesterday[arrY[i]] = arrYesterday[arrY[i]].replace('<![CDATA[', '');
                    arrYesterday[arrY[i]] = arrYesterday[arrY[i]].replace(']]>', '');
                    arrYesterday[arrY[i]] = arrYesterday[arrY[i]].replace('高温', '');
                    arrYesterday[arrY[i]] = arrYesterday[arrY[i]].replace('低温', '');
                }
            }
            // console.log(arrYesterday);
            let yesterday = document.createElement('li');
            yesterday.innerHTML = '<h3 class="date">' + arrYesterday[0] + '</h1><div class="type">' + arrYesterday[5] + '</div><div class="wind"><span>' + arrYesterday[1] +
                '</span>/<span>' + arrYesterday[3] + '</span></div><div>' + arrYesterday[2] + '</div><div class="wind">' + arrYesterday[4] + '</div>';
            ul.appendChild(yesterday);
            // for (let i in arrY) {
            //     // if ((arrYesterday[arrY[i]]).indexOf('<![CDATA[') != -1) {
            //     if (regF.test(arrYesterday[arrY[i]])) {
            //         arrYesterday[arrY[i]] = arrYesterday[arrY[i]].replace('<![CDATA[', '');
            //         arrYesterday[arrY[i]] = arrYesterday[arrY[i]].replace(']]>', '');
            //     }
            //     let td=document.createElement('td');
            //     td.innerHTML += arrYesterday[arrY[i]] + ' ';
            //     yesterday.appendChild(td);
            //     // yesterday
            // }
            // console.log(yesterday.innerHTML);
            // table.appendChild(yesterday);


            //forecast
            let forecasts = [];
            let mark = 0;
            // let temp = [];
            forecasts = Object.values(value['data']['forecast']);
            // console.log(forecasts);
            for (let fCast of forecasts) {
                // let forecast = document.createElement('p');
                let forecast = document.createElement('li');
                for (let key in fCast) {
                    //处理CDATA文本
                    if (regF.test(fCast[key]) || fCast[key].indexOf('温')) {
                        fCast[key] = fCast[key].replace('<![CDATA[', '');
                        fCast[key] = fCast[key].replace(']]>', '');
                        fCast[key] = fCast[key].replace('高温', '');
                        fCast[key] = fCast[key].replace('低温', '');
                    }
                }
                // console.log(fCast);
                forecast.innerHTML = '<h3 class="date">' + fCast['date'] + '</h1><div class="type">' + fCast['type'] + '</div><div class="wind"><span>' + fCast['high'] +
                    '</span>/<span>' + fCast['low'] + '</span></div><div>' + fCast['fengxiang'] + '</div><div class="wind">' + fCast['fengli'] + '</div>';
                if (mark == 0)
                    forecast.classList = 'today';
                // temp.push(fCast[key]);
                // for (let i of arr) {
                //     forecast.innerHTML += temp[i] + ' ';
                // }
                // forecast.innerHTML += '\n';
                // temp = [];
                ul.appendChild(forecast);
                mark++;
            }

            //advise
            let advise = document.createElement('div');
            advise.innerHTML = value['data']['ganmao'];
            advise.className = 'advise';
            result.appendChild(advise);
        }
        else {
            let userBack = document.createElement('p');
            userBack.innerHTML = value['desc'];
            userBack.style.textAlign = 'center';
            result.appendChild(userBack);
        }

    }, reason => { result.innerHTML = reason; });
}
//点击查询
btn.onclick = function () {
    if (input.value == '')
    alert('请输入');
    else {
        result.innerHTML = '';
        ajax('http://wthrcdn.etouch.cn/weather_mini', 'GET');
    }
}
//回车查询
document.onkeyup = function (e) {
    if (e.key == 'Enter') {
        // if (e.keyCode == 13) {
        btn.click();
        
    }
}