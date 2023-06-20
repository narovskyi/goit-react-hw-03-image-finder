export const fetchPhoto = async (page, searchPhrase) => {
    const response = await fetch(`https://pixabay.com/api/?q=${searchPhrase}&page=${page}&key=32074254-ec575441b41af33a027107547&image_type=photo&orientation=horizontal&per_page=12`);
    const result = await response.json();
    return result.hits;
}

export default { fetchPhoto };