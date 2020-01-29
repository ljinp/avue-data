function Radar(radarContainer) {
  radarContainer.innerHTML = '<div class="radar-map-container">\
                                  <div class="radar-map"></div>\
                              </div>\
                              <div class="changing-number-container" data-number="1234567890456"></div>\
                              <div class="risk-points"></div>\
                              <div class="scanning-circle">\
                                  <div class="radar-scanner">\
                                      <div class="inner-scanner"></div>\
                                      <div class="outer-scanner">\
                                          <div class="scanner-container">\
                                              <div class="umbrella"></div>\
                                              <div class="scanner-decoration">\
                                                  <div class="thin-border"></div>\
                                                  <div class="small-ellipse"></div>\
                                                  <div class="small-ellipse"></div>\
                                                  <div class="small-ellipse"></div>\
                                              </div>\
                                          </div>\
                                      </div>\
                                  </div>\
                              </div>';

  this._container = radarContainer;
  this._containerWidth = this._container.offsetWidth;
  this._containerHeight = this._container.offsetHeight;
  this._centerX = this._containerWidth / 2;
  this._centerY = this._containerHeight / 2;

  // 跟风险点"蒙版"有关的变量
  this._maskCtx = (function (cw, ch) {
    var c = document.createElement('canvas');
    c.width = cw;
    c.height = ch;
    return c.getContext('2d');
  })(this._containerWidth, this._containerHeight);
  this._maskSectorDegree = 60;  // 雷达扇形所占角度
  this._maskStartDegree = 0;  // 雷达扇形开始扫描的角度
  this._scanSpeed = 2;  // 雷达扫描速度，单位为deg

  this._outerScanner = this._container.querySelector('.outer-scanner');  // 外层雷达扫描器

  this._riskPointsContainer = this._container.querySelector('.risk-points');

  this._allRiskPointsArr = [];  // 保存所有风险点的数组，改变雷达扫描速度时要用到这些信息
  this._tmpRiskPointsArr = [];  // 初始化时保存所有的风险点，雷达扫描过程中会遍历这个数组，并把当前扫描到的风险点从这个数组移动到保存风险点的对象中，雷达扫描玩一遍之后这个数组为空。这样做避免雷达扫描时重复遍历风险点，特别是当有很多风险点的时候
  this._riskPoints = {};  // 以扫描角度为键值保存风险点信息

  this._riskElements = [];  // 与风险点相关的虚线圆圈、红旗、信息面面和位置信息

  this._curRoamingIndex = 0;  // 当前漫游的风险点索引

  this._radarMap = this._container.querySelector('.radar-map');

  this._roamingDuration = 0;  // 两个风险点之间漫游时长

  this._changingNumberContainer = this._container.querySelector('.changing-number-container');  // 不断变化的数字
  this._digits_base = Math.pow(10, Math.min(this._changingNumberContainer.dataset.number.length, 16));  // 数字位数，最大为16

  this._mapTranslateZ = (function (container) {  // 相机漫游时拉近的距离
    var fontSize = parseInt(getComputedStyle(container).fontSize);
    return 300 / 16 * fontSize;
  })(this._container);

  this._scaleFactor = this._radarMap.offsetWidth / this._containerWidth;  // 为了使地图拉近之后不失真而放大的倍数

  this._rotateX = 70;  // 地图倒下旋转的角度
}

/* 外部调用的方法 */
Radar.prototype.init = function (options) {
  /*
      options = {
          scanSpeed: 2  // 扫描的速度，单位为deg
      }
  */
  options.scanSpeed && (this._scanSpeed = parseInt(options.scanSpeed));

  this._createCanvasElements();
  this._drawLineAndCircle();
  this._drawDashedCircle();
  this._drawDashedEmptyCircle();
  this._drawScannerSector();
  this._animate();
  this._initEvent();
};

// 添加风险点
Radar.prototype.addRiskPoints = function (points) {
  if (!(points instanceof Array)) {
    points = [points];
  }
  points.forEach(this._addOneRiskPoint.bind(this));
};

// 一次设置多个风险点
Radar.prototype.setRiskPoints = function (points) {
  this._removeAllRiskPoints();
  this.addRiskPoints(points);
};

// 调整雷达扫描速度
Radar.prototype.changeScanSpeed = function (perTimeDeg) {
  perTimeDeg = parseInt(perTimeDeg);
  if (perTimeDeg == this._scanSpeed || 360 % perTimeDeg != 0) {  // 每次旋转的角度必须是360的约数，否则可能会出现跳过风险点的情况
    return;
  }
  this._riskPoints = {};
  this._tmpRiskPointsArr = this._allRiskPointsArr;
  this._scanSpeed = perTimeDeg;
};

// 雷达状态切换
Radar.prototype.roamingToggle = function () {
  this._container.classList.toggle('lying-down');
  if (this._isLyingDown()) {
    // 倒下之后停止动画绘制
    this._pauseAnimation();
  } else {
    this._radarMap.classList.remove('roaming');
    this._radarMap.style.removeProperty('transform');
  }
};

Radar.prototype.startRoaming = function () {
  this._container.classList.add('lying-down');
  this._pauseAnimation();
};

Radar.prototype.stopRoaming = function () {
  this._container.classList.remove('lying-down');
  this._radarMap.classList.remove('roaming');
  this._radarMap.style.removeProperty('transform');
};

/* 私有方法 */
Radar.prototype._addOneRiskPoint = function (options) {
  /**
      options = {
          type: 'type1', // 'type1' 或者 'type2'，风险点的颜色是红色还是蓝色
          severity: 'critical',  // 风险严重程度，'ordinary'表示普通，'critical'表示严重
          coords: [134.7728099, 53.56097399999999],  // 城市的经纬度
          city: '北京',
          title: '大额预授权交易异常',
          total: 3  // 风险卡的数量
      }
  **/
  // 计算风险点屏幕坐标
  var pointCoords = this._geoCoordsToScreenCoords(options.coords),
    point_x = pointCoords[0],
    point_y = pointCoords[1];

  /*// 计算风险点索引
  var riskPointIndex = this._calcRiskPointIndex(point_x, point_y);
  
  if(!this._riskPoints[riskPointIndex]) {
      var riskPointGroup = document.createElement('div');  // 相同索引的风险点放在一组
      riskPointGroup.className = 'risk-point-group';
      this._riskPointsContainer.appendChild(riskPointGroup);
      this._riskPoints[riskPointIndex] = riskPointGroup;
  }*/

  // 创建风险点元素
  var riskPoint = document.createElement('div');
  riskPoint.className = 'risk-point ' + options.type + ' ' + options.severity;
  if (options.type == 'pulsation') {
    riskPoint.innerHTML = '<div class="pulse-circle"></div>\
                              <div class="pulse-circle"></div>\
                              <div class="pulse-circle"></div>';
  }
  //this._riskPoints[riskPointIndex].appendChild(riskPoint);

  // 计算并设置风险点位置
  var point_left = point_x - riskPoint.offsetWidth / 2,
    point_top = point_y - riskPoint.offsetHeight / 2;
  riskPoint.style.cssText = 'left: ' + point_left + 'px; top: ' + point_top + 'px;';

  var riskPointItem = {
    x: point_x,
    y: point_y,
    target: riskPoint
  };
  this._allRiskPointsArr.push(riskPointItem);
  this._tmpRiskPointsArr.push(riskPointItem);

  // 创建跟风险点相关的红旗、虚线圆圈和信息面板
  var elements_group = document.createElement('div');
  elements_group.className = 'risk-elements-group';
  elements_group.innerHTML = '<div class="dashed-circle"></div>\
                              <div class="red-flag" data-city="' + options.city + '"></div>\
                              <div class="info-panel">\
                                  <div class="info-title">' + options.name + '</div>\
                <a href="https://www.baidu.com">\
                  <div class="info-content">\
                    <div>\
                      申请户数：<span class="risk-num">' + options.total + '</span>\
                    </div>\
                    <div>\
                      贷款人数：<span class="risk-num">' + options.total + '</span>\
                    </div>\
                    <div>\
                      违约率：<span class="risk-num">' + options.total + '</span>\
                    </div>\
                  </div>\
                </a>\
                              </div>';
  this._radarMap.appendChild(elements_group);
  var dashed_circle = elements_group.querySelector('.dashed-circle'),
    red_flag = elements_group.querySelector('.red-flag'),
    info_panel = elements_group.querySelector('.info-panel');
  dashed_circle.style.backgroundImage = 'url(' + this._getDashedCircleBg(dashed_circle.offsetWidth) + ')';

  // 计算和设置圆圈、红旗、信息面板的位置
  var dashed_circle_left = point_x * this._scaleFactor - dashed_circle.offsetWidth / 2,
    dashed_circle_top = point_y * this._scaleFactor - dashed_circle.offsetHeight / 2,
    red_flag_left = point_x * this._scaleFactor - red_flag.offsetWidth / 2,
    red_flag_top = point_y * this._scaleFactor - red_flag.offsetHeight,
    info_panel_left = point_x * this._scaleFactor - info_panel.offsetWidth / 2,
    info_panel_top = point_y * this._scaleFactor - info_panel.offsetHeight;
  dashed_circle.style.left = dashed_circle_left + 'px';
  dashed_circle.style.top = dashed_circle_top + 'px';
  if (this._isLyingDown()) {
    dashed_circle.style.visibility = 'visible';
  }
  red_flag.style.left = red_flag_left + 'px';
  red_flag.style.top = red_flag_top + 'px';
  info_panel.style.left = info_panel_left + 'px';
  info_panel.style.top = info_panel_top + 'px';

  // 保存与风险点相关的元素
  this._riskElements.push({
    name: options.city,
    riskPoint: riskPoint,
    dashedCircle: dashed_circle,
    redFlag: red_flag,
    infoPanel: info_panel,
    translate: [(this._containerWidth * 0.5 - point_x) * this._scaleFactor, this._calcTYByTZ(this._mapTranslateZ, dashed_circle.offsetHeight / 2) - point_y * this._scaleFactor],
    rotateY: (function (riskElements) {
      // 旋转的角度正负零交替
      var base_deg = 10,
        max_deviation_deg = 5;
      var pn = (riskElements.length % 2) * 2 - 1;  // positive or negative
      var new_base_deg = Math.ceil((riskElements.length + 1) % 3 / 2) * base_deg;  // 10 10 0 10 10 0 ...
      return pn * (new_base_deg + Math.round(Math.random() * max_deviation_deg));
    })(this._riskElements),
    transformOrigin: Math.round(point_x / this._containerWidth * 100) + '%'
  });

  // 旋转信息面板，使信息面板转到眼前时正对镜头
  var rotate_deg = this._riskElements[this._riskElements.length - 1].rotateY;
  info_panel.style.transform = getComputedStyle(info_panel).transform + ' rotateY(' + (-rotate_deg) + 'deg)';
};

// 根据名称删除风险点
Radar.prototype._removeRiskPointByName = function (name) {
  for (var i = 0, len = this._riskElements.length; i < len; i++) {
    var curRiskElement = this._riskElements[i];
    if (curRiskElement.name == name) {
      var riskPointGroup = curRiskElement.riskPoint.parentElement,
        riskElementsGroup = curRiskElement.dashedCircle.parentElement;
      riskPointGroup.removeChild(curRiskElement.riskPoint);
      this._radarMap.removeChild(riskElementsGroup);
      this._riskElements.splice(i, 1);
      return true;
    }
  }
  return false;
};

// 删除所有风险点
Radar.prototype._removeAllRiskPoints = function () {
  var total = this._riskElements.length;
  this._radarMap.innerHTML = '';
  this._riskPointsContainer.innerHTML = '';
  this._riskPoints = {};
  this._riskElements = [];
  return total;
};

// 暂停动画
Radar.prototype._pauseAnimation = function () {
  cancelAnimationFrame(this._requestId);
  this._container.classList.add('pause-animation');
};

// 恢复动画
Radar.prototype._resumeAnimation = function () {
  this._requestId = requestAnimationFrame(this._animate.bind(this));
  this._container.classList.remove('pause-animation');
};

// 创建canvas标签
Radar.prototype._createCanvasElements = function () {
  var scanningCircleElement = this._container.querySelector('.scanning-circle');

  // 绘制雷达静止的线框和圆圈用到的canvas
  var canvas = document.createElement('canvas');
  canvas.width = this._containerWidth;
  canvas.height = this._containerHeight;
  scanningCircleElement.appendChild(canvas);
  this._lineAndCircleCanvas = canvas;

  // 绘制内部旋转的 "虚线" 圆圈用到的canvas
  this._dashedCircleCanvas = canvas.cloneNode(true);
  this._dashedCircleCanvas.className = 'scanning-dashed-circle';
  scanningCircleElement.appendChild(this._dashedCircleCanvas);

  // 绘制内部旋转的 "空心虚线" 圆圈用到的canvas
  this._dashedEmptyCircleCanvas = canvas.cloneNode(true);
  this._dashedEmptyCircleCanvas.className = 'scanning-dashed-empty-circle';
  scanningCircleElement.appendChild(this._dashedEmptyCircleCanvas);
};

// 地理坐标转换成屏幕坐标
Radar.prototype._geoCoordsToScreenCoords = function (geoCoords) {  // geoCoords:经纬度数组
  var china_geometry_bounds = [73.4994136, 53.56097399999999, 61.2733963, 35.40335839999999];  // 西北的经纬度和经纬度跨度
  var point_x = Math.abs(geoCoords[0] - china_geometry_bounds[0]) / china_geometry_bounds[2] * this._containerWidth,
    point_y = Math.abs(geoCoords[1] - china_geometry_bounds[1]) / china_geometry_bounds[3] * this._containerHeight;
  return [point_x, point_y];
};

// 计算风险点的索引(雷达扇形扫描到多少度时要显示这个风险点)
Radar.prototype._calcRiskPointIndex = function (point_x, point_y) {
  var point_offset_x = point_x - this._centerX,  // 与中心点的偏移
    point_offset_y = this._centerY - point_y,
    riskPointRadian = -Math.atan(point_offset_y / point_offset_x);  // 风险点在雷达扫描圆形的弧度
  if (point_offset_x < 0) {
    riskPointRadian -= Math.PI;
  } else if (point_offset_y < 0) {
    riskPointRadian -= Math.PI * 2;
  }
  var riskPointDeg = 180 / Math.PI * riskPointRadian;
  var riskPointIndex = '_deg_' + riskPointDeg.toFixed();
  return riskPointIndex;
};

// 根据地图倒下之后translateZ的大小计算风险点应该拉近到相机前面的y值，使得风险点向镜头拉近后正好在屏幕正下方
Radar.prototype._calcTYByTZ = function (tz, dashed_circle_r) {
  var p = parseInt(getComputedStyle(this._container).perspective),  // 原始视角
    pr = (p - tz) / p,  // 应用translateZ后的视角比例
    point_screen_bottom_offset = dashed_circle_r / pr,  // 风险点漫游时要平移到的位置与屏幕底部的偏移量
    tr_o_offset_y = pr * (document.body.clientHeight - this._containerHeight / 2 - this._container.getBoundingClientRect().top - point_screen_bottom_offset);  // 最后相机要拉近到的y值与transform origin中心点的偏移量
  return this._radarMap.offsetHeight / 2 + tr_o_offset_y;
};

/*Radar.prototype._calcTYByTZ = function(tz, dashed_circle_r) {
  var p = parseInt(getComputedStyle(this._container).perspective),  // 原始视角
      pr = (p - tz) / p,  // 应用translateZ后的视角比例
      tmp_tr_o_offset_y = document.body.clientHeight - this._containerHeight / 2 - this._container.getBoundingClientRect().top;  // 最后相机要拉近到的y值与transform origin中心点的偏移量
  var tr_o_offset_y = this._calcOffsetBeforeRotateX(tmp_tr_o_offset_y, this._rotateX, p-tz);
  return this._radarMap.offsetHeight / 2 + tr_o_offset_y * pr;
};*/

// 根据绕x轴旋转之后风险点的位置计算旋转之前风险点要平移到的位置
Radar.prototype._calcOffsetBeforeRotateX = function (newOffset, rotateX, oldPerspective) {  // 计算不正确
  // (newOffset / cos(rotateX)) / x = oldPerspective / (oldPerspective - x * sin(rotateX))
  var x1 = newOffset / Math.cos(Math.PI / 180 * rotateX);
  return oldPerspective * x1 / (oldPerspective + x1 * Math.sin(Math.PI / 180 * rotateX));
};

// 动画
Radar.prototype._animate = function () {
  this._rotateRiskPointMask();
  this._changeNumber();
  this._requestId = requestAnimationFrame(arguments.callee.bind(this));
};

// 变化数字
Radar.prototype._changeNumber = function () {
  var _assist_number = arguments.callee._assist_number || 0;
  if (_assist_number % 6 == 0) {
    var number = Math.round(Math.random() * this._digits_base);
    this._changingNumberContainer.dataset.number = number;
  }
  arguments.callee._assist_number = (++_assist_number) % 360;
};

// 绘制雷达静止的线框和圆圈
Radar.prototype._drawLineAndCircle = function () {
  var radius = this._containerHeight / 2,
    ctx = this._lineAndCircleCanvas.getContext('2d');
  // 最外层圆圈
  var lineWidth = 5;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#0146C2';
  ctx.beginPath();
  ctx.arc(this._centerX, this._centerY, radius - lineWidth / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
  // 内部圆圈
  ctx.fillStyle = 'rgba(30,199,230,.5)';
  ctx.beginPath();
  ctx.arc(this._centerX, this._centerY, 3, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  var totalCircle = 8;
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = 'rgba(30,199,230,.5)';
  for (var i = 0; i < totalCircle - 1; i++) {
    ctx.beginPath();
    ctx.arc(this._centerX, this._centerY, radius / totalCircle * (i + 1), 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }
  // 内部直线
  var totalLines = 14;
  ctx.save();
  ctx.lineWidth = 0.3;
  ctx.translate(this._centerX, this._centerY);
  ctx.rotate(Math.PI / totalLines);
  for (var i = 0; i < totalLines; i++) {
    ctx.rotate(Math.PI * 2 / totalLines);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius + lineWidth);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
  // 内部虚线
  ctx.save();
  ctx.setLineDash([2, 8]);
  ctx.translate(this._centerX, this._centerY);
  for (var i = 0; i < totalLines / 2; i++) {
    ctx.rotate(Math.PI * 4 / totalLines);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius + lineWidth);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
};

// 绘制内部旋转的 "虚线" 圆圈
Radar.prototype._drawDashedCircle = function () {
  var ctx = this._dashedCircleCanvas.getContext('2d');

  ctx.clearRect(-this._centerX, -this._centerY, this._dashedCircleCanvas.width, this._dashedCircleCanvas.height);
  ctx.globalAlpha = 0.8;
  ctx.lineWidth = 5;
  ctx.translate(this._centerX, this._centerY);

  var radius = this._containerHeight / 2 / 8 * 7 - ctx.lineWidth / 2;

  ctx.strokeStyle = '#016FB7';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 5);
  ctx.stroke();

  ctx.strokeStyle = '#23B2D8';
  ctx.rotate(Math.PI / 3);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 6);
  ctx.stroke();

  ctx.strokeStyle = '#80DEF9';
  ctx.rotate(Math.PI / 3);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 18);
  ctx.stroke();

  ctx.strokeStyle = '#085BAF';
  ctx.rotate(Math.PI / 4);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 9);
  ctx.stroke();
};

// 绘制内部旋转的空心虚线圆圈
Radar.prototype._drawDashedEmptyCircle = function () {
  var ctx = this._dashedEmptyCircleCanvas.getContext('2d');

  ctx.clearRect(-this._centerX, -this._centerY, this._dashedEmptyCircleCanvas.width, this._dashedEmptyCircleCanvas.height);
  ctx.strokeStyle = '#5298D3';
  ctx.globalAlpha = 0.3;
  ctx.translate(this._centerX, this._centerY);

  var radius = this._containerHeight / 2 / 8 * 6,
    radiusDeviation = 5,  // 空心虚线的高度
    innerRadius = radius - radiusDeviation;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 5);
  ctx.arc(0, 0, innerRadius, Math.PI / 5, 0, true);
  ctx.closePath();
  ctx.stroke();

  ctx.rotate(Math.PI / 3);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 6);
  ctx.arc(0, 0, innerRadius, Math.PI / 6, 0, true);
  ctx.closePath();
  ctx.stroke();

  ctx.rotate(Math.PI / 3);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 18);
  ctx.arc(0, 0, innerRadius, Math.PI / 18, 0, true);
  ctx.closePath();
  ctx.stroke();

  ctx.rotate(Math.PI / 4);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI / 9);
  ctx.arc(0, 0, innerRadius, Math.PI / 9, 0, true);
  ctx.closePath();
  ctx.stroke();
};

// 绘制雷达扫描锥形渐变扇形
Radar.prototype._drawScannerSector = function () {
  // 创建canvas元素
  var c = document.createElement('canvas');
  c.width = c.height = this._containerHeight;
  this._outerScanner.querySelector('.umbrella').appendChild(c);
  // 绘制锥形渐变
  var ctx = c.getContext('2d');
  var sectorCnt = 10;  // 用10块扇形模拟锥形渐变
  var startDeg = -90, endDeg;
  var sectorRadius = this._containerHeight / 2;
  ctx.translate(sectorRadius, sectorRadius);
  ctx.fillStyle = 'rgba(19, 182, 206, 0.2)';
  for (var i = 0; i < sectorCnt; i++) {
    endDeg = startDeg + this._maskSectorDegree - this._maskSectorDegree / sectorCnt * i;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, sectorRadius);
    ctx.arc(0, 0, sectorRadius, Math.PI / 180 * (startDeg - 180), Math.PI / 180 * endDeg);
    ctx.closePath();
    ctx.fill();
  }
};

// 旋转只显示风险点的区域
Radar.prototype._rotateRiskPointMask = function () {
  function angleToRadian(angle) {
    return Math.PI / 180 * angle;
  }
  this._maskStartDegree = this._maskStartDegree % 360;

  this._maskCtx.beginPath();
  this._maskCtx.moveTo(this._centerX, this._centerY);
  this._maskCtx.arc(this._centerX, this._centerY, this._containerHeight / 2, angleToRadian(this._maskStartDegree), angleToRadian(this._maskStartDegree + this._maskSectorDegree));
  this._maskCtx.lineTo(this._centerX, this._centerY);
  this._maskCtx.closePath();

  // 控制风险点的显示
  var riskPointIndex = '_deg_' + this._maskStartDegree;
  if (!this._riskPoints[riskPointIndex] && this._tmpRiskPointsArr.length > 0) {
    // todo: 这里先判断this._riskPoints[riskPointIndex]可能会出现不去处理this._tmpRiskPointsArr的情况，特别是当风险点在某一块区域很密集的时候,而且后面添加的风险点都会另开一组
    var that = this;
    this._tmpRiskPointsArr.forEach(function (point) {
      if (that._maskCtx.isPointInPath(point.x, point.y)) {
        // 把当前扫描到的风险点缓存起来
        if (!that._riskPoints[riskPointIndex]) {
          var riskPointGroup = document.createElement('div');  // 相同索引的风险点放在一组
          riskPointGroup.className = 'risk-point-group';
          that._riskPointsContainer.appendChild(riskPointGroup);
          that._riskPoints[riskPointIndex] = riskPointGroup;
        }
        that._riskPoints[riskPointIndex].appendChild(point.target);
        point._willDelete = true;  // 将要删除的标记
      }
    });

    // 遍历完之后删除已处理过的风险点
    this._tmpRiskPointsArr = this._tmpRiskPointsArr.filter(function (pointItem) {
      var flag = !pointItem._willDelete;
      delete pointItem._willDelete;
      return flag;
    });
  }
  this._riskPoints[riskPointIndex] && this._riskPoints[riskPointIndex].classList.add('flashing');

  // 旋转雷达扫描扇形
  this._outerScanner.style.transform = 'rotate(' + this._maskStartDegree + 'deg) translateZ(0)';
  this._maskStartDegree -= this._scanSpeed;
};

// 绘制风险点旋转的虚线圆圈背景
Radar.prototype._getDashedCircleBg = function (radius) {
  var center_x = radius / 2,
    center_y = radius / 2;
  var c = document.createElement('canvas');
  c.width = radius;
  c.height = radius;
  var ctx = c.getContext('2d');
  ctx.strokeStyle = '#EAFF00';
  ctx.shadowColor = '#EAFF00';
  ctx.shadowBlur = radius / 25;
  // 绘制内圆环
  ctx.lineWidth = radius / 50;
  ctx.beginPath();
  ctx.arc(center_x, center_y, radius / 4, 0, Math.PI * 2);
  ctx.stroke();
  // 绘制外层虚线圆环
  var dash_cnt = 5,  // 实心虚线点个数
    dash_ratio = 0.8;  // 空心虚线点与实心虚线点的比例
  ctx.lineWidth = radius / 10;
  var solid_dash_len = Math.PI * (radius - ctx.lineWidth) / dash_cnt / (1 + dash_ratio),
    hollow_dash_len = solid_dash_len * dash_ratio;
  ctx.setLineDash([solid_dash_len, hollow_dash_len]);
  ctx.beginPath();
  ctx.arc(center_x, center_y, radius / 2 - ctx.lineWidth / 2, 0, Math.PI * 2);
  ctx.stroke();
  return c.toDataURL();
};

// 地图倒下之后开始显示风险点处的虚线圆圈、红旗和信息面板
Radar.prototype._showRiskElements = function () {
  this._riskElements.forEach(function (re, ri) {
    re.dashedCircle.style.visibility = 'visible';
    re.redFlag.classList.add('stand-up');
  });
};

// 相机漫游到当前风险点时让红旗消失、让信息面板出现
Radar.prototype._handleCurRiskElements = function () {
  var curRiskElements = this._riskElements[this._curRoamingIndex];
  if (curRiskElements) {
    curRiskElements.redFlag.style.opacity = 0;
    curRiskElements.dashedCircle.style.visibility = 'visible';
    curRiskElements.infoPanel.classList.add('showup');
    curRiskElements.infoPanel.classList.add('polish');

    // 设置上一个漫游的风险点的信息面板的透明度
    var lastRiskElements = this._riskElements[(this._curRoamingIndex - 1 + this._riskElements.length) % this._riskElements.length];
    if (lastRiskElements) {
      lastRiskElements.infoPanel.style.removeProperty('opacity');
    }
  }
};

// 地图回到初始状态时隐藏跟风险点相关的元素
Radar.prototype._hideRiskElements = function () {
  this._curRoamingIndex = 0;
  this._riskElements.forEach(function (re, ri) {
    re.redFlag.classList.remove('stand-up');
    re.redFlag.style.opacity = 1;

    re.dashedCircle.style.visibility = 'hidden';

    re.infoPanel.style.removeProperty('opacity');
    re.infoPanel.classList.remove('showup');
    re.infoPanel.classList.remove('polish');
  });
};

// 风险点镜头漫游
Radar.prototype._riskPointsRoaming = function () {
  if (!this._isInRoamingState()) return;
  var curRiskElements = this._riskElements[this._curRoamingIndex];
  if (!curRiskElements) return;
  var radarMapStyle = 'translateZ(' + this._mapTranslateZ + 'px) rotateY(' + curRiskElements.rotateY + 'deg) rotateX(' + this._rotateX + 'deg) translate3d(' + curRiskElements.translate[0] + 'px, ' + curRiskElements.translate[1] + 'px, 0)';

  //test
  //radarMapStyle = 'translateZ(' + this._mapTranslateZ + 'px) translate3d(' + curRiskElements.translate[0] + 'px, ' + curRiskElements.translate[1] + 'px, 0)';
  //test

  // 以上一个风险点为中心绕Y轴旋转(暂时以中心旋转)
  /*var lastRiskElements = this._riskElements[(this._curRoamingIndex - 1 + this._riskElements.length) % this._riskElements.length];
  this._radarMap.style.transformOrigin = lastRiskElements.transformOrigin;*/

  this._radarMap.style.transform = radarMapStyle;
  curRiskElements.infoPanel.classList.remove('polish');

  // 当前的信息面板设置透明度
  var roamingDuration = this._roamingDuration || parseFloat(getComputedStyle(this._radarMap).transitionDuration.split(', ')[0]);
  setTimeout(function (that) {
    if (that._isLyingDown()) {
      curRiskElements.infoPanel.style.opacity = 1;
    }
  }, roamingDuration * 0.5 * 1000, this);
};

// 雷达是否是倒下的状态
Radar.prototype._isLyingDown = function () {
  return this._container.classList.contains('lying-down');
};

// 雷达是否是漫游状态
Radar.prototype._isInRoamingState = function () {
  return this._radarMap.classList.contains('roaming');
};

// 添加点击事件
Radar.prototype._initEvent = function () {
  var that = this;
  this._container.addEventListener('click', function (e) {
    that.roamingToggle();
  }, false);

  this._riskPointsContainer.addEventListener('animationend', function (e) {
    e.target.parentElement.classList.remove('flashing');
  }, false);

  this._radarMap.addEventListener('transitionend', function (e) {
    if (e.propertyName != 'transform') return;
    if (e.target === e.currentTarget) {
      if (that._isLyingDown()) {
        // 地图在倒下的状态
        if (that._isInRoamingState()) {
          // 相机漫游状态
          that._handleCurRiskElements();  // 当前风险点漫游结束
          that._curRoamingIndex = (that._curRoamingIndex + 1) % that._riskElements.length;
          that._riskPointsRoaming();  // 下一个风险点漫游开始
        } else {
          // 刚刚倒下状态
          that._showRiskElements();
        }
      } else {
        that._hideRiskElements();
        that._resumeAnimation();
      }
    } else if (e.target.classList.contains('red-flag') && !e.target.parentElement.nextElementSibling) {
      // 最后一根红旗树立起来之后开始漫游
      that._radarMap.classList.add('roaming');  // 修改transition duration和transition timing-function
      setTimeout(function () {
        that._riskPointsRoaming();
      }, 1000);
    }
  }, false);
};


var radar = new Radar(document.querySelector('.radar'));
radar.init({ scanSpeed: 2 });  // 扫描的速度，单位为deg，必须为360的约数
radar.addRiskPoints([{
  type: 'type1',
  severity: 'ordinary',
  coords: [104.066801, 30.572816], // 成都
  city: '安丘',
  name: '安丘农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type1',
  severity: 'ordinary',
  coords: [118.473701, 31.230416], // 上海
  city: '高密',
  name: '高密农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type2',
  severity: 'ordinary',
  coords: [110.264385, 25.12911], // 广州
  city: '诸城',
  name: '诸城农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type2',
  severity: 'ordinary',
  coords: [105.264385, 40.12911], // 广州
  city: '潍坊',
  name: '潍坊农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type2',
  severity: 'ordinary',
  coords: [98.264385, 38.12911], // 广州
  city: '昌乐',
  name: '昌乐农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type2',
  severity: 'ordinary',
  coords: [88.264385, 38.12911], // 广州
  city: '青州',
  name: '青州农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type2',
  severity: 'ordinary',
  coords: [88.264385, 30.12911], // 广州
  city: '临朐',
  name: '临朐农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type2',
  severity: 'ordinary',
  coords: [95.264385, 45.12911], // 广州
  city: '寿光',
  name: '寿光农商行',
  title: '信息采集户数',
  total: 3
}, {
  type: 'type2',
  severity: 'ordinary',
  coords: [110.264385, 45.12911], // 广州
  city: '昌邑',
  name: '昌邑农商行',
  title: '信息采集户数',
  total: 3
}
]);

setTimeout(() => {
  radar.roamingToggle();
}, 1000)