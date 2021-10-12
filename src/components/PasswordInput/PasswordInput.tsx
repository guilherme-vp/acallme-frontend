import React, { useState, forwardRef } from 'react'

import { TextField, TextFieldProps, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export type PasswordInputProps = TextFieldProps & {
	isCorrect?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	function PasswordInput({ isCorrect, ...props }: PasswordInputProps, ref) {
		const [showPassword, setShowPassword] = useState(false)

		const handleClickShowPassword = () => {
			setShowPassword(!showPassword)
		}

		const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
		}
		return (
			<TextField
				name="password"
				error={!isCorrect}
				type={showPassword ? 'text' : 'password'}
				placeholder="******"
				inputRef={ref}
				{...props}
				InputProps={{
					...props?.InputProps,
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								color="secondary"
								onMouseDown={handleMouseDownPassword}
								onMouseUp={handleMouseDownPassword}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		)
	}
)

export default PasswordInput
