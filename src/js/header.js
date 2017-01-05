'use strict';

var React = require('react');
//var ReactRouter = require('react-router');
//var Link = ReactRouter.Link;

// JSX doesn't like comments (use {/* style, but these look shitty in NP++)
// JSX demands closing tags
// navbar-header buttons generate the hamburger but it is currently unresponsive, probably because we aren't including Bootstrap's .js files

var Header = React.createClass({
    render: function() {
        return (
        {/*<div>
           <nav className='navbar navbar-inverse navbar-fixed-top'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                                <span className='sr-only'>Toggle navigation</span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                            </button>
            </div>*/}
                        <nav className='navbar navbar-default'>
                            <div className='container-fluid'>
                                {/*<button type='submit' className='btn btn-success'>Phrases</button>
                                <button type='submit' className='btn btn-success'>Verbs</button>*/}
                                <ul className='nav navbar-nav'>
                                    <li><a href='/'>Home</a></li>
                                    <li><a href='/#phrases'>Phrases</a></li>
                                    <li><a href='/#verbs'>Verbs</a></li>
                                </ul>
                            </div>
                        </nav>
                        {/*</div>
                </nav>
                <div className='jumbotron'>
                    <div className='container'>
                        <h1>gringogreg</h1>
                        <p>A few things Spanish...</p>
                    </div>
                </div>
                        </div>*/}
        )
    }
});

module.exports = Header;