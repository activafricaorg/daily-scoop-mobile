import { StyleSheet } from "react-native";

export default StyleSheet.create({
	articleView: {
		flex: 1,
		// borderWidth: 1,
		// borderStyle: 'solid',
		// borderRadius: 15,
		backgroundColor: '#151515',
		// borderColor: 'rgba(243, 245, 247, 0.065)',
		marginBottom: 8,
	},
	articleTitle: {
		fontFamily: 'Aeonik-Regular',
		letterSpacing: 0.5,
		fontSize: 22,
		lineHeight: 28,
		color: '#bebebe',
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 20,
		paddingRight: 20
	},
	articleMeta: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: 'rgba(241,154,61,0.04)',
	},
	articleSource: {
		flex: 1,
		alignItems: 'center',
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		color: '#f28d28',
		// paddingTop: 3,
		// paddingBottom: 3,
		// paddingRight: 8,
		fontSize: 14
	},
	articleDate: {
		marginLeft: 14,
		fontFamily: 'Aeonik-Medium',
		letterSpacing: 0.5,
		color: '#707070',
		fontSize: 14

	},
	content: {
		padding: 15,
		overflow: "hidden",
	},
	readMoreSection: {
		height: 150,
		position: "absolute",
		width: "100%",
		left: 0,
		bottom: 0
	}
});