/**
 * Handle main graph.
 */

/*
 * Possible graph configurations. Currently, only the "monthly"
 * configuration is being explored in the visualization. 
 */
var InitialGraphConfigs = {
    "monthly": {
        "x_field": "Month",
        "y_field": "% DepDelay>20",
        "x_domain": [1, 12],
        "y_domain": [0, 30],
        "trans_duration": 400,
        "year": 1988,
        "x_axis_label": "Month",
        "y_axis_label": "Delayed flights (%)"
    },
    "weekly": {
        "x_field": "Week",
        "y_field": "% DepDelay>20",
        "x_domain": [1, 53],
        "y_domain": [0, 50],
        "trans_duration": 400,
        "year": 1988,
        "x_axis_label": "Week",
        "y_axis_label": "Delayed flights (%)"
    },
};

var GraphConfig = InitialGraphConfigs["monthly"];
var Years = null;
var updateFunction = null;

/*
 * Build the graph's title.
 */
function makeTitle(year, y_field)
{
    year = year || GraphConfig["year"];
    y_field = y_field || GraphConfig["y_field"];

    var delay_minutes = -1;

    if (y_field.substr(0,11) == GraphConfig["y_field"].substr(0,11)) {
        delay_minutes = +y_field.substr(11);
    }

    return "Percent flights delayed " + delay_minutes + 
           " minutes or more in year " + year;
}

/*
 * Build a function that receives one parameter and returns two possible 
 * values ('value_in', 'value_notin'). If the argument of that function is
 * among the 'n' lowest values of field 'order_field' in 'data' then value
 * 'value_in' is returned; otherwise, 'value_notin' is returned by the
 * generated function.
 * 
 */
function makeLowestSelector(data, n, order_field, value_in, value_notin) 
{
    var vals = data.map(function(d) {
        return d[order_field];
    });
    vals.sort(function(a, b) { return a-b; });

    var threshold = (vals[n-1] + vals[n]) * 0.5;
    var f = function(d) {
        return (+d[order_field] <= threshold) ? value_in : value_notin;
    };

    return f;
}

var AnimationEnabled = true;
var AnimationTimerId = null;

/*
 * Executes an animation by scheduling a call to 'animate_function'
 * repeatedly as long as the function returns a non-false value. 
 */
function startAnimation(animate_function)
{
    if (AnimationEnabled && (AnimationTimerId == null)) {
        // Animations enabled and not yet running:
        AnimationTimerId = window.setInterval(function() {
            if (animate_function() == false) {
                window.clearInterval(AnimationTimerId);
                AnimationTimerId = null;
            }
        }, 1200);
    }
}

/*
 * Advances to the next year and updates the graph.
 * 
 * Return value indicates whether or not advancing to the next
 * year was possible.
 * 
 */
function advanceYear()
{
    var keepOn = true;
    var nextYear = GraphConfig["year"] + 1;

    if (nextYear > Years[Years.length-1]) {
        keepOn = false;
    } else {
        GraphConfig["year"] = nextYear;
        updateFunction(nextYear);
    }

    return keepOn;
}

/*
 * Handles the year selection button clicked event.
 */
function onYearClicked(year)
{
    if (AnimationTimerId == null) {
        updateFunction(year);
    }
}

/*
 * Add the contents of the year selector pane. 
 */
function populateYearSelector()
{
    d3.select("ul.year_selector")
      .selectAll("li")
      .data(Years)
      .enter()
      .append("li")
      .attr("class", "not_selected")
      .append("a")
      .attr("href", "#")
      .on("click", function(d) { onYearClicked(d); })
      .text(function(d) { return "" + d; });
}

/*
 * Select a given year in the year selector pane. 
 */
function updateYearSelector(year)
{
    d3.select("ul.year_selector")
      .selectAll("li")
      .data(Years)
      .attr("class", function(d) { 
          return (d == year) ? "selected" : "not_selected"; 
      });
}

/*
 * Renders the main graph.
 */
function draw(data)
{
    var margins = {
        "top": 75,
        "bottom": 50,
        "left": 75,
        "right": 50
    };
    
    var container = d3.select(".graph_container"); 
    var clientWidth = container[0][0].clientWidth;
    var clientHeight = container[0][0].clientHeight;

    var graphWidth = clientWidth - margins["left"] - margins["right"];
    var graphHeight = clientHeight - margins["top"] - margins["bottom"];

    var svg = container.append("svg")
                       .attr("width", clientWidth)
                       .attr("height", clientHeight)
                       .append('g')
                       .attr('class', 'graph')
                       .attr("transform", 
                             "translate(" + margins["left"] + "," + 
                             margins["top"] + ")");

    /*
     * Get unique list of years:
     */

    // Extract years present in the data:
    var allYears = data.map(function(d) { return d["Year"]; });

    // Determine unique values:
    Years = allYears.filter(function(elem, ind, arr) { 
        return arr.indexOf(elem) === ind; 
    });

    Years.sort();

    /*
     * Populate selector:
     */
    populateYearSelector();

    /*
     * Create scales and axes:
     * Reference: https://www.dashingd3js.com/d3js-axes
     */
    var xScale = d3.scale.linear()
                    .domain(GraphConfig["x_domain"])
                    .range([0, graphWidth]);

    var yScale = d3.scale.linear()
                    .domain(GraphConfig["y_domain"])
                    .range([graphHeight, 0]);

    var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .innerTickSize(-graphHeight);        // Reference: http://bl.ocks.org/hunzy/11110940

    var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .innerTickSize(-graphWidth);        // Reference: http://bl.ocks.org/hunzy/11110940

    var xAxisGroup = svg.append("g")
                    .attr("class", "axis xaxis")
                    .attr("transform", "translate(0," + graphHeight + ")")
                    .call(xAxis);

    var yAxisGroup = svg.append("g")
                    .attr("class", "axis yaxis")
                    .call(yAxis);
    
    /*
     * Displace x & y axis labels:
     * Reference: https://groups.google.com/forum/?fromgroups#!topic/d3-js/heOBPQF3sAY
     */
    svg.selectAll(".xaxis text")
       .attr("transform", "translate(0,5)");

    svg.selectAll(".yaxis text")
       .attr("transform", "translate(-3,0)");

    /*
     * Axes labels:
     */
    var labels = svg.append("g")
                    .attr("class", "glabel");

    labels.append("text")
        .attr("transform", "translate(" + (graphWidth/2) + "," + (graphHeight + 40) + ")")
        .attr("text-anchor", "middle")
        .attr("font-size", "1.15em")
        .text(GraphConfig["x_axis_label"]);

    labels.append("text")
        .attr("transform", "translate(" + (-35) + "," + (graphHeight/2) + ") rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("font-size", "1.15em")
        .text(GraphConfig["y_axis_label"]);
    
    /*
     * Graph title:
     */
    labels.append("text")
        .attr("class", "gtitle")
        .attr("transform", "translate(" + (graphWidth/2) + "," + (-35) + ")")
        .attr("text-anchor", "middle")
        .attr("font-size", "1.6em")
        .text(makeTitle());

    /*
     * Support functions.
     */
    function keyFunction(d) {
        return d[GraphConfig["x_field"]];
    }

    function getScreenCoordX(d) {
        return xScale( d[GraphConfig["x_field"]] );
    }

    function getScreenCoordY(d) {
        return yScale( d[GraphConfig["y_field"]] );
    }

    /*
     * Subset the data:
     */
    var dataFiltered = data.filter(function(d) { 
        return d['Year'] == GraphConfig["year"];
    });
    
    /*
     * Show paths:
     * Reference: https://bl.ocks.org/mbostock/3883245
     */
    var line = d3.svg.line()
                .x(function(d) { return getScreenCoordX(d); })
                .y(function(d) { return getScreenCoordY(d); });
    
    var paths = svg.append("g")
                .attr("class", "gpath")
                .selectAll("path")
                .data([dataFiltered])
                .enter()
                .append("path");
    
    paths.attr("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", 2)
        .attr("d", line);
    
    /*
     * Show markers:
     */
    var markers = svg.append("g")
                .attr("class", "gmarker")
                .selectAll("circle")
                .data(dataFiltered, keyFunction)
                .enter()
                .append("circle");

    markers.attr("cx", getScreenCoordX)
            .attr("cy", getScreenCoordY)
            .attr("r", makeLowestSelector(dataFiltered, 3, 
                        GraphConfig["y_field"], 7, 4))
            .attr("fill", makeLowestSelector(dataFiltered, 3, 
                        GraphConfig["y_field"], "orange", "steelblue"));
    
    /*
     * Legend:
     */
    var legend = svg.append("g")
                .attr("class", "legend")
                .attr("transform", 
                      "translate(" + (0.59 * graphWidth) + 
                      ","          + (0.07 * graphHeight) + ")");

    // Preferable months:
    legend.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 7)
        .attr("fill", "orange");

    legend.append("text")
        .attr("transform", "translate(20,4)")
        .attr("font-size", "0.9em")
        .attr("fill", "gray")
        .text("Preferable months (to avoid delays)");
    
    // Other months:
    legend.append("circle")
        .attr("cx", 0)
        .attr("cy", 25)
        .attr("r", 4)
        .attr("fill", "steelblue");
    
    legend.append("text")
        .attr("transform", "translate(20,30)")
        .attr("font-size", "0.9em")
        .attr("fill", "gray")
        .text("Other months");

    /*
     * Updating function:
     */
    function update(year) {
        var dataFiltered = data.filter(function(d) { 
            return d['Year'] == year;
        });
        
        /*
         *  Update paths:
         */
        var paths = svg.select("g.gpath")
                        .selectAll("path")
                        .data([dataFiltered]);

        paths.enter().append("path");
        paths.exit().remove();
        paths.attr("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", 2)
            .transition()
            .duration(GraphConfig["trans_duration"])
            .attr("d", line);

        /*
         *  Update markers:
         */
        var markers = svg.select("g.gmarker")
                        .selectAll("circle")
                        .data(dataFiltered, keyFunction);

        markers.enter().append("circle");
        markers.exit().remove();
        markers.transition()
                .duration(GraphConfig["trans_duration"])
                .attr("r", makeLowestSelector(dataFiltered, 3, 
                            GraphConfig["y_field"], 7, 4))
                .attr("fill", makeLowestSelector(dataFiltered, 3, 
                            GraphConfig["y_field"], "orange", "steelblue"))
                .attr("cx", getScreenCoordX)
                .attr("cy", getScreenCoordY);

        /*
         *  Update title:
         */
        var title = svg.select("text.gtitle")
                        .text(makeTitle(year));

        /*
         * Update year selector:
         */
        updateYearSelector(year);
    }

    updateFunction = update;
    updateYearSelector(GraphConfig["year"]);

    startAnimation(advanceYear);
}
