import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Room extends Component {

  handleCheckboxClick = () => {
    this.props.toggleRoomChecked(this.props.index);
  };

  handleNumAdultChange = e => {
    this.props.changeNumAdults(this.props.index, e.target.value);
  };

  handleNumChildrenChange = e => {
    this.props.changeNumChildren(this.props.index, e.target.value);
  };

  render() {
    const { index, checked, numAdults, numChildren } = this.props;

    return (
      <div className={checked ? '' : 'disabled'}>
        <div className='room-container'>
          <div className='header'>
            {index !== 0 && <input type='checkbox' checked={checked} onClick={this.handleCheckboxClick} />}
            <span>{`Room ${index + 1}`}</span>
          </div>
          <div className='body'>
            <div className='row'>
              <div className='column'>Adults</div>
              <div className='column'>Children</div>
            </div>
            <div className='row'>
              <div className='column'>(18+)</div>
              <div className='column'>(0-17)</div>
            </div>
            <div className='row'>
              <div className='column'>
                <select value={numAdults} onChange={this.handleNumAdultChange} disabled={!checked}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
              <div className='column'>
                <select value={numChildren} onChange={this.handleNumChildrenChange} disabled={!checked}>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Room.propTypes = {
  index: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  numAdults: PropTypes.number.isRequired,
  numChildren: PropTypes.number.isRequired,
  toggleRoomChecked: PropTypes.func.isRequired,
  changeNumAdults: PropTypes.func.isRequired,
  changeNumChildren: PropTypes.func.isRequired,
};

export default Room;