/**
 * @author Smit Luvani
 * @description MMKVManager is a wrapper class for MMKV
 * @tutorial https://github.com/mrousavy/react-native-mmkv
 */

import { MMKV } from 'react-native-mmkv';

class MMKVManager {
    constructor() {
        this.storage = new MMKV({
            id: 'MMKV_MMKV',
            encryptionKey: 'MMKV_MMKV_ENCRYPTION',
        });
    }

    /**
     * @param {String} key 
     * @param {*} value 
     */
    set(key, value) {
        switch (typeof value) {
            case 'object':
                this.storage.set(key, JSON.stringify(value))
                break;
            default:
                this.storage.set(key, value);
                break;
        }
    }

    /**
     * 
     * @param {String} key      
     * @returns {String}
     */
    getString(key) {
        return this.storage.getString(key);
    }

    /**
     * 
     * @param {String} key      
     * @returns {Object}
     */
    getObject(key) {
        return JSON.parse(this.storage.getString(key) || null);
    }

    /**
     * 
     * @param {String} key      
     * @returns {Array}
     */
    getArray(key) {
        return this.getObject(key);
    }

    /**
     * 
     * @param {String} key      
     * @returns {number}
     */
    getNumber(key) {
        return this.storage.getNumber(key);
    }

    /**
     * 
     * @param {String} key      
     * @returns {Boolean}
     */
    getBoolean(key) {
        return this.storage.getBoolean(key);
    }

    /**
     * 
     * @returns {void}
     */
    cleanStorage() {
        this.storage.clearAll();
        console.debug("[MMKV][cleanStorage]", "storage is now reset!");
    }
    /**
     * 
     * @param {String} key 
     * @returns {void}
     */
    removeKey(key) {
        return this.storage.delete(key);
    }
}

export const mmkv = new MMKVManager();