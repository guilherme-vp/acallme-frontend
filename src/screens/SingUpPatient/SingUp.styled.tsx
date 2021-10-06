import styled from 'styled-components'

export const ContainerSign = styled.div`
	width: 80%;
	height: 80vh;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	#imagem {
		img {
			width: 500px;
		}
	}
	@media (max-width: 1280px) {
		#imagem {
			display: none;
		}
	}
`

export const Dados = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin: 8px auto;
	input,
	select {
		border: 2px solid #aaa;
		background-color: #ffffffb0;
		outline: none;
		border-radius: 4px;
		padding: 8px 30px;
		transition: 0.3s;
		:focus {
			border-color: #0c99ac;
			background-color: #f3f1f1;
		}
	}
	.icon {
		position: absolute;
		top: 10px;
		left: 8px;
		width: 16px;
	}
	.iconEye {
		position: absolute;
		top: 10px;
		right: 8px;
		svg {
			cursor: pointer;
		}
	}
	input[type='date'] {
		padding: 6px 30px;
	}
`

export const DivSubmit = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
	input {
		width: 80%;
		margin-bottom: 8px;
		border: none;
		color: white;
		background-color: #0e63f4;
		outline: none;
		border-radius: 16px;
		padding: 8px;
		:hover {
			background-color: #0844ac;
		}
	}
`
