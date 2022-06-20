import styles from './WishlistButton.modules.css'

const AddToWishlistButton = ({ onClick }) => {
	
	return (
		<a
			type="button"
            className='WLButton'
			onClick={onClick}
		>
           &#x2764; Add To Wishlist &#x2764;
		</a>
	)
}

export default AddToWishlistButton;