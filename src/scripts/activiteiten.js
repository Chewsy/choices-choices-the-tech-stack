export async function fetchActiviteiten() {
	const { DIRECTUS_URL, DIRECTUS_EMAIL, DIRECTUS_PASSWORD } = import.meta.env;

	if (!DIRECTUS_URL || !DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
		console.warn("Directus credentials niet gevonden — lege lijst.");
		return [];
	}

	const loginRes = await fetch(`${DIRECTUS_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD }),
	});
	if (!loginRes.ok) throw new Error(`login mislukt: ${loginRes.status}`);
	const { data } = await loginRes.json();
	const token = data.access_token;

	const itemsRes = await fetch(`${DIRECTUS_URL}/items/activiteit?limit=100&fields=id,label,state`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!itemsRes.ok) throw new Error(`items mislukt: ${itemsRes.status}`);
	const { data: activiteiten } = await itemsRes.json();
	return activiteiten;
}
