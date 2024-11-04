export async function fetchProjectsData() {
    try {
        const response = await fetch('js/content/projectData.json');
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error(error);
        return [];
    }
}
