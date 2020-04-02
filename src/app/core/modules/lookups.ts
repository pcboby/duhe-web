export const lookups = {};

export const navigationList = [{
  name: '首页',
  link: '/map',
  value: 'Home',
  cls: 'icon icon-Home'
}, {
  name: '一张图',
  link: '/map',
  value: 'APicture',
  cls: 'icon icon-APicture'
}, {
  name: '水文预报',
  link: '/map',
  value: 'HydrologicalForecast',
  cls: 'icon icon-FloodForecast'
}, {
  name: '防洪调度',
  link: '/map',
  value: 'FloodDispatch',
  cls: 'icon icon-FloodDispatch'
}, 

{
  name: '日常管理',
  link: '/program',
  value: 'DailyManagement',
  mapDisabled: true,
  cls: 'icon icon-DailyManagement',
  children: [{
    name: '数据管理',
    value: 'Database',
    mapDisabled: true,
    cls: 'icon icon-5-1',
    children: [{
      name: '测站',
      value: 'Station',

      cls: 'icon icon-point'
    }, {
      name: '水库',
      value: 'Reservoir',
      cls: 'icon icon-point'
    }, {
      name: '河流',
      value: 'Rivers',
      cls: 'icon icon-point'
    }, {
      name: '降水',
      value: 'Rainfall',
      cls: 'icon icon-point'
    }, {
      name: '水情',
      value: 'Water',
      cls: 'icon icon-point'
    }]
  }, {
    name: '文档管理',
    value: 'Document',
    mapDisabled: true,
    cls: 'icon icon-5-2'
  }, {
    name: '报表管理',
    value: 'Statistic',
    mapDisabled: true,
    cls: 'icon icon-5-5',
    children: [{
      name: '水库水情',
      value: 'DispatchingData',

      cls: 'icon icon-point'
    }, {
      name: '河道水情',
      value: 'DispatchingSchemes',
      cls: 'icon icon-point'
    }]
  }]
}, 

// {
//   name: '日常管理',
//   link: '/program',
//   value: 'DailyManagement',
//   mapDisabled: true,
//   cls: 'icon icon-DailyManagement',
//   children: [{
//     name: '信息通报',
//     value: 'MessageNews',
//     mapDisabled: true,
//     cls: 'icon icon-5-1'
//   }, {
//     name: '水资源公报',
//     value: 'WaterNews',
//     mapDisabled: true,
//     cls: 'icon icon-5-2'
//   }, {
//     name: '调度运用计划',
//     value: 'Runningaily',
//     mapDisabled: true,
//     cls: 'icon icon-5-5'
//   }, {
//     name: '统计报表',
//     value: 'StatisticalStatement',
//     mapDisabled: true,
//     cls: 'icon icon-5-6',
//     children: [{
//       name: '水库水情',
//       value: 'DispatchingData',

//       cls: 'icon icon-point'
//     }, {
//       name: '河道水情',
//       value: 'DispatchingSchemes',
//       cls: 'icon icon-point'
//     }]
//   }]
// }, 


{
  name: '系统设置',
  link: '/system',
  value: 'SystemManagement',
  mapDisabled: true,
  cls: 'icon icon-SystemManagement',
  children: [{
    name: '权限管理',
    value: 'AuthorityManagement',
    mapDisabled: true,
    cls: 'icon icon-6-7',
    children: [{
      name: '用户管理',
      value: 'UserManagement',
      mapDisabled: true,
      cls: 'icon icon-point'
    }, {
      name: '角色管理',
      value: 'RoleManagement',
      mapDisabled: true,
      cls: 'icon icon-point'
    }]
  }, {
    name: '应用配置',
    value: 'configManagement',
    mapDisabled: true,
    cls: 'icon icon-6-8',
    children: [{
      name: '对象配置',
      value: 'objectConfig',
      mapDisabled: true,
      cls: 'icon icon-point'
    }, {
      name: '模块配置',
      value: 'moduleConfig',
      mapDisabled: true,
      cls: 'icon icon-point'
    }, {
      name: '模型配置',
      value: 'modelConfig',
      mapDisabled: true,
      cls: 'icon icon-point'
    }]
  }, {
    name: '日志管理',
    value: 'logManagement',
    mapDisabled: true,
    cls: 'icon icon-6-9'
  }]
}];

export const arkwebToolList2 = [{
  name: '图层',
  iconCls: 'iconfont icon-tuceng',
  code: 'database'
}, {
  name: '工具',
  iconCls: 'iconfont icon-gongju',
  children: [{
    name: '坐标量算',
    iconCls: 'iconfont icon-zuobiao',
    code: '0101'
  }, {
    name: '距离量算',
    iconCls: 'iconfont icon-juli',
    code: '0102'
  }, {
    name: '面积量算',
    iconCls: 'iconfont icon-mianji',
    code: '0103'
  }, {
    name: '高度量算',
    iconCls: 'iconfont icon-gaodu',
    code: '0104'
  }, {
    name: '设置',
    iconCls: 'iconfont icon-shezhi',
    code: '9999'
  }]
}, {
  name: '清除',
  iconCls: 'iconfont icon-sanchu',
  code: '99'
}];

export const arkwebToolList = [{
    name: '图层',
    iconType: 'database',
    code: 'database'
  }, {
    name: '测量',
    iconCls: 'icon icon-tools-01',
    children: [{
      name: '坐标',
      iconCls: 'icon icon-tools-0101',
      code: '0101'
    }, {
      name: '距离',
      iconCls: 'icon icon-tools-0102',
      code: '0102'
    }, {
      name: '面积',
      iconCls: 'icon icon-tools-0103',
      code: '0103'
    }, {
      name: '高度量算',
      iconCls: 'icon icon-tools-0104',
      code: '0104'
    }]
  }, {
    name: '分析',
    iconCls: 'icon icon-tools-02',
    children: [{
      //   name: '通视分析',
      //   iconCls: 'icon icon-tools-0201',
      //   code: '0201'
      // }, {
      name: '剖面分析',
      iconCls: 'icon icon-tools-0202',
      code: '0202'
      // }, {
      //   name: '开挖分析',
      //   iconCls: 'icon icon-tools-0203',
      //   code: '0203'
    }, {
      name: '缓冲区分析',
      iconCls: 'icon icon-tools-0204',
      code: '0204'
    }, {
      name: '叠加分析',
      iconCls: 'icon icon-tools-0205',
      code: '0205'
      // }, {
      //   name: '坡度分析',
      //   iconCls: 'icon icon-tools-0206',
      //   code: '0206'
    }]
  }, {
    name: '清除',
    iconCls: 'icon icon-tools-99',
    code: '99'
  }
  // {
  //   label: '查询',
  //   iconType: 'search',
  //   code: 'search'
  // }
];

export const homeTooltabList = [{
  name: '气象信息',
  value: 1,
  checked: true
}, {
  name: '水库水情',
  value: 2,
  checked: true
}, {
  name: '河道水情',
  value: 3,
  checked: true
}];

export const aPictureTooltabList = [{
  name: '雨情信息',
  value: 'rain'
}, {
  name: '水情信息',
  value: 'water'
}, {
  name: '工情信息',
  value: 'work'
}];

export const dataTypes = [{
  name: '河流',
  value: 'HL'
}, {
  name: '测站',
  value: 'CZ'
}, {
  name: '水库',
  value: 'SK'
}];

export const dataBasins = [{
  name: '长江流域',
  value: 'CJ'
}, {
  name: '黄河流域',
  value: 'HH'
}];

export const dataUnits = [{
  name: 'A公司',
  value: 'A'
}, {
  name: 'B公司',
  value: 'B'
}];
export const dataSteps = [{
  name: '1小时',
  value: 1
}, {
  name: '3小时',
  value: 3
}];

// -----------------------------------------
// 测站类型
export const lookup_station_types = [
  { key: '气象站', value: 'MM'},
  { key: '蒸发站', value: 'BB'},
  { key: '堰闸水文站', value: 'DD'},
  { key: '潮位站', value: 'TT'},
  { key: '泵站', value: 'DP'},
  { key: '墒情站', value: 'SS'},
  { key: '雨量站', value: 'PP'},
  { key: '河道水文站', value: 'ZQ'},
  { key: '河道水位站', value: 'ZZ'},
  { key: '水库水文站', value: 'RR'},
  { key: '地下水站', value: 'ZG'},
  { key: '分洪水位站', value: 'ZB'}
];
// 报汛等级
export const lookup_flood_levels = [
  { key: '中央报汛站', value: 1},
  { key: '省级重点报汛站', value: 2},
  { key: '省级一般报汛站', value: 3},
  { key: '其他报汛站', value: 4}
];
// 基面名称 | 水准基面
export const lookup_base_surfaces = [
  { key: '1985年国家高程基准', value: 1},
  { key: '1954年黄海高程系', value: 2},
  { key: '1956年黄海高程系', value: 3},
  { key: '榆林', value: 4},
  { key: '吴淞基面', value: 5},
  { key: '珠江高程系', value: 6},
  { key: '大沽高程系', value: 7},
  { key: '大连高程系', value: 8},
  { key: '波罗的海水准', value: 9},
  { key: '渤海高程系', value: 10},
  { key: '海防高程系', value: 11},
  { key: '海口秀英港', value: 12},
  { key: '其他', value: 0},
];

// 岸别
export const lookup_base_banks = [
  { key: '左岸', value: 0},
  { key: '右岸', value: 1},
];

// 水库类型
export const lookup_reservoir_types = [
  { value: 1, key: '小（2）型', min: 0.001, max: 0.01},
  { value: 2, key: '小（1）型', min: 0.01, max: 0.1},
  { value: 3, key: '中型', min: 0.1, max: 1},
  { value: 4, key: '大（2）型', min: 1, max: 10},
  { value: 5, key: '大（1）型', min: 10},
  { value: 9, key: '其他', max: 0.001}
];

// 汛期类别
export const lookup_flood_datetypes = [
  { value: 1, key: '主汛期'},
  { value: 2, key: '后汛期'},
  { value: 3, key: '过渡期'},
  { value: 4, key: '其他'}
];

// 河水特征
export const lookup_river_characteristics = [
  { key: '干涸', value: 1},
  { key: '断流', value: 2},
  { key: '流向不定', value: 3},
  { key: '逆流', value: 4},
  { key: '起涨', value: 5},
  { key: '洪峰', value: 6}
  // { key: '发电厂发电流量', value: 'P'},
];

// 水势
export const lookup_water_flows = [
  { key: '落', value: 4},
  { key: '涨', value: 5},
  { key: '平', value: 6}
];

// 测流方法
export const lookup_test_flows = [
  { key: '水位流量关系曲线', value: 1},
  { key: '浮标及溶液测流法', value: 2},
  { key: '流速仪及量水建筑物', value: 3},
  { key: '估算法', value: 4},
  { key: 'ADCP', value: 5},
  { key: '电功率反推法', value: 6},
  { key: '其他方法', value: 9}
];

// 测积方法
export const lookup_test_products = [
  { key: '水位面积关系曲线', value: 1},
  { key: '测深杆或测深锤、铅鱼', value: 2},
  { key: '回声探测仪', value: 3},
  { key: 'ADCP', value: 5},
  { key: '其他方法', value: 9}
];

// 测速方法
export const lookup_test_velocitys = [
  { key: '流速仪', value: 1},
  { key: '浮标法', value: 2},
  { key: '声学法', value: 3},
  { key: 'ADCP', value: 5},
  { key: '其他方法', value: 9}
];

// 天气情况
export const lookup_weather_types = [
  { value: 5, key: '雪'},
  { value: 6, key: '雨夹雪'},
  { value: 7, key: '雨'},
  { value: 8, key: '阴'},
  { value: 9, key: '晴'}
];