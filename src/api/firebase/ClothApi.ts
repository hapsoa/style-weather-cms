import _ from 'lodash';
import firebase from './initializingFirebase';
import { ClothData, MajorClass } from '@/api/class/Cloth';

const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref();
const clothRef = storageRef.child('cloth');
// var spaceRef = imagesRef.child(fileName);
let nextDocuments: firebase.firestore.Query | null = null;

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
    },
    readDocumentsByRecent(numOfDocuments: number): Promise<ClothData[]> {
      return new Promise((resolve, reject) => {
        if (_.isNil(nextDocuments)) {
          database
            .collection('clothes')
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
                  .collection('clothes')
                  .orderBy('createdAt')
                  .startAfter(lastDocument)
                  .limit(numOfDocuments);
              }

              const clothDatas: ClothData[] = [];
              documentSnapshots.forEach(doc => {
                // console.log(doc.id, ' => ', doc.data());
                clothDatas.push(doc.data() as ClothData);
              });

              resolve(clothDatas);
            })
            .catch(error => {
              console.error('readDocumentsByRecent()');
              reject(error);
            });
        } else {
          nextDocuments
            .get()
            .then(documentSnapshots => {
              const clothDatas: ClothData[] = [];
              documentSnapshots.forEach(doc => {
                clothDatas.push(doc.data() as ClothData);
              });
              // TODO 문제있음. nextDocuments가 갱신되어야 함

              resolve(clothDatas);
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
    readByQuery(queryObject: {
      searchInput: string;
      majorClass: string | null;
      minorClass: string | null;
    }): Promise<ClothData[]> {
      return new Promise((resolve, reject) => {
        let queryRef: firebase.firestore.Query;
        if (queryObject.searchInput !== '') {
          if (queryObject.majorClass !== null) {
            if (queryObject.minorClass !== null) {
              queryRef = database
                .collection('clothes')
                .where('majorClass', '==', queryObject.majorClass)
                .where('minorClass', '==', queryObject.minorClass)
                .where('hashtags', 'array-contains', queryObject.searchInput);
            } else {
              queryRef = database
                .collection('clothes')
                .where('majorClass', '==', queryObject.majorClass)
                .where('hashtags', 'array-contains', queryObject.searchInput);
            }
          } else {
            if (queryObject.minorClass !== null) {
              queryRef = database
                .collection('clothes')
                .where('minorClass', '==', queryObject.minorClass)
                .where('hashtags', 'array-contains', queryObject.searchInput);
            } else {
              console.log('yapa');
              queryRef = database
                .collection('clothes')
                .where('hashtags', 'array-contains', queryObject.searchInput);
            }
          }
        } else {
          if (queryObject.majorClass !== null) {
            if (queryObject.minorClass !== null) {
              queryRef = database
                .collection('clothes')
                .where('majorClass', '==', queryObject.majorClass)
                .where('minorClass', '==', queryObject.minorClass);
            } else {
              queryRef = database
                .collection('clothes')
                .where('majorClass', '==', queryObject.majorClass);
            }
          } else {
            if (queryObject.minorClass !== null) {
              queryRef = database
                .collection('clothes')
                .where('minorClass', '==', queryObject.minorClass);
            } else {
              queryRef = database.collection('clothes');
            }
          }
        }

        queryRef
          .get()
          .then(querySnapshot => {
            const clothDatas: ClothData[] = [];
            querySnapshot.forEach(doc => {
              // console.log(doc.id, ' => ', doc.data());
              clothDatas.push(doc.data() as ClothData);
            });
            console.log('clothDatas', clothDatas);
            resolve(clothDatas);
          })
          .catch(error => {
            console.log('Error getting documents: ', error);
            reject();
          });
      });
    },
  };
  // firebaseCloth.storage.read();
  public storage = {
    // crud
    create(clothId: string, file: File | Blob): Promise<void> {
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
    },
  };
}

export default new ClothApi();
