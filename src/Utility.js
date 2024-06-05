export default function formatChampionName(name) {
    let formattedName = name;
    
    // Handle apostrophes
    if (name.includes("'")) {
        const formattedNameOne = name.split("'").join('');
        formattedName = formattedNameOne.charAt(0).toUpperCase() + formattedNameOne.substring(1).toLowerCase();
    }

    // Handle spaces
    if (name.includes(' ')) {
        formattedName = formattedName.split(' ').join('');
    }

    return formattedName;
}