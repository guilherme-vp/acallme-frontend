import styled from 'styled-components'

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

	a {
		text-decoration: none;
		color: #0c99ac;
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
		body {
			overflow-x: hidden;
		}
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
		:focus {
			border-color: #0e63f4;
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
	input,
	button {
		background-color: #0e63f4;
		padding: 8px;
		width: 40%;
		border-radius: 16px;
		border: none;
		color: white;
		margin-right: 16px;
		cursor: pointer;
		:hover {
			background-color: #0947b3;
		}
	}
`
