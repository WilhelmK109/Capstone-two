/**
* @jest-environment jsdom
*/
// Import the updateItemCount function
import updateItemCount from './countItem.js';

describe('updateItemCount', () => {
  document.body.innerHTML = `
  <html>
    <body>
      <div id="item-count"></div>
    </body>
  </html>
    `;
  test('updates the item count with the correct number', async () => {
    const shows = ['Show 1', 'Show 2', 'Show 3'];

    await updateItemCount(shows);

    const itemCount = document.getElementById('item-count');
    expect(itemCount.innerText).toBe('(3)');
  });
});