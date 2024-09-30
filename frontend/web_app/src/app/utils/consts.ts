function ensureHttps(url: string) {
	if (!/^https?:\/\//i.test(url)) {
		return `https://${url}`;
	}
	return url;
}

/*---------------- CONST'S ------------------*/

const API_GATEWAY_URL = new URL(
	ensureHttps(import.meta.env.VITE_API_GATEWAY_URL),
);

/*----------------- EXPORTS -----------------*/

export { API_GATEWAY_URL };
