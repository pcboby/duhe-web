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

