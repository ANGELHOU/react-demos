import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var HelloMessage = React.createClass({
  render:function(){
    console.log(this.props.name);
    return <h1>Hello {this.props.name}</h1>
  }
});

var NodeList = React.createClass({
  render:function(){
    console.log(this.props.children);
    return(
      <ol>
        {React.Children.map(this.props.children, function(child){
          if(child!=" "){
              return <li>{child}</li>;
          }
        })}
      </ol>
      );
  }
});

var MyTitle = React.createClass({
  propTypes:{
    title: React.PropTypes.string.isRequired
  },
  getDefaultProps: function(){
    return {title:"Hello World"};
  },
  render: function(){
    return (<h1> {this.props.title} </h1>);
  }
});

export default MyTitle;
