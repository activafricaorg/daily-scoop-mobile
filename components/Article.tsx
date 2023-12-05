import moment from "moment";
import React, { memo } from 'react';
import * as WebBrowser from "expo-web-browser";
import { ArticleTypes } from "../types/article";
import { Text, View } from "react-native";
import { Link } from '@react-navigation/native';
import { sanitizeTitle, capitalize, slugifyText } from "../util/helper";
import ArticleStyles from "../styles/Article";
import Ionicons from "@expo/vector-icons/Ionicons";

const Article = (props: { isCategory: boolean, data: ArticleTypes, handleNavigation?: {(guid: string): void} }) => {
	let title = sanitizeTitle(props.data.title);
	let source = capitalize(props.data.source);
	const realDate = moment(props.data.articleDate).startOf('hour').fromNow();

	return (
		<View style={ArticleStyles.articleView}>
			<View style={ArticleStyles.articleMeta}>
				<View style={{
					// flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: 'rgba(28, 28, 28, 1)',
					paddingTop: 5,
					paddingBottom: 5,
					paddingLeft: 8,
					paddingRight: 7,
					marginRight: 10,
					borderTopRightRadius: 5,
					borderTopLeftRadius: 5,
					borderBottomLeftRadius: 5,
					borderBottomRightRadius: 5,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 1 },
					shadowOpacity: 0.20,
					shadowRadius: 1.41,
					elevation: 10,
				}}>
					<Ionicons name='albums-outline' size={15} color={'#f28d28'} />
					<Link style={ArticleStyles.articleSource} to={{ screen: 'Publisher', params: { source: slugifyText(props.data.source), sourceTitle: source }}}>
						{ source }
					</Link>
				</View>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: 'rgba(28, 28, 28, 1)',
					paddingTop: 5,
					paddingBottom: 5,
					paddingLeft: 8,
					paddingRight: 7,
					marginRight: 10,
					alignSelf: 'center',
					borderColor: 'rgba(241,154,61,0.12)',
					borderTopRightRadius: 5,
					borderTopLeftRadius: 5,
					borderBottomLeftRadius: 5,
					borderBottomRightRadius: 5,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 1 },
					shadowOpacity: 0.20,
					shadowRadius: 1.41,
					elevation: 10,
				}}>
					<Ionicons name='time-outline' size={15} color={'#989898'} />
					<Text style={ArticleStyles.articleDate}>
						{ realDate }
					</Text>
				</View>
			</View>
			{
				<Text style={ArticleStyles.articleTitle} onPress={() => WebBrowser.openBrowserAsync(props.data.url)}>
					{ title }
				</Text>
			}
		</View>
	)
}

export default memo(Article);