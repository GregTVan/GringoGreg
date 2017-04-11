'use strict';

var React = require('react');

// from SO

var cols = [
    { key: 'en', label: 'Phrase' },
    { key: 'successRate', label: 'Success Rate' }
];

var data = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Clark', lastName: 'Kent' }
];

var Table = React.createClass({

    render: function() {
        var headerComponents = this.generateHeaders(),
            rowComponents = this.generateRows();

        return (
            <table className='table'>
                <thead> {headerComponents} </thead>
                <tbody> {rowComponents} </tbody>
            </table>
        );
    },

    generateHeaders: function() {
        var cols = this.props.cols;  // [{key, label}]

        // generate our header (th) cell components
        return cols.map(function(colData) {
            return <th key={colData.key}> {colData.label} </th>;
        });
    },

    generateRows: function() {
        var cols = this.props.cols,  // [{key, label}]
            data = this.props.data;

        return data.map(function(item) {
            // handle the column data within each row
            var cells = cols.map(function(colData) {

                // colData.key might be "firstName"
                return <td> {item[colData.key]} </td>;
            });
            return <tr key={item.id}> {cells} </tr>;
        });
    }
});
// from SO

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
                en: response.total,
                stats: response.details
            });
        });
        return {
            en: 'Retrieving phrases...',
            stats: []
        }
        return null;
    },
    
    render: function() {
                /* today/week/month/all time, and, display worst ones */
        return (
            <div>
                You have attempted {this.state.en} translations.
                <Table cols={cols} data={this.state.stats}/>
            </div>
        )
    }

})

module.exports = Stats;