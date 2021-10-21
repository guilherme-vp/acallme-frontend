import React from 'react'

import { useTheme } from 'styled-components'

import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'

export type DeleteMenuItemProps = MenuItemProps

export const DeleteMenuItem = (props: DeleteMenuItemProps) => {
	const theme = useTheme()

	return <MenuItem sx={{ color: theme.tags.red }} {...props} />
}

export default DeleteMenuItem
