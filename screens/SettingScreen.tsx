import SelectDropdown from 'react-native-select-dropdown'
import { View, Text, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseStyles from "../styles/Base";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SettingsScreen(props: { route: any; navigation: any; }) {
	const { width } = Dimensions.get('window');
	const countries = ["Nigeria", "South Africa", "Ghana", "Kenya", "Egypt"]

	return (
		<Layout>
			<SafeAreaView>
				<View style={{ width: '100%', backgroundColor: '#0f0f0f' }}>
					<View style={BaseStyles.infoContainer}>
						<Text style={BaseStyles.headingText}>
							<Ionicons name='ios-settings-outline' size={24} color={'rgb(253, 192, 6)'} /> Settings
						</Text>
						<View>
							<Text style={{color: 'rgba(243, 245, 247, 0.7)', marginBottom: 12, fontFamily: 'Aeonik-Regular', fontSize: 16, letterSpacing: 0.5, lineHeight: 20}}>To get customized scoop specific to your country, select your country.</Text>
							<SelectDropdown
								// showsVerticalScrollIndicator={true}
								data={countries}
								defaultButtonText="Select country"
								dropdownIconPosition={'right'}
								onSelect={(selectedItem, index) => {
									// console.log(selectedItem)
								}}
								buttonStyle={{
									width: width - 40,
									backgroundColor: 'transparent',
									borderWidth: 1,
									borderStyle: 'solid',
									borderRadius: 5,
									borderColor: 'rgba(243, 245, 247, 0.1)',
								}}
								buttonTextStyle={{
									fontFamily: 'Aeonik-Medium',
									fontSize: 20,
									color: '#c6c6c6'
								}}
								dropdownOverlayColor='rgba(0, 0, 0, 0.85)'
								rowStyle={{
									shadowOpacity: 0,
									borderColor: 'rgba(243, 245, 247, 0.1)',
									borderBottomColor: 'rgba(243, 245, 247, 0.1)',
									borderTopWidth: 0.5,
									borderBottomWidth: 0.5,
									borderTopColor: 'rgba(243, 245, 247, 0.1)',
								}}
								rowTextStyle={{
									color: '#c6c6c6',
									fontSize: 20,
									fontFamily: 'Aeonik-Medium',
								}}
								dropdownStyle={{
									backgroundColor: 'transparent',
									borderWidth: 1,
									borderStyle: 'solid',
									borderRadius: 5,
									borderColor: 'rgba(243, 245, 247, 0.1)',
									shadowOpacity: 0
								}}
								buttonTextAfterSelection={(selectedItem, index) => {
									// text represented after item is selected
									// if data array is an array of objects then return selectedItem.property to render after item is selected
									return selectedItem
								}}
								rowTextForSelection={(item, index) => {
									// text represented for each item in dropdown
									// if data array is an array of objects then return item.property to represent item in dropdown
									return item
								}}
							/>
						</View>
					</View>
				</View>
				<StatusBar style="auto" />
			</SafeAreaView>
		</Layout>
	);
}