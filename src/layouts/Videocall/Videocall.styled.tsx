import styled from 'styled-components'

import { Box } from '@mui/material'

export const Container = styled(Box)`
	height: 100vh;
	width: 100%;
	background-color: ${props => props.theme.background.videocall};
`
