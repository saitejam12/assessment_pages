import React, { Component } from 'react';
import Room from './room';
import './App.css'
import { getFromLocalStorage, saveToLocalStorage } from '../util/LocalStorageUtil'


class App extends Component {

  static NUM_ROOMS = 4;

  defaultState = [...Array(App.NUM_ROOMS).keys()].map(index => (
    {
      index,
      checked: index === 0,
      numAdults: 1,
      numChildren: 0,
    }
  ));

  state = {
    // Use the LocalStorageUtil to check if the 'rooms' object is present in local storage, if not create a default state.
    rooms: getFromLocalStorage('rooms') || this.defaultState,
  };

  enableRoom = index => {
    const { rooms } = this.state;
    // When enabling a room, we have to also enable all rooms present BEFORE that room.
    rooms.slice(1, index + 1).forEach(room => {
      room.checked = true;
    });
    this.setState({ rooms });
  };

  disableRoom = index => {
    const { rooms } = this.state;
    // When disabling a room, we have to also disable all rooms present AFTER that room.
    rooms.slice(index, rooms.length).forEach(room => {
      room.checked = false;
      room.numAdults = 1;
      room.numChildren = 0;
    });
    this.setState({ rooms });
  };

  toggleRoomChecked = index => {
    const { rooms } = this.state;
    // If the room is already checked, we uncheck (disable) it, otherwise we check (enable) it along with the other corressponding rooms where appropriate.
    if (rooms[index].checked) {
      this.disableRoom(index);
    } else {
      this.enableRoom(index);
    }
  };

  changeNumAdults = (index, numAdults) => {
    const { rooms } = this.state;
    rooms[index].numAdults = parseInt(numAdults, 10);
    this.setState({ rooms });
  };

  changeNumChildren = (index, numChildren) => {
    const { rooms } = this.state;
    rooms[index].numChildren = parseInt(numChildren, 10);
    this.setState({ rooms });
  };

  callbackFunctions = (
    {
      toggleRoomChecked: this.toggleRoomChecked,
      changeNumAdults: this.changeNumAdults,
      changeNumChildren: this.changeNumChildren,
    }
  );

  createRooms = () => (
    this.state.rooms.map((room) => (
      <Room
        key={room.index}
        {...room}
        {...this.callbackFunctions}
      />
    ))
  );

  handleSubmit = e => {
    e.preventDefault();
    // Use LocalStorageUtil to store the current state of the rooms object to local storage.
    saveToLocalStorage('rooms', this.state.rooms)
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='container'>
          {this.createRooms()}
        </div>
        <input type='submit' value='Submit' className='margin-left-10' />
      </form>
    );
  }
}

export default App;
