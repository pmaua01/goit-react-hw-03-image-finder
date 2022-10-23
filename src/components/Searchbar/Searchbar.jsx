import React, { Component } from 'react';
import { HiSearch } from 'react-icons/hi';
import { IconContext } from 'react-icons';

import css from '../Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchquery: '',
  };

  onChangeInput = e => {
    this.setState({ searchquery: e.currentTarget.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onChangeSearchQuery(this.state.searchquery);
    this.resetQuery();
  };

  resetQuery() {
    this.setState({ searchquery: '' });
  }
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <span className={css.spanSearch}>
              <IconContext.Provider
                value={{
                  size: 30,
                  display: 'flex',
                  aliginItem: 'center',
                }}
              >
                <HiSearch width="30" height="30"></HiSearch>
              </IconContext.Provider>
            </span>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            value={this.state.searchquery}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}
