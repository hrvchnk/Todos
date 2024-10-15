import { Colors } from '@/constants/Colors';
import { ThemeProvider } from '@/context/ThemeContext'; //
import { TodoProvider } from '@/context/ToDoContext';
import { VibrationProvider } from '@/context/VibrationContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ColorSchemeSwitch from '../components/ColorSchemeSwitch';
const Settings = () => {
	// const router = useRouter();
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor(
		{ light: Colors.light.background, dark: Colors.dark.background },
		'background'
	);

	return (
		<ThemeProvider>
			<VibrationProvider>
				<TodoProvider>
					<SafeAreaView style={[styles.container, { backgroundColor }]}>
						<View style={styles.content}>
							<ColorSchemeSwitch />
							<Text style={{ color: 'red' }}> {colorScheme}</Text>
						</View>
					</SafeAreaView>
				</TodoProvider>
			</VibrationProvider>
		</ThemeProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1, // Забезпечує, що контент займає весь доступний простір, залишаючи місце для меню
	},
});
export default Settings;
