import styles from './AdminCreateCategory.module.css'
import { useEffect, useState } from 'react'

const AdminCreateCategory = () => {
	const [postWasSent, setPostWasSent] = useState(false)
	const [postError, setPostError] = useState(false)
	
	const [formData, setFormData] = useState({
		name: ''
	})
	
	const onSubmit = (e) => {
		e.preventDefault()
		console.log(formData)
		postCategory(formData)
		resetFormData()
	}
	
	async function postCategory(categoryData) {
		console.log(categoryData)
		const res = await fetch(`http://localhost:5002/api/newcategory`, {
			method: 'post',
			body: JSON.stringify({
				name: categoryData.name
			}),
			headers: {
				"Content-Type": "application/json"
			},
		})
		const data = await res.json()
		if (!data.msg.msgError) {
			console.log('It is cool bro, new category added!')
			setPostWasSent(true)
		} else {
			setPostError(true)
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
		})
	}
	
	return (
		<>
			<div className={styles.container}>
				<h2>Create new category here!</h2>
				<form onSubmit={onSubmit} className="contactus-form">
					<div className="form-group">
						<label htmlFor="name">Enter category name</label>
						<input
							type="text"
							name='name'
							className="form-control"
							onChange={handleInput}
							value={formData.name}
							onFocus={() => setPostWasSent(false)}
						/>
					</div>
					<button className="Submit-btn">Submit</button>
					{postWasSent && <p>Cool! New category was added!</p>}
					{postError && <p>Hmmm, couldn't set category right now.</p>}
				</form>
			</div>
		</>
	)
}

export default AdminCreateCategory
