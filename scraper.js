var fs = require('fs'),
request = require('request'),
cheerio = require('cheerio');

// var url = 'http://data.nowgoal.net/1x2/';
var url = 'http://www.amazon.co.uk/gp/product/1118531647';
// request(url, function(error, response, html) {
//   console.log(html);
// });
request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('span.inlineBlock-display span.a-color-price').each(function(i, element) {
            var el = $(this);
            var price = el.text();
            console.log(price);
        });
    }
});


function tableToJson(table) {
    var data = [];

    // first row needs to be headers
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }

    // go through cells
    for (var k=1; k<table.rows.length; k++) {
        var tableRow = table.rows[i];
        var rowData = {};
        for (var j=0; j<tableRow.cells.length; j++) {
            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;
        }
        data.push(rowData);
    }
    return data;
}
