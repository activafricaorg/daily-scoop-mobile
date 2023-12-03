import { StyleSheet } from "react-native";

export default StyleSheet.create({
	wrapper: {
		backgroundColor: '#0f0f0f'
	},
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: '#0f0f0f',
	},
	mainContainer: {
		padding: 10,
		marginTop: 20,
		marginBottom: 40
	},
	textView: {
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		fontSize: 16,
		color: 'white',
		textDecorationStyle: undefined
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(243, 245, 247, 0.1)',
		padding: 10,
	},
	headingText: {
		color: '#f28d28',
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		marginBottom: 25,
		fontSize: 24,
		lineHeight: 32,
	},
	paragraphText: {
		fontSize: 16,
		lineHeight: 22,
		color: '#dcdcdc',
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		marginBottom: 10
	},
	infoContainer: {
		paddingLeft: 10,
		paddingRight: 10
	},
	infoHeader: {
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		color: '#f28d28',
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 8,
		paddingRight: 8,
		fontSize: 16
	},
	infoItem: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(243, 245, 247, 0.1)'
	},
	infoContent: {
		fontFamily: 'Aeonik-Regular',
		letterSpacing: 0.5,
		fontSize: 18,
		lineHeight: 26,
		color: 'rgba(243, 245, 247, 0.7)',
		paddingTop: 0,
		paddingBottom: 10,
	},
	infoWrapper: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 15,
		borderColor: 'rgba(243, 245, 247, 0.1)',
		marginBottom: 15,
	},
	button: {
		display: 'flex',
		alignSelf: "flex-start",
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		color: '#0f0f0f',
		backgroundColor: '#f28d28',
		fontSize: 15,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	textLink: {
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid',
		textDecorationColor: '#f28d28'
	},
	flatList: {
		paddingLeft: 20,
		paddingRight: 20
	}
})