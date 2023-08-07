/**
 * @description This file contains the Setting screen component.
 * @requires react, react-native, react-redux, @react-navigation/native, mmkv, withNetworkCheck, ../../component/common/AnimatedToast, react-native-vector-icons/Ionicons, ../../component/common/Button, ../../component/common/headers/TransparentHeader, ../../services/authService
 * @exports Setting
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { hp, wp } from '../../Helper/ResponsiveSize';
import { mmkv } from '../../Helper/MMKVManager';
import withNetworkCheck from '../../hoc/withNetworkCheck';
import AnimatedToast from '../../component/common/AnimatedToast';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../component/common/Button';
import Header from '../../component/common/headers/TransparentHeader';
import { UserLogout } from '../../services/authService';

/**
 * Setting screen component.
 * @param {object} props - Component props.
 * @param {object} props.navigation - Navigation object.
 * @param {boolean} props.isOnline - Flag indicating if the device is online.
 * @returns {JSX.Element} - Rendered component.
 */
const Setting = ({ navigation, isOnline }) => {
    return (
        <View style={styles.container}>
            {!isOnline && <AnimatedToast value={20} type="bottom" />}
            <View
                style={{
                    overflow: 'hidden'
                }}>
                <Header color={colors.darkBlack} text={"Setting"} />

                <Text style={styles.title}>Account</Text>
                <Button
                    onPress={() => navigation.navigate("EditProfile")}
                    text={"Edit Profile"}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    leftIcon={<IonIcons
                        name={'person'}
                        size={24}
                        color={colors.themeColor}
                        style={styles.buttonLeftIcon}
                    />}
                />

                <Button
                    onPress={() => {
                        mmkv.cleanStorage();
                        UserLogout()
                    }}
                    text={"Logout"}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    leftIcon={<IonIcons
                        name={'log-out-outline'}
                        size={24}
                        color={colors.themeColor}
                        style={styles.buttonLeftIcon}
                    />}
                />
            </View>
        </View>
    );
};

export default withNetworkCheck(Setting, true);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    title: {
        fontFamily: fonts.GilroySemiBold,
        fontSize: 18,
        color: colors.black,
        textAlign: 'left',
        marginLeft: wp(6),
        marginTop: hp(3),
        marginBottom: hp(1),
    },
    line: {
        borderColor: colors.inputColor,
        borderWidth: 1,
    },
    button: {
        marginVertical: hp(0.5),
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: wp(90),
        paddingVertical: hp(1.5),
        backgroundColor: colors.darkBlack
    },
    buttonText: {
        marginStart: wp(4),
    },
    buttonLeftIcon: {
        backgroundColor: colors.darkBlack,
        marginLeft: wp(4),
        color: colors.white,
    }
});
