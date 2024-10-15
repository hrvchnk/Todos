import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const systemColorScheme = useColorScheme();
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		// Load saved theme from storage
		const getTheme = async () => {
			try {
				const savedTheme = await AsyncStorage.getItem('theme');
				if (savedTheme) {
					setTheme(savedTheme);
				} else {
					setTheme(systemColorScheme);
				}
			} catch (error) {
				console.log('Error loading theme:', error);
			}
		};
		getTheme();
	}, [systemColorScheme]);

	useEffect(() => {
		if (theme === 'system') {
			setTheme(systemColorScheme); // Sync with system theme
		}
	}, [systemColorScheme]);

	const toggleTheme = newTheme => {
		setTheme(newTheme);
		AsyncStorage.setItem('theme', newTheme); // Save selected theme to storage
	};

	const useSystemTheme = () => {
		setTheme('system');
		AsyncStorage.setItem('theme', 'system');
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, useSystemTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
