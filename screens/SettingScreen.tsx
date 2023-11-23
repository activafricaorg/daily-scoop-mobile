import SelectDropdown from 'react-native-select-dropdown'
import {View, Text, Dimensions, Image} from "react-native";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseStyles from "../styles/Base";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SettingsScreen(props: { route: any; navigation: any; }) {
	const { width } = Dimensions.get('window');
	const countriesWithFlags = [
		{title: 'Nigeria', image: require('./../assets/flags/nigeria.png')},
		{title: 'South Africa', image: require('./../assets/flags/south-africa.png')},
		{title: 'Ghana', image: require('./../assets/flags/ghana.png')},
		{title: 'Kenya', image: require('./../assets/flags/kenya.png')},
		{title: 'Egypt', image: require('./../assets/flags/egypt.png')}
	];

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
								data={countriesWithFlags}
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
								dropdownOverlayColor='rgba(0, 0, 0, 0.3)'
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
									return selectedItem.title
								}}
								rowTextForSelection={(item, index) => {
									// text represented for each item in dropdown
									// if data array is an array of objects then return item.property to represent item in dropdown
									return item.title
								}}
								renderCustomizedButtonChild={(selectedItem, index) => {
									return (
										<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10}}>
											{selectedItem ? (
												<Image source={selectedItem.image} style={{width: 30, height: 22, resizeMode: 'cover'}} />
											) : (
												<Ionicons name="md-earth-sharp" size={32} />
											)}
											<Text style={{fontFamily: 'Aeonik-Medium', fontSize: 20, color: '#c6c6c6', textAlign: 'center', fontWeight: 'bold', marginHorizontal: 12}}>{selectedItem ? selectedItem.title : 'Select country'}</Text>
										</View>
									);
								}}
								renderCustomizedRowChild={(item, index) => {
									return (
										<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 18}}>
											<Image source={item.image} style={{width: 30, height: 22, resizeMode: 'cover'}} />
											<Text style={{fontFamily: 'Aeonik-Medium', fontSize: 20, color: '#c6c6c6', textAlign: 'center', fontWeight: 'bold', marginHorizontal: 12}}>{item.title}</Text>
										</View>
									);
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