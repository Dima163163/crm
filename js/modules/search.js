import renderGoods from "./createElements";
import { fetchRequest } from "./fetchRequest";

const searchGoods = () => {
  const debounce = (func, timeoutMS) => {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), timeoutMS);
    };
  };

  const renderSearchGoods = async () => {
    const goods = await fetchRequest(`/api/goods`, {
      callback: (err, data) => console.log(data),
    });
  }
};

export default searchGoods;
