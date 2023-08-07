import { View, Text, Image, StyleSheet } from "react-native";
import { hp, wp } from "../../../Helper/ResponsiveSize";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { navigationRef } from "../../../../App";
import { TextComponent } from "react-native";

export default Header = ({
    height = hp(8),
    opacity = 1,
    color = '#161616',
    text = null,
    backButtonOnPress = null,
}) => {
    if (!backButtonOnPress)
        backButtonOnPress = () => {
            if (navigationRef.current.canGoBack())
                return navigationRef.current?.goBack();
            return navigationRef.current.navigate('DashBoard');
        }

    return (
        <View
            style={{
                width: wp(100),
                height: height,
                backgroundColor: color,
                opacity: opacity,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity key={'_HeaderBackButtonComponent'} onPress={backButtonOnPress}>
                    <FontAwesome name="angle-left" size={30} color={'#FFF'} />
                </TouchableOpacity>
                <View style={{ marginLeft: wp(4), width: wp(80) }}>
                    <Text style={{ color: 'white', fontSize: 20, }}>{text}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(9),
        borderWidth: 4,
        borderColor: 'white'
    }
});