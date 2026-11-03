type TokenGetter = () => string | null;

let getToken: TokenGetter = () => null;

export function configureApiAuth(tokenGetter: TokenGetter) {
  getToken = tokenGetter;
}

export function getAccessToken() {
  return getToken();
}
