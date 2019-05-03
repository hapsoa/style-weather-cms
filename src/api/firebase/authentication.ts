import _ from 'lodash';
import firebase from './initializingFirebase';

import { UserData } from '@/api/class/User';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
// const storage =

class Authentication {
  public db = {
    create(userData: UserData): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(userData.uid as string)
          .set(userData)
          .then(() => {
            console.log('Document(userData) successfully written!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing document(userData): ', error);
            reject(error);
          });
      });
    },
    read(uid: string): Promise<UserData> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              // console.log('Document data(userData):', doc.data());
              resolve(doc.data() as UserData);
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document(userData)!');
              reject(new Error('No such document(userData)!'));
            }
          })
          .catch(error => {
            console.log('Error getting document(userData):', error);
            reject(error);
          });
      });
    },
    // updatedAt 변경하는 함수
    update(uid: string): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(uid)
          .update({
            updatedAt: new Date().getTime(),
          })
          .then(response => {
            console.log('Document(userData) successfully updated!');
            resolve();
          })
          .catch(error => {
            // The document probably doesn't exist.
            console.error('Error updating document(userData): ', error);
            reject(error);
          });
      });
    },
    delete(uid: string): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('users')
          .doc(uid)
          .delete()
          .then(() => {
            console.log('Document(userData) successfully deleted!');
            resolve();
          })
          .catch(error => {
            console.error('Error removing document(userData): ', error);
            reject(error);
          });
      });
    },
  };
  private accessibleUsers: {
    [index: string]: boolean;
  } = {
    'hapsoa@gmail.com': true,
    'gahlok24@gmail.com': true,
    'heidiyun.goo@gmail.com': true,
    'e0zoo94@gmail.com': true,
  };

  private userData: UserData | null = null;

  private authOnListener: null | ((user: firebase.User) => void) = null;
  private authOffListener: null | (() => void) = null;
  private logoutListener: null | (() => void) = null;

  public constructor() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('current user : ', user);
      if (user) {
        // User is signed in.
        // this.router.push('/');
        if (!_.isNil(this.authOnListener)) {
          this.authOnListener(user);
        }
      } else {
        // No user is signed in.
        // this.router.push('/login');
        if (!_.isNil(this.authOffListener)) {
          this.authOffListener();
        }
      }
    });
  }

  public setAuthOnListener(listener: (user: firebase.User) => void) {
    this.authOnListener = listener;
  }
  public setAuthOffListener(listener: () => void) {
    this.authOffListener = listener;
  }

  public async googleLogin() {
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log('google login');

      if (!_.isNil(result.user)) {
        if (!this.accessibleUsers[result.user.email as string]) {
          this.logout();
          throw new Error('접근 가능한 email이 아닙니다');
        }

        try {
          // update를 시도하고, 실패하면 create 한다.
          // uid에 해당하는 녀석에 updatedAt만 바꾼다.
          await this.db.update(result.user.uid);
        } catch (error) {
          console.log(error);
          const currentTime = new Date().getTime();
          const newUserData: UserData = {
            uid: result.user.uid,
            email: result.user.email,
            createdAt: currentTime,
            updatedAt: currentTime,
          };
          // 새로 회원가입을 한다.
          await this.db.create(newUserData);
        }
      } else {
        throw new Error('googleLogin() result.user is null');
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.error('google login error', errorMessage);
    }
  }

  public logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('logout complete');
        if (!_.isNil(this.logoutListener)) {
          this.logoutListener();
        }
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  }

  public getCurrentUser() {
    return firebase.auth().currentUser;
  }
}

const auth = new Authentication();

export default auth;
