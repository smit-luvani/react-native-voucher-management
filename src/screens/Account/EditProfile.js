import React, { useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { hp, wp } from '../../Helper/ResponsiveSize';
import { cameraIcon, galleryIcon } from '../../assets/images';
import { mediaOption } from '../../constants/common';
import withNetworkCheck from '../../hoc/withNetworkCheck';
import AnimatedToast from '../../component/common/AnimatedToast';
import showToast from '../../component/common/CTToast';
import { Button } from '../../component/common/Button';
import Header from '../../component/common/headers/TransparentHeader';
import { CTAvatar } from '../../component/common/CTAvatar';
import { cameraPicker, photoPicker } from '../../utils/MediaPicker';
import CTActionSheet from '../../component/common/CTActionSheet';
import InputText from '../../component/common/InputText';

/**
 * EditProfile component for editing user profile information.
 * @param {object} navigation - Navigation object for navigating between screens.
 * @param {boolean} isOnline - Boolean value indicating whether the user is online or not.
 * @returns {JSX.Element} - Returns the JSX element for the EditProfile component.
 */
const EditProfile = ({ navigation, isOnline }) => {
    // State variables for managing profile picture, user data and photo picker modal.
    const [isPhotoPicker, setIsPhotoPicker] = useState(false);
    const [isProfileLoader, setIsProfileLoader] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [userData, setUserData] = useState({
        full_name: null,
        email: null,
    });

    // Array of objects for profile picture picker options.
    const profilePicker = [
        {
            title: 'Choose from photo album',
            icon: galleryIcon,
            onPress: () => chooseMedia(mediaOption.gallery),
        },
        {
            title: 'Capture photo',
            icon: cameraIcon,
            onPress: () => chooseMedia(mediaOption.camera),
        },
    ];

    /**
     * Function for choosing media (camera or gallery) and uploading the selected media.
     * @param {string} option - String value indicating the media option (camera or gallery).
     * @returns {Promise<void>} - Returns a promise that resolves when the media is uploaded.
     */
    const chooseMedia = async (option) => {
        if (option === mediaOption.camera) {
            let res = await cameraPicker({ height: 1000, width: 1000 });
            if (res.status) {
                setIsPhotoPicker(false);
                setIsProfileLoader(true);
                setProfilePic(res.data);
                await uploadPicture(res.data);
                setIsProfileLoader(false);
            }
        } else if (option === mediaOption.gallery) {
            let res = await photoPicker({ height: 1000, width: 1000 });
            if (res.status) {
                setIsPhotoPicker(false);
                setIsProfileLoader(true);
                setProfilePic(res.data);
                await uploadPicture(res.data);
                setIsProfileLoader(false);
            }
        }
    };

    /**
     * Function for handling the action when the "Save Changes" button is pressed.
     * @returns {void} - Returns nothing.
     */
    const handleAction = async () => {
        return showToast("Not implemented yet");
    }

    // JSX element for the EditProfile component.
    return (
        <View style={styles.container}>
            {!isOnline && <AnimatedToast value={20} type="bottom" />}
            <View
                style={{
                    overflow: 'hidden'
                }}>
                <Header color={colors.darkBlack} text={"Edit Profile"} />

                <CTAvatar
                    size={wp(40)}
                    source={profilePic}
                    resizeMode="cover"
                    style={styles.profileAvatarStyle}
                    isLoader={isProfileLoader}
                    onPressEdit={() => setIsPhotoPicker(true)}
                />

                <InputText
                    InputViewStyle={styles.inputViewStyle}
                    containerStyle={styles.inputContainerStyle}
                    title={'Your Name'}
                    titleStyle={styles.inputTitleStyle}
                    textStyle={styles.inputTextStyle}
                    placeholder={'Full Name'}
                    value={userData?.first_name || ''}
                    onChangeText={(text) => setUserData({ ...userData, full_name: text })}
                    editable={true}
                />

                <InputText
                    InputViewStyle={styles.inputViewStyle}
                    containerStyle={styles.inputContainerStyle}
                    title={'Email'}
                    titleStyle={styles.inputTitleStyle}
                    textStyle={styles.inputTextStyle}
                    placeholder={'Enter your email'}
                    value={userData?.email || ''}
                    editable={false}
                />

                <Button
                    onPress={() => handleAction()}
                    text={"Save Changes"}
                    buttonStyle={styles.button}
                    textStyle={{ color: colors.black }}
                />

                {/* KEEP AT LAST. To Open bottom sheet for media picker option */}
                <CTActionSheet
                    isVisible={isPhotoPicker}
                    data={profilePicker}
                    onBackdropPress={setIsPhotoPicker}
                    onCancelPress={setIsPhotoPicker}
                />
            </View>
        </View>
    );
};

export default withNetworkCheck(EditProfile, true);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    line: {
        borderColor: colors.inputColor,
        borderWidth: 1,
    },
    profileAvatarStyle: {
        contentContainerStyle: {
            alignSelf: 'center',
            marginVertical: hp(2),
            borderWidth: 1,
            borderColor: colors.black,
            padding: 4,

        },
        editIconContainerStyle: {
            right: wp(2),
            borderWidth: 1,
            borderColor: colors.black
        }
    },
    inputTitleStyle: {
        color: colors.black,
        fontWeight: 'bold',
        fontFamily: fonts.RobotoBold,
    },
    inputViewStyle: {
        marginHorizontal: wp(4),
    },
    inputContainerStyle: {
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 6,
    },
    inputTextStyle: {
        color: colors.black,
    },
    button: {
        margin: hp(3),
        alignSelf: 'center',
        width: 130,
        paddingVertical: hp(1.5),
        backgroundColor: colors.themeColor,
    }
});
