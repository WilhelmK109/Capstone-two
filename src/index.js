import { getComments, getMovie, input, submitComment, textarea, open, close, submit } from './modules/comments.js';
import './style.css';

open.addEventListener('click', () => {
    document.querySelector('.comment-container').style.display = 'block';
    document.querySelector('.relative').style.display = 'none';
    getMovie()
});

close.addEventListener('click',()=>{
    document.querySelector('.comment-container').style.display = 'none';
    document.querySelector('.relative').style.display = 'block';
});

getComments();

submit.addEventListener('click',(e) => {
    e.preventDefault();
    submitComment();
    input.value = '';
    textarea.value = '';

});

