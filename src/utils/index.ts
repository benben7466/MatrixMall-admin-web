//判断是否是外部链接
export function isExternal(path: string) {
    return /^(https?:|http?:|mailto:|tel:)/.test(path);
}