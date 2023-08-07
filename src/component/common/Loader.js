import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';

const Loader = (props, ref) => {
    const [loading, setLoading] = useState(0);

    useImperativeHandle(ref, () => ({
        start: () => {
            const loadingCount = loading + 1;
            setLoading(loadingCount);
        },
        stop: () => {
            const loadingCount = loading > 0 ? loading - 1 : 0;
            setLoading(loadingCount);
        },
        isLoading: () => loading >= 1,
    }));

    if (!loading) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={28} color={colors.themeColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000020',
        zIndex: 999,
        elevation: 999,
    },
});

export default forwardRef(Loader);
