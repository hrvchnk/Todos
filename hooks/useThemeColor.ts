import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

// Define a type for the color properties.
type ThemeColors = {
	light?: string;
	dark?: string;
};

// Define the function that uses theme colors.
export function useThemeColor(
	props: ThemeColors,
	colorName: keyof typeof Colors.light // Ensure the colorName is a valid key for Colors.light
) {
	const theme = useColorScheme() ?? 'light'; // Get the current theme
	const colorFromProps = props[theme]; // Get color from props based on the theme

	if (colorFromProps) {
		return colorFromProps; // Return the color if it exists in props
	} else {
		return Colors[theme][colorName]; // Return the color from the Colors object based on the theme
	}
}
