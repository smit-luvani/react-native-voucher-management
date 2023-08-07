import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "../screens/Auth/Welcome";
import { SignUpScreen } from "../screens/Auth/SignUpScreen";
import { SignInScreen } from "../screens/Auth/SignInScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: colors.black }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
            </Stack.Navigator>
        </SafeAreaView>
    )
}

export default AuthStack;