import firebaseAuth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import RandomDigit from "../utils/RandomDigit";

const VoucherCollection = firestore().collection('vouchers');

/**
 * Retrieves vouchers for the current user.
 * @returns {Promise<Array>} A promise that resolves with an array of vouchers.
 */
export const getVouchers = () => new Promise(async (resolve, reject) => {
    const userID = firebaseAuth().currentUser.uid;

    return VoucherCollection.where('user_id', '==', userID).get().then((res) => {
        resolve(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
});

/**
 * Creates a new voucher with a unique voucher code and adds it to the VoucherCollection.
 * @param {Object} data - The data to be added to the voucher.
 * @returns {Promise} A promise that resolves with the newly created voucher or rejects with an error.
 */
export const createVoucher = (data) => new Promise(async (resolve, reject) => {
    const userID = firebaseAuth().currentUser.uid;

    // Find similar voucher code
    let isUnique = false;
    let generateVoucherCode;
    do {
        generateVoucherCode = 'PV' + RandomDigit(8);
        await VoucherCollection.where('voucher_code', '==', generateVoucherCode).get().then((res) => {
            if (res.empty) {
                isUnique = true;
            }
            generateVoucherCode = 'PV' + RandomDigit(8);
        });
    } while (!isUnique)

    return VoucherCollection.add({
        ...data,
        user_id: userID,
        voucher_code: generateVoucherCode,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
    }).then((res) => {
        resolve(res);
    }).catch((err) => {
        reject(err);
    });
});