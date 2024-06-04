export const getChamps = async () => {
  const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const getChampDetails = async (name) => {
  const formattedNameOne = name.split(" ").join('')
  const formattedNameTwo = formattedNameOne.split("'").join('')
  const formattedName = formattedNameTwo.charAt(0) + formattedNameTwo.substring(1).toLowerCase()
  console.log(formattedName)
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/${formattedName}.json`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data[name];
};