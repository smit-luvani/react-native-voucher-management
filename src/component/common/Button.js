import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../../constants/colors"
import fonts from "../../constants/fonts"
import { hp, wp } from "../../Helper/ResponsiveSize"
import React from "react"

export const Button = ({
    buttonStyle,
    text,
    textStyle,
    onPress,
    disabled,
    isLoading,
    leftIcon
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.buttonStyle, buttonStyle]}>
            {isLoading ? (
                <ActivityIndicator
                    size={20}
                    color={colors.white}
                />
            ) : (
                <View style={styles.textRow}>
                    {leftIcon && (
                        leftIcon
                    )}
                    <Text style={[styles.txtStyle, textStyle]}>{text}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: wp(80),
        height: hp(6),
        borderRadius: wp(2),
        backgroundColor: colors.darkBlack,
        alignItems: 'center'
    },
    txtStyle: {
        color: colors.white,
        fontFamily: fonts.GilroyMedium,
        fontSize: 16
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    }
})