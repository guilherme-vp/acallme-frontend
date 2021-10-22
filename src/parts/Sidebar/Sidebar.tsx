import React, { useMemo } from 'react'

import { Grid, Typography, useMediaQuery, Theme } from '@mui/material'
import { GoCalendar as CalendarIcon } from 'react-icons/go'
import {
	MdOutlineGroup as GroupIcon,
	MdOutlineHistory as HistoryIcon
} from 'react-icons/md'
import { useLocation } from 'react-router'

import { useIntl } from 'hooks'
import { HISTORY, SCHEDULE, SPECIALISTS } from 'routes'
import { capitalizeLetter } from 'utils/capitalize-letter'

import { SidebarContent } from './Sidebar.styled'
import { SidebarOptionProps, SidebarOption } from './SidebarOption'

interface Props {
	onClose?: () => void
	open: boolean
}

type Options = Omit<SidebarOptionProps, 'open'>[]

export const Sidebar = ({ open, onClose }: Props) => {
	const location = useLocation()
	const intl = useIntl()
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	const options: Options = [
		{
			icon: <CalendarIcon />,
			option: 'schedule',
			link: SCHEDULE
		},
		{
			icon: <GroupIcon />,
			option: 'specialists',
			link: SPECIALISTS
		},
		{
			icon: <HistoryIcon />,
			option: 'history',
			link: HISTORY
		}
	]

	const [, tab] = useMemo(() => location.pathname.split('/'), [location.pathname])

	return (
		<SidebarContent open={open}>
			<Grid container>
				<Grid container item mb={1} mt={isMdDown ? 5 : 0}>
					<Typography textAlign="center" variant="body2" sx={{ color: 'text.secondary' }}>
						{capitalizeLetter(intl.formatMessage({ id: 'general' }))}
					</Typography>
				</Grid>
				{options.map(option => (
					<Grid item key={option.option}>
						<SidebarOption {...option} actualTab={tab} onClose={onClose} open={open} />
					</Grid>
				))}
			</Grid>
		</SidebarContent>
	)
}

export default Sidebar
