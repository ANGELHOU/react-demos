import React from 'react';
import ReactDOM from 'react-dom';
import RepoList from './App';
import './index.css';
import $ from 'jquery';
var test = "123";
console.log(test);
ReactDOM.render(
    <RepoList promise={$.get('https://api.github.com/search/repositories?q=javascript&sort=stars')} />,
  document.getElementById('root')
);
