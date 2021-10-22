import React, { useState, useCallback } from 'react'

import { CircularProgress, Grid, Pagination, Typography } from '@mui/material'
import debounce from 'lodash.debounce'
import { FormProvider, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

import { SpecialistCard } from 'components/SpecialistCard'
import { useIntl, useStoreon } from 'hooks'
import { Search, FormSearchProps } from 'parts/Search'
import { SpecialistAbout } from 'parts/SpecialistAbout'
import { fetchSpecialists } from 'services/api/specialist'
import { Specialist } from 'services/entities'

import { SearchContainer } from './Specialists.styled'

export const Specialists = () => {
	const intl = useIntl()
	const [open, setOpen] = useState(false)
	const [specialist, setSpecialist] = useState<Specialist>()
	const [page, setPage] = useState(1)
	const { user, loading } = useStoreon('user')
	const formMethods = useForm<FormSearchProps>({
		defaultValues: { name: '', specialties: [] }
	})
	const { getValues } = formMethods
	const { data, isLoading, refetch } = useQuery(
		['specialists', page],
		() => fetchSpecialists({ ...getValues(), page, limit: 9 }),
		{ keepPreviousData: true, refetchOnWindowFocus: false }
	)
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const debouncedSearch = useCallback(
		debounce(() => refetch(), 300),
		[]
	)

	if (!user || loading) {
		return (
			<Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
				<CircularProgress />
			</Grid>
		)
	}

	const handleChangePage = (pageNumber: number) => {
		setPage(pageNumber)
	}

	const handleSearch = () => {
		if (page !== 1) {
			setPage(1)
		}

		return refetch()
	}

	const handleOpenDetails = (id: number) => {
		const foundSpecialist = data?.find(({ id: specialistId }) => specialistId === id)

		if (foundSpecialist) {
			setSpecialist(foundSpecialist)
			setOpen(true)
		}
	}
	const handleCloseDetails = () => {
		setOpen(false)
	}

	return (
		<Grid container>
			<Grid item mb={3}>
				<Typography variant="display2">
					{intl.formatMessage({ id: 'dashboard.welcome' }, { name: user.name })}
				</Typography>
			</Grid>
			<FormProvider {...formMethods}>
				<Grid container>
					<SearchContainer>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Typography
									variant="body1"
									color="text.secondary"
									fontWeight={600}
									sx={{ maxWidth: '600px' }}
								>
									{intl.formatMessage({ id: 'dashboard.findTheBest' })}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<Search
									loading={isLoading}
									onSearch={handleSearch}
									onSearchInputChange={debouncedSearch}
								/>
							</Grid>
						</Grid>
					</SearchContainer>
				</Grid>

				<Grid container mt={3}>
					{isLoading ? (
						<Grid
							container
							justifyContent="center"
							alignItems="center"
							sx={{ height: '100%' }}
						>
							<CircularProgress />
						</Grid>
					) : (
						data && (
							<>
								<Grid item xs={12}>
									<Typography variant="h1" color="text.primary">
										{intl.formatMessage({ id: 'dashboard.forYou' })}
									</Typography>
								</Grid>
								<Grid item xs={12} mt={0.5}>
									<Typography variant="h5" color="GrayText">
										{intl.formatMessage(
											{ id: 'search.result' },
											{ pageTotal: data?.length }
										)}
									</Typography>
								</Grid>
								{data.length > 0 && (
									<Grid container item mt={2} justifyContent="flex-end">
										<Pagination
											count={data.length >= page * 6 ? page + 1 : page}
											page={page}
											onChange={(_e, newValue) => handleChangePage(newValue)}
										/>
									</Grid>
								)}
								<Grid container item spacing={3} mt={0}>
									{data.map(eachSpecialist => (
										<Grid item key={eachSpecialist.id} xs={12} sm="auto">
											<SpecialistCard {...eachSpecialist} onBook={handleOpenDetails} />
										</Grid>
									))}
								</Grid>
							</>
						)
					)}
				</Grid>
				{specialist && (
					<SpecialistAbout
						specialist={specialist}
						handleClose={handleCloseDetails}
						open={open}
						userId={user.id as number}
					/>
				)}
			</FormProvider>
		</Grid>
	)
}

export default Specialists
