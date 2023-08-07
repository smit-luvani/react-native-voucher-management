import { StyleSheet, TouchableOpacity, View } from "react-native"
import colors from "../../constants/colors"
import { hp, wp } from "../../Helper/ResponsiveSize"
import IonIcons from 'react-native-vector-icons/Ionicons';

export const CTCheckBox = ({
    checked,
    onChange
}) => {
    return (
        <TouchableOpacity
            onPress={onChange}
            style={[styles.checkBox, {
                backgroundColor: checked ? colors.primary : colors.inputColor
            }]}
        >
            {checked && (
                <IonIcons
                    name="checkmark-outline"
                    size={22}
                    color={colors.white}
                />
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkBox: {
        width: wp(6),
        height: hp(3),
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: 'center'
    }
})