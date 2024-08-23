import type { App } from "vue";
import { setupRouter } from "@/router";
import { setupPermission } from "@/permission";
import { setupStore } from "@/store";
import { setupI18n } from "@/lang";
import { setupElIcons } from "@/icons";
import { setupDirective } from "@/directive";

export default {
    install(app: App<Element>){
        // 安装路由
        setupRouter(app);
        // 安装存储
        setupStore(app);
        // 国际化
        setupI18n(app);
        // Element-plus图标
        setupElIcons(app);
        //自定义指令
        setupDirective(app);
        // 安装权限，路由守卫
        setupPermission(app);
    }
}