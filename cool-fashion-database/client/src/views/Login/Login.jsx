import styles from './Login.module.css'
import { useEffect, useState } from 'react'

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	
	const [authenticated, setAuthenticated] = useState(null)
	
	async function logIn(e) {
		e.preventDefault()
		const res = await fetch(`/api/login`, {
			method: 'post',
			body: JSON.stringify({
				username: `${formData.username}`,
				password: `${formData.password}`
			}),
			headers: {
				"Content-Type": "application/json"
			},
		})
		const data = await res.json()
		console.log(data)
		console.log(formData)
	}
	
	function handleInput(e) {
		console.log(e.target.value)
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	
	async function checkAuthentication() {
		console.log('Checking!')
		const res = await fetch(`/api/authenticated`)
		const data = await res.json()
		setAuthenticated(data)
	}
	
	useEffect(() => {
		// checkAuthentication()
		if (authenticated) {
			console.log(authenticated)			
		}
	})
	
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Alright this is the admin login</h1>
			<form className={styles.form} onSubmit={logIn}>
				<label>Username</label>
				<input
					name='username'
					style={styles.formInputStyle}
					onChange={handleInput}
					value={formData.username}
					required
				/>
				<label>Password</label>
				<input
					name='password'
					style={styles.formInputStyle}
					type='password'
					onChange={handleInput}
					value={formData.password}
					required />
				<button
					style={styles.loginButtonStyle}
					type='submit'
				>
					Log In
				</button>
				<button onClick={() => checkAuthentication()}>check</button>
			</form>
		</div>
	)
}

export default Login
