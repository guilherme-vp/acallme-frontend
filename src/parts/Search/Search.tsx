import React from 'react'

import { LoadingButton } from '@mui/lab'
import { Grid, Hidden, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { MdOutlineSearch as SearchIcon } from 'react-icons/md'

import { SearchInput } from 'components/SearchInput'
import roles from 'data/roles/roles.json'
import { useIntl } from 'hooks/useIntl'
import { capitalizeLetter } from 'utils/capitalize-letter'

import * as S from './Search.styled'

export interface SearchProps {
	loading: boolean
	onSearch: () => void
	onSearchInputChange: () => void
}

export interface FormSearchProps {
	name?: string
	specialties: string[]
}

export const Search = ({ onSearch, loading, onSearchInputChange }: SearchProps) => {
	const intl = useIntl()

	const { control } = useFormContext<FormSearchProps>()

	const handleKeyDown: React.KeyboardEventHandler<
		HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
	> = e => {
		if (e.key === 'Enter') {
			onSearch()
		}
	}

	return (
		<S.SearchContainer container justifyContent="space-between" alignItems="center">
			<Grid container item xs>
				<Grid container alignItems="center" spacing={1}>
					<Grid container item xs={12} md flexDirection="column">
						<Grid item>
							<Typography variant="body2" color="GrayText">
								{intl.formatMessage({ id: 'search.name.label' })}
							</Typography>
						</Grid>
						<Grid item>
							<Controller
								name="name"
								render={({ field: { name, onChange, ref, value } }) => (
									<SearchInput
										name={name}
										fullWidth
										showIcon={false}
										placeholder="Ex: Guilherme"
										onKeyDown={value ? handleKeyDown : undefined}
										ref={ref}
										value={value}
										onChange={e => {
											onChange(e.target.value)
											if (onSearchInputChange) {
												onSearchInputChange()
											}
										}}
									/>
								)}
								control={control}
							/>
						</Grid>
					</Grid>
					<Grid container item xs={12} md flexDirection="column">
						<Grid item>
							<Typography variant="body2" color="GrayText">
								{intl.formatMessage({ id: 'search.specialty.label' })}
							</Typography>
						</Grid>
						<Grid item>
							<Controller
								render={({ field: { onChange, value, name, ref } }) => (
									<S.StyledAutocomplete
										multiple
										freeSolo
										options={roles}
										value={value}
										fullWidth
										onChange={(_, res) => {
											onChange(res)
										}}
										renderInput={params => (
											<S.SearchInput
												{...params}
												InputProps={{
													...params.InputProps,
													sx: { border: 0 }
												}}
												name={name}
												inputRef={ref}
												variant="standard"
												fullWidth
												placeholder={intl.formatMessage({
													id: 'search.specialty.placeholder'
												})}
											/>
										)}
									/>
								)}
								control={control}
								name="specialties"
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				container
				item
				xs={12}
				md="auto"
				sx={{ marginLeft: 2, marginTop: 1.5 }}
				justifyContent="flex-end"
				alignItems="flex-end"
			>
				{/* <Hidden mdDown> */}
				<S.SearchButton
					onClick={onSearch}
					aria-label="search talents"
					variant="contained"
					color="primary"
					loading={loading}
				>
					<SearchIcon />
				</S.SearchButton>
				{/* </Hidden> */}
				{/* <Hidden mdUp> */}
				<LoadingButton
					loading={loading}
					variant="contained"
					color="primary"
					fullWidth
					sx={{ mt: 1 }}
				>
					{capitalizeLetter(intl.formatMessage({ id: loading ? 'loading' : 'search' }))}
				</LoadingButton>
				{/* </Hidden> */}
			</Grid>
		</S.SearchContainer>
	)
}

export default Search
