window.onload = function () {
    var can = document.getElementById("canvas");
    can.width = wW = window.innerWidth;
    can.height = wH = window.innerHeight;
    var cvs = can.getContext("2d");
    //画背景
    function drawBg(cvs) {
        cvs.beginPath();
        cvs.fillStyle = "#090723";
        cvs.fillRect(0, 0, wW, wH);
        // cvs.save();
    }
    //绘制背景
    drawBg(cvs);
    //创建粒子配置（总体）,静态类
    var Dots =
    {
        n: 200,
        array: []
    }
    //每个粒子
    function Dot() {
        this.color = 'rgba(108, 107, 124,1)';
        //圆心坐标
        this.x = Math.round(Math.random() * wW);
        this.y = Math.round(Math.random() * wH);
        //速度
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.radius = Math.round(Math.random() * 1);
        this.draw = function () {
            cvs.beginPath();
            cvs.fillStyle = this.color;
            cvs.arc(this.x, this.y, this.radius, 0, 360, false);
            cvs.fill();
        };
    }
    //创建粒子并放入数组
    for (var i = 0; i < Dots.n; i++) {
        var dotObj = new Dot();
        Dots.array.push(dotObj);
    }

    //画出粒子
    function drawDots() {
        // drawBg(cvs);
        for (var i = 0; i < Dots.n; i++) {
            Dots.array[i].draw();
        }
    }
    drawDots();
    //移动
    function moveDots() {
        for (var i = 0; i < Dots.n; i++) {
            var dot = Dots.array[i];
            //反弹判断
            if (dot.x < 0 || dot.x > wW) {
                dot.vx = -dot.vx;
            }
            if (dot.y < 0 || dot.y > wH) {
                dot.vy = -dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }
    //无限运动
    function infinateDot() {
        cvs.clearRect(0, 0, wW, wH);
        drawDots();
        moveDots();
        requestAnimationFrame(infinateDot);
    }
    infinateDot();
}