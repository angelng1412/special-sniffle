# Team special-sniffle
### Marcus Ng, Adeebur Rahman, and Edmond Wong

# Dataset
[Yelp Dataset](https://www.yelp.com/dataset)

We are using the Yelp dataset which has data for over 5,200,000 reviews, 174,000 businesses, 200,000 pictures, 11 metropolitan areas, and 1,300,000 users. The data we use is separated across three json files:
```
business.json
checkin.json
photos.json
```
Due to the massive amount of data, we decided to focus on only businesses within Illinois (~1400 businesses).
To save space, we created our own json and csv by compiling information from the different json files.

# Significance
We want to figure out what factors influence the rating of Illinois businesses on Yelp and find similarities between highly rated businesses.

# Data Visualization
Select a business from a dropdown list.
Show selected business information through graphs

**Scatter Plot:** Number of Photos (x) vs. Average Rating (y)

Compares the number of photos to the average rating of each business to find a correlation.

Selected business is highlighted.

When a user hovers over a data point, information about the corresponding business is shown.

Clicking on a datapoint would change the selected business.


**Pie Chart:** Density of stores by zip code (one pie chart per .5 rating)

Each pie chart is made up of businesses with the specified rating. Number of businesses is separated by location (zip code) to identify the overall quality of businesses in different zip codes.

When a user hovers over a section, the section shows the number of businesses with the rating.


**Heatmap:** Business Checkins per day of week

Shows the frequency of checkins of selected business by hour for each day of the week.

When a user hovers over a shaded box, the number of checkins will be displayed.


# Utilizing D3
• Scatterplot with axis

• Pie Chart with percentages

• [Github Heatmap](http://bl.ocks.org/tjdecke/5558084)


# Questions
1) How can I improve my business' average rating?
2) Which zip code should my business be located in based on the density/rating of businesses in that zip code?
3) Do Illinois businesses with higher average ratings have more checkins per day/total photos?
