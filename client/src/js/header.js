'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// JSX doesn't like comments (use {/* style, but these look shitty in NP++)
// JSX demands closing tags
// href instead of link doesn't work, displays directory contents instead of page...

// btw: http://andrewhfarmer.com/react-ajax-best-practices/

var Header = React.createClass({
    render: function() {
        return (
            <nav className='navbar navbar-default'>
                <ul className='nav navbar-nav'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='phrases'>Phrases</Link></li>
                    <li><Link to='verbs'>Verbs</Link></li>
                </ul>
            </nav>
        )
    }
});

module.exports = Header;