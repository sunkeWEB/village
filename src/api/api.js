import server from './../request';

export function addVillage(data) {
    return server({
        url: '/addvillage',
        method: 'post',
        data: data
    });
}

export function readvillage(data) {
    return server({
        url: '/readvillage',
        params: data
    });
}

export function addusers(data) {
    return server({
        url: '/users/addusers',
        method: 'post',
        data: data
    });
}

export function readusers(data) {
    return server({
        url: '/users/readusers',
        method: 'get',
        params: data
    });
}

export function delusers(data) {
    return server({
        url:'/users/delusers',
        method:'post',
        data:data,
    });
}

export function updateusers(data) {
    return server({
        url:'/users/updateusers',
        method:'post',
        data:data
    });
}

export function addposts(data) {
    return server({
        url:'/addposts',
        method:'post',
        data
    });
}

export function readposts() {
    return server({
        url:'/readposts'
    });
}

export function addCadrs(data) {
    return server({
        url:'/addcadrs',
        method:'post',
        data:data
    });
}

export function readcadre(data) {
    console.log(data);
    return server({
        url: '/readcadre',
        params:data
    });
}

// 性别 读取
export function readsex(data={}) {
    return server({
        url:'/readsex',
        method:'get',
        data:data
    });
}
export function delcadre(data) {
    return server({
        url:'/delcadre',
        method:"post",
        data:data
    });
}