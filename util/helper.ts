export const capitalize = (input: string): string => {
	const arr = input.split(" ");
	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}

	return arr.join(" ");
}

export const sanitizeTitle = (input: string): string => {
	let title = input.split("|").length > 1 ? input.split("|")[0] : input;
	title = title.split(" --").length > 1 ? title.split(" --")[0] : title;
	title = title.split(" —").length > 1 ? title.split(" —")[0] : title;
	title = title.split(" •").length > 1 ? title.split(" •")[0] : title;
	title = title.split(" –—").length > 1 ? title.split(" –—")[0] : title;
	title = title.split(" - Punch Newspapers").length > 1 ? title.split(" - Punch Newspapers")[0] : title;

	return title;
}

export const slugifyText = (input: string): string => {
	const arr = input.split(" ");
	return arr.join("-");
}