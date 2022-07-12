// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH_SIGNUP_URL:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  AUTH_SIGNIN_URL:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  AUTH_API_KEY:'AIzaSyCHZLEmFGsPJ_ZcMOpxZW0k0mWJUUsjlXU',
  AUTH_SEC_TOKEN_NAME:'clcc-openboard-user-data'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
