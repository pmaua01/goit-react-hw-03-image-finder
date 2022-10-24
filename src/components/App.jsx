import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Spinner } from './Spinner/Spinner';
import { api } from './helpers/Api';

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
      if (
        (prevState.formSearchQuery !== this.state.formSearchQuery &&
          this.state.formSearchQuery !== '') ||
        prevState.page !== this.state.page
      ) {
        this.setState({ load: true });

        const response = await api(this.state.formSearchQuery, this.state.page);

        this.setState(prevState => ({
          answerApi: [...prevState.answerApi, ...response.hits],
          answerLength: response.hits.length,
          total: response.totalHits,
          load: false,
        }));
      }
    } catch (error) {
      if (prevState.formSearchQuery !== this.state.formSearchQuery) {
        console.log(error.message);
        this.setState({ error: error.message });
      }
    }
  }

  onClickLoadMore = () => {
    this.setState({ load: true });

    this.setState(prevState => ({
      page: prevState.page + 1,
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
    this.setState({ formSearchQuery: data, page: 1, answerApi: [] });
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
    const { total, page, load, openModal, answerApi, bigImgUrl, error } =
      this.state;

    let totalPage = total / 12;

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
        {page < totalPage && !load && (
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
