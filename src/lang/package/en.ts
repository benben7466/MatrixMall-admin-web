export default {
    //登录
    login: {
        username: "Username",
        password: "Password",
        login: "Login",
        captchaCode: "Verify Code",
        capsLock: "Caps Lock is On",
        message: {
            username: {
                required: "Please enter Username",
            },
            password: {
                required: "Please enter Password",
                min: "The password can not be less than 6 digits",
            },
            captchaCode: {
                required: "Please enter Verify Code",
            },
        },
    },
    // 路由国际化
    route: {
        "/dashboard": "Dashboard",
        "/system": "System Manager",
        "/system/user": "User Manager",

    },
    sizeSelect: {
        tooltip: "Layout Size",
        default: "Default",
        large: "Large",
        small: "Small",
        message: {
            success: "Switch Layout Size Successful!",
        },
    },
    fullScreen: {
        tooltip: "Full Screen",
    },
    searchMenu: {
        tooltip: "Search Menu",
    },
    langSelect: {
        tooltip: "Language Select",
        message: {
            success: "Switch Language Successful!",
        },
    },
    messageNotice: {
        tooltip: "Message Notice",
    },
    navbar: {
        dashboard: "Dashboard",
        logout: "Logout",
        gitee: "Gitee",
        profile: "User Profile",
    },
    settings: {
        project: "Project Settings",
        theme: "Theme",
        interface: "Interface",
        navigation: "Navigation",
        themeColor: "Theme Color",
        tagsView: "Tags View",
        fixedHeader: "Fixed Header",
        sidebarLogo: "Sidebar Logo",
        watermark: "Watermark",
    },
};