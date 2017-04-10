'use strict';

var React = require('react');

var Stats = React.createClass({

    //console.log('stats');
    
    getInitialState: function() {
        var that = this;
        var d = fetch('http://localhost:3000/getStats', {
            /*body: JSON.stringify({aaa
                action: 'getSignUpConfiguration',
            }),*/
            method: 'POST'
        })
        .then(function  (response) {
            console.log(response.json);
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            that.setState({
                en: response.total
            });
        });
        return {
            en: 'waiting...',
        }
        return null;
    },
    
    render: function() {
        return (
            <div>
                Look how many responses you have:
                <div>
                    {this.state.en}
                </div>
            </div>
        )
    }

})

module.exports = Stats;