import { g_TenantData } from '../data/GTenantData';
import { getDataArr } from '../datatables/data';

const getTenantData = (module) => {

  
  const value = module ? g_TenantData[module] : g_TenantData;
  const arr_values = getDataArr(value);
  return arr_values;
};

export default getTenantData;
