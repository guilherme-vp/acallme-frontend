import styled, { css } from 'styled-components'

import { Grid } from '@mui/material'

export const MessageContent = styled(Grid).withConfig<{ isSpeaker: boolean }>({
	shouldForwardProp: props => !['isSpeaker'].includes(props)
})`
	max-width: 400px;
	padding: 10px 14px;
	font-weight: 500;
	border-radius: 24px;
	word-break: break-all;
	${({ theme, isSpeaker }) =>
		isSpeaker
			? css`
					background-color: ${theme.background.foreground};
					color: ${theme.text.main};
					border-top-right-radius: 0;
			  `
			: css`
					background-color: ${theme.background.darker};
					color: ${theme.text.light};
					border-top-left-radius: 0;
			  `}
`
