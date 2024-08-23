import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";
import Color from "color";

export const useSettingsStore = defineStore("setting", () => {

    // 布局模式
    const layout = useStorage<string>("layout", defaultSettings.layout);
    // 是否显示侧边栏logo
    const sidebarLogo = useStorage<boolean>("sidebarLogo", defaultSettings.sidebarLogo);
    // 是否显示多标签导航
    const tagsView = useStorage<boolean>("tagsView", defaultSettings.tagsView);
    // 是否固定头部
    const fixedHeader = useStorage<boolean>("fixedHeader", defaultSettings.fixedHeader);
    // 是否显示设置
    const settingsVisible = ref(false);
    // 主题：light（默认）|dark
    const theme = useStorage<string>("theme", defaultSettings.theme);
    // 主题颜色
    const themeColor = useStorage<string>("themeColor", defaultSettings.themeColor);

    //切换主题
    function changeTheme(val: string) {
        theme.value = val;
    }

    //切换主题颜色
    function changeThemeColor(color: string) {
        themeColor.value = color;
    }

    //切换布局
    function changeLayout(val: string) {
        layout.value = val;
    }


    watch(
        [theme, themeColor],
        ([newTheme, newThemeColor], [oldTheme, oldThemeColor]) => {
            if (newTheme !== oldTheme) {
                if (newTheme === ThemeEnum.DARK) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }

            if (newThemeColor !== oldThemeColor) {
                const rootStyle = document.documentElement.style;
                rootStyle.setProperty(`--el-color-primary`, newThemeColor);
                rootStyle.setProperty(`--el-color-primary-dark-2`, newThemeColor);

                for (let i = 1; i < 10; i++) {
                    rootStyle.setProperty(
                        `--el-color-primary-light-${i}`,
                        `${Color(newThemeColor).alpha(1 - i * 0.1)}`
                    );
                }
            }
        },
        {
            immediate: true, // 立即执行
        }
    );

    return {
        layout,
        sidebarLogo,
        tagsView,
        fixedHeader,
        settingsVisible,
        theme,
        themeColor,
        changeTheme,
        changeThemeColor,
        changeLayout,
    };
});