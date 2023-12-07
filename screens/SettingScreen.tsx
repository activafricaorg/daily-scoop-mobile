import SelectDropdown from 'react-native-select-dropdown'
import { View, Text, Dimensions, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Layout from "../components/Layout";
import BaseStyles from "../styles/Base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from 'react-redux';

export default function SettingsScreen(props: { route: any; navigation: any; }) {
	const dispatch = useDispatch();
	let country: string = useSelector((state: any) => state.country);

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
			<View style={{ width: '100%', backgroundColor: '#0f0f0f' }}>
				<View style={BaseStyles.infoContainer}>
					<Text style={{color: '#989898', marginBottom: 12, fontFamily: 'Aeonik-Medium', fontSize: 16, letterSpacing: 0.5, lineHeight: 20}}>To get customized scoops specific to your country, select your country.</Text>
					<SelectDropdown
						data={countriesWithFlags}
						defaultValue={countriesWithFlags.find((countryWithFlag) => countryWithFlag.title === country)}
						onSelect={async (selectedItem, index) => {
							dispatch({ type: 'UPDATE_COUNTRY', payload: selectedItem.title });
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
							fontFamily: 'Aeonik-Regular',
							fontSize: 20,
							color: '#989898'
						}}
						dropdownOverlayColor='rgba(0, 0, 0, 0.3)'
						rowStyle={{
							shadowOpacity: 0,
							backgroundColor: '#151515',
							borderColor: 'rgba(241,154,61,0.04)',
							borderBottomColor: 'rgba(241,154,61,0.04)',
							borderTopWidth: 1,
							borderBottomWidth: 1,
							borderTopColor: 'rgba(241,154,61,0.04)',
						}}
						dropdownStyle={{
							backgroundColor: 'transparent',
							borderWidth: 1,
							borderStyle: 'solid',
							borderRadius: 5,
							borderColor: 'rgba(243, 245, 247, 0.1)',
							shadowOpacity: 0,
							marginTop: 10
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem.title
						}}
						rowTextForSelection={(item, index) => {
							return item.title
						}}
						renderCustomizedButtonChild={(selectedItem, index) => {
							return (
								<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10}}>
									{selectedItem ? (
										<Image source={selectedItem.image} style={{width: 28, height: 21}} />
									) : (
										<Ionicons name="md-earth-sharp" size={28} color={'#989898'} />
									)}
									<Text style={{fontFamily: 'Aeonik-Bold', letterSpacing: 0.5, fontSize: 18, color: '#989898', textAlign: 'center', marginHorizontal: 12, lineHeight: 16, marginTop: 3}}>{selectedItem ? selectedItem.title : 'All African Countries'}</Text>
								</View>
							);
						}}
						renderCustomizedRowChild={(item, index) => {
							return (
								<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 18}}>
									<Image source={item.image} style={{width: 30, height: 22}} />
									<Text style={{fontFamily: 'Aeonik-Bold', letterSpacing: 0.5, fontSize: 18, color: '#989898', textAlign: 'center', marginHorizontal: 12, lineHeight: 16, marginTop: 3}}>{item.title}</Text>
								</View>
							);
						}}
						renderDropdownIcon={isOpened => {
							return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} size={28} color={'#545454'} />
						}}
					/>
				</View>
			</View>
			<StatusBar style="auto" />
		</Layout>
	);
}