export const getWeatherData = async () => {
    try {
        const response = await fetch('https://opendata-download-metobs.smhi.se/api/version/latest/parameter/4.json');
        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const result = await response.json();
        console.log(result)
        return result;
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}