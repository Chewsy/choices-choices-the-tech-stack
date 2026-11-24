const URL = process.env.DIRECTUS_URL;

async function directusAuth() {
    const res = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: process.env.DIRECTUS_EMAIL,
            password: process.env.DIRECTUS_PASSWORD,
        }),
    });
    const { data } = await res.json();
    return data.access_token;
}

export default async function () {
    if (!URL || !process.env.DIRECTUS_EMAIL || !process.env.DIRECTUS_PASSWORD) {
        console.warn('Directus creds ontbreken in .env - activiteiten leeg.');
        return [];
    }
    try {
        const token = await directusAuth();
        const schema = ['Bearer', token].join(' ');
        const res = await fetch(`${URL}/items/activiteit?limit=100&fields=id,label,state`, {
            headers: { Authorization: schema },
        });
        if (!res.ok) {
            console.error('Directus items fetch status', res.status);
            return [];
        }
        const { data } = await res.json();
        return data;
    } catch (e) {
        console.error('Directus fetch mislukt:', e);
        return [];
    }
}
