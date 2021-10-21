import React, { useRef, useState } from 'react'

import { useTheme } from 'styled-components'

import {
	Divider,
	Menu,
	MenuItem,
	useMediaQuery,
	Avatar,
	Typography,
	Icon
} from '@mui/material'
import { Theme } from '@mui/system'
import { MdArrowDropDown as DropDownIcon } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { DeleteMenuItem } from 'components/DeleteMenuItem'
import { useIntl } from 'hooks'
import { SCHEDULE } from 'routes'

import { HeaderName, HeaderProfile } from './ProfileMenu.styled'

interface ProfileMenuProps {
	name: string
	avatarUrl?: string
	onSignOut: () => void
}

export const ProfileMenu = ({ onSignOut, name, avatarUrl }: ProfileMenuProps) => {
	const styledTheme = useTheme()
	const intl = useIntl()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const profileWidth =
		buttonRef?.current !== null ? window.getComputedStyle(buttonRef.current).width : '180px'

	return (
		<>
			<HeaderProfile ref={buttonRef} onClick={handleClick} aria-haspopup="true">
				<Avatar src={avatarUrl ?? ''}>{name.charAt(0).toUpperCase()}</Avatar>
				{!mdDown && (
					<HeaderName>
						<Typography variant="body2" fontWeight={500} title={name}>
							{name}
						</Typography>
						<Icon fontSize="small" sx={{ marginTop: '2px', marginLeft: '3px' }}>
							<DropDownIcon />
						</Icon>
					</HeaderName>
				)}
			</HeaderProfile>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				PaperProps={{
					style: {
						minWidth: profileWidth,
						border: `1px solid ${styledTheme.border.darker}`,
						boxShadow: styledTheme.shadow.first
					}
				}}
				MenuListProps={{
					disablePadding: true
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				<Link to={SCHEDULE} style={{ color: styledTheme.text.main }}>
					<MenuItem onClick={handleClose}>
						{intl.formatMessage({ id: 'dashboard' })}
					</MenuItem>
				</Link>
				<Divider style={{ marginLeft: 5, marginRight: 5 }} />
				<DeleteMenuItem
					onClick={() => {
						onSignOut()
						handleClose()
					}}
				>
					{intl.formatMessage({ id: 'logout' })}
				</DeleteMenuItem>
			</Menu>
		</>
	)
}

export default ProfileMenu
