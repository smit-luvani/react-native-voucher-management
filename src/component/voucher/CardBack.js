import { memo } from "react";
import { hp, wp } from "../../Helper/ResponsiveSize";
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";
const { StyleSheet, View, ImageBackground, Text } = require("react-native");
import Barcode from "react-native-barcode-builder";

const CardBack = ({
    barcodeNumber = 'XXXXXXXXXX',
    vendorName,
    vendorID = '',
    backgroundImage,
}) => {

    return (<View style={styles.card}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
            <View>
                <Text style={styles.text}>{vendorName} <Text style={{ fontSize: 12 }}>({vendorID})</Text></Text>
                <Text style={styles.text}>Redeem Code: {barcodeNumber}</Text>
                <Text style={styles.text}>Validity: DD/MM/YYYY</Text>
            </View>
        </ImageBackground>
        <View style={{ backgroundColor: '#90a955', justifyContent: 'flex-end', position: 'absolute', bottom: 0, width: '100%' }}>
            <View style={{ justifyContent: 'center' }}>
                <Barcode value={barcodeNumber} text={barcodeNumber} format="CODE128" height={30} />
            </View>
            <Text style={{ color: '#ecf39e', textAlign: 'center', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 }}>Powered by KeepLocal.de</Text>
        </View>
    </View>)
};

export default CardBack;

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.black,
        borderRadius: 5,
        overflow: 'hidden',
        height: 258,

        // Shadow
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 8,
    },
    backgroundImage: {
        height: 260
    },
    backgroundImageStyle: {
        resizeMode: 'stretch',
        opacity: 0.4,
    },
    title: {
        color: colors.white,
        fontSize: 35,
        left: 10,
        fontFamily: fonts.YsabeauInfantRegular,
    },
    text: {
        color: colors.white,
        fontSize: 14,
        left: 13,
        fontFamily: fonts.YsabeauInfantRegular,
    },
});