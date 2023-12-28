import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
	static async storeData (key: string, value: string) {
		try {
			return await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.error(e);
		}
	};

	static async getData (key: string) {
		try {
			return await AsyncStorage.getItem(key);
		}  catch (e) {
			console.error(e);
		}
	};

	static async removeData (key: string) {
		try {
			return await AsyncStorage.removeItem(key);
		}  catch (e) {
			console.error(e);
		}
	};

	static async updateData (key: string, newValue: string) {
		try {
			this.removeData(key).then(async () => { return await this.storeData(key, newValue) });
		}  catch (e) {
			console.error(e);
		}
	}
}

export default Storage;