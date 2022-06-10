export async function checkAuthentication() {
	console.log('Checking!')
	try {
		const res = await fetch(`/api/authenticated`)
		if (res.status !== 401) {
			const data = await res.json()
			return data
		} else {
			throw 'You are not logged in!'
		}
	} catch (error) {
		console.error("Error: ", error);
	}
}