import defaultSettings from "@/settings";
import {store} from "@/store";
import {SidebarStatusEnum} from "@/enums/SidebarStatusEnum";
import {DeviceEnum} from "@/enums/DeviceEnum";
import zhCn from "element-plus/es/locale/lang/zh-cn";//导入 Element Plus 中英文语言包
import en from "element-plus/es/locale/lang/en";

export const useAppStore = defineStore("app", () => {

    //语言
    const language = useStorage("language", defaultSettings.language);

    //侧边栏状态
    const sidebarStatus = useStorage("sidebarStatus", SidebarStatusEnum.OPENED);
    const sidebar = reactive({
        opened: sidebarStatus.value === SidebarStatusEnum.OPENED,
        withoutAnimation: false,
    });

    //设备类型
    const device = useStorage("device", DeviceEnum.DESKTOP);

    //布局大小
    const size = useStorage("size", defaultSettings.size);

    //切换语言
    function changeLanguage(val: string) {
        language.value = val;
    }

    //切换侧边栏
    function toggleSidebar() {
        sidebar.opened = !sidebar.opened;
        sidebarStatus.value = sidebar.opened ? SidebarStatusEnum.OPENED : SidebarStatusEnum.CLOSED;
    }

    //关闭侧边栏
    function closeSideBar() {
        sidebarStatus.value = SidebarStatusEnum.CLOSED;
        sidebar.opened = false;
    }

    //改变布局大小
    function changeSize(val: string) {
        size.value = val;
    }

    //根据语言标识读取对应的语言包
    const locale = computed(() => {
        if (language?.value == "en") {
            return en;
        } else {
            return zhCn;
        }
    });

    return {
        language,
        device,
        sidebar,
        size,
        language,
        toggleSidebar,
        closeSideBar,
        changeSize,
        changeLanguage,
        locale,
    };
});

//如何在组件外部使用 Pinia Store：https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
export function useAppStoreHook() {
    return useAppStore(store);
}