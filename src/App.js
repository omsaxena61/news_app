
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
   apiKey=process.env.REACT_APP_NEWS_API
  state = {
    progress:0  
  }
  setProgress = (progress)=>{
  {
    this.setState({progress: progress})
  }}
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={4}
            color="#f11946"
            progress={this.state.progress}
            
          />
          <Navbar />
          <Switch>
            <Route exact path="/" key={1}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey}
               key="general"
                country="in"
                pageSize={9}
                category="general"
              />
            </Route>

            <Route exact path="/business" key={2}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey}
             key="business"
                country="in"
                pageSize={9}
                category="business"
              />
            </Route>

            <Route exact path="/entertainment" key={3}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey}
           key="entertainment"
                country="in"
                pageSize={9}
                category="entertainment"
              />
            </Route>

            <Route exact path="/general" key={4}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey}
             key="general"
                country="in"
                pageSize={9}
                category="general"
              />
            </Route>

            <Route exact path="/health" key={5}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey} key="health" country="in" pageSize={9} category="health" />
            </Route>

            <Route exact path="/science" key={6}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey}
               key="science"
                country="in"
                pageSize={9}
                category="science"
              />
            </Route>

            <Route exact path="/sports" key={7}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country="in" pageSize={9} category="sports" />
            </Route>

            <Route exact path="/technology" key={8}>
              <News   setProgress={this.setProgress} apiKey={this.apiKey}
                key="technology"
                country="in"
                pageSize={9}
                category="technology"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
