import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const MenuOverlay = ({ children }) => {
	
	return (
		<div className={`${styles.menuOverlay}`}>
			{children}
		</div>
	)
}

export default MenuOverlay;