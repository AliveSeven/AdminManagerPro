import request from './request'

// 获取全部的用户信息
export function getUser(){
    return request({
        url : '/user',
        method : 'get',
    })
}

// 获取用户分页信息
export function getPage(pageNum : number, pageSize : number , username : string , email : string , phone : string){
    return request({
        url : '/user/page',
        method : 'get',
        params : {
            pageNum,
            pageSize,
            username,
            email,
            phone
        }
    })
}

// 根据id搜索用户信息
export function getUserById(id : number){
    return request({
        url : `/user/${id}`,
        method : 'get'
    })
}

// 新增或者更新用户信息
export function addOrUpdateUser(data : any){
    return request({
        url : '/user/save',
        method : 'post',
        data
    })
}

// 删除用户
export function deleteUser(id : number){
    return request({
        url : '/user/delete',
        method : 'post',
        params : {
            id
        }
    })
}

// 导出用户信息
export function exportUser(){
    return request({
        url : '/user/export',
        method : 'get',
        headers: {},
        responseType: 'blob'
    })
}

// 用户登录
export function login(data : any){
    return request({
        url : '/user/login',
        method : 'post',
        data
    })
}

// 角色分页信息
export function getRolePage(pageNum : number, pageSize : number, name : string){
    return request({
        url : '/role/page' ,
        method : 'get',
        params : {
            pageNum,
            pageSize,
            name
        }
    })
}

// 角色菜单管理权限分配
export function roleMenu(roleId : number , data : any){
    return request({
        url : `role/roleMenu/${roleId}`,
        method : 'post',
        data
    })
}

// 获取角色所有的菜单权限id
export function getRoleMenu(roleId : number){
    return request({
        url : `role/roleMenu/${roleId}`,
        method : 'get',
    })
}

// 获取角色id所有的菜单权限
export function getRoleMenuByUserId(id : number){
    return request({
        url : `user/roleMenu/${id}`,
        method : 'get',
    })
}

// 获取菜单分页
export function getMenuPage(pageNum : number, pageSize : number, name : string){
    return request({
        url : 'menu/page',
        method : 'get',
        params : {
            pageNum,
            pageSize,
            name
        }
    })
}