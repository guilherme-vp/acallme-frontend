import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`

export const Table = styled.table`
	border-spacing: 8px;
	border-collapse: separate;
	width: 100%;
`

export const TData = styled.td`
	text-align: center;
`

export const TBody = styled.tbody`
	&::before {
		line-height: 16px;
		content: ' ';
		display: block;
	}
`
