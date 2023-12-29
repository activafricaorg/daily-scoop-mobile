export const capitalize = (input: string): string => {
	const arr = input.split(" ");
	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}

	return arr.join(" ");
}

export const sanitizeTitle = (input: string): string => {
	let title = input.split(" --").length > 1 ? input.split(" --")[0] : input;
	title = title.split(" •").length > 1 ? title.split(" •")[0] : title;
	title = title.split(" –—").length > 1 ? title.split(" –—")[0] : title;
	title = title.split(" - Punch Newspapers").length > 1 ? title.split(" - Punch Newspapers")[0] : title;

	return title;
}

export const slugifyText = (input: string): string => {
	const arr = input.split(" ");
	return arr.join("-");
}

export const abbreviateNumber = (num: number): number | string => {
	const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

	const tier = Math.log10(Math.abs(num)) / 3 | 0;

	// if zero, we don't need a suffix
	if (tier == 0) return num;

	// get suffix and determine scale
	const suffix = SI_SYMBOL[tier];
	const scale = Math.pow(10, tier * 3);

	// scale the number
	const scaled = num / scale;

	// format number and add suffix
	return scaled.toFixed(1) + suffix;
}