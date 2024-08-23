import {LanguageEnum} from "@/enums/LanguageEnum";
import {LayoutEnum} from "@/enums/LayoutEnum";
import {SizeEnum} from "@/enums/SizeEnum";
import { ThemeEnum } from "@/enums/ThemeEnum";

const {pkg} = __APP_INFO__;
const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");//检测用户操作系统或浏览器是否设置为暗黑模式

const defaultSettings: AppSettings = {
    title: pkg.name,
    version: pkg.version,
    language: LanguageEnum.ZH_CN,
    authorName: pkg.authorName,
    authorUrl: pkg.authorUrl,
    layout: LayoutEnum.LEFT,
    sidebarLogo: true,
    tagsView: true,
    fixedHeader: true,
    showSettings: true,
    size: SizeEnum.DEFAULT,
    showSettings: true,
    theme: mediaQueryList.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    themeColor: "#00CED1",
};

export default defaultSettings;