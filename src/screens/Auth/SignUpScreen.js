/**
 * @description This file contains the SignUpScreen component, which allows users to sign up for the app.
 * It includes form validation, input fields for email and password, a checkbox for agreeing to terms and conditions,
 * and a button to submit the form. It also includes a header with a back button and an info icon.
 * @exports SignUpScreen
 */
import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import colors from "../../constants/colors"
import { hp, wp } from "../../Helper/ResponsiveSize";
import fonts from "../../constants/fonts";
import InputText from "../../component/common/InputText";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Button } from "../../component/common/Button";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { UserSignUp } from "../../services/authService";
import { CTCheckBox } from "../../component/common/CTCheckBox";
import showToast from "../../component/common/CTToast";
import { registerValidationSchema } from "../../constants/validationSchema";
import { useIsFocused } from "@react-navigation/native";
import { Header } from "../../component/common/Header";
import InfoCircle from '../../assets/svg/info-circle.svg';
import LoaderManager from "../../Helper/LoaderManager";

export const SignUpScreen = ({ navigation, route }) => {
    const [passVisible, setPassVisible] = useState(false);

    /**
     * Registers a new user with the provided email and password.
     * @async
     * @param {Object} values - An object containing the email and password of the user.
     * @param {string} values.email - The email of the user.
     * @param {string} values.password - The password of the user.
     * @returns {Promise<void>} - A Promise that resolves when the user is successfully signed up.
     */
    const register = async (values = {}) => {
        try {
            LoaderManager.startLoader();

            let params = {
                email: values.email,
                password: values.password
            }

            UserSignUp(params)
                .then(() => LoaderManager.startLoader())
                .catch(error => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            showToast('This email address is already in use! Please try another email address.');
                            break;

                        default:
                            showToast(error.message);
                            break;
                    }
                })
        } catch (err) {
            console.error(err)
        } finally {
            LoaderManager.stopLoader();
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}
            >
                <Header
                    isBackButton
                    isRight
                    rightComponent={
                        <InfoCircle />
                    }
                />

                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: wp(5),
                    }}
                    showsVerticalScrollIndicator={false}>

                    <Text style={[styles.title, {
                        marginTop: hp(3)
                    }]}>Sign Up</Text>
                    <Text style={[styles.subText, {
                        marginTop: hp(1.5)
                    }]}>Create account so we can enable you to get paid for</Text>

                    <Formik
                        key={'RegistrationForm'}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={registerValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            register(values);
                            if (checked) {
                                resetForm({ values: '' })
                            }
                        }}
                    >
                        {({
                            handleChange,
                            errors,
                            touched,
                            handleSubmit,
                            values,
                        }) => (
                            <>
                                <InputText
                                    InputViewStyle={{
                                        marginTop: hp(4)
                                    }}
                                    isTitle
                                    title={'Email'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    placeholder={'Enter your email'}
                                />
                                {errors?.email && touched?.email && (
                                    <View>
                                        <Text style={styles.errorText}>{errors?.email}</Text>
                                    </View>
                                )}

                                <InputText
                                    isTitle
                                    title={'Password'}
                                    secureTextEntry={!passVisible}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    isRightIcon
                                    onRightIconPress={() => setPassVisible(!passVisible)}
                                    rightIcon={
                                        <IonIcons
                                            name={passVisible ? "eye" : "eye-off"}
                                            size={24}
                                            color={colors.subText}
                                            style={{
                                                paddingRight: wp(4)
                                            }}
                                        />
                                    }
                                    placeholder={'Enter your password'}
                                />
                                {errors?.password && touched?.password && (
                                    <View>
                                        <Text style={styles.errorText}>{errors?.password}</Text>
                                    </View>
                                )}

                                <Button
                                    onPress={handleSubmit}
                                    text={'Sign up'}
                                    buttonStyle={{
                                        marginTop: hp(3),
                                        alignSelf: 'center',
                                        width: wp(85)
                                    }}
                                />
                            </>
                        )}
                    </Formik>

                    <Text style={[styles.bottomText, {
                        textAlign: 'center',
                        marginVertical: hp(2)
                    }]}>Already have an account?{" "}
                        <Text
                            onPress={() => {
                                global.fromTerms = true
                                navigation.navigate('SignIn')
                            }}
                            style={[styles.bottomText, {
                                fontFamily: fonts.GilroyMedium,
                                color: colors.primary
                            }]}>Sign In</Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: fonts.GilroySemiBold,
        fontSize: 28,
        color: colors.black
    },
    subText: {
        fontFamily: fonts.GilroyMedium,
        fontSize: 16,
        color: colors.subText2
    },
    bottomText: {
        fontFamily: fonts.GilroyRegular,
        fontSize: 16,
        color: colors.black
    },
    errorText: {
        fontFamily: fonts.GilroyMedium,
        fontSize: 12,
        color: colors.errorText
    }
})