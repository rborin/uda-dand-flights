# Summary

The visualization shows the percentage of flights in each month of the year
whose departures have been delayed 20 minutes or more. Such information is
presented by advancing along the years through animation. The three months
having fewest delays are highlighted. The statistics used to build the
visualization were extracted from the 
[U.S. Flights dataset](http://stat-computing.org/dataexpo/2009/the-data.html) 
covering years 1988 to 2008.


# Design

Because the data being presented represents a time series, one of the most 
natural ways of displaying it is in the form of a line graph which was the
one chosen. Each year is displayed separately in order to allow the viewer
to recognize annual seasonalities. The months highlighted help the viewer
identify the best months for an air traveller to avoid flight delays.


# Feedback

Initial version - feedback greatly appreciated!


# Resources

Main sources of information:

* [MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [D3 3.x API Reference](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md)

Additional ideas taken from:

* [D3.js Axes](https://www.dashingd3js.com/d3js-axes)
* [Rotate tick-mark labels using d3.svg.axis](https://groups.google.com/forum/?fromgroups#!topic/d3-js/heOBPQF3sAY)
* [Line Chart with Grid D3](http://bl.ocks.org/hunzy/11110940)
* [Line Chart (Mike Bostock)](https://bl.ocks.org/mbostock/3883245)
* [CSS box around text, set box size](https://stackoverflow.com/questions/32040635/css-box-around-text-set-box-size)
* [How to set Bullet colors in UL/LI html lists via CSS](https://stackoverflow.com/questions/5306640/how-to-set-bullet-colors-in-ul-li-html-lists-via-css-without-using-any-images-or)
