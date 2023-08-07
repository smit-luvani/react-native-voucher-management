import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import { CTIcon } from './CTIcon';
import IonIcons from 'react-native-vector-icons/Ionicons'
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { hp, wp } from '../../Helper/ResponsiveSize';

export default function CTActionSheet({
    isVisible,
    data,
    itemContainerStyle,
    itemStyle,
    itemTextStyle,
    cancelStyle,
    onCancelPress,
    onBackdropPress,
    containerStyle,
    selectedOption,
    children
}) {
    return (
        <Modal
            isVisible={isVisible}
            style={{ margin: 0, justifyContent: 'flex-end' }}
            useNativeDriver
            swipeDirection={['down']}
            onBackdropPress={() => onBackdropPress(false)}
            onBackButtonPress={() => onBackdropPress(false)}>
            <View style={[styles.container, containerStyle]}>
                <View style={{ flex: 1 }} />
                {onCancelPress && (
                    <>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity
                            onPress={() => onCancelPress(false)}
                            style={[styles.cancelContainer, cancelStyle]}>
                            <IonIcons
                                name='close-outline'
                                size={24}
                                color={colors.black}
                            />
                        </TouchableOpacity>
                    </>
                )}
                <View style={[styles.itemContainer, itemContainerStyle]}>
                    {data ?
                        data.map((item, index) => (
                            <View key={String(index)}>
                                <TouchableOpacity
                                    style={[
                                        styles.item,
                                        ,
                                        { marginBottom: index === data.length - 1 ? 0 : hp(2.5) },
                                        itemStyle,
                                    ]}
                                    onPress={item.onPress}>
                                    <CTIcon
                                        disabled={true}
                                        source={item.icon}
                                        iconStyle={{
                                            width: wp(5),
                                            height: wp(5),
                                            tintColor: colors.black,
                                        }}
                                    />
                                    <Text
                                        style={[
                                            {
                                                marginLeft: wp(4),
                                                fontSize: 14,
                                                fontFamily: fonts.GilroyMedium,
                                                color: colors.black,
                                            },
                                            { ...itemTextStyle },
                                        ]}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )) : children
                    }
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        overflow: 'hidden',
        borderRadius: wp(5),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingHorizontal: wp(8),
        paddingVertical: hp(5),
        backgroundColor: colors.white,
    },
    item: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flexDirection: 'row',
    },
    horizontalLine: {
        borderTopColor: '#efefef',
        borderTopWidth: 0.5,
    },
    cancleText: {
        color: 'red',
    },
    cancelContainer: {
        height: wp(10),
        width: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: hp(2.5),
        borderRadius: wp(10),
        alignSelf: 'center',
    },
    container: {
        margin: 0,
    },
    title: {
        paddingVertical: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
