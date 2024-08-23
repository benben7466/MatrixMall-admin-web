import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 进度条
NProgress.configure({
    // 动画方式
    easing: "ease",
    // 递增进度条的速度
    speed: 400,
    // 是否显示加载ico
    showSpinner: false,
    // 自动递增间隔
    trickleSpeed: 250,
    // 初始化时的最小百分比
    minimum: 0.2,
});

export default NProgress;
