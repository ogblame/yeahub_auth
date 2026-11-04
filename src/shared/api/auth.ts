type TokenGetter = () => string | null;

let getToken: TokenGetter = () => null;
let saveToken: ((token: string) => void) | undefined;
let clearSession: (() => void) | undefined;

export function configureApiAuth(
  getter: TokenGetter,
  setter: (token: string) => void,
  onSessionExpired: () => void,
) {
  getToken = getter;
  saveToken = setter;
  clearSession = onSessionExpired;
}

export function getAccessToken() {
  return getToken();
}

export function saveAccessToken(token: string) {
  saveToken?.(token);
}

export function expireSession() {
  clearSession?.();
}
