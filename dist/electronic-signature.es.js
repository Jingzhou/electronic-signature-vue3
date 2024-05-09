import { ref, onMounted, onBeforeUnmount, openBlock, createElementBlock } from 'vue';

// 判断是否为移动端

var script = {
  __name: 'ElectronicSignature',
  props: {
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 200,
  },
  lineWidth: {
    type: Number,
    default: 5,
  },
  strokeStyle: {
    type: String,
    default: "black",
  },
  lineCap: {
    type: String,
    default: "round",
  },
  lineJoin: {
    type: String,
    default: "round",
  },
},
  setup(__props, { expose: __expose }) {

const mobileStatus = /Mobile|Android|iPhone/i.test(navigator.userAgent);
const props = __props;
// canvas元素的实例
const cav = ref(null);
// canvas上下文
const ctx = ref(null);

// 绘制
const draw = (event) => {
  let x, y;
  // 获取坐标
  if (mobileStatus) {
    const { pageX, pageY } = event.changedTouches[0];
    const { left, top } = cav.value.getBoundingClientRect();
    x = pageX - left;
    y = pageY - top;
  } else {
    const { offsetX, offsetY } = event;
    x = offsetX;
    y = offsetY;
  }
  // 根据坐标点位移动添加线条
  ctx.value.lineTo(x, y);

  // 绘制
  ctx.value.stroke();
};
// 结束绘制
const closeDraw = () => {
  // 结束绘制
  ctx.value.closePath();
  // 移除鼠标移动或手势移动监听器
  cav.value.removeEventListener(mobileStatus ? "touchmove" : "mousemove", draw);
};

// 初始化
const init = (event) => {
  let x, y;
  // 获取坐标
  if (mobileStatus) {
    const { pageX, pageY } = event.changedTouches[0];
    const { left, top } = cav.value.getBoundingClientRect();
    x = pageX - left;
    y = pageY - top;
  } else {
    const { offsetX, offsetY } = event;
    x = offsetX;
    y = offsetY;
  }
  // 清除以上一次 beginPath 之后的所有路径，进行绘制
  ctx.value.beginPath();
  // 设置画线起始点位
  ctx.value.moveTo(x, y);
  // 监听 鼠标移动或手势移动
  cav.value.addEventListener(mobileStatus ? "touchmove" : "mousemove", draw);
};
// 保存
// const save = () => {
//   // 将canvas上的内容转成blob流
//   cav.value.toBlob((blob) => {
//     // 获取当前时间并转成字符串，用来当做文件名
//     const date = Date.now().toString();
//     // 创建一个 a 标签
//     const a = document.createElement("a");
//     // 设置 a 标签的下载文件名
//     a.download = `${date}.png`;
//     // 设置 a 标签的跳转路径为 文件流地址
//     a.href = URL.createObjectURL(blob);
//     // 手动触发 a 标签的点击事件
//     a.click();
//     // 移除 a 标签
//     a.remove();
//   });
// };
// 清空;
const reset = () => {
  // 清空当前画布上的所有绘制内容
  ctx.value.clearRect(0, 0, props.width, props.height);
};

// 画板dom加载完成的初始化
onMounted(() => {
  // 设置宽高
  cav.value.width = props.width;
  cav.value.height = props.height;
  // 设置一个边框
  cav.value.style.border = "1px solid #000";
  // 创建上下文
  ctx.value = cav.value.getContext("2d");
  // 设置填充背景色
  ctx.value.fillStyle = "transparent";
  // 根据配置文件设置相应配置
  ctx.value.lineWidth = props.lineWidth;
  ctx.value.strokeStyle = props.strokeStyle;
  ctx.value.lineCap = props.lineCap;
  ctx.value.lineJoin = props.lineJoin;
  // 绘制填充矩形
  ctx.value.fillRect(
    0, // x 轴起始绘制位置
    0, // y 轴起始绘制位置
    props.width, // 宽度
    props.height // 高度
  );
  // 创建鼠标/手势按下监听器
  cav.value.addEventListener(mobileStatus ? "touchstart" : "mousedown", init);
  // 创建鼠标/手势 弹起/离开 监听器
  cav.value.addEventListener(mobileStatus ? "touchend" : "mouseup", closeDraw);
});
// 页面销毁 清除鼠标/手势按下监听器
onBeforeUnmount(() => {
  console.log("移除监听");
  cav.value.removeEventListener(
    mobileStatus ? "touchstart" : "mousedown",
    init
  );
});

__expose({
  reset,
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("canvas", {
    ref_key: "cav",
    ref: cav
  }, null, 512 /* NEED_PATCH */))
}
}

};

script.__file = "src/components/ElectronicSignature.vue";

const components = [script];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (app) {
  // 遍历注册全局组件
  components.map(component => app.use(component));
};
var index = {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
  // 以下是具体的组件列表
};

export { script as ElectronicSignature, index as default };
