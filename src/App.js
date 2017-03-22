import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

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

var MyComponent = React.createClass({
  handleClick: function(){
    this.refs.myTextInput.focus();
  },
  render: function(){
    return(
      <div>
        <input type='text' ref='myTextInput'/>
        <input type='button' value='Focus the text input' onClick={this.handleClick}/>
      </div>
      );
  }
});

var LinkedButton = React.createClass({
  getInitialState: function(){
    return {liked: false};
  },
  handleClick:function(){
    this.setState({liked:true});
  },
  render:function(){
    var text = this.state.liked?'like':'haven\'t liked';
    return(
      <p onClick={this.handleClick}>
      you {text} this. Click to toggle.
      </p>
    );
  }
});

var Input = React.createClass({
  getInitialState:function(){
    return {value:'Hello'};
  },
  handleChange: function(event){
    this.setState({value: event.target.value});
  },
  render:function(){
    var value = this.state.value;
    return (
      <div>
        <input type='text' value={value} onChange={this.handleChange}/>
        <p>{value}</p>
      </div>
      );
  }
});


var Hello = React.createClass({
  getInitialState:function(){
    return {opacity:1.0}
  },
  componentDidMount:function(){
    this.timer = setInterval(function(){
      var opacity = this.state.opacity;
      opacity -= 0.5;
      if(opacity < 0.1){
        opacity = 1.0;
      }
      this.setState({
        opacity:opacity
      });
    }.bind(this), 100);
  },
  render:function(){
    return (
      <div style={{opacity:this.state.opacity}}>
        Hello {this.props.name}
      </div>
      )
  }
})

var UserGist = React.createClass({
  getInitialState:function(){
    return {username:'', lastGistUrl:''};
  },
  componentDidMount:function(){
    $.get(this.props.source, function(result){
      var lastGist = result[0];
      if(this.isMounted()){
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl:lastGist.html_url
        });
      }
    }.bind(this));
  },
  render:function(){
    return (
      <div>
        {this.state.username}'s last gist is 
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
      )
  }
})

var RepoList = React.createClass({
  getInitialState:function(){
    return {loading: true, error:null, data:null}
  },
  componentDidMount:function(){
    this.props.promise.then(
      value => this.setState({loading:false, data:value}),
      error => this.setState({loading:false, error:error})
      );
  },
  render:function(){
    if(this.state.loading){
      return <span> Loading...</span>;
    }else if (this.state.error !=null){
      return <span> Error: {this.state.error.message}</span>
    }else{
      var repos = this.state.data.items;
      var reposList = repos.map(function (repo){
        return (
            <li>
              <a href={repo.html_url}>{repo.name}</a>({repo.stargazers_count} stars)<br/>{repo.description}
            </li>
          );
      });
      return (
          <main>
            <h1> Most Popular JavaScript Projects in GitHub</h1>
            <ol>{reposList}</ol>
          </main>
        );
    }
  }
})
export default RepoList;
