import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

let currentNetwork: boolean | null;
NetInfo.fetch().then((state) => {
	currentNetwork = state.isConnected;
});

export default function checkConnection() {
	const [netInfo, setNetInfo] = useState(currentNetwork);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setNetInfo(state.isConnected);
		});

		return () => unsubscribe();
	}, []);

	return netInfo;
}