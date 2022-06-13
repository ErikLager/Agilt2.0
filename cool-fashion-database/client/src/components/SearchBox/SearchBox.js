import { useState } from 'react'
import styles from './Button.module.css'

const SearchBox = ({ handleSubmit, placeholder }) => {
	const [searchData, setSearchData] = useState('')
	
	function onSubmit(e) {
		e.preventDefault()
		console.log(searchData)
	}
	
	function handleInput(e) {
		setSearchData(e.target.value)
	}
	
	return (
		<form onSubmit={onSubmit}>
			<input
				type='search'
				placeholder={placeholder}
				value={searchData}
				onChange={handleInput}
			/>
		</form>
	)
}

export default SearchBox;