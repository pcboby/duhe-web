import * as _ from 'lodash';
import * as moment from 'moment';

export default () => {
  return {
    InitParams(params) {
      return _initParams(params);
    },
    GenNonDuplicateID(randomLength ? ) {
      return _genNonDuplicateID(randomLength);
    },
    GetNetTimeLabel(begTime, stepNum, stepMinutes, formatter = 'YYYY-MM-DD') {
      return _getNetTimeLabel(begTime, stepNum, stepMinutes, formatter);
    }
  };
};

/**
 * 请求参数过滤:清理请求参数中的空白字段
 * @param params 请求的参数对象
 */
const _initParams = (params) => {
  for (const key in params) {
    if (params[key] === undefined || params[key] === null || params[key] === '') {
      delete params[key];
    }
  }
  return params;
};


const _genNonDuplicateID = (randomLength = 16) => {
  return Math.random().toString().substr(3, randomLength);
};


const getPathArr = (d) => {
  const t = [];
  d.split('/').forEach(item => {
    if (item) {
      t.push(item.replace(/\{/g, '').replace(/\}/g, ''));
    }
  });
  return t;
};

const _getNetTimeLabel = (begTime, stepNum, stepMinutes, formatter = 'YYYY-MM-DD') => { // 'YYYY-MM-DD HH:mm:ss'
const tmp = [];
for (let i = 0; i < stepNum; i++) {
  tmp.push(moment(begTime).add(stepMinutes * i, 'minute').format(formatter));
}
return tmp;
};
