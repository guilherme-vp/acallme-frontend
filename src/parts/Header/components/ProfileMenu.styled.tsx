import styled from 'styled-components'

import { ButtonBase } from '@mui/material'

import { pxToRem } from 'utils/px-to-rem'

export const HeaderProfile = styled(ButtonBase)`
	display: flex;
	padding: 8px 16px;
	margin-left: 16px;
	max-width: 230px;
	align-items: center;
	justify-content: initial;
	height: 100%;
	p {
		font-size: ${pxToRem(14)};
		color: ${props => props.theme.text.main};
	}
`

export const HeaderName = styled.div`
	display: flex;
	align-items: flex-start;
	min-width: 0;
	text-align: initial;
	margin-left: 18px;
	h4 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`
