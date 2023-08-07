import { memo } from "react";
import { hp, wp } from "../../Helper/ResponsiveSize";
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";
const { StyleSheet, View, ImageBackground, Text } = require("react-native");

const CardFront = ({
    title = 'Title',
    price = 0,
    currency = 'eur',
    backgroundImage = { uri: 'https://picsum.photos/id/21/3008/2008' },
}) => {

    if (currency === 'eur') price = price + '€';
    else if (currency === 'usd') price = '$' + price;
    else if (currency === 'gbp') price = '£' + price;
    else if (currency === 'inr') price = '₹' + price;

    return (<View style={styles.card}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>

            <View style={{ width: '100%', maxHeight: 210 }} >
                <Text style={styles.title}>{title}</Text>
            </View>
        </ImageBackground >
        {/* <View style={{
            backgroundColor: '#D8D9DA',
            width: '102%', left: -2, height: 30, position: 'absolute', top: 190, zIndex: 1,
        }} >
            <Text style={{ textAlign: 'right', height: '100%', right: 10, textAlignVertical: 'center' }}>{title}</Text>
        </View>
        <View style={{ backgroundColor: '#D8D9DA', width: 30, height: '100%', position: 'absolute', opacity: 1, left: 55, zIndex: 0 }} >
        </View> */}
        <View style={{ justifyContent: 'flex-end', right: 15, bottom: 15, position: 'absolute' }} >
            <Text style={styles.price}>{price}</Text>
        </View>
    </View >)
};

export default memo(CardFront);

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.black,
        borderRadius: 10,
        overflow: 'hidden',
        height: 258,

        // Shadow
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 10,
    },
    backgroundImage: {
        height: 260,
    },
    backgroundImageStyle: {
        resizeMode: 'stretch',
        opacity: 0.4,
    },
    title: {
        color: colors.white,
        fontSize: 35,
        left: 10,
        fontFamily: 'YsabeauInfant-SemiBold',
    },
    subtitle: {
        color: colors.white,
        fontSize: 18,
        left: 13,
    },
    price: {
        color: colors.white,
        fontSize: 50,
        textAlign: 'right',
        fontFamily: 'YsabeauInfant-Regular'
    },
});