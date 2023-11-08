import debounce from './debounce.js';


const searchFilter = (cmsFilterBtn, tableList, numberPages,
    cmsFilterPlaceholder, cmsFilterWrapper) => {
  const renderSearchGoods = async () => {
    const value = cmsFilterBtn.value;
    console.log('value: ', value);
  };
  cmsFilterBtn.addEventListener('change', () => {
    cmsFilterPlaceholder.style.display = 'none';
    cmsFilterBtn.style.width = '200px';
    cmsFilterWrapper.style.width = '200px';
  });
  const debounceUpadate = debounce(renderSearchGoods, 300);
  cmsFilterBtn.addEventListener('change', debounceUpadate);
};

export default searchFilter;
