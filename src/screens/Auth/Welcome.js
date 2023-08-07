/**
 * A screen component that displays a welcome message and buttons to navigate to the sign in and sign up screens.
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} - A React component that displays the welcome screen.
 */
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "../../component/common/Button";
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";
import { hp, wp } from "../../Helper/ResponsiveSize";
import Welcome from '../../assets/svg/welcome2.svg';
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <View style={styles.imgStyle}>
                <Welcome />
            </View>

            <Text style={[styles.title, {
                color: colors.black
            }]}>KeepLocal{" "}
            </Text>

            <ScrollView
                contentContainerStyle={{
                }}
                showsVerticalScrollIndicator={true}>
                <View style={{
                    paddingHorizontal: wp(2),
                    margin: hp(5),
                }}>

                    <Button
                        text={"Sign In"}
                        onPress={() => navigation.navigate('SignIn')}
                        buttonStyle={styles.buttonStyle}
                    />
                    <Button
                        text={"Create Account"}
                        onPress={() => navigation.navigate('SignUp')}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
            </ScrollView>
        </View >
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center'
    },
    imgStyle: {
        marginTop: hp(8),
        borderRadius: 200,
        overflow: 'hidden',
    },
    title: {
        fontFamily: fonts.GilroyBold,
        fontSize: 32
    },
    buttonStyle: {
        marginVertical: hp(1)
    }
})