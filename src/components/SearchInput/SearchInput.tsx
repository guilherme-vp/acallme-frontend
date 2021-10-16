import React from 'react'

import type { InputBaseProps } from '@mui/material/InputBase'
import { MdOutlineSearch as SearchIcon } from 'react-icons/md'

import { pxToRem } from 'utils/px-to-rem'

import { SearchContainer, SearchInputBase } from './SearchInput.style'

export interface SearchInputProps extends Omit<InputBaseProps, 'ref'> {
	containerStyle?: React.CSSProperties
	showIcon?: boolean
}

export const SearchInput = React.forwardRef(
	({ containerStyle, showIcon = true, ...props }: SearchInputProps, ref) => (
		<SearchContainer style={{ fontSize: pxToRem(16), ...containerStyle }}>
			{showIcon && <SearchIcon style={{ fontSize: 'inherit' }} />}
			{/* @ts-ignore */}
			<SearchInputBase {...props} ref={ref} />
		</SearchContainer>
	)
)

export default SearchInput
