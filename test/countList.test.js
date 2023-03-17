/**
 * @jest-environment jsdom
 */

import countListItems from './countList.js';

test('countListItems', () => {
  document.body.innerHTML = `
    <ul class="commentlist">
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    `;
  const commentlist = document.querySelector('.commentlist');
  expect(countListItems(commentlist)).toBe(3);
});