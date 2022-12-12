import React, { useRef, useState, useContext } from 'react'

import {
	List,
	Badge,
	Divider,
	IconButton,
	Typography,
	ListSubheader,
	Grid
} from '@mui/material'
import {
	MdNotifications as FilledBell,
	MdNotificationsNone as OutlinedBell
} from 'react-icons/md'

import { MenuPopover } from 'components/MenuPopover'
import { NotificationItem } from 'components/NotificationItem'
import { Scrollbar } from 'components/Scrollbar'

import { capitalizeLetter } from 'utils/capitalize-letter'
import { NotificationContext } from 'contexts'
import { useIntl } from 'hooks'

export const NotificationsPopover = () => {
	const intl = useIntl()
	const anchorRef = useRef(null)
	const [open, setOpen] = useState(false)
	const {
		readNotifications,
		unReadNotifications,
		totalRead,
		totalUnRead,

		handleConfirm,
		handleEnter,
		handleMarkAllAsRead
	} = useContext(NotificationContext)

	const handleOpen = () => {
		setOpen(true)
		handleMarkAllAsRead()
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<IconButton ref={anchorRef} size="large" color="primary" onClick={handleOpen}>
				<Badge color="error" badgeContent={totalUnRead} max={5}>
					{totalUnRead > 0 ? <FilledBell /> : <OutlinedBell />}
				</Badge>
			</IconButton>

			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				sx={{ width: 360 }}
			>
				<Grid container alignItems="center" px={2} py={2}>
					<Grid item xs={12} flexGrow={1}>
						<Typography variant="subtitle1">
							{capitalizeLetter(intl.formatMessage({ id: 'notification' }, { length: 2 }))}
						</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary' }}>
							{totalUnRead === 0
								? intl.formatMessage({ id: 'notifications.noNew' })
								: intl.formatMessage(
										{ id: 'notifications.totalUnRead' },
										{ length: totalUnRead }
								  )}
						</Typography>
					</Grid>
				</Grid>

				<Divider />

				<Scrollbar sx={{ maxHeight: { xs: 400 } }}>
					{totalUnRead > 0 && (
						<List
							disablePadding
							subheader={
								<ListSubheader
									disableSticky
									sx={{ pt: 1, px: 2.5, typography: 'overline' }}
								>
									{intl.formatMessage({ id: 'notifications.new.title' })}
								</ListSubheader>
							}
						>
							{unReadNotifications.map(notification => (
								<NotificationItem
									key={notification.id}
									notification={notification}
									handleConfirm={handleConfirm}
									handleEnter={handleEnter}
								/>
							))}
						</List>
					)}

					{totalRead > 0 && (
						<List
							disablePadding
							subheader={
								<ListSubheader
									disableSticky
									sx={{ pt: 1, px: 2.5, typography: 'overline' }}
								>
									{intl.formatMessage({ id: 'notifications.old.title' })}
								</ListSubheader>
							}
						>
							{readNotifications.map(notification => (
								<NotificationItem
									key={notification.id}
									notification={notification}
									handleConfirm={handleConfirm}
									handleEnter={handleEnter}
								/>
							))}
						</List>
					)}
				</Scrollbar>
			</MenuPopover>
		</>
	)
}

export default NotificationsPopover
