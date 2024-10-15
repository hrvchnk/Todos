import { Colors } from '@/constants/Colors'; // Assuming this is the path to your Colors object
import { Sizes } from '@/constants/Sizes';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useColorScheme } from 'react-native';
import SvgIcon from './SvgIcon';

const iconSizes = Sizes.iconSizes;

export default function GradientIcon({ name, size, color }) {
	const colorScheme = useColorScheme();

	const gradientColors = Colors.gradients[colorScheme][color];
	const iconSize = iconSizes[size];
	console.log(iconSize);
	return (
		<MaskedView
			style={{ width: iconSize, height: iconSize }}
			maskElement={<SvgIcon name={name} size={size} color={color} />}
		>
			<LinearGradient
				colors={gradientColors}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{ flex: 1 }}
			/>
		</MaskedView>
	);
}
