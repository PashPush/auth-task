/**
 * An array of public routes
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * An array of auth routes
 * Will reditect to /account
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error']

/**
 * The prefix for API auth routes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * Default path to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/account'
