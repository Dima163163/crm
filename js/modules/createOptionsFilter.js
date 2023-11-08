import {fetchRequest} from './fetchRequest.js';

const createOptionsFilter = async (btn) => {
  const dataOptions = await fetchRequest('/api/categories', {
    callback: (err, data) => data,
  });
  const optionDef = document.createElement('option');
  optionDef.value = '';
  optionDef.textContent = '';
  btn.append(optionDef);

  const options = dataOptions.map(item => {
    const option = document.createElement('option');
    option.classList.add('cms-filter-options');
    option.value = item;
    option.textContent = item;
    return option;
  });

  btn.append(...options);
};

export default createOptionsFilter;
