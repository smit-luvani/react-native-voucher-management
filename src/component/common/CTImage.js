import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { wp } from '../../Helper/ResponsiveSize'

const CTImage = ({
    placeholderStyle,
    imgStyle,
    source,
    resizeMode,
    onImgPress
}) => {
    return (
        <TouchableOpacity
            onPress={onImgPress}
            style={[imgStyle, placeholderStyle]}>
            <FastImage
                source={source}
                style={[styles.imageStyle, imgStyle]}
                resizeMode={resizeMode || 'contain'}
            />
        </TouchableOpacity>
    )
}

export default CTImage

const styles = StyleSheet.create({
    imageStyle: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(12)
    }
})