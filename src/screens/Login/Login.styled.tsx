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

<<<<<<< HEAD
	a {
		text-decoration: none;
		color: #0c99ac;
	}
=======
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
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
<<<<<<< HEAD
		body {
			overflow-x: hidden;
		}
=======
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
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
<<<<<<< HEAD
		padding: 8px 40px;
		transition: 0.3s;
		:focus {
			border-color: #0c99ac;
			background-color: #f3f1f1;
		}
	}

	.icon {
		position: absolute;
		top: 10px;
		left: 0px;
		padding: 0px 14px;
=======
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
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
	}
	.iconEye {
		position: absolute;
		top: 10px;
<<<<<<< HEAD
		right: 0px;
		padding: 0px 14px;
=======
		right: 8px;
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
		svg {
			cursor: pointer;
		}
	}
<<<<<<< HEAD
	@media (max-width: 1280px) {
		.icon {
			padding: 0px 8px;
		}
		input {
			padding: 8px 24px;
		}
	}
=======
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
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
<<<<<<< HEAD
	input,
	button {
		background-color: #ffffffb0;
		padding: 8px;
		width: 40%;
		border-radius: 16px;
		border: 1px solid black;
		color: black;
		margin-right: 16px;
		cursor: pointer;
		:hover {
			background-color: #0c99ac;
			color: white;
=======
	button {
		background-color: ${props => props.theme.button.background};
		color: ${props => props.theme.button.color};
		padding: 8px;
		width: 40%;
		margin-right: 16px;
		&:hover {
			background-color: ${props => props.theme.button.hover};
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
		}
	}
`
