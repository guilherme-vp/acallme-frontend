import React from 'react'

import { LoadingButton } from '@mui/lab'
import { Grid, Hidden, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { MdOutlineSearch as SearchIcon } from 'react-icons/md'

import { SearchInput } from 'components/SearchInput'
import rolesEn from 'data/roles/roles.en.json'
import rolesPtBR from 'data/roles/roles.pt-br.json'
import { useIntl } from 'hooks/useIntl'
import { capitalizeLetter } from 'utils/capitalize-letter'

import * as S from './Search.styled'

export interface SearchProps {
	loading: boolean
	onSearch: () => void
	onSearchInputChange?: (value: string) => void
}

export interface FormSearchProps {
	name?: string
	location: string
	specialties: string[]
}

export const Search = ({ onSearch, loading, onSearchInputChange }: SearchProps) => {
	const intl = useIntl()

	// const { control } = useFormContext<FormSearchProps>()
	const { control } = useForm<FormSearchProps>()

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
												onSearchInputChange(e.target.value)
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
								{intl.formatMessage({ id: 'search.location.label' })}
							</Typography>
						</Grid>
						<Grid item>
							<Controller
								render={({ field: { onChange, value, name, ref } }) => (
									<SearchInput
										name={name}
										fullWidth
										showIcon={false}
										placeholder="Ex: São Paulo"
										ref={ref}
										value={value}
										onChange={e => {
											onChange(e.target.value)
											if (onSearchInputChange) {
												onSearchInputChange(e.target.value)
											}
										}}
									/>
								)}
								control={control}
								name="location"
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
										options={intl.locale === 'en' ? rolesEn : rolesPtBR}
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
				sx={{ marginLeft: 2, padding: 1 }}
				justifyContent="flex-end"
				alignItems="center"
			>
				<Hidden mdDown>
					<S.SearchButton
						onClick={onSearch}
						aria-label="search talents"
						variant="contained"
						color="primary"
						loading={loading}
					>
						<SearchIcon />
					</S.SearchButton>
				</Hidden>
				<Hidden mdUp>
					<LoadingButton variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
						{capitalizeLetter(intl.formatMessage({ id: 'loading' }))}
					</LoadingButton>
				</Hidden>
			</Grid>
		</S.SearchContainer>
	)
}

export default Search