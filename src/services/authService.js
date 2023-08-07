import firebaseAuth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
const userCollection = firestore().collection('users');

/**
 * Logs in a user with the provided email and password.
 * @param {Object} data - The user's email and password.
 * @param {string} data.email - The user's email.
 * @param {string} data.password - The user's password.
 * @returns {Promise} A promise that resolves with the user's login result or rejects with an error.
 */
export const UserLogin = (data = {}) => new Promise((resolve, reject) => {
    firebaseAuth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((result) => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
})

/**
 * Creates a new user account with the provided email and password.
 * @param {Object} data - An object containing email and password of the user.
 * @param {string} data.email - The email of the user.
 * @param {string} data.password - The password of the user.
 * @returns {Promise} A promise that resolves with the result of the user creation or rejects with an error.
 */
export const UserSignUp = (data = {}) => new Promise((resolve, reject) => {
    firebaseAuth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((result) => {
            userCollection.doc(result.user.uid).set({
                email: result.user.email,
                name: result.user.displayName,
                role: 'user',
                uid: result?.user?.uid,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            }).then((res) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        })
        .catch(error => {
            console.error(37, error);
            reject(error);
        });
});

/**
 * Logs out the current user.
 * @returns {Promise} A promise that resolves with the sign out result or rejects with an error.
 */
export const UserLogout = () => new Promise((resolve, reject) => {
    firebaseAuth()
        .signOut()
        .then((result) => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
});