/* eslint-disable */
import { getLikes, postLikes } from './modules/interaction.js';
import './style.css';

const apiBaseUrl = 'https://api.tvmaze.com';

function loadData() {
  const shows = [82, 1611, 7073, 546, 22642, 13121];

  const itemsList = document.getElementById('items-list');

  shows.forEach((show) => {
    fetch(`${apiBaseUrl}/shows/${show}`)
      .then((response) => response.json())
      .then((data) => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        const itemImage = document.createElement('img');
        itemImage.src = data.image.medium;

        const itemTitle = document.createElement('p');
        itemTitle.innerText = data.name;

        const itemLikes = document.createElement('span');
        itemLikes.classList.add('align-self-end');
        itemLikes.dataset.itemId = data.id;
        getLikes(data.id).then((likes => itemLikes.innerText = likes + ' Likes'));

        const itemLikeButton = document.createElement('span');
        itemLikeButton.className = 'material-symbols-outlined';
        itemLikeButton.innerHTML = 'Favorite';
        itemLikeButton.onclick = () => {
          postLikes(data.id)
            .then(() => {
              getLikes(data.id).then((likes) => {
                itemLikes.innerText = `Likes: ${likes}`;
              });
          });
        };

        const itemCommentButton = document.createElement('button');
        itemCommentButton.classList.add('comment-btn');
        itemCommentButton.innerText = 'Comments';
        itemCommentButton.onclick = () => openComments(data.id); // eslint-disable-line

        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemTitle);
        itemTitle.appendChild(itemLikeButton);
        itemContainer.appendChild(itemLikes);
        itemContainer.appendChild(itemCommentButton);

        itemsList.appendChild(itemContainer);
      });
  });
  function updateItemCount() {
    const itemCount = document.getElementById('item-count');
    const count = shows.length;
    itemCount.innerText = `${count}`;
  }
  updateItemCount();
}

loadData();
