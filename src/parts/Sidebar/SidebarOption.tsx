/* eslint-disable react/jsx-wrap-multilines */
import React from 'react'

import { ListItem, ListItemIcon, Tooltip, Typography } from '@mui/material'

import { useIntl } from 'hooks'

import { MenuTab, StyledLink } from './Sidebar.styled'

export interface SidebarOptionProps {
	icon: JSX.Element
	option: string
	link: string
	onClose?: () => void
	open: boolean
	actualTab?: string
}

export const SidebarOption = ({
	icon,
	option,
	link,
	onClose,
	open,
	actualTab
}: SidebarOptionProps) => {
	const intl = useIntl()
	const linkTab = link.split('/')[1] || ''
	const isSelected = actualTab === linkTab

	const tab = (
		<MenuTab
			selected={isSelected}
			icon={
				<ListItem>
					<ListItemIcon>{icon}</ListItemIcon>
					{open && (
						<Typography
							variant="body2"
							sx={{ textTransform: 'capitalize' }}
							fontWeight={600}
						>
							{/* @ts-ignore */}
							{intl.formatMessage({ id: `nav.${option}` })}
						</Typography>
					)}
				</ListItem>
			}
		/>
	)

	return (
		<StyledLink to={link} onClick={onClose}>
			{open ? (
				// @ts-ignore
				<Tooltip title={intl.formatMessage({ id: `nav.${option}` })} placement="right">
					{tab}
				</Tooltip>
			) : (
				tab
			)}
		</StyledLink>
	)
}

export default SidebarOption
