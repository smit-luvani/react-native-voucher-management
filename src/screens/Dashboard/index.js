/**
 * @description This file contains the Dashboard screen component.
 * @exports DashBoard
 */

import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import { hp, wp } from '../../Helper/ResponsiveSize';
import { useIsFocused } from '@react-navigation/native';
import { userPlaceholder } from '../../assets/images';
import withNetworkCheck from '../../hoc/withNetworkCheck';
import AnimatedToast from '../../component/common/AnimatedToast';
import moment from 'moment';
import * as Types from '../../store/types';
import { CTAvatar } from '../../component/common/CTAvatar';
import firebaseAuth from '@react-native-firebase/auth';
import { getVouchers } from '../../services/voucherService';
import VendorsData from '../../constants/Vendors.json';
import CardFront from '../../component/voucher/CardFront';

/**
 * Dashboard screen component.
 * @param {object} navigation - The navigation object provided by @react-navigation/native.
 * @param {boolean} isOnline - A boolean value indicating whether the device is online or not.
 * @returns {JSX.Element} - A JSX.Element representing the Dashboard screen.
 */
const DashBoard = ({ navigation, isOnline }) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.userReducer.user);
    const AllVouchers = useSelector((state) => state.voucherReducer.purchase_voucher);
    const [userImage, setUserImage] = useState(userPlaceholder);

    useEffect(() => {
        dispatch({ type: Types.SET_USER, payload: firebaseAuth().currentUser })
    }, []);

    useEffect(() => {
        getVouchers().then((res) => {
            dispatch({ type: Types.SET_PURCHASE_VOUCHERS, payload: res })
        })
    }, [isFocused]);

    useEffect(() => {
        if (currentUser?.photoURL) {
            setUserImage({ url: currentUser?.photoURL })
        }
    }, [currentUser]);

    /**
     * Renders a single voucher item in the FlatList.
     * @param {object} item - The voucher item to render.
     * @param {number} index - The index of the voucher item in the FlatList.
     * @returns {JSX.Element} - A JSX.Element representing the voucher item.
     */
    const renderList = ({ item, index }) => {
        const findVendor = VendorsData.find((vendor) => vendor.id === item.vendor);
        return (
            <TouchableOpacity style={styles.listItem}>
                <CardFront currency='eur' price={item.amount} title={findVendor?.name} backgroundImage={{ uri: findVendor?.image }} />
            </TouchableOpacity>
        );
    };

    /**
     * Renders the user profile component.
     * @returns {JSX.Element} - A JSX.Element representing the user profile component.
     */
    const ProfileComponent = () => {

        return (<View style={styles.ProfileComponent}>
            <CTAvatar
                size={wp(40)}
                source={userImage}
                resizeMode="cover"
                style={styles.profileAvatarStyle}
            />
            <Text style={{ marginVertical: hp(0.5) }}>{currentUser?.displayName || 'User'}</Text>
            <Text style={{ marginVertical: hp(0.5) }}>Joined since {moment(new Date(currentUser?.metadata.creationTime)).format('DD/MM/YYYY')}</Text>
        </View>)
    };

    return (
        <View style={styles.container}>
            {!isOnline && <AnimatedToast value={20} type="bottom" />}
            <View
                style={{
                    overflow: 'hidden',
                }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={AllVouchers}
                    renderItem={renderList}
                    keyExtractor={(item, index) => item.id}
                    contentContainerStyle={styles.flatListContainerStyle}
                    ListHeaderComponent={
                        <>
                            <ProfileComponent />
                        </>
                    }
                />
            </View>
        </View>
    );
};

export default withNetworkCheck(DashBoard, true);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    line: {
        borderColor: colors.inputColor,
        borderWidth: 1,
    },
    listItem: {
        width: wp(90),
        marginHorizontal: wp(3),
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: hp(1)
    },
    ProfileComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(2)
    },
    flatListContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
