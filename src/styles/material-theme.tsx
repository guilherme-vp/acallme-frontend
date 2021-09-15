import { ThemeOptions, createMuiTheme, alpha } from '@material-ui/core/styles'
import { theme as colorTheme, Theme } from './theme'
import { pxToRem } from '../utils/px-to-rem'

const baseTheme = createMuiTheme()

declare module '@material-ui/core/styles/createTypography' {
	interface Typography {
		display1: React.CSSProperties
		display2: React.CSSProperties
		display3: React.CSSProperties
	}

	interface TypographyOptions {
		display1?: React.CSSProperties
		display2?: React.CSSProperties
		display3?: React.CSSProperties
	}
}

declare module '@material-ui/core/Typography/Typography' {
	interface TypographyPropsVariantOverrides {
		display1: true
		display2: true
		display3: true
	}
}

const materialBaseTheme = (theme: Theme): ThemeOptions => ({
	palette: {
		primary: {
			main: theme.colors.primary
		},
		secondary: {
			main: theme.colors.secondary
		},
		text: {
			primary: theme.text.main,
			secondary: theme.text.description
		},
		common: {
			black: theme.tags.black,
			white: theme.tags.white
		},
		grey: {
			'600': theme.grey.main
		},
		background: {
			paper: theme.background.main
		}
	},
	typography: {
		display1: {
			fontSize: pxToRem(40),
			fontWeight: 700
		},
		display2: {
			fontSize: pxToRem(30),
			fontWeight: 700
		},
		display3: {
			fontSize: pxToRem(24),
			fontWeight: 600
		},
		h1: {
			fontSize: pxToRem(22),
			fontWeight: 700
		},
		h2: {
			fontSize: pxToRem(20),
			fontWeight: 400
		},
		h3: {
			fontSize: pxToRem(18)
		},
		h4: {
			fontSize: pxToRem(16)
		},
		h5: {
			fontSize: pxToRem(14)
		},
		button: {
			fontSize: pxToRem(20)
		},
		body1: {
			fontSize: pxToRem(15)
		},
		body2: {
			fontSize: pxToRem(12)
		}
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true
			},
			styleOverrides: {
				root: {
					textTransform: 'initial',
					fontSize: pxToRem(14),
					borderRadius: '25px'
				},
				contained: {
					padding: '8px 22px'
				},
				containedSizeSmall: {
					padding: '6px 10px'
				},
				outlined: {
					padding: '8px 16px',
					borderWidth: '2px !important'
				},
				text: {
					fontWeight: 400,
					padding: '2px 5px',
					'& .MuiButton-label': {
						justifyContent: 'space-between'
					}
				}
			}
		},
		MuiAppBar: {
			defaultProps: {
				position: 'fixed',
				elevation: 0
			},
			styleOverrides: {
				root: {
					borderBottom: '1px solid',
					borderBottomColor: theme.border.thin
				},
				positionFixed: {
					zIndex: baseTheme.zIndex.drawer + 1
				},
				positionAbsolute: {
					zIndex: baseTheme.zIndex.drawer + 1
				},
				colorPrimary: {
					backgroundColor: theme.background.main,
					color: theme.text.main
				}
			}
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					border: `1px solid ${theme.border.thin}`,
					padding: '12px 15px'
				},
				icon: {
					right: 2
				},
				selectMenu: {
					borderRadius: 'inherit'
				},
				select: {
					'&:focus': {
						borderRadius: 'inherit',
						borderColor: theme.border.darker
					}
				}
			}
		},
		MuiInput: {
			defaultProps: {
				disableUnderline: true
			},
			styleOverrides: {
				root: {
					borderRadius: 6,
					border: `1px solid ${theme.border.thin}`,
					fontSize: pxToRem(15),
					marginTop: '0 !important',
					'&.Mui-focused': {
						borderColor: theme.border.darker
					}
				},
				input: {
					padding: '14px 16px 15px',
					'&::placeholder': {
						color: theme.grey.main
					}
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					'&.Mui-disabled': {
						WebkitTextFillColor: null
					}
				}
			}
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontSize: pxToRem(14),
					outline: 'none',
					'&.Mui-selected': {
						fontWeight: 500,
						backgroundColor: alpha(theme.colors.primary, 0.1)
					}
				}
			}
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: theme.border.darker
				},
				wrapper: {
					color: theme.border.thin,
					fontSize: pxToRem(18),
					paddingLeft: 20,
					paddingRight: 20
				},
				wrapperVertical: {
					paddingTop: 20,
					paddingBottom: 20
				},
				withChildren: {
					'&::after, &::before': {
						borderColor: theme.grey.main
					}
				},
				withChildrenVertical: {
					'&::after, &::before': {
						borderColor: theme.grey.main
					}
				}
			}
		}
	}
})

export const materialTheme = createMuiTheme(materialBaseTheme(colorTheme))
