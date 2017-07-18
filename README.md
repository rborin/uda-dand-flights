
## Summary

The U.S. has the highest number of air passengers in the world, with more 
than 700 million passengers 
(as per [U.S. Airline Traffic Data](https://www.rita.dot.gov/bts/press_releases/bts013_17)) 
being transported each  year (since 2004). 
With such huge number of travelers, airlines and airports are very busy and 
flight delays are expected to happen now and then. If you wanted to avoid 
flight delays, what month would you choose to fly?  

The visualization shows the percentage of flights in each month of the year
whose departures have been delayed 20 minutes (or longer) from year 1988 to 
2008. The statistics used to build the visualization were obtained from 
[U.S. Airline on-time performance](http://stat-computing.org/dataexpo/2009/).
In the graph, the three months having fewest delays are highlighted.
It has been found that, over the years, September tends to be the best month
for avoiding flight delays.


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

Design changes for second version of the visualization:

- Improve summary text to appear more like a narrative story.
- Add legend to the graph.
- Add "play" button to allow viewer to repeat animation.

Design changes for third version of the visualization:

- Add text description of the finding to the visualization.
- Allow the viewer to restart or stop the visualization.

Links to the various versions of the visualization on 
[bl.ocks.org](http://bl.ocks.org/):

- [Initial version](http://bl.ocks.org/rborin/93eb16653e0ecd0e4ad0762cc6ac7a97)
- [Second version](http://bl.ocks.org/rborin/e4eb14fd70b12a0726e40bc7b68bd42c)
- [Third version](http://bl.ocks.org/rborin/071934f700978c535bb58a2fdb7047e1)


## Feedback

This section outlines the feedback provided by some viewers.

### Feedback for initial version (v1)

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

- Items marked with an (*) were considered for the second version of the 
  graph.
- Only one of the viewers provided specific suggestions for the graph,
  which were mostly accepted.
- Based on feedback related to the animation showing the passing of the
  years, I decided to add a button to allow the user to repeat the 
  animation.
  
### Feedback for second version (v2)

- Udacity's reviewer

	- Finding should be included in the visualization (*).
	- Finding could be communicated textually (*).
	- Graph could include absolute counts of delayed flights, possibly
	  shown when hovering over the data points.
	- Possibility of stopping the graph's animation was not implemented
	  even though such feature was asked by a viewer (*). 

Notes:

- Items marked with an (*) were considered for the third version of the 
  graph.


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
