/*--------------- EXCEPTIONS ----------------*/

class HttpRequestError extends Error {
	constructor() {
		super();
		Object.setPrototypeOf(this, HttpRequestError.prototype);
	}
}

class IntegrationInitError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, IntegrationInitError.prototype);
	}
}

class InvalidCallbackDataError extends Error {
	constructor() {
		super();
		Object.setPrototypeOf(this, InvalidCallbackDataError.prototype);
	}
}

class CallbackTikTokError extends Error {
	constructor(error: string, errorDescription?: string) {
		super(errorDescription);
		this.name = error;
		Object.setPrototypeOf(this, CallbackTikTokError.prototype);
	}
}

class CallbackValidationError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, CallbackValidationError.prototype);
	}
}

class UnauthorizedError extends Error {}

/*----------------- EXPORTS -----------------*/

export {
	HttpRequestError,
	IntegrationInitError,
	CallbackTikTokError,
	InvalidCallbackDataError,
	CallbackValidationError,
	UnauthorizedError,
};
