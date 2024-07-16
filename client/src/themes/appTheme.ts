import { createTheme } from "@mui/material";

const appTheme = createTheme({
	palette: {
		"primary": {
			"main": "#282D35",
			"light": "#FFF",
		},
		"secondary": {
			"main": "#2F80ED",
			"light": "#ECF2FF",
		},
		"success": {
			"main": "#86CD82"
		},
		"error": {
			"main": "#EF6F6C"
		}
	},
	typography: {
		fontFamily: [
			'"Fira Sans"',
			'Arial',
			'Helvetica',
			'sans-serif',
		].join(','),
	},
});

export default appTheme;