import _ from 'lodash';
import firebase from './initializingFirebase';
import { ClothesGroupData } from '@/api/class/ClothesGroup';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const clothesGroupRef = storageRef.child('clothesGroup');
// var spaceRef = imagesRef.child(fileName);

class ClothesGroupApi {
  public db = {
    // crud
    create(clothesGroupData: ClothesGroupData): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('clothes')
          .doc(clothesGroupData.id as string)
          .set(clothesGroupData)
          .then(() => {
            console.log('Document(clothesGroupData) successfully written!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing document(clothesGroupData): ', error);
            reject(error);
          });
      });
    },
    read(clothesGroupId: string): Promise<ClothesGroupData> {
      return new Promise((resolve, reject) => {
        database
          .collection('clothes')
          .doc(clothesGroupId)
          .get()
          .then(doc => {
            if (doc.exists) {
              // console.log('Document data(userData):', doc.data());
              resolve(doc.data() as ClothesGroupData);
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document(clothesGroupData)!');
              reject(new Error('No such document(clothesGroupData)!'));
            }
          })
          .catch(error => {
            console.log('Error getting document(clothesGroupData):', error);
            reject(error);
          });
      });
    },
    // update() 필요하지않고, 덮어쓰기(create)하면 되지 않을까
    delete(clothesGroupId: string): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('clothes')
          .doc(clothesGroupId)
          .delete()
          .then(() => {
            console.log('Document(clothesGroupData) successfully deleted!');
            resolve();
          })
          .catch(error => {
            console.error('Error removing document(clothesGroupData): ', error);
            reject(error);
          });
      });
    }
  };
  // firebaseCloth.storage.read();
  public storage = {
    // crud
    create(clothesGroupId: string, file: File): Promise<void> {
      return new Promise((resolve, reject) => {
        clothesGroupRef
          .child(clothesGroupId)
          .put(file)
          .then(snapshot => {
            console.log('Uploaded a blob or file!');
            resolve();
          })
          .catch(error => {
            console.error('Error writing storage(clothesGroupImage): ', error);
            reject(error);
          });
      });
    },
    read(clothesGroupId: string): Promise<string> {
      return new Promise((resolve, reject) => {
        clothesGroupRef
          .child(clothesGroupId)
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
            console.error('Error getting storage(clothesGroupImage): ', error);
            reject(error);
          });
      });
    },
    // update() 필요하지않고, 덮어쓰기(create)하면 되지 않을까
    delete(clothesGroupId: string): Promise<void> {
      return new Promise((resolve, reject) => {
        clothesGroupRef
          .child(clothesGroupId)
          .delete()
          .then(() => {
            // File deleted successfully
            console.log('storage(clothesGroupImage) successfully deleted!');
            resolve();
          })
          .catch(error => {
            // Uh-oh, an error occurred!
            console.error('Error removing storage(clothesGroupImage): ', error);
            reject();
          });
      });
    }
  };
}

export default new ClothesGroupApi();
