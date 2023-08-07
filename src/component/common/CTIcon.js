import React from 'react';

import { TouchableOpacity, ViewPropTypes } from 'react-native';

import FastImage from 'react-native-fast-image';

export const CTIcon = ({
    source,
    iconContainerStyle,
    iconStyle,
    noEffect,
    noTintColor,
    onPress,
    style,
    disabled,
}) => {
    iconStyle = Array.isArray(iconStyle)
        ? style?.iconStyle
            ? (iconStyle = [...iconStyle, style?.iconStyle])
            : (iconStyle = iconStyle)
        : style?.iconStyle
            ? [style?.iconStyle, iconStyle]
            : [iconStyle];

    iconContainerStyle = Array.isArray(iconContainerStyle)
        ? style?.iconContainerStyle
            ? (iconContainerStyle = [
                ...iconContainerStyle,
                style?.iconContainerStyle,
            ])
            : (iconContainerStyle = iconContainerStyle)
        : style?.iconContainerStyle
            ? [style?.iconContainerStyle, iconContainerStyle]
            : [iconContainerStyle];

    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={noEffect}
            style={[...iconContainerStyle]}
            onPress={onPress}>
            <FastImage
                source={source}
                style={[
                    {
                        width: 16,
                        height: 16,
                    },
                    ...iconStyle,
                ]}
                resizeMode={iconStyle[0]?.resizeMode || 'contain'}
                tintColor={iconStyle[0]?.tintColor}
            />
        </TouchableOpacity>
    );
};
