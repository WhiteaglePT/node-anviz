module.exports = Object.freeze({
	SUCCESS: 0x00, // operation successful
	FAIL: 0x01, // operation failed
	FULL: 0x04, // user full (whatever that means)
	EMPTY: 0x05, // user empty (whatever that means)
	NO_USER: 0x06, // user doesn't exists
	TIME_OUT: 0x08, // timeout (?)
	USER_OCCUPIED: 0x0A, //user already exists
	FINGER_OCCUPIED: 0x0B //fingerprint already exists
})