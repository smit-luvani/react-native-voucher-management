import firestore from "@react-native-firebase/firestore";
const userCollection = firestore().collection('users');
import firebaseAuth from '@react-native-firebase/auth';

/**
 * Retrieves the user data from Firestore.
 * @returns {Promise<Object>} A promise that resolves with the user data object or rejects with an error.
 */
export const getUser = () => new Promise((resolve, reject) => {
    return userCollection
        .doc(firebaseAuth().currentUser.uid)
        .get()
        .then((res) => {
            resolve(res.data())
        })
        .catch((err) => {
            console.error(err);
            reject(err);
        });
});