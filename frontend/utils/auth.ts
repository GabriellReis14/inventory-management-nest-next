const cookieName = "token-inventory-management";

export function setAuthenticationCookie(token: string) {
  localStorage.setItem(cookieName, token);
}

export function checkAuthentication() {
  let authToken = localStorage.getItem(cookieName);

  const isAuthenticated: boolean = !!authToken;

  return isAuthenticated;
}
