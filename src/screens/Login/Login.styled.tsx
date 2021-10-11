import styled from '@mui/styled-engine-sc'

export const DivLogin = styled.div`
	width: 100vw;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const ContainerLogin = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 10px;
	padding: 0 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	#imagem {
		img {
			width: 70%;
		}
	}
	@media (max-width: 1280px) {
		#imagem {
			display: none;
		}
	}

	@media (max-width: 960px) {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 0;
		padding: 0 16px;
	}
`

export const Dados = styled.div`
	position: relative;
	justify-content: space-around;
	align-items: center;

	input {
		width: 100%;
		border: 2px solid #aaa;
		background-color: #ffffffb0;
		outline: none;
		border-radius: 4px;
		padding: 8px 24px;
		transition: 0.3s;
		&:focus {
			border-color: ${props => props.theme.input.borderFocus};
			background-color: #f3f1f1;
		}
	}
	.icon {
		position: absolute;
		top: 10px;
		left: 8px;
	}
	.iconEye {
		position: absolute;
		top: 10px;
		right: 8px;
		svg {
			cursor: pointer;
		}
	}
`

export const DivInfo = styled.div`
	width: 100%;
	h1 {
		margin-bottom: 16px;
	}
	p {
		text-align: justify;
	}
`

export const DivButtonDados = styled.div`
	display: flex;
	width: 80%;
	button {
		background-color: ${props => props.theme.button.background};
		color: ${props => props.theme.button.color};
		width: 40%;
		margin-right: 16px;
		&:hover {
			background-color: ${props => props.theme.button.hover};
		}
		a {
			width: 40%;
		}
	}
`
