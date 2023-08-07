import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import colors from "../../constants/colors"
import { hp, wp } from "../../Helper/ResponsiveSize";
import fonts from "../../constants/fonts";
import InputText from "../../component/common/InputText";
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Button } from "../../component/common/Button";
import { Formik } from "formik";
import { loginValidationSchema } from "../../constants/validationSchema";
import { UserLogin, loginUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import showToast from "../../component/common/CTToast";
import { Header } from "../../component/common/Header";
import InfoCircle from '../../assets/svg/info-circle.svg';
import LoaderManager from "../../Helper/LoaderManager";

/**
 * Sign in screen component.
 * @param {object} navigation - Navigation object.
 * @returns {JSX.Element} - Sign in screen JSX element.
 */
export const SignInScreen = ({ navigation }) => {

    const [passVisible, setPassVisible] = useState(false);
    const dispatch = useDispatch();

    /**
     * Login function.
     * @param {object} values - Login form values.
     * @param {string} values.email - User email.
     * @param {string} values.password - User password.
     * @returns {void}
     */
    const login = async (values) => {
        try {
            LoaderManager.startLoader();

            let params = {
                email: values.email,
                password: values.password
            }

            UserLogin(params)
                .then((res) => { })
                .catch((err) => {
                    console.error(err)
                    showToast(err?.message || 'Something went wrong')
                })
        } catch (err) {
            console.error(err)
        } finally {
            LoaderManager.stopLoader();
        }
    }

    return (
        <View style={styles.container}>
            <Header
                isBackButton
                isRight
                rightComponent={
                    <InfoCircle />
                }
            />

            <View style={{
                paddingHorizontal: wp(5),
            }}>
                <Text style={[styles.title, {
                    marginTop: hp(3)
                }]}>Sign In</Text>
                <Text style={[styles.subText, {
                    marginTop: hp(1.5)
                }]}>Use your email and password to login</Text>

                <Formik
                    // enableReinitialize
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                        login(values);
                        resetForm({ values: '' })
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
                                placeholder={'Enter your email'}
                                value={values?.email}
                                onChangeText={handleChange('email')}
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
                                value={values?.password}
                                onChangeText={handleChange('password')}
                            />
                            {errors?.password && touched?.password && (
                                <View>
                                    <Text style={styles.errorText}>{errors?.password}</Text>
                                </View>
                            )}

                            <Button
                                onPress={handleSubmit}
                                text={'Sign In'}
                                buttonStyle={{
                                    marginTop: hp(3),
                                    alignSelf: 'center',
                                    width: wp(85)
                                }}
                            />
                        </>
                    )}
                </Formik>
            </View>

            <Text style={[styles.bottomText, {
                alignSelf: 'center',
                marginTop: hp(2),
                position: 'absolute',
                bottom: hp(5)
            }]}>Don’t have an account?{" "}
                <Text
                    onPress={() => {
                        navigation.navigate('SignUp')
                    }}
                    style={[styles.bottomText, {
                        fontFamily: fonts.GilroyMedium,
                        color: colors.primary
                    }]}>Sign Up</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
        fontSize: 18,
        color: colors.black
    },
    errorText: {
        fontFamily: fonts.GilroyMedium,
        fontSize: 12,
        color: colors.errorText
    }
})