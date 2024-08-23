export const useTagsViewStore = defineStore("tagsView", () => {
    const visitedViews = ref<TagView[]>([]);
    const cachedViews = ref<string[]>([]);
    const router = useRouter();
    const route = useRoute();

    //添加已访问视图到已访问视图列表中
    function addVisitedView(view: TagView) {
        // 如果已经存在于已访问的视图列表中，则不再添加
        if (visitedViews.value.some((v) => v.path === view.path)) {
            return;
        }
        // 如果视图是固定的（affix），则在已访问的视图列表的开头添加
        if (view.affix) {
            visitedViews.value.unshift(view);
        } else {
            // 如果视图不是固定的，则在已访问的视图列表的末尾添加
            visitedViews.value.push(view);
        }
    }

    function addView(view: TagView) {
        addVisitedView(view);
        addCachedView(view);
    }

    //添加缓存视图到缓存视图列表中
    function addCachedView(view: TagView) {
        const viewName = view.name;
        // 如果缓存视图名称已经存在于缓存视图列表中，则不再添加
        if (cachedViews.value.includes(viewName)) {
            return;
        }

        // 如果视图需要缓存（keepAlive），则将其路由名称添加到缓存视图列表中
        if (view.keepAlive) {
            cachedViews.value.push(viewName);
        }
    }

    function updateVisitedView(view: TagView) {
        for (let v of visitedViews.value) {
            if (v.path === view.path) {
                v = Object.assign(v, view);
                break;
            }
        }
    }

    function delView(view: TagView) {
        return new Promise((resolve) => {
            delVisitedView(view);
            delCachedView(view);
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value],
            });
        });
    }

    //从已访问视图列表中删除指定的视图
    function delVisitedView(view: TagView) {
        return new Promise((resolve) => {
            for (const [i, v] of visitedViews.value.entries()) {
                // 找到与指定视图路径匹配的视图，在已访问视图列表中删除该视图
                if (v.path === view.path) {
                    visitedViews.value.splice(i, 1);
                    break;
                }
            }
            resolve([...visitedViews.value]);
        });
    }

    function delAllViews() {
        return new Promise((resolve) => {
            const affixTags = visitedViews.value.filter((tag) => tag?.affix);
            visitedViews.value = affixTags;
            cachedViews.value = [];
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value],
            });
        });
    }

    function delCachedView(view: TagView) {
        const viewName = view.name;
        return new Promise((resolve) => {
            const index = cachedViews.value.indexOf(viewName);
            index > -1 && cachedViews.value.splice(index, 1);
            resolve([...cachedViews.value]);
        });
    }

    function isActive(tag: TagView) {
        return tag.path === route.path;
    }

    function toLastView(visitedViews: TagView[], view?: TagView) {
        const latestView = visitedViews.slice(-1)[0];
        if (latestView && latestView.fullPath) {
            router.push(latestView.fullPath);
        } else {
            if (view?.name === "Dashboard") {
                router.replace("/redirect" + view.fullPath);
            } else {
                router.push("/");
            }
        }
    }

    return {
        visitedViews,
        cachedViews,
        addVisitedView,
        addView,
        addCachedView,
        updateVisitedView,
        delAllViews,
        delView,
        delVisitedView,
        isActive,
        toLastView,
    }

});