

//禁用右键
document.onmousedown = function (e) {
    if (e.button == 2) {
        // alert("当前页面不能使用右键！");
        return false;
    }
}
document.oncontextmenu = function (e) {
    // e.returnValue = false;
    return false;
}
document.onkeydown = function (e) {
    //禁止ctrl+u
    if (e.ctrlKey && window.event.keyCode == 85) {
        return false;
    }
    //禁止 F12
    if (window.event && window.event.keyCode == 123) {
        window.event.keyCode = 0;
        e.returnValue = false;
    }
}