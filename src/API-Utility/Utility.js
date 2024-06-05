export default function formatChampionName(name) {
    let formattedName = name;
  
    if (name.includes("'")) {
        const formattedNameOne = name.split("'").join('');
        formattedName = formattedNameOne.charAt(0).toUpperCase() + formattedNameOne.substring(1).toLowerCase();
    }

    if (name.includes(' ')) {
        formattedName = formattedName.split(' ').join('');
    }

    return formattedName;
}