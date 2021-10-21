import styled from 'styled-components'

import { Tab } from '@mui/material'

import { pxToRem } from 'utils/px-to-rem'

export const StyledTab = styled(Tab)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	text-transform: capitalize;
	font-weight: 500 !important;
	min-height: 50px;
	border-top-right-radius: 36px;
	border-bottom-right-radius: 36px;
	padding-right: 100px;

	.MuiTab-iconWrapper {
		margin-bottom: 0;
		margin-right: 12px;
		font-size: ${pxToRem(20)};
	}
`
