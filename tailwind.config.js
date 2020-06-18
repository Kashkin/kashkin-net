const _ = require("lodash")
const plugin = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	purge: {
		content: ["./templates/**/*.html", "./templates/**/*.twig"],
		options: {
			whitelistPatterns: [/^bg/],
			defaultExtrator: content => {
				return content.match(/[\w-/.:]+(?<!:)/g) || []
			},
		},
	},
	theme: {
		screens: {
			min: "320px",
			xs: "360px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1600px",
			xxxl: "1792px",
			max: "1952px",
		},
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
			},
		},
		customForms: theme => ({
			default: {
				"input, textarea, multiselect, select": {
					borderColor: theme("colors.gray.400"),
					fontSize: "1em",
					"&:focus": {
						outline: "none",
						boxShadow: theme("shadow.sm"),
						borderColor: theme("colors.blue.400"),
					},
				},
			},
		}),
	},
	variants: {
		opacity: ["responsive", "hover", "focus", "group-hover", "group-focus"],
		translate: [
			"responsive",
			"hover",
			"focus",
			"group-hover",
			"group-focus",
		],
	},
	corePlugins: {
		container: false,
		clear: false,
		float: false,
	},
	plugins: [
		require("@tailwindcss/ui"),
		plugin(function({ addUtilities, config }) {
			const screens = config("theme.screens")

			// Flood utilities
			const containerPadding = {
				min: "1.5rem",
				xs: "2rem",
				sm: "3rem",
				md: "4rem",
				lg: "5rem",
				xl: "8rem",
				xxl: "10rem",
				xxxl: "12rem",
				max: "12rem",
			}

			const floodUtilities = _.map(
				containerPadding,
				(padding, screen) => {
					let width = config(`theme.screens.${screen}`)

					return {
						[`@media (min-width: ${width})`]: {
							".container": {
								"padding-left": padding,
								"padding-right": padding,
							},
							".flood-r": {
								"margin-right": `-${padding}`,
							},
							".flood-l": {
								"margin-left": `-${padding}`,
							},
							".bordered": {
								"padding-left": `calc(${padding} - 2rem)`,
								"padding-right": `calc(${padding} - 2rem)`,
							},
						},
					}
				}
			)
			addUtilities([...floodUtilities])
		}),
	],
}
