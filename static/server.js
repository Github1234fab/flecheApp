export async function POST({ request }) {
        try {
                const { token } = await request.json();

                // Logique pour sauvegarder le token dans votre base de données ou ailleurs
                console.log("Token reçu:", token);

                return new Response(JSON.stringify({ message: "Token enregistré avec succès" }), {
                        status: 200,
                        headers: {
                                "Content-Type": "application/json",
                        },
                });
        } catch (error) {
                return new Response(JSON.stringify({ error: "Erreur lors de l'enregistrement du token" }), {
                        status: 500,
                        headers: {
                                "Content-Type": "application/json",
                        },
                });
        }
}
