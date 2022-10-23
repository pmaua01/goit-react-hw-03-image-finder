import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Spinner } from './Spinner/Spinner';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29770442-603a95234869127783f60906d';

export class App extends Component {
  state = {
    formSearchQuery: '',
    answerApi: [],
    error: null,
    page: 1,
    answerLength: 0,
    openModal: false,
    bigImgUrl: '',
    load: false,
    total: '',
  };
  async componentDidUpdate(prevProps, prevState) {
    try {
      // console.log('prevState', prevState.formSearchQuery);
      // console.log('this.state', this.state.formSearchQuery);
      if (
        prevState.formSearchQuery !== this.state.formSearchQuery &&
        this.state.formSearchQuery !== ''
      ) {
        this.setState({ load: true });
        const response = await axios
          .get('https://pixabay.com/api/', {
            params: {
              key: API_KEY,
              q: this.state.formSearchQuery,
              image_type: 'photo',
              orientation: 'horizontal',
              per_page: 12,
              page: this.state.page,
            },
          })
          .finally(() => {
            // this.setState({ load: false });
            console.log('after all in try');
          });

        this.setState({
          load: false,
          page: 1,
          answerApi: response.data.hits,
          answerLength: response.data.hits.length,
          total: response.data.total,
        });
      }

      if (prevState.page !== this.state.page) {
        this.setState({ load: true });
        const response = await axios
          .get('https://pixabay.com/api/', {
            params: {
              key: API_KEY,
              q: this.state.formSearchQuery,
              image_type: 'photo',
              orientation: 'horizontal',
              per_page: 12,
              page: this.state.page,
            },
          })
          .finally(() => {
            // this.setState({ load: false });
            console.log('after all in try');
          });

        this.setState(prevState => ({
          answerApi: [...prevState.answerApi.concat(response.data.hits)],
          answerLength: response.data.hits.length,
          load: false,
        }));
      }

      // this.setState({ load: false });
      console.log('after all in try');
    } catch (error) {
      if (prevState.formSearchQuery !== this.state.formSearchQuery) {
        console.log(error.message);
        this.setState({ error: error.message });
      }
    }
  }

  toggleModal = () => {
    console.log('toggle');
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };

  onCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };

  onChangeSearchQuery = data => {
    this.setState({ formSearchQuery: data });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onItemClick = url => {
    // console.log(url);
    this.toggleModal();
    this.setState({ bigImgUrl: url });
  };

  stopLoader = () => {
    this.setState({ load: false });
  };

  render() {
    const answerApiLength = this.state.answerApi.length;
    console.log('In rendertotal', this.state.total);
    console.log('In render answerLength', this.state.answerLength);

    return (
      <div>
        <Searchbar onChangeSearchQuery={this.onChangeSearchQuery}></Searchbar>
        {this.state.total === 0 && <div>sorry no results found</div>}

        {answerApiLength !== 0 && (
          <ImageGallery>
            {this.state.load && <Spinner></Spinner>}

            <ImageGalleryItem
              answerFromApi={this.state.answerApi}
              onItemClick={this.onItemClick}
            ></ImageGalleryItem>
          </ImageGallery>
        )}

        {this.state.answerLength !== 0 && this.state.answerLength >= 12 && (
          <Button onClick={this.loadMore}></Button>
        )}
        {this.state.openModal && (
          <Modal
            bigImg={this.state.bigImgUrl}
            onClose={this.onCloseModal}
          ></Modal>
        )}

        {this.state.error && <div>Ups</div>}
      </div>
    );
  }
}
