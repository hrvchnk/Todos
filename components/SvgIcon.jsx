import { Sizes } from '@/constants/Sizes';
// import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const iconSizes = Sizes.iconSizes;

const SvgIcon = ({ name, size, color }) => {
	const iconSize = iconSizes[size];

	return (
		<View style={[styles.container, { width: iconSize, height: iconSize }]}>
			<Octicons name={name} size={iconSize} color={color} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'green',
	},
});

export default SvgIcon;
