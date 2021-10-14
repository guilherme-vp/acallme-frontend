import React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

export interface MailIconProps extends SvgIconProps {}

export const MailIcon = (props: MailIconProps) => (
	<SvgIcon height="24" viewBox="0 0 24 24" width="24" {...props}>
		<defs>
			<linearGradient id="a" x1="0%" x2="100%" y1="37.93%" y2="62.07%">
				<stop offset="0" stopColor="#ffa48d" />
				<stop offset="1" stopColor="#b72136" />
			</linearGradient>
			<path
				id="b"
				d="m2.15609375.29484375h12.00031245c1.1045695 0 2 .8954305 2 2v15.99953125h-16.00031245v-15.99953125c0-1.1045695.8954305-2 2-2z"
			/>
			<mask id="c" fill="#fff">
				<use fill="#fff" fillRule="evenodd" xlinkHref="#b" />
			</mask>
		</defs>
		<g fill="none" fillRule="evenodd">
			<path d="m24 9.585-.703 8.935h-22.594l-.703-8.935 4-2.857h16z" fill="url(#a)" />
			<g transform="translate(3.844 .719)">
				<use fill="#d0f2ff" xlinkHref="#b" />
				<path
					d="m3.21345312 3.02020312h4.74279688c.11045695 0 .2.08954306.2.2v1.00625c0 .11045695-.08954305.2-.2.2h-4.74279688c-.11045694 0-.2-.08954305-.2-.2v-1.00625c0-.11045694.08954306-.2.2-.2zm.00014063 3.42839063h9.88531245c.110457 0 .2.08954305.2.2v1.00625c0 .11045695-.089543.2-.2.2h-9.88531245c-.11045695 0-.2-.08954305-.2-.2v-1.00625c0-.11045695.08954305-.2.2-.2zm0 3.4284375h9.88531245c.110457 0 .2.08954305.2.19999995v1.00625c0 .110457-.089543.2-.2.2h-9.88531245c-.11045695 0-.2-.089543-.2-.2v-1.00625c0-.1104569.08954305-.19999995.2-.19999995z"
					fill="#74caff"
					mask="url(#c)"
				/>
			</g>
			<path d="m24 9.585v13.714l-12-1.115-12 1.115v-13.714l9.6 6.857h4.8z" fill="#ffa48d" />
			<path d="m24 9.585v13.714l-12-1.115v-5.742h2.4z" fill="#ff4842" />
			<path d="m24 23.299h-24l12-8.571z" fill="#ff4842" />
			<path d="m24 23.299h-12v-8.571z" fill="#b72136" />
		</g>
	</SvgIcon>
)

export default MailIcon