A time axis plugin that can move left and right and adjust page width.
The plugin works with CommonJS, AMD and as global variable.


一款可以左右移动而且自适应页面宽度的时间轴插件。该插件可以在CommonJS, AMD引入，也可以在global下使用。
## Installation
```
> npm install time-axis --save
```
## Usage
```
<template>
  <div class="hello">
    <div class="cx-time-main" id="cxTime"></div>
  </div>
</template>

<script>
import TimeAxis from "time-axis";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    const timeList = [
      { name: "第一次", time: "2019-11-01" },
      { name: "第二次", time: "2019-11-02" },
      { name: "第三次", time: "2019-11-03" },
      { name: "第四次", time: "2019-11-04" },
      { name: "第五次", time: "2019-11-05" },
      { name: "第六次", time: "2019-11-06" },
      { name: "第七次", time: "2019-11-07" },
      { name: "第八次", time: "2019-11-08" },
      { name: "第九次", time: "2019-11-09" }
    ]; //参数列表
    const param = {
      data: timeList,
      id: "cxTime",
      width: "150px",
      index: 0,
      then: function(data) {
        console.log(data);
      }
    };
    new TimeAxis(param);
  }
};
</script>
```
or
```
const TimeAxis = require("time-axis");
new TimeAxis.default(param);
```
or
```
<script src="time-axis.js"></script>
<script type="module">
    new TimeAxis.default(param);
</script>
```