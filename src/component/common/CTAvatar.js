import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
} from "react-native"
import FastImage from "react-native-fast-image";
import { cameraIcon, editPencil, userPlaceholder } from "../../assets/images";
import colors from "../../constants/colors";
import { wp } from "../../Helper/ResponsiveSize";

export const CTAvatar = ({
    onPress,
    contentContainerStyle,
    size,
    style,
    borderWidth,
    imagePlaceholderSource,
    imagePlaceholderStyle,
    imageStyle,
    source,
    resizeMode,
    isLoader,
    loaderBorderVariation = 20,
    onPressEdit,
    editIconContainerStyle,
    editIconStyle,
    onPressDelete,
    deleteIconContainerStyle,
    deleteIconStyle
}) => {

    const [imagePlaceholder, setImagePlaceholder] = React.useState(imagePlaceholderSource || userPlaceholder);

    size = size == null || size == undefined ? wp(40) : size;
    borderWidth =
        borderWidth !== null || borderWidth !== undefined ? borderWidth : 2;

    contentContainerStyle = Array.isArray(contentContainerStyle)
        ? style?.contentContainerStyle
            ? (contentContainerStyle = [
                ...contentContainerStyle,
                style?.contentContainerStyle,
            ])
            : (contentContainerStyle = contentContainerStyle)
        : [style?.contentContainerStyle, contentContainerStyle];
    imagePlaceholderStyle = Array.isArray(imagePlaceholderStyle)
        ? style?.imagePlaceholderStyle
            ? (imagePlaceholderStyle = [
                ...imagePlaceholderStyle,
                style?.imagePlaceholderStyle,
            ])
            : (imagePlaceholderStyle = imagePlaceholderStyle)
        : [style?.imagePlaceholderStyle, imagePlaceholderStyle];
    imageStyle = Array.isArray(imageStyle)
        ? style?.imageStyle
            ? (imageStyle = [...imageStyle, style?.imageStyle])
            : (imageStyle = imageStyle)
        : [style?.imageStyle, imageStyle];
    editIconContainerStyle = Array.isArray(editIconContainerStyle)
        ? style?.editIconContainerStyle
            ? (editIconContainerStyle = [
                ...editIconContainerStyle,
                style?.editIconContainerStyle,
            ])
            : (editIconContainerStyle = editIconContainerStyle)
        : [style?.editIconContainerStyle, editIconContainerStyle];
    deleteIconContainerStyle = Array.isArray(deleteIconContainerStyle)
        ? style?.deleteIconContainerStyle
            ? (deleteIconContainerStyle = [
                ...deleteIconContainerStyle,
                style?.deleteIconContainerStyle,
            ])
            : (deleteIconContainerStyle = deleteIconContainerStyle)
        : [style?.deleteIconContainerStyle, deleteIconContainerStyle];
    deleteIconStyle = Array.isArray(deleteIconStyle)
        ? style?.deleteIconStyle
            ? (deleteIconStyle = [...deleteIconStyle, style?.deleteIconStyle])
            : (deleteIconStyle = deleteIconStyle)
        : [style?.deleteIconStyle, deleteIconStyle];
    editIconStyle = Array.isArray(editIconStyle)
        ? style?.editIconStyle
            ? (editIconStyle = [...editIconStyle, style?.editIconStyle])
            : (editIconStyle = editIconStyle)
        : [style?.editIconStyle, editIconStyle];

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[
                {
                    width: size,
                    height: size,
                    borderWidth: borderWidth,
                },
                styles.contentContainerStyle,
                ...contentContainerStyle,
            ]}>
            <ImageBackground
                source={imagePlaceholder || userPlaceholder}
                style={[styles.imagePlaceholderStyle, ...imagePlaceholderStyle]}
                resizeMode="contain">
                <FastImage
                    style={[styles.imageStyle, ...imageStyle]}
                    source={source}
                    resizeMode={resizeMode || 'contain'}
                    onLoad={() => {
                        setImagePlaceholder(null);
                    }}
                />
                {isLoader && (
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 10000,
                            left: 1,
                            top: 0,
                            backgroundColor: 'rgba(0,0,0,.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: size,
                            height: size,
                            borderRadius: size,
                        }}>
                        <ActivityIndicator size={'small'} color={colors.white} />
                    </View>
                )}
            </ImageBackground>
            {onPressEdit && (
                <TouchableOpacity
                    onPress={onPressEdit}
                    activeOpacity={1}
                    style={[styles.editIconContainerStyle, ...editIconContainerStyle]}>
                    <FastImage
                        source={cameraIcon}
                        style={[styles.editIconStyle, ...editIconStyle]}
                        tintColor={colors.black}
                    />
                </TouchableOpacity>
            )}
            {/* {onPressDelete && (
                <TouchableOpacity
                    onPress={onPressDelete}
                    activeOpacity={1}
                    style={[
                        styles.deleteIconContainerStyle,
                        ...deleteIconContainerStyle,
                    ]}>
                    <FastImage
                        source={deleteIcon}
                        tintColor={colors.white}
                        style={[styles.deleteIconStyle, ...deleteIconStyle]}
                    />
                </TouchableOpacity>
            )} */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        borderRadius: 1000,
    },
    imagePlaceholderStyle: {
        flex: 1,
    },
    imageStyle: { flex: 1, borderRadius: 1000 },
    editIconContainerStyle: {
        position: 'absolute',
        width: wp(8),
        height: wp(8),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(8),
        bottom: 0,
        right: wp(5),
    },
    deleteIconContainerStyle: {
        position: 'absolute',
        width: wp(8),
        height: wp(8),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(8),
        bottom: 5,
        left: 0,
    },
    deleteIconStyle: {
        width: wp(4),
        height: wp(4),
    },
    editIconStyle: {
        width: wp(4),
        height: wp(4),
    },
})