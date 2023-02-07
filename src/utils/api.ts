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

// 用户注册
export function register(data : any){
    return request({
        url : '/user/register',
        method : 'post',
        data
    })
}

// 验证用户的token是否过期
export function isExpiration(token : string){
    return request({
        url : '/user/token',
        method : 'post',
        params : {
            token
        }
    })
}

// 获取角色
export function getRole(){
    return request({
        url : '/role',
        method : 'get',
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

// 新增或者更新角色信息
export function addOrUpdateRole(data : any){
    return request({
        url : '/role/save',
        method : 'post',
        data
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

// 获取所有菜单信息
export function getMenus(){
    return request({
        url : '/menu',
        method : 'get',
    })
}

// 上传文件
export function uploadFile(data : any){
    return request({
        url : '/file/upload',
        method : 'post',
        data
    })
}

// 获取文件分页
export function getFilePage(pageNum : number, pageSize : number, name? : string){
    return request({
        url : '/file/page',
        method : 'get',
        params : {
            pageNum,
            pageSize,
            name
        }
    })
}

// 根据文件id删除文件
export function deleteFile(id : number){
    return request({
        url : `file/delete/${id}`,
        method : 'post',
    })
}

// 新增或者更新待办事项信息
export function addOrUpdateTodoList(data : any){
    return request({
        url : '/todolist/save',
        method : 'post',
        data
    })
}

// 根据userId查询全部代办事项
export function getTodoListByUserId(userId : number){
    return request({
        url : '/todolist/getByUserId',
        method : 'get',
        params : {
            userId
        }
    })
}

// 获取待办事项分页
export function getTodoListPage(pageNum : number, pageSize : number, userId : number , description? : string){
    return request({
        url : '/todolist/page',
        method : 'get',
        params : {
            pageNum,
            pageSize,
            userId,
            description
        }
    })
}

// 根据id删除待办事项
export function deleteTodoList(id : number){
    return request({
        url : '/todolist/delete',
        method : 'post',
        params : {
            id
        }
    })
}

// 新增或者更新待办项目信息
export function addOrUpdateProject(data : any){
    return request({
        url : '/project/save',
        method : 'post',
        data
    })
}

// 根据userId查询全部项目
export function getProjectByUserId(userId : number){
    return request({
        url : '/project/getByUserId',
        method : 'get',
        params : {
            userId
        }
    })
}

// 获取待办事项分页
export function getProjectPage(pageNum : number, pageSize : number, userId : number , name? : string){
    return request({
        url : '/project/page',
        method : 'get',
        params : {
            pageNum,
            pageSize,
            userId,
            name
        }
    })
}

// 根据id删除待办事项
export function deleteProject(id : number){
    return request({
        url : '/project/delete',
        method : 'post',
        params : {
            id
        }
    })
}