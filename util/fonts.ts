import localFont from "next/font/local";

export const polySans = localFont({
	src: [
		{
			path: './../localWebFonts/polySans-slim.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: './../localWebFonts/polySans-slim-italic.woff2',
			weight: '300',
			style: 'italic',
		},
		{
			path: './../localWebFonts/polySans-neutral.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: './../localWebFonts/polySans-median.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: './../localWebFonts/polySans-median-italic.woff2',
			weight: '500',
			style: 'italic',
		},
	],
})