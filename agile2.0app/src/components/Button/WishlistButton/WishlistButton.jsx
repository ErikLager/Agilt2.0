import styles from './WishlistButton.modules.css'

const WishlistButton = ({ onClick }) => {
	
	return (
		<button
            className='WLButton'
			onClick={onClick}
		>
           &#x2764; Wishlist &#x2764;
		</button>
	)
}

export default WishlistButton;