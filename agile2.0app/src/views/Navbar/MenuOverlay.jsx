import styles from './Navbar.module.css'

const MenuOverlay = () => {
	
	return (
		<div className={`${styles.menuOverlay}`}>
			<a href=''>Home</a>
			<a href=''>Sneakers</a>
			<a href=''>Shirts</a>
			<a className={`${styles.listItem}`} href=''>Pants</a>
		</div>
	)
}

export default MenuOverlay;