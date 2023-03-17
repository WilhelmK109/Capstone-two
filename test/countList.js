const countListItems = (commentlist) => {
  const count = commentlist.getElementsByTagName('li').length;
  return count;
};

export default countListItems;
