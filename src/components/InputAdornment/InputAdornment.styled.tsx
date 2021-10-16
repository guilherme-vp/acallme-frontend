import styled from 'styled-components'

import { InputAdornment } from '@mui/material'

import { pxToRem } from 'utils/px-to-rem'

export const InputIconContainer = styled(InputAdornment)`
	color: ${props => props.theme.colors.secondary};
	font-size: ${pxToRem(20)};
`
