const TOKEN_KEY='token_key'
function setToken(token: string){
  localStorage.setItem(TOKEN_KEY,token)
}

function getToken(): string{
  return localStorage.getItem(TOKEN_KEY)||''
}

function removeToken(){
  localStorage.removeItem(TOKEN_KEY)
}

export {
  setToken,
  getToken,
  removeToken
}
