import { useState } from 'react'
import './Contactus.css'

const Contactus = () => {
	const [messageSent, setMessageSent] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	})
	
	const sendMessage = (e) => {
		e.preventDefault()
		console.log(formData)
		postMessage(formData)
		resetFormData()
	}
	
	async function postMessage(messageData) {
		console.log(messageData)
		const res = await fetch('http://localhost:5003/api/newcustomermessage', {
			method: 'post',
			body: JSON.stringify({
				name: messageData.name,
				email: messageData.email,
				message: messageData.message,
				timestamp: Date.now()
			}),
			headers: {
				"Content-Type": "application/json"
			},
		})
		const data = await res.json()
		if (!data.msg.msgError) {
			console.log('it is cool bro')
			setMessageSent(true)
		}
	}
	
	function handleInput(e) {
		console.log(e.target.value)
		console.log(e.target.name)
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	
	function resetFormData() {
		setFormData({
			name: '',
			email: '',
			message: ''
		})
	}
	
  return (
		<div className='contactus-container'>
			{!messageSent && (
			<form onSubmit={sendMessage} className="contactus-form">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name='name'
						className="form-control"
						onChange={handleInput}
						value={formData.name}
					/>
				</div>
			 	<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						name='email'
						className="form-control"
						aria-describedby="emailHelp"
						onChange={handleInput}
						value={formData.email}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="message">Message</label>
					<textarea
						name='message'
						className="form-control"
						rows="5"
						onChange={handleInput}
						value={formData.message}
					></textarea>
				</div>
				<button className="Submit-btn">Submit</button>
			</form>
			)}
			{messageSent && (
				<>
					<h2>Thank you for your message!</h2>
				</>
			)}
		</div>
  
  )
};

export default Contactus;