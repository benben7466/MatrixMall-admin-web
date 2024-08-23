declare global {
    //系统配置
    interface AppSettings {
        title: string;//标题
        version: string;//版本号
        language: string;//语言
        authorName: string;//作者姓名
        authorUrl: string;//作者网站
        layout: string;//布局
        sidebarLogo: boolean;//是否显示侧边栏logo
        tagsView: boolean;//是否显示多标签导航
        fixedHeader: boolean;//是否固定头部
        showSettings: boolean;//是否显示设置
        size: string;//布局大小
        themeColor: string;//主题颜色
    }

    //通用组件数据源
    interface OptionType {
        value: string | number;//值
        label: string;//文本
        children?: OptionType[];//子列表
    }

    //分页响应对象
    interface PageResult<T> {
        list: T;//数据列表
        total: number;//总数
    }
}
export {};