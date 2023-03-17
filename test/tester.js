const updateItemCount = async (shows) => {
  const itemCount = document.getElementById('item-count');
  const count = shows.length;
  if (itemCount) {
    itemCount.innerText = `(${count})`;
  }
};

export default updateItemCount;