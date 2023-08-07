import { StackActions } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View } from "react-native"
import { useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';

export const SplashAction = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        checkUser();
    }, [])

    const checkUser = async () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.dispatch(StackActions.replace('AppStack'));
            } else {
                navigation.dispatch(StackActions.replace('AuthStack'));
            }
        });
    }

    return (
        <View>
        </View>
    )
}