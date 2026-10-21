export const SIGN_IN_ROUTE = "/signin";

export const SIGN_IN_DOCUMENT = "/signin.html";

export const HOME_ROUTE = "/";

export function isSignInPathname(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === SIGN_IN_ROUTE || normalized === SIGN_IN_DOCUMENT;
}
