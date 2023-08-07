import React, { useMemo, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Animated,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../constants/colors';
import { hp, wp } from '../../Helper/ResponsiveSize';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

export default function CTBottomSheet({
    children,
    bottomSheetRef,
    snapPoints,
    handleStyle
}) {

    return (
        <BottomSheetModal
            backdropComponent={props => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                />
            )}
            keyboardBlurBehavior={'restore'}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            handleStyle={handleStyle || {}}
        >
            <BottomSheetScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingHorizontal: wp(4) }}>
                    {children}
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        overflow: 'hidden',
        borderRadius: wp(6),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        backgroundColor: colors.white,
    },
    container: {
        margin: 0,
    },
});
