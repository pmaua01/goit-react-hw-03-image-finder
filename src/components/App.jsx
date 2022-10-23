import { Component } from 'react';
// import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Spinner } from './Spinner/Spinner';
import { api } from './helpers/Api';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const API_KEY = '29770442-603a95234869127783f60906d';

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
        // await this.setState(() => {
        //   return { page: 1 };
        // });
        await this.resetPage();

        const response = await api(this.state.formSearchQuery, this.state.page);

        this.setState({
          load: false,

          answerApi: response.hits,
          answerLength: response.hits.length,
          total: response.total,
        });
      }

      // if (prevState.page !== this.state.page) {
      //   this.setState({ load: true });
      //   const response = await api(this.state.formSearchQuery, this.state.page);
      //   console.log('State after', response.hits);
      //   this.setState(prevState => ({
      //     answerApi: [...prevState.answerApi.concat(response.hits)],
      //     answerLength: response.hits.length,
      //     load: false,
      //   }));
      // }
    } catch (error) {
      if (prevState.formSearchQuery !== this.state.formSearchQuery) {
        console.log(error.message);
        this.setState({ error: error.message });
      }
    }
  }

  onClickLoadMore = async () => {
    this.setState({ load: true });
    // await this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    await this.incrementPage();

    const response = await api(this.state.formSearchQuery, this.state.page);

    this.setState(prevState => ({
      answerApi: [...prevState.answerApi.concat(response.hits)],
      answerLength: response.hits.length,
      load: false,
    }));
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  resetPage = () => {
    this.setState({ page: 1 }, () => {});
  };

  toggleModal = () => {
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
    this.onClickLoadMore();
  };

  onItemClick = url => {
    this.toggleModal();
    this.setState({ bigImgUrl: url });
  };

  stopLoader = () => {
    this.setState({ load: false });
  };

  render() {
    // const answerApiLength = this.state.answerApi.length;
    const {
      total,
      load,
      answerLength,
      openModal,
      answerApi,
      bigImgUrl,
      error,
    } = this.state;

    return (
      <div>
        <Searchbar onChangeSearchQuery={this.onChangeSearchQuery}></Searchbar>
        {total === 0 && <div>sorry no results found</div>}

        {answerApi.length !== 0 && (
          <ImageGallery>
            {load && <Spinner></Spinner>}

            <ImageGalleryItem
              answerFromApi={answerApi}
              onItemClick={this.onItemClick}
            ></ImageGalleryItem>
          </ImageGallery>
        )}

        {answerLength !== 0 && answerLength >= 12 && (
          <Button onClick={this.onClickLoadMore}></Button>
        )}
        {openModal && (
          <Modal bigImg={bigImgUrl} onClose={this.onCloseModal}></Modal>
        )}

        {error && <div>Oops something went wrong</div>}
      </div>
    );
  }
}
