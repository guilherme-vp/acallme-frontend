import React from 'react'
import { Link } from 'react-scroll'

interface SmoothLinkProps {
	sectionId: string
	duration?: number
	offset?: number
}

export const SmoothLink: React.FC<SmoothLinkProps> = ({
	sectionId,
	duration = 500,
	offset = -100,
	children
}) => (
	<Link offset={offset} to={sectionId} spy smooth duration={duration}>
		{children}
	</Link>
)

export default SmoothLink
