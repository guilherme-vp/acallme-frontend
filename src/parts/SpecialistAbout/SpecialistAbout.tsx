import React from 'react'

import {
	AppBar,
	CircularProgress,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
	Grid,
	Divider,
	Stack,
	Chip
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import {
	MdClose as CloseIcon,
	MdPhone as PhoneIcon,
	MdMail as MailIcon
} from 'react-icons/md'
import { useQuery } from 'react-query'

import { useIntl } from 'hooks'
import { fetchSpecialistById } from 'services/api/specialist'
import { getInitials } from 'utils/get-initials'

import * as S from './SpecialistAbout.styled'

export interface SpecialistAboutProps {
	open: boolean
	handleClose: () => void
	specialistId: number
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="left" ref={ref} {...props} />
})

export const SpecialistAbout = ({
	specialistId,
	handleClose,
	open
}: SpecialistAboutProps) => {
	const { data, isLoading } = useQuery('specialistById', async () =>
		fetchSpecialistById(specialistId)
	)

	const intl = useIntl()

	return (
		<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
			<AppBar sx={{ position: 'relative', border: 0 }}>
				<Toolbar>
					<IconButton edge="start" color="primary" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 3 }} variant="h5" color="primary">
						{intl.formatMessage({ id: 'back' })}
					</Typography>
				</Toolbar>
			</AppBar>
			{isLoading || !data ? (
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item>
						<CircularProgress />
					</Grid>
				</Grid>
			) : (
				<Grid container justifyContent="center" flexDirection="column">
					<Grid
						container
						item
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
						spacing={3}
					>
						<Grid item>
							<S.BigAvatar src={data.avatarUrl}>{getInitials(data.name)}</S.BigAvatar>
						</Grid>
						<Grid item>
							<Typography textAlign="center" variant="h1" fontWeight={700}>
								{data.name}
							</Typography>
						</Grid>
						<Grid item>
							<Stack direction="row" spacing={2}>
								<Typography variant="body1">
									<MailIcon />
									{data.email}
								</Typography>
								<Typography variant="body1">
									<PhoneIcon />
									{data.phone}
								</Typography>
							</Stack>
						</Grid>
						<Grid item>
							<Typography textAlign="center" variant="h3" fontWeight={700}>
								${data.cost}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Divider flexItem />
						</Grid>
						<Grid container item spacing={1} sx={{ maxWidth: '500px' }}>
							<Grid item>
								<Typography variant="h3">
									{intl.formatMessage({ id: 'specialist.about' })}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">{data.about}</Typography>
							</Grid>
						</Grid>
						<Grid container item spacing={1}>
							<Grid item>
								<Typography variant="h3">
									{intl.formatMessage({ id: 'specialist.specialties' })}
								</Typography>
							</Grid>
							<Grid item>
								<Stack spacing={2}>
									{data.specialties?.map(specialty => (
										<Chip label={specialty} />
									))}
								</Stack>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Dialog>
	)
}

export default SpecialistAbout
