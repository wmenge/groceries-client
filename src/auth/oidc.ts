import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

/**
 * Everything authorization-server-facing lives here — separate from `src/api/`,
 * which talks to demo-api. Nothing below names a provider: the authority is
 * config, and the library reads every endpoint off the discovery document. The
 * defaults are the local Keycloak, so a plain checkout needs no `.env`.
 *
 * Swapping in Auth0 or Okta is the two knobs below, `scope` and `audience`.
 * See "How auth works" in README.md, and `.env.example`.
 */
const audience = import.meta.env.VITE_OIDC_AUDIENCE

export const userManager = new UserManager({
  authority: import.meta.env.VITE_OIDC_AUTHORITY ?? 'http://localhost:8181/realms/demo',
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID ?? 'demo-client',
  redirect_uri: `${window.location.origin}/callback`,
  post_logout_redirect_uri: window.location.origin,
  // Authorization code flow; oidc-client-ts applies PKCE S256 on its own.
  response_type: 'code',
  // Keycloak hands public clients a refresh token unasked. Auth0 and Okta only
  // issue one when `offline_access` is requested, and without a refresh token
  // both the silent renew below and the 401 retry stop working.
  scope: import.meta.env.VITE_OIDC_SCOPE ?? 'openid profile',
  // Per-tab, survives a reload, gone when the tab closes.
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  stateStore: new WebStorageStateStore({ store: window.sessionStorage }),
  // Left at the library default (true). Not a substitute for the 401 retry in
  // `src/api/client.ts` — just a way to avoid most 401s, given that access
  // tokens live 300 seconds.
  automaticSilentRenew: true,
  // Keycloak puts `aud: demo-api` in the token with a server-side Audience
  // mapper, so this stays unset there. Auth0 makes the client ask, and answers
  // a request with no audience with an *opaque* token rather than a JWT —
  // which demo-api cannot validate, on a token that looks fine in devtools.
  // Okta takes `aud` from its custom authorization server, so it stays unset
  // there too.
  ...(audience !== undefined && { extraQueryParams: { audience } }),
})

/** What the OIDC `state` carries across the redirect to the provider and back. */
export interface SigninState {
  returnTo: string
}

/**
 * The **access** token, never the ID token: the ID token is about the user and
 * is for this app to read, the access token is the one minted for demo-api.
 * Both are JWTs and both look like they work until the API rejects one.
 */
export async function getAccessToken(): Promise<string | null> {
  const user = await userManager.getUser()
  return user?.access_token ?? null
}

/** Refresh, reporting success rather than throwing — the 401 path wants a boolean. */
export async function renew(): Promise<boolean> {
  try {
    return (await userManager.signinSilent()) !== null
  } catch {
    return false
  }
}

/** Hands off to the authorization server. Navigates away, so nothing after this runs. */
export function login(returnTo: string): Promise<void> {
  return userManager.signinRedirect({ state: { returnTo } satisfies SigninState })
}

/**
 * Entirely between this app and the authorization server. demo-api holds no
 * session and no token store, so an already-issued token keeps working until
 * its `exp`.
 *
 * Throws `Error("No end session endpoint")` if the provider's discovery
 * document omits one — the failure mode for Auth0 tenants created before
 * 2023-11-14 that have not enabled RP-initiated logout discovery.
 */
export function logout(): Promise<void> {
  return userManager.signoutRedirect()
}
