import { cloneDeep } from 'lodash';
import get_TData from '../getData/GetData';


export const getDataArr = (kvp) => {
  const blacklist = ['__parent', 'ACL', 'editStatus'];
  
  if (typeof kvp === "string") {
    const key = kvp;
    kvp = get_TData(key);
  }

  const kvp_copy = _.cloneDeep(_.omit(kvp, blacklist));
  const Users_arr = Object.keys(kvp_copy).map(function (data) {
    return kvp_copy[data];
  });
  return Users_arr || [];

};