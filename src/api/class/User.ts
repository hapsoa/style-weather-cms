import _ from 'lodash';
import { firebase, firebaseAuth } from '@/api/firebase';

export interface UserData {
  uid: string | null;
  email: string | null;
  createdAt: number | null;
  updatedAt: number | null;
}

// user instance는 한개. vuex에 하나 있을듯.
// 로그인 로그아웃 버튼, nickname 설정할 때,
// vuex뿐만 아니라, 다른 class(boardPost 에서도 user.uid가 필요하다.)
export default class User implements UserData {
  public static authOnListeners: Array<() => void> = [];
  public static authOffListeners: Array<() => void> = [];

  public static getInstance() {
    return this.userInstance;
  }

  public static setAuthOnListener() {
    firebaseAuth.setAuthOnListener(async (user: firebase.User) => {
      const userData = await firebaseAuth.db.read(user.uid);
      User.userInstance = new User(userData);
      _.forEach(User.authOnListeners, listener => {
        listener();
      });
    });
  }
  public static setAuthOffListener() {
    firebaseAuth.setAuthOffListener(() => {
      _.forEach(User.authOffListeners, listener => {
        listener();
      });
    });
  }

  // 로그인이 되면 user instance가 만들어 지는데,
  // setAuthChanged가 불릴 때 만들어 지는게 좋지 않나.
  public static async googleLogin() {
    return new Promise((resolve, reject) => {
      firebaseAuth
        .googleLogin()
        .then(response => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  private static userInstance: User | null = null;

  public uid: string | null = null;
  public email: string | null = null;
  public createdAt: number | null = null;
  public updatedAt: number | null = null;

  private constructor(userData: UserData) {
    this.uid = userData.uid;
    this.email = userData.email;
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
  }

  public async logout() {
    await firebaseAuth.logout();
    User.userInstance = null;
  }
}
