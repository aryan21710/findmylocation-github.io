import React, { Component } from "react";
import "./index.css";

export default class Mylocation extends Component {
  state = {
    lat1: 0,
    lon1: 0,
    lat2: 0,
    lon2: 0,
    distance: 0
  };

  componentDidMount() {
      localStorage.clear();
    this.getLocation();
  }

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // this.deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    this.setState(
      {
        distance: R * c * 100 // Distance in km
      },
      () => {
        console.log("**********************");
        console.log(
          ` CORDINATES ${lat1}, ${lon1} AND ${lat2}, ${lon2} IS:- ${this.state.distance} metres`
        );
        console.log("**********************");
        localStorage.clear();
      }
    );
  };

  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  showPosition = position => {
    if (localStorage.getItem("lat1") && localStorage.getItem("lon1")) {
      this.setState(
        {
          lat2: `${position.coords.latitude}`,
          lon2: `${position.coords.longitude}`
        },
        () => {
          console.log(
            "YOUR SECOND POSITION:-",
            this.state.lat2,
            ":",
            this.state.lon2
          );
          this.getDistanceFromLatLonInKm(
            this.state.lat1,
            this.state.lon1,
            this.state.lat2,
            this.state.lon2
          );
        }
      );
    } else {
      this.setState(
        {
          lat1: `${position.coords.latitude}`,
          lon1: `${position.coords.longitude}`
        },
        () => {
          console.log(
            "YOUR FIRST POSITION:-",
            this.state.lat1,
            ":",
            this.state.lon1
          );

          localStorage.setItem("lat1", this.state.lat1);
          localStorage.setItem("lon1", this.state.lon1);
        }
      );
    }
  };

  render() {
    const { lat1, lon1, lat2, lon2, distance } = this.state;
    return (
      <div className="container">
        <button onClick={this.getLocation}>START TEST</button>

        {lat1 <= 100 && lon1 <= 100 ? (
            <div>
                <p>FIRST CORDINATES {lat1}, {lon1}</p>
                <p>SECOND CORDINATES {lat2}, {lon2}</p>
                <p>DISTANCE IS:- {distance}
                metres</p>
            </div>
        ) : (
          <h1>NO CORDINATES CAPTURED YET</h1>
        )}
      </div>
    );
  }
}
