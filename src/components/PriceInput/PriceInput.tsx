import React, { forwardRef } from 'react'
import NumberFormat from 'react-number-format'

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void
	name: string
}

export const NumberFormatCustom = forwardRef<NumberFormat, CustomProps>(
	function NumberFormatCustom(props, ref) {
		const { onChange, ...other } = props

		return (
			<NumberFormat
				{...other}
				getInputRef={ref}
				onValueChange={values => {
					onChange({
						target: {
							name: props.name,
							value: values.value
						}
					})
				}}
				thousandSeparator
				isNumericString
				prefix="$"
			/>
		)
	}
)

export default NumberFormatCustom
