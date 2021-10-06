import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiEnvelope } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { FaTransgenderAlt, FaBaby } from 'react-icons/fa'
import { HiOutlineIdentification } from 'react-icons/hi'
import { ContainerSign, Dados, DivSubmit } from './SingUp.styled'
import telefone from './img/telefone.svg'

const SignUpPatient = () => {
	const [ativo, setAtivo] = useState(false)

	function olhar() {
		if (ativo === true) {
			setAtivo(false)
		} else {
			setAtivo(true)
		}
	}

	return (
		<ContainerSign>
			<Grid container spacing={2}>
				<Grid item lg={8} id="imagem">
					<img
						src="https://www.epays.com.br/wp-content/uploads/2020/09/img2-1024x683.png"
						alt="pessoas"
					/>
				</Grid>

				<Grid
					container
					item
					xs={12}
					lg={4}
					spacing={2}
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs={12}>
						<h1 style={{ textAlign: 'center', marginBottom: '16px', color: '#0e63f4' }}>
							Cadastro de Paciente
						</h1>

						<form action="" method="post">
							<Dados>
								<input type="text" name="nome" placeholder="Nome Completo" required />
								<BsPerson className="icon" />
							</Dados>

							<Dados>
								<input type="email" name="email" placeholder="Email" required />
								<BiEnvelope className="icon" />
							</Dados>

							<Dados>
								<input
									type={ativo ? 'text' : 'password'}
									placeholder="Senha"
									name="senha"
									required
								/>
								<AiOutlineLock className="icon" />
								<div onClick={olhar} className="iconEye">
									{ativo ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
								</div>
							</Dados>

							<Dados>
								<input type="date" id="dtNascimento" required />
								<FaBaby className="icon" />
							</Dados>

							<Dados>
								<select name="genero" id="genero" required>
									<option value="h">Homem</option>
									<option value="m">Mulher</option>
									<option value="nb">Não Binário</option>
								</select>
								<FaTransgenderAlt className="icon" />
							</Dados>

							<Dados>
								<HiOutlineIdentification className="icon" />
								<input type="number" name="cpf" placeholder="CPF" />
							</Dados>

							<Dados>
								<img src={telefone} alt="telefone" className="icon" />
								<input type="number" name="telefone" placeholder="Telefone" />
							</Dados>

							<DivSubmit>
								<input type="submit" value="Criar Conta" />
								<a href=".">Já tem uma conta? Faça login</a>
							</DivSubmit>
						</form>
					</Grid>
				</Grid>
			</Grid>
		</ContainerSign>
	)
}

export default SignUpPatient
