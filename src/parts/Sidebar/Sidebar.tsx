import React, { useMemo } from 'react'

import { Grid, Typography, useMediaQuery, Theme } from '@mui/material'
import { GoCalendar as CalendarIcon } from 'react-icons/go'
import { MdOutlineGroup as GroupIcon, MdOutlineVideocam as VideoIcon } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

import { useIntl, useStoreon } from 'hooks'
import { VIDEOCALL, SCHEDULE, SPECIALISTS } from 'routes'
import { capitalizeLetter } from 'utils/capitalize-letter'

import { SidebarContent } from './Sidebar.styled'
import { SidebarOptionProps, SidebarOption } from './SidebarOption'
import { RolesEnum } from 'services/entities'

interface Props {
	onClose?: () => void
	open: boolean
}

type Options = Omit<SidebarOptionProps, 'open'>[]

export const Sidebar = ({ open, onClose }: Props) => {
	const location = useLocation()
	const intl = useIntl()
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	const { role } = useStoreon('role')

	const options: Options = useMemo(() => {
		const availableOptions: Options = [
			{
				icon: <CalendarIcon />,
				option: 'schedule',
				link: SCHEDULE
			},
			{
				icon: <VideoIcon />,
				option: 'videocall',
				link: VIDEOCALL
			}
		]

		if (role === RolesEnum.Patient) {
			availableOptions.push({
				icon: <GroupIcon />,
				option: 'specialists',
				link: SPECIALISTS
			})
		}

		return availableOptions
	}, [role])

	const [, tab] = useMemo(() => location.pathname.split('/'), [location.pathname])

	return (
		<SidebarContent open={open}>
			<Grid container>
				<Grid item mb={1} mt={isMdDown ? 5 : 0}>
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
