/** @format */

import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize=5;
  state={
    progress:0
  }
  setProgress =(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
       
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route
            path="/sports"
            exact
            element={
              <News setProgress= {this.setProgress}   key="sports" pageSize={6} country="in" category="Sports" />
            }
          />
          <Route
            path="/business"
            exact
            element={
              <News setProgress= {this.setProgress}  
                key="business"
                pageSize={6}
                country="in"
                category="Business"
              />
            }
          />
          <Route
            path="/entertainment"
            exact
            element={
              <News setProgress= {this.setProgress} 
                key="entertainment"
                pageSize={6}
                country="in"
                category="Entertainment"
              />
            }
          />
          <Route
            path="/general"
            exact
            element={
              <News setProgress= {this.setProgress}  
                key="general"
                pageSize={6}
                country="in"
                category="General"
              />
            }
          />
          <Route
            path="/health"
            exact
            element={
              <News setProgress= {this.setProgress}  key="health" pageSize={6} country="in" category="Health" />
            }
          />
          <Route
            path="/science"
            exact
            element={
              <News setProgress= {this.setProgress}  
                key="science"
                pageSize={6}
                country="in"
                category="Science"
              />
            }
          />
          <Route
            path="/technology"
            exact
            element={
              <News setProgress= {this.setProgress}  
                key="technology"
                pageSize={6}
                country="in"
                category="Technology"
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}
