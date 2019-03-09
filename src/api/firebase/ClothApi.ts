import _ from 'lodash';
import firebase from './initializingFirebase';
import { ClothData } from '@/api/class/Cloth';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const clothRef = storageRef.child('cloth');
// var spaceRef = imagesRef.child(fileName);

class ClothApi {
  public db = {
    // crud
    create(clothData: ClothData): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('clothes')
          .doc(clothData.id as string)
          .set(clothData)
          .then(() => {
            console.log('Document(clothData) successfully written!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing document(clothData): ', error);
            reject(error);
          });
      });
    },
    read(clothId: string): Promise<ClothData> {
      return new Promise((resolve, reject) => {
        database
          .collection('clothes')
          .doc(clothId)
          .get()
          .then(doc => {
            if (doc.exists) {
              // console.log('Document data(userData):', doc.data());
              resolve(doc.data() as ClothData);
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document(clothData)!');
              reject(new Error('No such document(clothData)!'));
            }
          })
          .catch(error => {
            console.log('Error getting document(clothData):', error);
            reject(error);
          });
      });
    },
    // update() 필요하지않고, 덮어쓰기(create)하면 되지 않을까
    delete(clothId: string): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('clothes')
          .doc(clothId)
          .delete()
          .then(() => {
            console.log('Document(clothData) successfully deleted!');
            resolve();
          })
          .catch(error => {
            console.error('Error removing document(clothData): ', error);
            reject(error);
          });
      });
    }
  };
  // firebaseCloth.storage.read();
  public storage = {
    // crud
    create(clothId: string, file: File): Promise<void> {
      return new Promise((resolve, reject) => {
        clothRef
          .child(clothId)
          .put(file)
          .then(snapshot => {
            console.log('Uploaded a blob or file!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing storage(clothImage): ', error);
            reject(error);
          });
      });
    },
    read(clothId: string): Promise<string> {
      return new Promise((resolve, reject) => {
        clothRef
          .child(clothId)
          .getDownloadURL()
          .then(url => {
            // `url` is the download URL for 'images/stars.jpg'
            resolve(url);

            // Or inserted into an <img> element:
            // let img = document.getElementById('myimg');
            // img.src = url;
          })
          .catch(error => {
            // Handle any errors
            console.error('Error getting storage(clothImage): ', error);
            reject(error);
          });
      });
    },
    // update() 필요하지않고, 덮어쓰기(create)하면 되지 않을까
    delete(clothId: string): Promise<void> {
      return new Promise((resolve, reject) => {
        clothRef
          .child(clothId)
          .delete()
          .then(() => {
            // File deleted successfully
            console.log('storage(clothImage) successfully deleted!');
            resolve();
          })
          .catch(error => {
            // Uh-oh, an error occurred!
            console.error('Error removing storage(clothImage): ', error);
            reject();
          });
      });
    }
  };
}

export default new ClothApi();
