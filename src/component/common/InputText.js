import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { hp, wp } from '../../Helper/ResponsiveSize';

const InputText = ({
  placeholder,
  secureTextEntry,
  value,
  placeholderTextColor,
  rightIcon,
  onChangeText,
  autoCorrect,
  containerStyle,
  textStyle,
  title,
  titleStyle,
  keyboardType,
  multiline,
  onSubmitEditing,
  underlineColorAndroid,
  RightIconStyle,
  onRightIconPress,
  InputViewStyle,
  editable,
  numberOfLines,
  autoCapitalize,
  onFocus,
  onBlur,
  returnKeyType,
  reference,
  onEndEditing,
  textContentType,
  blurOnSubmit,
  leftIcon,
  bottomsheet,
}) => {

  return (
    <View style={[styles.ViewStyle, InputViewStyle]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <View style={[styles.inputView, containerStyle]}>
        {leftIcon && (
          <TouchableOpacity activeOpacity={1} onPress={onRightIconPress}>
            {leftIcon}
          </TouchableOpacity>
        )}
        {bottomsheet ? (
          <BottomSheetTextInput
            ref={reference}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor || colors.subText}
            style={[styles.inputText, textStyle]}
            onChangeText={onChangeText}
            autoCorrect={autoCorrect}
            value={value}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            underlineColorAndroid={underlineColorAndroid}
            editable={editable}
            numberOfLines={numberOfLines}
            autoCapitalize={autoCapitalize}
            onFocus={onFocus}
            onBlur={onBlur}
            returnKeyType={returnKeyType}
            onEndEditing={onEndEditing}
            textContentType={textContentType}
            blurOnSubmit={blurOnSubmit}
          />
        ) : (
          <TextInput
            ref={reference}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor || colors.subText}
            style={[styles.inputText, textStyle]}
            onChangeText={onChangeText}
            autoCorrect={autoCorrect}
            value={value}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            underlineColorAndroid={underlineColorAndroid}
            editable={editable}
            numberOfLines={numberOfLines}
            autoCapitalize={autoCapitalize}
            onFocus={onFocus}
            onBlur={onBlur}
            returnKeyType={returnKeyType}
            onEndEditing={onEndEditing}
            textContentType={textContentType}
            blurOnSubmit={blurOnSubmit}
          />
        )}

        {rightIcon !== undefined && (
          <TouchableOpacity activeOpacity={1} onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    marginVertical: hp(0.6)
  },
  inputView: {
    height: hp(6),
    borderRadius: wp(3),
    paddingLeft: wp(3),
    // backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontFamily: fonts.GilroyMedium,
    fontSize: 16,
    color: colors.subText,
    flexGrow: 1,
  },
  title: {
    fontFamily: fonts.GilroyMedium,
    fontSize: 16,
    color: colors.black,
    paddingVertical: hp(1),
  },
});

export default InputText;
