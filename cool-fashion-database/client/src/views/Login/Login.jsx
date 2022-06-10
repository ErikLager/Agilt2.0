import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { useEffect, useState } from 'react'

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	
	const [authenticated, setAuthenticated] = useState(null)
	let navigate = useNavigate()
	
	async function logIn(e) {
		e.preventDefault()
		try {
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
			if (res.status !== 401) {
				const data = await res.json();
				setAuthenticated(data)
				navigate('/admin')
			} else {
				throw "Wrong username or password";
			}
		} catch (error) {
			console.error("Error: ", error);
		}
	}
	
	function handleInput(e) {
		console.log(e.target.value)
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	
	async function checkAuthentication() {
		console.log('Checking!')
		try {
			const res = await fetch(`/api/authenticated`)
			if (res.status !== 401) {
				const data = await res.json()
				setAuthenticated(data)
			} else {
				throw 'You are not logged in!'
			}
		} catch (error) {
			console.error("Error: ", error);
		}
	}
	
	async function logOut() {
		try {
			const res = await fetch(`/api/logout`)
			if (res.status !== 401) {
				const data = await res.json()
				console.log(data)
				setAuthenticated(null)
			} else {
				throw "You need to be logged in in order to log out";
			}
		} catch (error) {
			console.error("Error: ", error)
		}
	}
	
	useEffect(() => {
		checkAuthentication()
	}, [])
	
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Alright this is the admin login</h1>
			{authenticated && <h2>YOU ARE LOGGED IN</h2>}
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
			</form>
			<button onClick={() => checkAuthentication()}>Check</button>
			<button onClick={() => logOut()}>Log out</button>
		</div>
	)
}

export default Login
