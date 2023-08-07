import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { StyleSheet } from 'react-native';
import AnimatedToast from '../component/common/AnimatedToast';

// Higher-Order Component for checking network status and offline logic
function withNetworkCheck(WrappedComponent, onlyNetworkCheck) {
    return function NetworkCheckHOC(props) {
        const [isOnline, setIsOnline] = useState(true);

        useEffect(() => {
            const unsubscribe = NetInfo.addEventListener(handleNetworkChange);
            return () => {
                unsubscribe();
            };
        }, []);

        const handleNetworkChange = (state) => {
            setIsOnline(state.isConnected);
        };

        if (!isOnline && !onlyNetworkCheck) {
            return (
                <AnimatedToast value={20} />
            )
        }

        return <WrappedComponent isOnline={isOnline} {...props} />;
    };
}

export default withNetworkCheck;