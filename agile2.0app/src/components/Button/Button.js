import styles from './Button.module.css'
const primary = styles.primary
const medium = styles.medium

const Button = ({ label, onClick }) => {
	
	return (
		<button
			className={`${medium} ${primary}`}
			onClick={onClick}
		>
			{label}
		</button>
	)
}

export default Button;