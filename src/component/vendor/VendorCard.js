import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { hp, wp } from "../../Helper/ResponsiveSize";
import { memo } from "react";
import fonts from "../../constants/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";

const VendorCard = ({
    name,
    image,
    onPress
}) => {

    return (
        <TouchableOpacity
            style={{
                marginHorizontal: wp(3),
                height: hp(25),
                backgroundColor: 'black',
                borderRadius: 8,
            }}
            onPress={onPress}
        >
            <ImageBackground source={image} style={styles.backgroundImage} imageStyle={{ opacity: 0.4, borderRadius: 8 }}>
                <Text style={styles.title}>{name}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export default memo(VendorCard);

const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%',
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
        fontFamily: fonts.Roboto
    }
});