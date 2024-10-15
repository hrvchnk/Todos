import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import SvgIcon from './SvgIcon';
// const colorScheme = useColorScheme();
const ButtonIcon = ({ iconName, iconSize, iconTheme, iconColor, onPress }) => {
	const colorScheme = useColorScheme();
	const buttonTheme = [styles.button, styles[`${colorScheme}_button`]];

	return (
		<TouchableOpacity onPress={onPress} style={buttonTheme}>
			<SvgIcon
				name={iconName}
				size={iconSize}
				theme={iconTheme}
				color={iconColor}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	light_button: {
		// flex: 1,
		// flexDirection: 'row',
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginLeft: 20,
	},
	dark_button: {
		// flexDirection: 'row',
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginLeft: 20,
	},
});

export default ButtonIcon;
