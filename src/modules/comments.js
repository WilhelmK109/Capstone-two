export const close = document.querySelector('.button-close');
export const submit = document.querySelector('.comment-submit');

export const input = document.querySelector('input');
export const textarea = document.querySelector('textarea');
const commentlist = document.querySelector('.ul-comments');

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const baseMovieurl = 'https://api.tvmaze.com/shows/';
const appID = 'lTv8vDU2N67DXwMylvoz';

const movieImage = document.querySelector('.movieImage');
const movietitle = document.querySelector('.title');
const movielanguage = document.querySelector('.language');
const moviepremier = document.querySelector('.premier');
const movieend = document.querySelector('.end');
const moviestatus = document.querySelector('.status');
const id1 = document.querySelector('.id1');

export const countListItems = (commentlist) => {
  const count = commentlist.getElementsByTagName('li').length;
  return count;
};

export const getMovie = async (id) => {
  const url = `${baseMovieurl}${id}`;
  const response = await fetch(url);
  const data = await response.json();
  id1.innerText = id;
  movieImage.src = data.image.medium;
  movietitle.innerText = data.name;
  movielanguage.innerText = data.language;
  moviepremier.innerText = data.premiered;
  movieend.innerText = data.ended;
  moviestatus.innerText = data.status;
};

export const getComments = async (id2) => {
  const url = `${baseUrl}${appID}/comments?item_id=${id2}`;
  const response = await fetch(url);
  const data = await response.json();
  commentlist.innerHTML = '';
  data.forEach((element) => {
    const comment = document.createElement('li');
    comment.textContent = `${element.creation_date}: ${element.username}  ${element.comment}`;
    commentlist.appendChild(comment);
  });
  const commentNumber = countListItems(commentlist);
  document.querySelector('.commentcount').innerHTML = `(${commentNumber})`;
};

export const openComments = (id) => {
  document.querySelector('.comment-container').style.display = 'block';
  document.querySelector('#items-list').style.display = 'none';
  document.querySelector('body').style.display = 'block';
  getMovie(id);
  getComments(id);
};

const postComments = async (comment) => {
  const url = `${baseUrl}${appID}/comments`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  getComments(comment.item_id);
};

export const submitComment = () => {
  const commentername = input.value;
  const insight = textarea.value;
  const item = id1.innerText;
  const comment = {
    item_id: item,
    username: commentername,
    comment: insight,
  };
  postComments(comment);
};