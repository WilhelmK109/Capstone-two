const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'lTv8vDU2N67DXwMylvoz';

export const getLikes = async (itemId) => {
  const url = (`${baseUrl}${appID}/likes`);
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();
  const item = data.find((item) => item.item_id === itemId);
  return item.likes;
};

export const postLikes = async (itemId) => {
  const url = `${baseUrl}${appID}/likes`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      item_id: itemId,
    }),
  });
};

export const updateItemCount = (shows) => {
  const itemCount = document.getElementById('item-count');
  const count = shows.length;
  if (itemCount) {
    itemCount.innerText = `(${count})`;
  }
};