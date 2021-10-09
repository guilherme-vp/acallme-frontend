import React, { useState } from 'react'
<<<<<<< HEAD

import { Grid } from '@material-ui/core'
import { BiEnvelope } from 'react-icons/bi'
=======
import { useIntl } from 'hooks'
import { Grid, Button } from '@material-ui/core'
import { BiEnvelope } from 'react-icons/bi'
import { useTheme } from 'styled-components'
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { DivLogin, ContainerLogin, Dados, DivButtonDados, DivInfo } from './Login.styled'

const Login = () => {
<<<<<<< HEAD
	const [ativo, setAtivo] = useState(false)

	function olhar() {
		if (ativo === true) {
			setAtivo(false)
		} else {
			setAtivo(true)
=======
	const intl = useIntl()
	const [active, setActive] = useState(false)

	const theme = useTheme()

	function look() {
		if (active === true) {
			setActive(false)
		} else {
			setActive(true)
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
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
<<<<<<< HEAD
						<Grid item>
							<img
								src="https://i1.wp.com/sensorweb.com.br/wp-content/uploads/2019/08/header_25_09_19.png?fit=845%2C684&ssl=1"
								alt="medico e paciente"
								style={{ width: '500px' }}
							/>
						</Grid>
=======
						<img
							src="https://i1.wp.com/sensorweb.com.br/wp-content/uploads/2019/08/header_25_09_19.png?fit=845%2C684&ssl=1"
							alt="specialists-patients"
							style={{ width: '80%' }}
						/>
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
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
<<<<<<< HEAD
								<h1>Bem-Vindo !</h1>
=======
								<h1>{intl.formatMessage({ id: 'login.welcome' })}</h1>
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
									consequuntur molestiae exercitationem corporis ullam necessitatibus eum
									voluptatum fugit, nobis ipsa quae. Repellendus corrupti placeat nam ipsam!
									Velit, sapiente ullam! Officiis.
								</p>
							</DivInfo>
						</Grid>

						<Grid container item>
<<<<<<< HEAD
							<form method="get">
=======
							<form>
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
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
<<<<<<< HEAD
												type={ativo ? 'text' : 'password'}
												placeholder="Senha"
												name="senha"
												required
											/>
											<div onClick={olhar} className="iconEye">
												{ativo ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
=======
												type={active ? 'text' : 'password'}
												placeholder={intl.formatMessage({ id: 'login.option.password' })}
												name="senha"
												required
											/>
											<div onClick={look} className="iconEye">
												{active ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
											</div>
										</Dados>
									</Grid>

									<Grid item xs={12}>
<<<<<<< HEAD
										<a href="./">Esqueceu a senha?</a>
=======
										<a href="./" style={{ color: theme.text.link }}>
											{intl.formatMessage({ id: 'login.a.forgetPassword' })}
										</a>
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
									</Grid>

									<Grid item xs={12}>
										<DivButtonDados>
<<<<<<< HEAD
											<input type="submit" name="Login" />
											<button>Criar Conta</button>
=======
											<Button type="submit" name="Login">
												{intl.formatMessage({ id: 'login.submit' })}
											</Button>
											<Button type="button" name="Criar-conta">
												{intl.formatMessage({ id: 'login.createAccount' })}
											</Button>
>>>>>>> c0c4af728b2ad5221a5176263733c43e1c63e232
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
