type IStyleConfig = {
	colors: {
		primary: {
			[key: string]: string
		},
		secondary: {
			[key: string]: string
		},
		middle?: {
			[key: string]: string
		},
		success: {
			[key: string]: string
		},
		error: {
			[key: string]: string
		}
	};
	sizes: {
		[key: string]: {
			[key: string]: {
				[key: string]: string
			}
		}
	};
	text: {
		h1: string;
		h2: string;
		h3: string;
		h4: string;
		h5: string;
		h6: string;
	}
}

const styleConfig: IStyleConfig = {
	"text": {
		"h1": "28px",
		"h2": "22px",
		"h3": "18px",
		"h4": "16px",
		"h5": "14px",
		"h6": "12px"
	},
	"colors": {
		"primary": {
			"dark": "#282D35",
			"light": "#FFF",
		},
		"secondary": {
			"dark": "#2F80ED",
			"light": "#ECF2FF",
			"succes": "#86CD82"
		},
		"middle": {
			"dark": "#828282"
		},
		"success": {
			"main": "#86CD82"
		},
		"error": {
			"main": "#EF6F6C"
		}
	},
	"sizes": {
		"s": {
			"chiplist": {
				"gap": "8px",
				"width": "calc(32px * 7 + 8px * 6)"
			},
			"chip": {
				"width": "32px",
				"height": "32px",
				"fontSize": "13.71px"
			},
			"carouselItem": {
				"height": "32px",
				"fontSize": "15.3px"
			},
			"line": {
				"height": "0.76",
				"width": "270.48"
			}
		},
		"m": {
			"chiplist": {
				"gap": "10px",
				"width": "calc(42px * 7 + 10px * 6)"
			},
			"chip": {
				"width": "42px",
				"height": "42px",
				"fontSize": "18px"
			},
			"carouselItem": {
				"height": "42px",
				"fontSize": "20px"
			},
			"line": {
				"height": "1",
				"width": "355"
			}
		},
		"l": {
			"chiplist": {
				"gap": "12px",
				"width": "calc(64px * 7 + 12px * 6)"
			},
			"chip": {
				"width": "64px",
				"height": "64px",
				"fontSize": "27.43px"
			},
			"carouselItem": {
				"height": "64px",
				"fontSize": "30.5px"
			},
			"line": {
				"height": "1.52",
				"width": "540.95"
			}
		}
	}
};

export default styleConfig;