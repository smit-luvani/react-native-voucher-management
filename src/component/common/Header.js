import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { navigationRef } from "../../../App";
import BackArrow from '../../assets/svg/backArrow.svg'
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";
import { hp, wp } from "../../Helper/ResponsiveSize";

export const Header = ({
    isLeft,
    rightComponent,
    isRight,
    onRightPress,
    onLeftPress,
    isBackButton,
    isLeftPress,
    title,
    rowStyle,
    rightViewStyle
}) => {

    const goBack = () => {
        navigationRef.current.goBack();
    }

    return (
        <View style={[styles.row, rowStyle]}>
            {isBackButton && (
                <TouchableOpacity
                    onPress={isLeftPress ? isLeftPress : goBack}
                    style={{
                        zIndex: 1
                    }}>
                    <BackArrow />
                </TouchableOpacity>
            )}
            {title && (
                <Text style={styles.title}>{title}</Text>
            )}
            {isRight && (
                <TouchableOpacity
                    onPress={onRightPress}
                    style={[styles.rightView, rightViewStyle]}>
                    {rightComponent}
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2),
        paddingHorizontal: wp(5)
    },
    title: {
        fontFamily: fonts.GilroySemiBold,
        fontSize: 18,
        color: colors.black,
        position: 'absolute',
        width: wp(100),
        textAlign: 'center'
    },
    rightView: {
        position: 'absolute',
        right: wp(5),
    }
})