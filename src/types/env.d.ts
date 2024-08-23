//平台的名称
declare const __APP_INFO__: {
    pkg: {
        name: string;
        version: string;
        engines: {
            node: string;
        };
        authorName: string;
        authorUrl: string;
    };
};

interface ImportMetaEnv {
    VITE_APP_PORT: number;//应用端口
    VITE_APP_BASE_API: string;//基础路径
    VITE_APP_API_URL: string;//API 地址
    VITE_MOCK_DEV_SERVER: boolean;//是否开启Mock服务
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
