import "velocity-animate/velocity.min.js";
import "./style.css";
var defaults = {
  data: [], // 展示数据
  id: "", // 判定dom ID
  props: {
    // 参数反显字段名
    name: "name",
    key: "time"
  },
  index: 0, //默认当前选中
  width: "150px",
  then: function () {}
};

var TimeAxis = function (options) {
  this.options = Object.assign(defaults, options);
  this.props = this.options.props;
  this.id = this.options.id;
  this.width = this.options.width;
  this.init();
};

TimeAxis.prototype = {
  // 组件初始化
  init: function () {
    // 生成时间轴盒子html
    this.setTimeBox();
  },

  // 生成时间轴盒子html
  setTimeBox: function () {
    var id = "#" + this.id;
    const html =
      '<span><</span> <div class="cx-time-box"> <ul></ul></div><span>></span>';
    document.querySelector(id).innerHTML = html;
    // $(id).empty().append(html);
    // 生成时间轴html
    this.setTimeAxisHtml();

    var self = this;

    // 向左移动
    document.querySelector(id + ">span:first-child").onclick = () => {
      self.timeAxisMove(-1);
    };
    /*  $(id + ">span:first").on("click", function () {
              self.timeAxisMove(-1);
            }); */

    //向右移动
    /* $(id + ">span:last").on("click", function () {
              self.timeAxisMove(1);
            }); */
    document.querySelector(id + ">span:last-child").onclick = () => {
      self.timeAxisMove(1);
    };
  },

  // 生成时间轴html
  setTimeAxisHtml: function () {
    var list = this.options.data || [];
    var html = "";
    var self = this;
    list.forEach((item, index) => {
      html += '<li class="cx-round-box cx-round-box' + index + '">';
      html += '<div class="cx-time-top">' + item[this.props.name] + "</div>";
      html += '<div class="cx-time-round" data-index="' + index + '"></div>';
      html += '<div class="cx-time-bottom">' + item[this.props.key] + "</div>";
      html += "</li>";
      if (index != list.length - 1) {
        html +=
          '<li class="cx-time-line" style="width: ' + this.width + '"></li>';
      }
    });
    /* $.each(list, function (index, item) {
              html += '<li class="cx-round-box cx-round-box' + index + '">';
              html += '<div class="cx-time-top">' + item[self.props.name] + "</div>";
              html += '<div class="cx-time-round" data-index="' + index + '"></div>';
              html +=
                '<div class="cx-time-bottom">' + item[self.props.key] + "</div>";
              html += "</li>";
              if (index != list.length - 1) {
                html +=
                  '<li class="cx-time-line" style="width: ' + self.width + '"></li>';
              }
            }); */
    var cls = "#" + this.id + " ul";
    document.querySelector(cls).innerHTML = html;
    //   $(cls).empty().append(html);
    const points = document.querySelectorAll(cls + " .cx-time-round");
    points.forEach(item => {
      item.onclick = () => {
        self.options.index = Number(item.getAttribute("data-index"));
        self.timeAxisMove(0); //点击某一点
      };
    });
    /* $(cls + " .cx-time-round").on("click", function () {
              self.options.index = $(this).data("index");
              self.timeAxisMove(0); //点击某一点
            }); */
    this.firstLoad = true;
    this.timeAxisMove(0); //初始选中
  },

  //点击连边移动选中时间节点
  timeAxisMove: function (num) {
    var list = this.options.data || [];
    this.options.index += num;
    if (this.options.index < 0) {
      this.options.index = list.length - 1;
    }
    if (this.options.index > list.length - 1) {
      this.options.index = 0;
    }
    this.timeAxisRoll();
    this.timeAxisActive(this.options.index);
  },

  changeCurIndex(num) {
    this.options.index = num;
    this.timeAxisRoll();
    this.timeAxisActive();
  },

  //选中节点左右滚动
  timeAxisRoll: function () {
    var list = this.options.data || [];

    var width = parseInt(this.width) + 12;
    var firstIndex = this.options.index - 1 < 0 ? 0 : this.options.index - 1;
    var roll = -(firstIndex * width);
    const widthBox = document.querySelector(".cx-time-box").offsetWidth;
    var widthBox1 = Math.abs(list.length * width); //实际总宽度
    if (widthBox > widthBox1) {
      return;
    }
    var i = parseInt(widthBox / width); //显示时间轴条数

    if (this.options.index + i >= list.length) {
      roll = -((list.length - 1 - i) * width);
    }

    var cla = "#" + this.id + " ul li";
    const claDoms = document.querySelectorAll(cla);
    claDoms.forEach(item => {
      Velocity(item, {
        left: roll + "px"
      });
    });
  },

  // 前后滑动点击事件
  timeAxisActive: function () {
    if (!this.firstLoad) {
      var list = this.options.data || [];
      var data = list[this.options.index];
      this.options.then(data);
    } // 首次加载不执行回调
    document.querySelectorAll(".cx-round-box").forEach(item => {
      item.classList.remove("cx-time-active");
    });
    document
      .querySelector(".cx-round-box" + this.options.index)
      .classList.add("cx-time-active");
    this.firstLoad = false;
  }
};

export default TimeAxis;
