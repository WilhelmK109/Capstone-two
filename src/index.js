import './style.css';

const close = document.querySelector('.button-close');
const open = document.querySelector('.open-comments');
const submit = document.querySelector('.comment-submit');

const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
const commentlist = document.querySelector('.ul-comments') 

const baseUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/";
const baseMovieurl = "https://api.tvmaze.com/shows/";
const appID = 'lTv8vDU2N67DXwMylvoz';
const movieID = ['82','1611','7073','546','22642','13121'];

const movieImage = document.querySelector('.movieImage');
const movietitle = document.querySelector('.title');
const movielanguage = document.querySelector('.language');
const moviepremier = document.querySelector('.premier');
const movieend = document.querySelector('.end');
const moviestatus = document.querySelector('.status');


const getMovie = async() =>{
    const url = `${baseMovieurl}${movieID[1]}`;
    const response = await fetch(url)
    const data =  await response.json();
    console.log(data);
    console.log(data.name);
    console.log(data.language);
    console.log(data.premiered);
    console.log(data.ended);
    console.log(data.status);
    movieImage.src=data.image.medium;
    movietitle.innerText = data.name;
    movielanguage.innerText = data.language;
    moviepremier.innerText = data.premiered;
    movieend.innerText = data.ended;
    moviestatus.innerText = data.status;

}

open.addEventListener('click', () => {
    document.querySelector('.comment-container').style.display = 'block';
    document.querySelector('.relative').style.display = 'none';
    getMovie();
});

close.addEventListener('click',()=>{
    document.querySelector('.comment-container').style.display = 'none';
    document.querySelector('.relative').style.display = 'block';
});

const getComments = async () => {
    const url = `${baseUrl}${appID}/comments?item_id=item1`;
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    commentlist.innerHTML = '';
    data.forEach(element => {
        const comment = document.createElement('li');
        comment.textContent = `${element.creation_date}: ${element.username}  ${element.comment}`;
        commentlist.appendChild(comment);
        console.log('done');
    });

}

getComments();

const postComments = async(comment) =>{
    const url =  `${baseUrl}${appID}/comments`;
    console.log(url);
    console.log(comment);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        if (response.status === 201) {
            console.log("Comment created successfully!");
            getComments();

        } else {
            console.error("Error creating comment:", response.statusText);
        }
    } catch (error) {
        console.error("Error creating comment:", error);
    }
    

}


submit.addEventListener('click',(e) => {
  e.preventDefault();

  const commentername =  input.value;
  const insight = textarea.value;  
    console.log(commentername)
    console.log(insight)
    const comment = {
        "item_id": "item1",
        "username": commentername,
        "comment": insight
    }
    postComments(comment);
    input.value = '';
    textarea.value = '';

});

