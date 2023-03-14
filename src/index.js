import './style.css';

const close = document.querySelector('.button-close');
const open = document.querySelector('.open-comments');

open.addEventListener('click', () => {
    document.querySelector('.comment-container').style.display = 'block';
    document.querySelector('.relative').style.display = 'none';
});

close.addEventListener('click',()=>{
    document.querySelector('.comment-container').style.display = 'none';
    document.querySelector('.relative').style.display = 'block';
});