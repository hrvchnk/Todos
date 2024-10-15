import React, { createContext, useContext } from 'react';
import { Platform, Vibration } from 'react-native';

const VibrationContext = createContext(null);

export const VibrationProvider = ({ children }) => {
	const vibrate = (duration = 50) => {
		Vibration.vibrate(duration);
	};

	const generateSelectionFeedback = () => {
		if (Platform.OS === 'ios') {
			const selectionFeedback = new UISelectionFeedbackGenerator();
			selectionFeedback.prepare();
			selectionFeedback.selectionChanged();
		} else {
			// Для Android або інших платформ
			// Тут можна реалізувати альтернативний відгук для Android
		}
	};

	return (
		<VibrationContext.Provider value={{ vibrate, generateSelectionFeedback }}>
			{children}
		</VibrationContext.Provider>
	);
};

export const useVibration = () => useContext(VibrationContext);
