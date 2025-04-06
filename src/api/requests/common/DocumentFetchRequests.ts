export const fetchPrintFile = async (processInstance: string, code: string) => {
    const fileUrl = `${import.meta.env.VITE_API_URL}/credit-card/bundled/external-verification/letters/${processInstance}?code=${code}`;

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Authorization token not found");
        }

        const response = await fetch(fileUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.blob();

    } catch (err) {
        console.error(err)
    }
}