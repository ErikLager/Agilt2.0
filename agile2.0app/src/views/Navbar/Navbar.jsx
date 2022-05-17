import styles from './Navbar.module.css'
import { useState } from 'react'
import MenuOverlay from './MenuOverlay'
const container = styles.container


const Navbar = () => {
	const [menuIsOverlayed, setMenuIsOverlayed] = useState(false)
	
	return (
		<nav className={`${container}`}>
			<div className={styles.left}>
				<h1>Cool&nbsp;Fashion</h1>
				<a className={`${styles.current} ${styles.navbarItem}`} href=''>Home</a>
				<a className={`${styles.navbarItem}`} href=''>Sneakers</a>
				<a className={`${styles.navbarItem}`} href=''>Shirts</a>
				<a className={`${styles.navbarItem}`} href=''>Pants</a>
			</div>
			<div className={styles.right}>
				<button>Cart</button>
				<button className={styles.menuButton} onClick={() => setMenuIsOverlayed(!menuIsOverlayed)}>Menu</button>
			</div>
			{menuIsOverlayed && <MenuOverlay />}
		</nav>
	)
}

export default Navbar;