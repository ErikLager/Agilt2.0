import { useState, useEffect } from 'react'
import styles from './Button.module.css'
import { cleanUpInput, replaceSpecialCharacters } from '../../hooks/stringUtils'

const SearchBox = ({ handleSubmit, placeholder }) => {
	const [searchData, setSearchData] = useState('')
	const [allProducts, setAllProducts] = useState([])
	
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
	
	useEffect(() => {
		if (allProducts.length > 0) {
			const filteredArray = filterArray(searchData, allProducts)
			console.log(filterArray(searchData, allProducts))
		}
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