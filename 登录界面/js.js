const Rbtn = document.querySelector('.Rbtn');
const Lbtn = document.querySelector('.Lbtn');
const In = document.querySelector('.in');
const Up = document.querySelector('.up');
const overlay = document.querySelector('.overlay');
const overlayImg = document.querySelector('.overlay img');
Rbtn.onclick = function () {
    In.classList.add('moveRight');
    // In.style.zIndex = 0;
    overlay.classList.add('movePre');
    Up.classList.add('movePre');
    overlayImg.style.marginLeft = '-458px';
    Rbtn.style.zIndex = 4;
    Lbtn.style.zIndex = 11;
    Rbtn.style.opacity = 0;
    Lbtn.style.opacity = 1;

    // overlay.firstChild.style.marginLeft = '-458px';
    // In.style.opacity = 0;
    // Up.style.opacity = 1;
    // In.style.index = 1;
    // Up.style.index = 2;

    // In.classList.remove('movePre');
    // Up.classList.remove('moveRight');

    // Up.style.display = 'block';
    // In.style.display = 'none';

}
Lbtn.onclick = function () {
    // In.classList.add('movePre');
    // Up.classList.add('moveLeft');
    Up.classList.remove('movePre');
    In.classList.remove('moveRight');
    // In.style.zIndex = 6;
    overlay.classList.remove('movePre');
    // In.classList.add('movePre');
    // Up.classList.add('moveRight');
    overlayImg.style.marginLeft = '-858px';
    Rbtn.style.zIndex = 11;
    Lbtn.style.zIndex = 4;
    Rbtn.style.opacity = 1;
    Lbtn.style.opacity = 0;
    // Up.style.opacity = 0;
    // In.style.opacity = 1;
    // Up.style.display = 'block';
    // In.style.display = 'none';

}
