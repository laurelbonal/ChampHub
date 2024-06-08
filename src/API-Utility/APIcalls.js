import formatChampionName from './Utility';

export const getChamps = async (navigate) => {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching champions:', error);
        navigate('/error', { state: { message: 'Error fetching champions', details: error.message, type: 'api' }, replace: true });
        throw error;
    }
};

export const getChampDetails = async (name, navigate) => {
    const formattedName = formatChampionName(name);
    try {
        const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/${formattedName}.json`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.data[formattedName]) {
            throw new Error(`Champion data for ${name} not found`);
        }
        return data.data[formattedName];
    } catch (error) {
        console.error('Error fetching champion details:', error);
        navigate('/error', { state: { message: `Error fetching details for champion ${name}`, details: error.message, type: 'api' }, replace: true });
        throw error;
    }
};