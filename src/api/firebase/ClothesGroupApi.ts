import _ from 'lodash';
import firebase from './initializingFirebase';
import { ClothesGroupData } from '@/api/class/ClothesGroup';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const clothesGroupRef = storageRef.child('clothesGroup');
// var spaceRef = imagesRef.child(fileName);
let nextDocuments: firebase.firestore.Query | null = null;

class ClothesGroupApi {
  public db = {
    // crud
    create(clothesGroupData: ClothesGroupData): Promise<void> {
      return new Promise((resolve, reject) => {
        database
          .collection('clothesGroup')
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
          .collection('clothesGroup')
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
          .collection('clothesGroup')
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
    },
    readDocumentsByRecent(numOfDocuments: number): Promise<ClothesGroupData[]> {
      return new Promise((resolve, reject) => {
        if (_.isNil(nextDocuments)) {
          database
            .collection('clothesGroup')
            .orderBy('createdAt')
            .limit(numOfDocuments)
            .get()
            .then(documentSnapshots => {
              if (documentSnapshots.docs.length !== 0) {
                // Get the last visible document
                const lastDocument =
                  documentSnapshots.docs[documentSnapshots.docs.length - 1];
                // console.log('last', lastVisible);

                nextDocuments = database
                  .collection('clothesGroup')
                  .orderBy('createdAt')
                  .startAfter(lastDocument)
                  .limit(numOfDocuments);
              }

              const clothesGroupDatas: ClothesGroupData[] = [];
              documentSnapshots.forEach(doc => {
                // console.log(doc.id, ' => ', doc.data());
                clothesGroupDatas.push(doc.data() as ClothesGroupData);
              });

              resolve(clothesGroupDatas);
            })
            .catch(error => {
              console.error('readDocumentsByRecent()');
              reject(error);
            });
        } else {
          nextDocuments
            .get()
            .then(documentSnapshots => {
              const clothesGroupDatas: ClothesGroupData[] = [];
              documentSnapshots.forEach(doc => {
                clothesGroupDatas.push(doc.data() as ClothesGroupData);
              });
              // TODO 문제있음. nextDocuments가 갱신되어야 함

              resolve(clothesGroupDatas);
            })
            .catch(error => {
              console.error('readDocumentsByRecent()');
              reject(error);
            });
        }
      });
    },
    initNextDocuments() {
      nextDocuments = null;
    },
    checkClothesGroupsHavingCloth(clothId: string) {
      return new Promise((resolve, reject) => {
        // database.collection('clothesGroup')
        // .where('clothIds', 'have', clothId)
      });
    },
  };
  // firebaseCloth.storage.read();
  public storage = {
    // crud
    create(clothesGroupId: string, file: File | Blob): Promise<void> {
      return new Promise((resolve, reject) => {
        clothesGroupRef
          .child(clothesGroupId)
          .put(file)
          .then(snapshot => {
            console.log('Uploaded a blob or file!');
            console.log('snapshot.downloadURL', snapshot);

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
    },
  };
}

export default new ClothesGroupApi();
