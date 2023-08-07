import ImageCropPicker from "react-native-image-crop-picker";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

export function photoPicker(options) {
    return new Promise(async (resolve) => {
        if (Platform.OS == "android") {

            let storageResponse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
            if (storageResponse === "never_ask_again" || storageResponse === "denied") {
                Alert.alert(
                    "Are you sure?",
                    `Denied storage permission permanently`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => Linking.openSettings() }
                    ]
                );
            }
        }
        ImageCropPicker.openPicker({
            cropping: true,
            width: 500,
            height: 500,
            forceJpg: true,
            mediaType: "photo",
            compressImageQuality: 0.6,
            ...options,
        })
            .then((response) => {
                const dataObj = {
                    uri: response.path,
                    name: "file" + new Date().getTime() + ".jpg",
                    type: response.mime,
                };
                resolve({ status: true, data: dataObj });
            })
            .catch((e) => {
                console.error(e);
                resolve({ status: false, message: "Opps! something is wrong" });
            });
    });
}

export function cameraPicker(options) {
    return new Promise(async (resolve) => {

        if (Platform.OS == "android") {
            // let cameraResponse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            // let storageResponse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            // if (cameraResponse === "never_ask_again" || cameraResponse === "denied" || storageResponse === "never_ask_again" || storageResponse === "denied") {
            //     Alert.alert(
            //         "Are you sure?",
            //         `Denied ${((cameraResponse !== "granted" && storageResponse !== "granted") ? "camera and storage" : cameraResponse === "granted" ? "storage" : "camera")} permission permanently`,
            //         [
            //             {
            //                 text: "Cancel",
            //                 onPress: () => console.log("Cancel Pressed"),
            //                 style: "cancel"
            //             },
            //             { text: "OK", onPress: () => Linking.openSettings() }
            //         ]
            //     );
            // }
        }

        ImageCropPicker.openCamera({
            cropping: true,
            width: 500,
            height: 500,
            forceJpg: true,
            mediaType: "photo",
            compressImageQuality: 1,
            ...options,
        })
            .then((response) => {
                const dataObj = {
                    uri: response.path,
                    name: "file" + new Date().getTime() + ".jpg",
                    type: response.mime,
                };
                resolve({ status: true, data: dataObj });
            })
            .catch((e) => {
                console.error(e);
                resolve({ status: false, message: "Opps! something is wrong" });
            });
    });
}
export function cleanPicker() {
    ImageCropPicker.clean();
}