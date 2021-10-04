import React, { useState } from 'react'

import { Grid } from '@material-ui/core'
import { BiEnvelope } from 'react-icons/bi'
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { DivLogin, ContainerLogin, Dados, DivButtonDados, DivInfo } from './Login.styled'

const Login = () => {
	const [ativo, setAtivo] = useState(false)

	function olhar() {
		if (ativo === true) {
			setAtivo(false)
		} else {
			setAtivo(true)
		}
	}

	return (
		<DivLogin>
			<ContainerLogin>
				<Grid container justifyContent="center" alignContent="center">
					<Grid
						container
						item
						lg={7}
						justifyContent="center"
						alignItems="center"
						id="imagem"
					>
						<Grid item>
							<img
								src="https://i1.wp.com/sensorweb.com.br/wp-content/uploads/2019/08/header_25_09_19.png?fit=845%2C684&ssl=1"
								alt="medico e paciente"
								style={{ width: '500px' }}
							/>
						</Grid>
					</Grid>

					<Grid
						container
						item
						xs={12}
						md={12}
						lg={5}
						spacing={5}
						justifyContent="center"
						alignItems="center"
					>
						<Grid item>
							<DivInfo>
								<h1>Bem-Vindo !</h1>
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
									consequuntur molestiae exercitationem corporis ullam necessitatibus eum
									voluptatum fugit, nobis ipsa quae. Repellendus corrupti placeat nam ipsam!
									Velit, sapiente ullam! Officiis.
								</p>
							</DivInfo>
						</Grid>

						<Grid container item>
							<form method="get">
								<Grid container item spacing={2}>
									<Grid item xs={12}>
										<Dados>
											<BiEnvelope className="icon" />
											<input type="email" placeholder="Email" name="email" required />
										</Dados>
									</Grid>

									<Grid item xs={12}>
										<Dados>
											<AiOutlineLock className="icon" />
											<input
												type={ativo ? 'text' : 'password'}
												placeholder="Senha"
												name="senha"
												required
											/>
											<div onClick={olhar} className="iconEye">
												{ativo ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
											</div>
										</Dados>
									</Grid>

									<Grid item xs={12}>
										<a href="./">Esqueceu a senha?</a>
									</Grid>

									<Grid item xs={12}>
										<DivButtonDados>
											<input type="submit" name="Login" value="Login" />
											<input type="button" name="Criar conta" value="Criar conta" />
										</DivButtonDados>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Grid>
			</ContainerLogin>
		</DivLogin>
	)
}

export default Login
