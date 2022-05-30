import styles from './AdminInbox.module.css'
import { useEffect } from 'react'

const AdminInbox = () => {
	
	async function fetchCustomerMessages() {
		console.log(process.env.REACT_APP_PORT)
		const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/api/getcustomermessages`).catch((error) => console.log(error))
		const data = await res.json()
		console.log(data)
	}
	
	useEffect(() => {
		fetchCustomerMessages()
	}, [])
	
	return (
		<p>I am the AdminInbox</p>
	)
}

export default AdminInbox
