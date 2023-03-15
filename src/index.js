import './style.css';

const apiBaseUrl = 'https://api.tvmaze.com';

function loadData() {
  const shows = [
    {
      id: 82,
      title: 'Game of Thrones',
    },
    {
      id: 23268,
      title: 'Spiderman',
    },
    {
      id: 1856,
      title: 'Superman',
    },
    {
      id: 6333,
      title: 'Babylon',
    },
    {
      id: 22642,
      title: 'Marlowe',
    },
    {
      id: 11781,
      title: 'Eternal Law',
    },
  ];

  const getLikes = (itemId) => { // eslint-disable-line
    return fetch(`${apiBaseUrl}/shows/${itemId}/likes`)
      .then((response) => response.json())
      .then((data) => data.length);
  };

  const likeItem = (itemId) => { // eslint-disable-line
    return fetch(`${apiBaseUrl}/shows/${itemId}/like`, { method: 'POST' })
      .then((response) => response.json());
  };

  const itemsList = document.getElementById('items-list');

  shows.forEach((show) => {
    fetch(`${apiBaseUrl}/shows/${show.id}`)
      .then((response) => response.json())
      .then((data) => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        const itemImage = document.createElement('img');
        itemImage.src = data.image.medium;

        const itemTitle = document.createElement('p');
        itemTitle.innerText = show.title;

        const itemLikes = document.createElement('span');
        itemLikes.dataset.itemId = data.id;
        getLikes(data.id).then(likes => itemLikes.innerText = 'Likes: ' + likes); // eslint-disable-line

        const itemLikeButton = document.createElement('button');
        itemLikeButton.innerText = 'Like';
        itemLikeButton.onclick = () => likeItem(data.id);

        const itemCommentButton = document.createElement('button');
        itemCommentButton.innerText = 'Comments';
        itemCommentButton.onclick = () => openComments(data.id); // eslint-disable-line

        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemLikes);
        itemContainer.appendChild(itemLikeButton);
        itemContainer.appendChild(itemCommentButton);

        itemsList.appendChild(itemContainer);
      });
  });
}

loadData();
