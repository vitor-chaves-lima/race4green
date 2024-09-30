function ensureHttps(url: string) {
	if (/^localhost(:\d+)?$/i.test(url)) {
		return new URL(`http://${url}`);
	}

	return new URL(url);
}

/*---------------- CONST'S ------------------*/

const API_GATEWAY_URL = ensureHttps(import.meta.env.VITE_API_GATEWAY_URL);

/*----------------- EXPORTS -----------------*/

export { API_GATEWAY_URL };
