/* eslint-disable */
const baseUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/";
const appID = 'lTv8vDU2N67DXwMylvoz';

export const getLikes = async (itemId) => {
  const url = (`${baseUrl}${appID}/likes`);
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();
  return data.filter((item) => item.item_id === itemId).length;
};

export const postLikes = async(itemId) => {
  const url = `${baseUrl}${appID}/likes`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      item_id: itemId,
    }), 
  });
  const data = response.json();
    return data;
};
