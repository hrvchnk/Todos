import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Gradient = ({ colors, style, isBackground, children }) => {
	return (
		<View style={style}>
			<LinearGradient
				colors={colors}
				style={
					isBackground
						? styles.gradientBackground
						: styles.gradientTextContainer
				}
			>
				{children}
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	gradientBackground: {
		flex: 1,
		borderRadius: 10,
	},
	gradientTextContainer: {
		backgroundColor: 'transparent',
		borderRadius: 10,
		padding: 10,
	},
});

export default Gradient;
