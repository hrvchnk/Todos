import { Colors } from '@/constants/Colors';
import ThemeContext from '@/context/ThemeContext'; // Імплементуйте ThemeContext
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useContext, useEffect, useState } from 'react';
import {
	Appearance,
	StyleSheet,
	Switch,
	Text,
	useColorScheme,
	View,
} from 'react-native';

const ColorSchemeSwitch = () => {
	const { theme, toggleTheme, useSystemTheme } = useContext(ThemeContext);
	const [isSystemThemeEnabled, setIsSystemThemeEnabled] = useState(
		theme === 'system'
	);
	const colorScheme = useColorScheme();
	const [isEnabled, setIsEnabled] = useState(colorScheme === 'light');
	const [icon, setIcon] = useState(colorScheme === 'dark' ? '☼' : '☾');
	useEffect(() => {
		setIsEnabled(colorScheme === 'light');
		setIcon(colorScheme === 'dark' ? '☼' : '☾');
	}, [colorScheme]);

	const toggleColorScheme = newColorScheme => {
		Appearance.setColorScheme(newColorScheme);
	};

	const toggleSwitch = () => {
		const newColorScheme = !isEnabled ? 'light' : 'dark';
		setIcon(newColorScheme === 'light' ? '☾' : '☼');
		toggleColorScheme(newColorScheme);
		setIsEnabled(prevState => !prevState);
	};
	const toggleSystemThemeSwitch = () => {
		const newSystemThemeEnabled = !isSystemThemeEnabled;
		setIsSystemThemeEnabled(newSystemThemeEnabled);
		if (newSystemThemeEnabled) {
			useSystemTheme();
		} else {
			toggleTheme(theme); // Reapply the saved theme
		}
	};
	const themeTextStyle = useThemeColor(
		{
			light: Colors.light.textPrimary,
			dark: Colors.dark.textPrimary,
		},
		'text'
	);

	return (
		<View style={styles.switchStyles}>
			<View style={styles.row}>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={toggleSwitch}
					value={isEnabled}
					disabled={isSystemThemeEnabled}
				/>
				<Text style={[styles.text, { color: themeTextStyle }]}>
					{isEnabled ? 'Light Mode' : 'Dark Mode'}
				</Text>
			</View>
			<View style={styles.row}>
				<Text style={[styles.text, { color: themeTextStyle }]}>
					Use System Theme
				</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={isSystemThemeEnabled ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={toggleSystemThemeSwitch}
					value={isSystemThemeEnabled}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	switchStyles: {},
	text: {},
});
export default ColorSchemeSwitch;
