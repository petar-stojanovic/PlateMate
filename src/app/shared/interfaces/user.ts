export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isAnonymous?: boolean;
  refreshToken?: string;
}
