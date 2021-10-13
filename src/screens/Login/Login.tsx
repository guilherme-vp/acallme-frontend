import React, { useState } from 'react'

import { Grid, Button, IconButton } from '@mui/material'
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiEnvelope } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useTheme } from 'styled-components'

import { useIntl } from 'hooks'
import { SIGNUP } from 'routes'

import { DivLogin, ContainerLogin, Dados, DivButtonDados, DivInfo } from './Login.styled'

export const Login = () => {
	const intl = useIntl()
	const [active, setActive] = useState(false)

	const theme = useTheme()

	function look() {
		if (active === true) {
			setActive(false)
		} else {
			setActive(true)
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
						<img
							src="https://i1.wp.com/sensorweb.com.br/wp-content/uploads/2019/08/header_25_09_19.png?fit=845%2C684&ssl=1"
							alt="specialists-patients"
						/>
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
								<h1>{intl.formatMessage({ id: 'login.welcome' })}</h1>
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
									consequuntur molestiae exercitationem corporis ullam necessitatibus eum
									voluptatum fugit, nobis ipsa quae. Repellendus corrupti placeat nam ipsam!
									Velit, sapiente ullam! Officiis.
								</p>
							</DivInfo>
						</Grid>

						<Grid container item>
							<form>
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
												type={active ? 'text' : 'password'}
												placeholder={intl.formatMessage({ id: 'login.option.password' })}
												name="password"
												required
											/>
											<IconButton onClick={look} className="iconEye">
												{active ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
											</IconButton>
										</Dados>
									</Grid>

									<Grid item xs={12}>
										<a href="./" style={{ color: theme.text.link }}>
											{intl.formatMessage({ id: 'login.a.forgetPassword' })}
										</a>
									</Grid>

									<Grid item xs={12}>
										<DivButtonDados>
											<Button type="submit" name="login">
												{intl.formatMessage({ id: 'login.submit' })}
											</Button>
											<Link to={SIGNUP}>
												<Button name="create-account">
													{intl.formatMessage({ id: 'login.createAccount' })}
												</Button>
											</Link>
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
