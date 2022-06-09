import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useState } from 'react'
import MenuOverlay from './MenuOverlay'
import useWindowDimensions from '../../hooks/useWindowDimensions'
const container = styles.container


const Navbar = () => {
	const [menuIsOverlayed, setMenuIsOverlayed] = useState(false)
	const { width } = useWindowDimensions();
	
	return (
		<nav className={`${container}`}>
				<div className={styles.left}>
					<h1>Cool&nbsp;Fashion</h1>
						{ width > 720 && (
							<>
							<Link className={`${styles.current} ${styles.navbarItem}`} to='/'>Home</Link>
							<Link to='/sneakers' className={`${styles.navbarItem}`}>Sneakers</Link>
							<a className={`${styles.navbarItem}`} href=''>Shirts</a>
							<a className={`${styles.navbarItem}`} href=''>Pants</a>
							</>
						)}
				</div>
				<div className={styles.right}>
					<button>Cart</button>
					{ width < 720 && (
						<button
							className={styles.menuButton}
							onClick={() => setMenuIsOverlayed(!menuIsOverlayed)}
						>
							Menu
						</button>		
					)}
				</div>
			{menuIsOverlayed && (
				<MenuOverlay>
					<>
						<Link
							to='/'
							className={`${styles.current} ${styles.navbarItem}`}
							onClick={() => setMenuIsOverlayed(false)}
							>Home
						</Link>
						<Link
							to='/sneakers'
							className={`${styles.navbarItem}`}
							onClick={() => setMenuIsOverlayed(false)}
							>Sneakers
						</Link>
						<a className={`${styles.navbarItem}`} href=''>Shirts</a>
						<a className={`${styles.navbarItem}`} href=''>Pants</a>
					</>
				</MenuOverlay>	
			)}
		</nav>
	)
}

export default Navbar;