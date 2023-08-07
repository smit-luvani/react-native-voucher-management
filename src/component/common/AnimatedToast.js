import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const AnimatedToast = ({ value, type }) => {
    const positionY = useSharedValue(-100);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(positionY?.value) }],
        };
    });

    positionY.value = value

    return (
        <Animated.View
            style={[
                styles.commonToastStyle,
                type === 'bottom' ? styles.bottomToastStyle : styles.topToastStyle, ,
                animatedStyle,
            ]}
        >
            <Text style={styles.modalText}>Oops! Looks like your device is not connected to the Internet.</Text>
        </Animated.View>
    )
}

export default AnimatedToast

const styles = StyleSheet.create({
    commonToastStyle: {
        height: 72,
        borderRadius: 8,
        margin: 8,
        padding: 16,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 100,
    },
    topToastStyle: {
        backgroundColor: colors.red,
        top: 0,
    },
    bottomToastStyle: {
        backgroundColor: colors.red,
        bottom: 20,
    },
    modalText: {
        fontSize: 16,
        fontFamily: fonts.GilroyMedium,
        color: colors.white,
        textAlign: 'center',
    },
})