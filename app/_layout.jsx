import { Colors } from '@/constants/Colors';
import { ThemeProvider } from '@/context/ThemeContext';
import { TodoProvider } from '@/context/ToDoContext'; // Переконайтесь, що ви імплементуєте цей провайдер
import { VibrationProvider } from '@/context/VibrationContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
export default function RootLayout() {
	const colorScheme = useColorScheme();
	const backgroundColor = useThemeColor(
		{
			light: Colors.light.backgroundPrimary,
			dark: Colors.dark.backgroundPrimary,
		},
		'background'
	);
	const router = useRouter();
	return (
		<ThemeProvider>
			<VibrationProvider>
				<TodoProvider>
					<Stack
						screenOptions={{
							headerStyle: {
								backgroundColor,
								elevation: 0,
								shadowOpacity: 0,
							},
							headerShadowVisible: false,
							headerTitleStyle: {
								color: Colors.light.textPrimary,
							},
							headerTintColor: Colors.light.textPrimary,
						}}
					>
						<Stack.Screen
							name='index'
							options={{
								title: 'Todos',
								headerRight: () => (
									<ButtonIcon
										onPress={() => router.push('/modal')}
										title='filter tasks'
										iconName='three-bars'
										iconSize='md'
										iconTheme='secondaryIcon'
									/>
								),
							}}
						/>

						<Stack.Screen
							name='modal'
							options={{
								headerLeft: () => (
									<ButtonIcon
										onPress={() => router.back()}
										title='Назад'
										iconName='arrow-left'
										iconTheme='secondaryIcon'
										iconSize='md'
										theme='icon'
										color={Colors.light.textPrimary}
									/>
								),
								// header: () => <BlurredHeader />,
								presentation: 'modal',
								title: 'Settings',
							}}
						/>
						<Stack.Screen
							name='group'
							options={({ route }) => {
								const { id } = route.params;
								const groupName = id ? `ID: ${id}` : 'Unknown Group';
								return { title: groupName };
							}}
						/>
					</Stack>
				</TodoProvider>
			</VibrationProvider>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		// alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: Colors.light.backgroundPrimary,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.light.textPrimary, // Колір тексту заголовка
	},
});
