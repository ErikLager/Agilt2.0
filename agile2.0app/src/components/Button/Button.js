import styles from './Button.module.css'
const primary = styles.primary
const big = styles.big

const Button = () => {
	return (
		<button className={`${big} ${primary}`}>Button</button>
	)
}

export default Button;