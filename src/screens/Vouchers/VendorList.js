import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { hp, wp } from '../../Helper/ResponsiveSize';
import Vendors from '../../constants/Vendors.json'
import VendorCard from '../../component/vendor/VendorCard';

/**
 * Renders a list of vendors to choose from.
 * @param {Object} props - The component props.
 * @param {Function} props.selectCallback - The callback function to be called when a vendor is selected.
 * @returns {JSX.Element} - The rendered component.
 */
const VendorList = ({ selectCallback }) => {

    /**
     * Renders a single vendor card.
     * @param {Object} item - The vendor object.
     * @returns {JSX.Element} - The rendered vendor card.
     */
    const renderList = ({ item, index }) => {
        return (
            <VendorCard id={item.id} image={{ uri: item.image }} name={item.name} onPress={() => selectCallback(item)} />
        );
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    overflow: 'hidden',
                }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Vendors}
                    renderItem={renderList}
                    keyExtractor={(item, index) => item.id}
                    ItemSeparatorComponent={() => (<View style={{ marginVertical: hp(1) }} />)}
                    ListHeaderComponent={<Text style={styles.title}>Choose Vendor</Text>}
                />
            </View>
        </View>
    );
};

export default memo(VendorList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerImage: {
        height: hp(14),
        width: wp(100),
        aspectRatio: 1.91,
        zIndex: -1,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    secondaryImage: {
        width: wp(100),
        height: hp(48),
        zIndex: -1,
        resizeMode: 'cover',
    },
    title: {
        fontFamily: fonts.RobotoMedium,
        fontSize: 28,
        color: colors.black,
        textAlign: 'center',
        marginVertical: hp(2),
    },
    btn: {
        backgroundColor: colors.primary,
        alignSelf: 'center',
        paddingHorizontal: wp(6),
        paddingVertical: hp(1),
        borderRadius: wp(4),
        marginTop: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontFamily: fonts.GilroyMedium,
        fontSize: 16,
        color: colors.white,
    },
    centerView: {
        paddingHorizontal: wp(3),
        borderRadius: wp(6),
        borderColor: colors.primary,
        backgroundColor: colors.lightGreen,
        paddingVertical: hp(0.6),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centerText: {
        fontFamily: fonts.GilroySemiBold,
        fontSize: 14,
        color: colors.black,
    },
    profileView: {
        marginLeft: wp(4),
        borderRadius: wp(6),
        backgroundColor: colors.grey2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    profileImg: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(8),
    },
    nameTxt: {
        fontSize: 12,
        fontFamily: fonts.GilroySemiBold,
        color: colors.darkGrey2,
    },
    topCard: {
        backgroundColor: colors.darkGreen,
        paddingVertical: hp(1.8),
        borderRadius: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        marginTop: hp(3),
        marginHorizontal: wp(1.8),
    },
    bigText: {
        fontSize: 24,
        fontFamily: fonts.GilroyBold,
        color: colors.primary,
    },
    subText: {
        fontFamily: fonts.GilroyMedium,
        fontSize: 14,
        color: colors.white,
    },
    card2: {
        backgroundColor: colors.lightYellow,
        paddingVertical: hp(1.8),
        borderRadius: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        marginTop: hp(1.4),
        marginHorizontal: wp(1.8),
    },
    smallBox: {
        backgroundColor: colors.white,
        borderRadius: wp(1.5),
        paddingVertical: hp(1.3),
        width: wp(28),
        flexDirection: 'row',
        alignItems: 'center',
    },
    cornerView: {
        borderBottomStartRadius: wp(6),
        borderBottomEndRadius: wp(6),
        paddingBottom: hp(2.5),
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
        paddingHorizontal: wp(2),
    },
    bottomView: {
        marginTop: hp(2),
        paddingHorizontal: wp(4),
    },
    featuredCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.4),
        borderRadius: wp(2),
        paddingHorizontal: wp(2.5),
    },
    nameView: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.4),
        borderRadius: wp(2),
        backgroundColor: colors.lightGreen,
    },
    lightText: {
        fontFamily: fonts.GilroyRegular,
        fontSize: 14,
        color: colors.darkGrey2,
    },
    line: {
        borderColor: colors.inputColor,
        borderWidth: 1,
    },
});
