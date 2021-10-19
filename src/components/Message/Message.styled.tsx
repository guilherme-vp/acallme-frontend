import styled, { css } from 'styled-components'

import { Avatar, Grid } from '@mui/material'

export const MiniAvatar = styled(Avatar).attrs({ sx: { width: 50, height: 50 } })`
	border: 3px solid ${props => props.theme.tags.white};
	box-shadow: -2px 4px 6px 0 rgba(0, 0, 0, 0.2);
`

export const MessageContent = styled(Grid).withConfig<{ isSpeaker: boolean }>({
	shouldForwardProp: props => !['isSpeaker'].includes(props)
})`
	max-width: 400px;
	padding: 16px 20px;
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
