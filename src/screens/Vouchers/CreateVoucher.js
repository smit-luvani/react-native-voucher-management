import React, { useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { hp, wp } from '../../Helper/ResponsiveSize';
import withNetworkCheck from '../../hoc/withNetworkCheck';
import AnimatedToast from '../../component/common/AnimatedToast';
import IonIcons from 'react-native-vector-icons/Ionicons';
import showToast from '../../component/common/CTToast';
import { Button } from '../../component/common/Button';
import Header from '../../component/common/headers/TransparentHeader';
import CardFront from '../../component/voucher/CardFront';
import InputText from '../../component/common/InputText';
import CardBack from '../../component/voucher/CardBack';
import { createVoucher } from '../../services/voucherService';

/**
 * Renders the screen for creating a voucher.
 * @param {Object} navigation - The navigation object provided by React Navigation.
 * @param {boolean} isOnline - A boolean indicating whether the device is currently online.
 * @param {Object} route - The route object provided by React Navigation.
 * @returns {JSX.Element} - A JSX element representing the CreateVoucher screen.
 */
const CreateVoucher = ({ navigation, isOnline, route }) => {
    const params = route.params;

    const [voucherAmount, setVoucherAmount] = useState(0);
    const [showFront, setFrontVisible] = useState(true);

    /**
     * Renders the card component for the voucher.
     * @returns {JSX.Element} - A JSX element representing the card component.
     */
    const CardComponent = () => {
        return (<View>
            <View style={[styles.flipCard, { display: !showFront ? 'none' : 'block' }]}>
                <CardFront price={voucherAmount} currency='eur' backgroundImage={{ uri: params.image }} title={params.name} />
            </View>
            <View style={[styles.flipCard, { display: showFront ? 'none' : 'block' }]}>
                <CardBack backgroundImage={{ uri: params.image }} vendorID={params.id} vendorName={params.name} />
            </View>
        </View>)
    };

    return (
        <View style={styles.container}>
            {!isOnline && <AnimatedToast value={20} type="bottom" />}
            <Header color='black' />
            <CardComponent />
            <View style={{ marginHorizontal: wp(3) }}>
                <IonIcons name={'card-outline'} size={50} color={'black'} onPress={() => setFrontVisible(!showFront)} />
            </View>
            <View style={{ marginHorizontal: wp(3) }}>
                <InputText
                    title={'Voucher Amount'}
                    placeholder={'Enter Voucher Amount'}
                    keyboardType={'number-pad'}
                    containerStyle={{ borderColor: 'black', borderWidth: 1 }}
                    onChangeText={text => {
                        if (!text) return setVoucherAmount(0);
                        if (isNaN(Number(text))) return;
                        text = Number(text);

                        if (text < 0.01 || text > 250) return showToast('Voucher amount must be between 0.01 and 250');
                        if (text.toString().includes('.')) text = text.toFixed(2);
                        setVoucherAmount(text)
                    }}
                />
                <Button
                    text={'Purchase Voucher'}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonTextStyle}
                    onPress={() => {
                        if (voucherAmount < 0.01 || voucherAmount > 250) return showToast('Voucher amount must be between 0.01 and 250');
                        if (voucherAmount.toString().includes('.')) voucherAmount = voucherAmount.toFixed(2);
                        return createVoucher({
                            vendor: params.id,
                            amount: voucherAmount,
                            current_amount: voucherAmount,
                        }).then((res) => {
                            navigation.navigate('DashBoard', {})
                        }).catch(e => console.error(120, e))

                    }}
                />
            </View>
        </View>
    );
};

export default withNetworkCheck(CreateVoucher, true);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    btnText: {
        fontFamily: fonts.GilroyMedium,
        fontSize: 16,
        color: colors.white,
    },
    flipCard: {
        marginTop: 10,
        marginHorizontal: wp(3),
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        position: 'absolute',
        top: 0,
        borderColor: 'blue',
        borderWidth: 1,
    },
    button: {
        backgroundColor: colors.primary,
        width: wp(94),
        height: hp(6),
        borderWidth: 1,
        borderColor: colors.primary,
    },
    buttonTextStyle: {
        color: colors.white,
        fontFamily: fonts.GilroyMedium,
        fontSize: 16,
    }
});
