import React, { useState } from 'react'
import { Grid, Button, IconButton } from '@mui/material'
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiEnvelope } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { FaTransgenderAlt, FaBaby } from 'react-icons/fa'
import { HiOutlineIdentification } from 'react-icons/hi'
import { useIntl } from 'hooks'
import { ContainerSign, Dados, DivSubmit } from './SingUp.styled'
import telefone from './img/telefone.svg'
import { Link } from 'react-router-dom'

const SignUpPatient = () => {
	const intl = useIntl()
	const [active, setActive] = useState(false)

	function look() {
		if (active === true) {
			setActive(false)
		} else {
			setActive(true)
		}
	}

	return (
		<ContainerSign>
			<Grid container spacing={2}>
				<Grid item lg={8} id="imagem">
					<img
						src="https://www.epays.com.br/wp-content/uploads/2020/09/img2-1024x683.png"
						alt="person-with-notebook"
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
							{intl.formatMessage({ id: 'signupPatient.title' })}
						</h1>

						<form>
							<Dados>
								<input
									type="text"
									name="name"
									placeholder={intl.formatMessage({ id: 'signupPatient.option.name' })}
									required
								/>
								<BsPerson className="icon" />
							</Dados>

							<Dados>
								<input type="email" name="email" placeholder="Email" required />
								<BiEnvelope className="icon" />
							</Dados>

							<Dados>
								<input
									type={active ? 'text' : 'password'}
									placeholder={intl.formatMessage({ id: 'signupPatient.option.senha' })}
									name="password"
									required
								/>
								<AiOutlineLock className="icon" />
								<IconButton onClick={look} className="iconEye">
									{active ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
								</IconButton>
							</Dados>

							<Dados>
								<input type="date" id="dtNascimento" required />
								<FaBaby className="icon" />
							</Dados>

							<Dados>
								<select name="gender" id="genero" required>
									<option value="h">
										{intl.formatMessage({ id: 'signupPatient.option.genre.man' })}
									</option>
									<option value="m">
										{intl.formatMessage({ id: 'signupPatient.option.genre.woman' })}
									</option>
									<option value="nb">
										{intl.formatMessage({ id: 'signupPatient.option.genre.nb' })}
									</option>
								</select>
								<FaTransgenderAlt className="icon" />
							</Dados>

							<Dados>
								<HiOutlineIdentification className="icon" />
								<input type="number" name="cpf" placeholder="CPF" />
							</Dados>

							<Dados>
								<img src={telefone} alt="telefone" className="icon" />
								<input
									type="number"
									name="cellphone"
									placeholder={intl.formatMessage({ id: 'signupPatient.option.cellphone' })}
								/>
							</Dados>

							<DivSubmit>
								<Button type="submit">
									{intl.formatMessage({ id: 'signupPatient.submit' })}
								</Button>
								<Link to="/login">
									{intl.formatMessage({ id: 'signupPatient.a.login' })}
								</Link>
							</DivSubmit>
						</form>
					</Grid>
				</Grid>
			</Grid>
		</ContainerSign>
	)
}

export default SignUpPatient
