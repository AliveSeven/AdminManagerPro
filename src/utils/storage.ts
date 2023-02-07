// projectId 增加项目id防止同源数据污染
// const { VITE_APP_PROJECTID : projectId } = import.meta.env;
const projectId = 'AdminPro'

// 当前用户的token
const USER_TOKEN = `user_token_${projectId}`;
export const setLocalUserToken = (userToken : string) => {
  localStorage.setItem(USER_TOKEN, JSON.stringify(userToken))
}
export const getLocalUserToken = () => {
  const userToken = localStorage.getItem(USER_TOKEN);
  return !userToken ? userToken : JSON.parse(userToken);
}

export const removeLocalUserToken = () => {
  localStorage.removeItem(USER_TOKEN);
}

// 当前用户的信息
const USER_INFO = `user_info_${projectId}`;
export const setLocalUserInfo = (userInfo : string) => {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
}

export const getLocalUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO);
  return !userInfo ? userInfo : JSON.parse(userInfo);
}

export const removeLocalUserInfo = () => {
  localStorage.removeItem(USER_INFO);
}

export const clear = () => {
  removeLocalUserToken();
}

