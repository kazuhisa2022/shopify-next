/* LINE AUTHORIZATION URL */
export const LINE_AUTHORIZATION_URL =
  "https://access.line.me/oauth2/v2.1/authorize";
export const LINE_AUTHORIZATION_RESPONSE_TYPE = "code";
export const LINE_AUTHORIZATION_SCOPE = "profile%20openid";
export const LINE_AUTHORIZATION_BOT_PROMPT = "normal";
export const LINE_AUTHORIZATION_SYNC_REDIRECT_URI =
  "    https://18e2-152-165-199-159.jp.ngrok.io";
export const LINE_AUTHORIZATION_LOGIN_REDIRECT_URI =
  "  https://18e2-152-165-199-159.jp.ngrok.io";
export const LINE_AUTHORIZATION_STATE = [...Array(30)]
  .map(() => Math.random().toString(36)[2])
  .join("");

export const LINE_AUTHORIZATION_NONCE = [...Array(30)]
  .map(() => Math.random().toString(36)[2])
  .join("");

export const HOME_URL = "/";
export const API_BASE = "/api";
export const API_JWT = `${API_BASE}/jwt`;
export const API_LOGIN = `${API_JWT}/login`;
export const API_LINE_LOGIN = `${API_JWT}/line/login`;
export const AXIOS_REQUEST_TIMEOUT = 1000 * 10;
