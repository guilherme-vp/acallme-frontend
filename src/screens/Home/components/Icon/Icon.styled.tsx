import styled from 'styled-components'

export const Icon = styled.img`
	width: 45px;
	height: 45px;
	/* Credits to: MultiplyByZer0 */
	/* https://stackoverflow.com/questions/42966641/how-to-transform-black-into-any-given-color-using-only-css-filters/43960991#43960991 */
	filter: invert(62%) sepia(53%) saturate(3730%) hue-rotate(189deg) brightness(92%)
		contrast(91%);
`
