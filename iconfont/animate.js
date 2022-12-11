function animate(obj,target,s,callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
            // var step = (target - obj.offsetLeft) / 10;
            // step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // if (obj.offsetLeft == target)
            //     clearInterval(obj.timer);
            // if (s > 0)
            //     //缓动
            //     obj.style.left = obj.offsetLeft + step + 'px';
            // else
            //     //平动
            //     obj.style.left = obj.offsetLeft + 1 + 'px';

        var step = (target + obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == -target)
            clearInterval(obj.timer);
        if (s > 0)
            //缓动
            obj.style.left = obj.offsetLeft - step + 'px';
        else
            //平动
            obj.style.left = obj.offsetLeft - 1 + 'px';
        // obj.style.left = s > 0 ? obj.offsetLeft + step + 'px' : obj.offsetLeft + 1 + 'px';

    }, 8);
    if (callback)
        callback();
}