export const close = document.querySelector('.button-close');
export const open = document.querySelector('.open-comments');
export const submit = document.querySelector('.comment-submit');

export const input = document.querySelector('input');
export const textarea = document.querySelector('textarea');
const commentlist = document.querySelector('.ul-comments');

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const baseMovieurl = 'https://api.tvmaze.com/shows/';
const appID = 'lTv8vDU2N67DXwMylvoz';
const movieID = ['82', '1611', '7073', '546', '22642', '13121'];

const movieImage = document.querySelector('.movieImage');
const movietitle = document.querySelector('.title');
const movielanguage = document.querySelector('.language');
const moviepremier = document.querySelector('.premier');
const movieend = document.querySelector('.end');
const moviestatus = document.querySelector('.status');
const item = '45';

export const getMovie = async () => {
  const url = `${baseMovieurl}${movieID[0]}`;
  const response = await fetch(url);
  const data = await response.json();
  movieImage.src = data.image.medium;
  movietitle.innerText = data.name;
  movielanguage.innerText = data.language;
  moviepremier.innerText = data.premiered;
  movieend.innerText = data.ended;
  moviestatus.innerText = data.status;
};

const countListItems = () => {
  const count = commentlist.getElementsByTagName('li').length;
  return count;
};

export const getComments = async () => {
  const url = `${baseUrl}${appID}/comments?item_id=${item}`;
  const response = await fetch(url);
  const data = await response.json();
  commentlist.innerHTML = '';
  data.forEach((element) => {
    const comment = document.createElement('li');
    comment.textContent = `${element.creation_date}: ${element.username}  ${element.comment}`;
    commentlist.appendChild(comment);
  });
  const commentNumber = countListItems();
  document.querySelector('.commentcount').innerHTML = `(${commentNumber})`;
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
  getComments();
};

export const submitComment = () => {
  const commentername = input.value;
  const insight = textarea.value;
  const comment = {
    item_id: item,
    username: commentername,
    comment: insight,
  };
  postComments(comment);
};