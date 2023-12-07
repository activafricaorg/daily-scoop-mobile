import moment from "moment";
import React, { memo } from 'react';
import * as WebBrowser from "expo-web-browser";
import { ArticleTypes } from "../types/article";
import { Text, View, Share, Alert } from "react-native";
import { Link } from '@react-navigation/native';
import { sanitizeTitle, capitalize, slugifyText } from "../util/helper";
import ArticleStyles from "../styles/Article";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Octicons } from '@expo/vector-icons';

const Article = (props: { isCategory: boolean, data: ArticleTypes, handleNavigation?: {(guid: string): void} }) => {
	let title = sanitizeTitle(props.data.title);
	let source = capitalize(props.data.source);
	const realDate = moment(props.data.articleDate).startOf('hour').fromNow();
	const onShare = async () => {
		try {
			const result = await Share.share({
				message: props.data.url
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message);
		}
	};

	return (
		<View style={ArticleStyles.articleView}>
			<View style={{
				flexDirection: 'row',
				alignItems: 'center',
				paddingLeft: 15,
				paddingRight: 15,
				paddingTop: 15,
				marginRight: 10,

			}}>
				<Ionicons name='albums-outline' size={16} color={'#f28d28'} />
				<Link style={ArticleStyles.articleSource} to={{ screen: 'Publisher', params: { source: slugifyText(props.data.source), sourceTitle: source }}}>
					{ source }
				</Link>
			</View>
			<Text style={ArticleStyles.articleTitle} onPress={() => WebBrowser.openBrowserAsync(props.data.url)}>
				{ title }
			</Text>
			<View style={ArticleStyles.articleMeta}>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingTop: 5,
					paddingBottom: 5,
					marginRight: 10
				}}>
					<Ionicons name='hourglass-outline' size={16} color={'#4b4b4b'} />
					<Text style={ArticleStyles.articleDate}>
						{ realDate }
					</Text>
				</View>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingTop: 5,
					paddingBottom: 5,
					alignSelf: 'center',
				}}>
					<Octicons name="share" size={16} color={'#4b4b4b'} />
					<Text style={ArticleStyles.articleDate} onPress={onShare}>
						Share
					</Text>
				</View>
			</View>
		</View>
	)
}

export default memo(Article);