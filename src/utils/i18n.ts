import i18n from "@/lang/index";
import {LanguageEnum} from "@/enums/LanguageEnum";

export function translateRouteTitle(title: any, path: any) {
    const {locale, t} = useI18n();

    let routeKey = "route." + title;//默认：中文
    if (locale.value != LanguageEnum.ZH_CN) {//其他国家需要配置路由
        routeKey = "route." + path;
    }

    const hasKey = i18n.global.te(routeKey);
    if (hasKey) {
        return i18n.global.t(routeKey);
    }

    return title;
}
