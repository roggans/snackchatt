import React from 'react';
// import ReactDOM from 'react-dom';
import people from "./people.jpg";
import {Component} from  "react";

export default class People extends Component {
  
  constructor(props){
    super(props);
    this.scaleFactor = 2; // a scale factor for how big the image should be shown
    this.currentPerson = 1;
    this.state = {...this.personCutOut(this.currentPerson)};
  }

  personCutOut(){
    let rowNo = Math.floor(this.currentPerson / 14);
    let colNo = this.currentPerson % 14;
    let extraColOffset = rowNo > 1 ? 5 : 0;
    // console.log(this.currentPerson, rowNo, colNo) // comment this in to understand the conversion
    // calculate how to cut off the big image to an indiviual person
    return {
      peopleStyle: {marginLeft: 10, overflow: 'hidden', height: 125 * this.scaleFactor, width: 61 * this.scaleFactor},
      peopleImageStyle: {width: 1000 * this.scaleFactor, marginTop: (-355 - 162 * rowNo) * this.scaleFactor, marginLeft: (-14 - 64.75 * colNo - extraColOffset) * this.scaleFactor}
    };
  }

  prev(){
    this.next(-1);
  }

  next(direction = 1){
    // change which person that is chosen (1 - 55)
    this.currentPerson += direction;
    if(this.currentPerson < 1){ this.currentPerson = 55; }
    if(this.currentPerson > 55){ this.currentPerson = 1; }
    // call personCutOut to cut out a single person
    this.setState(this.personCutOut());
  }

  render(){ 
    return (
      <div>
        <div className="People mb-3 mt-5" style={this.state.peopleStyle}>
          <img style={this.state.peopleImageStyle} alt="people" src={people}/>
        </div>
        <button className="btn btn-primary" style={{marginRight:62}} onClick = {e => this.prev()}>&lt;</button>
        <button className="btn btn-primary" onClick = {e => this.next()}>&gt;</button>
    </div>
    );
  }

}


    

