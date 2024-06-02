export const getChamps = async () => {
  const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const getChampDetails = async (name) => {
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/${name}.json`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data[name];
};