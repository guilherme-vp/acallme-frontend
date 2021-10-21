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
	border-radius: 0;
	margin-bottom: 24px;
	min-height: 50px;

	.MuiTab-iconWrapper {
		margin-bottom: 0;
		margin-right: 12px;
		font-size: ${pxToRem(20)};
	}

	@media only screen and (min-width: 968px) {
		border-top-right-radius: 36px;
		border-bottom-right-radius: 36px;
		padding-right: 100px;
		margin-bottom: 0;
	}
`
