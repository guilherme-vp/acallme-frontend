import React from 'react'

import { Popover, PopoverProps } from '@mui/material'
import { SxProps, Theme } from '@mui/system'

interface MenuPopoverProps extends PopoverProps {
	sx: SxProps<Theme>
	children: React.ReactNode
}

export const MenuPopover = ({ children, sx, ...other }: MenuPopoverProps) => (
	<Popover
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		PaperProps={{
			sx: {
				mt: 1.5,
				ml: 0.5,
				overflow: 'inherit',
				boxShadow: theme => theme.shadows[1],
				width: 200,
				...sx
			}
		}}
		{...other}
	>
		{children}
	</Popover>
)

export default MenuPopover
