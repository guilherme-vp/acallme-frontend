import styled from 'styled-components'

import { MenuItem, Tab, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

import { pxToRem } from 'utils/px-to-rem'

export const SidebarContent = styled.div.withConfig<{ open: boolean }>({
	shouldForwardProp: prop => !['open'].includes(prop)
})`
	overflow: auto;
	padding: 0 40px;
	width: ${({ open }) => (open ? '240px' : '100%')};

	.MuiTab-root {
		width: 100%;
	}
`

export const ScrollableContent = styled(Grid)`
	overflow-y: auto;
	max-height: max-content;
`

export const StyledLink = styled(Link)`
	margin-left: -40px;
`

export const MenuTab = styled(Tab).withConfig<{ selected?: boolean; open?: boolean }>({})`
	width: ${props => (props.open ? '230px !important' : '100%')};
	transition: width 0.1s;

	.MuiListItemIcon-root {
		color: inherit;
		font-size: ${pxToRem(24)};
	}
`

export const SelectableItem = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

export const MenuItemButton = styled(MenuItem)`
	text-transform: uppercase;
	font-weight: 500;
	font-size: ${pxToRem(12)};
`
