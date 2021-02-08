import BaseListStore from './stores/BaseListStore';
import BaseEditStore from './stores/BaseEditStore';
import SearchParamsStore from './stores/SearchParamsStore';
import BaseApi from './api/BaseApi';
import BaseController from './controllers/BaseController';

/** Used in top level components (like App, Root)that do not create stores on
 *  change page
 */
const wrapFeature = (
  apiUrl: string,
  customApi?,
  customController?,
  customListStore?,
  customEditStore?,
  customSearchParamsStore?,
) => {
  const api = customApi ? customApi : new BaseApi(apiUrl);

  const listStore = customListStore ? customListStore : new BaseListStore();
  const editStore = customEditStore ? customEditStore : new BaseEditStore();

  const searchParamsStore = customSearchParamsStore
    ? customSearchParamsStore
    : new SearchParamsStore();

  const controller = customController
    ? customController
    : new BaseController(listStore, editStore, searchParamsStore, api);

  return {
    controller,
    listStore,
    editStore,
    searchParamsStore,
  };
};

export default wrapFeature;
