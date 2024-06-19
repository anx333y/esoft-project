type IStyleConfig = {
	colors: {
		primary: {
			[key: string]: string
		},
		secondary?: {
			[key: string]: string
		},
		middle?: {
			[key: string]: string
		}
	}
	sizes: {
		[key: string]: {
			[key: string]: {
				[key: string]: string
			}
		}
	};
}

const styleConfig: IStyleConfig = {
	"colors": {
		"primary": {
			"dark": "#282D35",
			"light": "#FFF",
		},
		"secondary": {
			"dark": "#2F80ED",
			"light": "#ECF2FF",
		},
		"middle": {
			"dark": "#828282"
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