import styles from './WishlistButton.modules.css'

const WishlistButton = ({ onClick }) => {
	
	return (
		<a
			type="button"
            className='WLButton'
			onClick={onClick}
		>
           &#x2764; Wishlist &#x2764;
		</a>
	)
}

export default WishlistButton;