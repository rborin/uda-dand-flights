
## Summary

TODO: 
	- Improve this text as per viewer comment.
    - Tell what the main finding is: best month to avoid delays

The visualization shows the percentage of flights in each month of the year
whose departures have been delayed 20 minutes or more. Such information is
presented by advancing along the years through animation. The three months
having fewest delays are highlighted. The statistics used to build the
visualization were extracted from the 
[U.S. Flights dataset](http://stat-computing.org/dataexpo/2the-data.html) 
covering years 1988 to 2008.009/


## Design

Because the data being presented represents a time series, one of the most 
natural ways of displaying it is in the form of a line graph which was the
one chosen. Each year is displayed separately in order to allow the viewer
to recognize annual seasonalities. The months highlighted help the viewer
identify the best months for an air traveler to avoid flight delays. Main
finding was that flying in September tends to be the best month for that
purpose.

On an initial attempt, I tried showing multiple lines on the same graph (on 
Excel), each line corresponding to a different delay. However, since all lines
presented the same tendencies I chose only one delay (20 minutes) for the 
visualization implemented in order to make it simpler for the viewers.

Design changes for second version of the graph:

- Improve summary text to appear more like a narrative story.
- Add legend to the graph.
- Add "play" button to allow viewer to repeat animation.


## Feedback

This section outlines the feedback provided by some viewers.

### Feedback for initial version

- Viewer 1 ([Udacity's forum](https://discussions.udacity.com/t/feedback-needed-us-flights-delays/296249/2?u=rogerio.borin)):

	- Visualization looks nice.
	- The advancing of the years could have been automated (*).
	- The summary of the visualization could be an interesting story (*).
	- Graph could have a legend (*).
	- Other types of visualization could have been explored.

- Viewer 2:

	- The meaning of the graph is clear.
	- September is the month with fewer delays along the years.
	- December is the month with more delays along the years.
	- Delays are likely to increase in the next decade.

- Viewer 3:

	- September seems to be the best month to fly.
	- The end of the year concentrates the greater number of delays.
	- I cannot select which year to show until the animation of the
	  year finishes (*).

Notes:

- Items marked with an (*) were considered for a second version of the 
  graph.
- Only one of the viewers provided specific suggestions for the graph,
  which were mostly accepted.
- Based on feedback related to the animation showing the passing of the
  years, I decided to add a button to allow the user to repeat the 
  animation.


## Resources

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
