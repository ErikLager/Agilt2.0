import { useState, useEffect } from 'react'
import styles from './Button.module.css'
import { cleanUpInput, replaceSpecialCharacters } from '../../hooks/stringUtils'
import { useNavigate } from 'react-router-dom'

const SearchBox = ({ handleSubmit, placeholder }) => {
	const [searchData, setSearchData] = useState('')
	const [allProducts, setAllProducts] = useState([])
	const navigate = useNavigate()
	
	const getProducts = async () => {
			const res = await fetch('http://localhost:5002/api/getproducts')
			const data = await res.json()
			console.log(data.products)
			setAllProducts(data.products)
	}
	
	function onSubmit(e) {
		e.preventDefault()
		console.log(searchData)
		getProducts()
	}
	
	function handleInput(e) {
		setSearchData(e.target.value)
	}
	
	function filterArray(inputValue, inputArray) {
		let value = inputValue
		const filteredArray = inputArray.filter((product) => {
			const productName = replaceSpecialCharacters(
				product.name.toLowerCase()
			)
			value = replaceSpecialCharacters(value)
			value = cleanUpInput(value)
			return productName.includes(value.toLowerCase())
		})
		return filteredArray;
	}
	
	const navigateAway = (data) => {
		console.log('hello')
		navigate('/sneakers', {state: {
			searchData,
			data,
		}})
	}
	
	useEffect(() => {
		const filteredArray = filterArray(searchData, allProducts)
		console.log(filterArray(searchData, allProducts))
		navigateAway(filteredArray)
	}, [allProducts])
	
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