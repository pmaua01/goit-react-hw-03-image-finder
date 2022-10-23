import axios from 'axios';
const API_KEY = '29770442-603a95234869127783f60906d';
export const api = async (searchQuery, searchPage) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page: searchPage,
    },
  });

  return response.data;
};

//    const response = await axios.get('https://pixabay.com/api/', {
//      params: {
//        key: API_KEY,
//        q: this.state.formSearchQuery,
//        image_type: 'photo',
//        orientation: 'horizontal',
//        per_page: 12,
//        page: this.state.page,
//      },
//    });
