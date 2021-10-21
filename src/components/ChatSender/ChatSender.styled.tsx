import styled from 'styled-components'

import { Button } from '@mui/material'

import { pxToRem } from 'utils/px-to-rem'

export const SubmitButton = styled(Button)`
	padding: 12px;
	border-radius: 12px;
	min-width: 0;
	font-size: ${pxToRem(20)};
`
