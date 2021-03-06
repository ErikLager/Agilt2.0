import styles from './AdminInbox.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminInbox = () => {
	const [customerMessages, setCustomerMessages] = useState(null)
	
	async function fetchCustomerMessages() {
		console.log(process.env.REACT_APP_PORT)
		const res = await fetch(`http://localhost:5002/api/getcustomermessages`).catch((error) => console.log(error))
		const data = await res.json()
		setCustomerMessages(data.customerMessages)
	}
	
	useEffect(() => {
		if (customerMessages) {
			console.log(customerMessages)
		}
	})
	
	useEffect(() => {
		fetchCustomerMessages()
	}, [])
	
	return (
		<>
		<div className={styles.container}>
			<h2>Admin inbox</h2>
			<p><Link to='/admin'>Go back to admin</Link></p>
			<ul className={styles.inboxList}>
				{customerMessages && (
					customerMessages.map(message => {
						return (
							<li className={styles.inboxListItem}>
								<h3 className={styles.inboxName}>{message.name}</h3>
								<p>{message.email}</p>
								<p>{message.message}</p>
							</li>
						)
					})
				)}
			</ul>
			{!customerMessages && (
				<p>Loading...</p>			
			)}
			</div>
		</>
	)
}

export default AdminInbox
