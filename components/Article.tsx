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
			{
				<Text style={ArticleStyles.articleTitle} onPress={() => WebBrowser.openBrowserAsync(props.data.url)}>
					{ title }
				</Text>
			}
			<View style={ArticleStyles.articleMeta}>
				<View style={{
					backgroundColor: 'rgba(241,154,61,0.06)',
					paddingTop: 8,
					paddingBottom: 8,
					paddingLeft: 15,
					paddingRight: 15,
					marginRight: 10,
					alignSelf: 'center',
					borderColor: 'rgba(241,154,61,0.12)',
					borderWidth: 1,
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20,
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					overflow: 'hidden',
				}}>
					<Link style={ArticleStyles.articleSource} to={{ screen: 'Publisher', params: { source: slugifyText(props.data.source), sourceTitle: source }}}>
						{ source }
					</Link>
				</View>
				<Text style={ArticleStyles.articleDate}>
					{ realDate }
				</Text>
			</View>
		</View>
	)
}

export default memo(Article);