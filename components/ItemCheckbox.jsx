import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import SvgIcon from './SvgIcon';

function ItemCheckbox({
	handlePress,
	checked,
	iconSize = 24, // Default size for the icon
	buttonStyle = {},
}) {
	const iconName = checked ? 'check-circle' : 'circle';
	const iconTheme = checked ? '#00FF00' : '#FF0000'; // Change color based on completion

	return (
		<Pressable
			style={[
				styles.checkboxBase,
				buttonStyle,
				checked ? activeButtonStyle : inactiveButtonStyle,
			]}
			onPress={handlePress}
		>
			<SvgIcon name={iconName} size={iconSize} iconTheme={iconTheme} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	checkboxBase: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	// hiddenCheckbox: {
	// 	position: 'absolute', // Hide the default checkbox
	// 	opacity: 0,
	// },
});

export default ItemCheckbox;
