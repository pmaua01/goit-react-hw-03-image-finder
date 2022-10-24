import React, { Component } from 'react';
import css from '../Modal/Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  backdropClick = e => {
    // console.log('t', e.target);
    // console.log('ct', e.currentTarget);
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.backdropClick}>
        <div className={css.Modal}>
          <img className={css.ImgStyle} src={this.props.bigImg} alt="" />
        </div>
      </div>
    );
  }
}

//   console.log(bigImg);
