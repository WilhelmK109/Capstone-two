import {
  getComments, input, submitComment, textarea, close, submit,
} from './modules/comments.js';
import './style.css';

close.addEventListener('click', () => {
  document.querySelector('.comment-container').style.display = 'none';
  document.querySelector('#items-list').style.display = 'grid';
  document.querySelector('body').style.display = 'flex';
});

getComments();

submit.addEventListener('click', (e) => {
  e.preventDefault();
  submitComment();
  input.value = '';
  textarea.value = '';
});
