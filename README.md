# Team special-sniffle
### Marcus Ng, Adeebur Rahman, and Edmond Wong

# Dataset
[Yelp Dataset](https://www.yelp.com/dataset)

We are using the Yelp dataset which has data for over 5,200,000 reviews, 174,000 businesses, 200,000 pictures, 11 metropolitan areas, and 1,300,000 users. The data is separated across four json files:
```
business.json
checkin.json
photos.json
tip.json
```

# Significance
We want to figure out what factors influence a NYC business' rating on Yelp and find similarities between highly rated businesses.

# Data Visualization
Select a NYC business from a dropdown list.
Show selected business information.

**Scatter Plot:** Number of Photos (x) vs. Average Rating (y)

Compares the number of photos to the average rating of each business to find a correlation.

Selected business is highlighted.

When a user hovers over a data point, information about the corresponding business is shown.

Clicking on a datapoint would change the selected business.


**Pie Chart:** Density of stores by NYC neighborhood (one pie chart per neighborhood)

Classified by average rating (0-5, every .5) to see how many ba

When a user hovers over a section, the section enlarges and shows the number of businesses with the rating.


**Heatmap:** Business Checkins per day of week

Shows the frequency of checkins of selected business by hour for each day of the week.

When a user hovers over a shaded box, the number of checkins will be displayed.


# Utilizing D3
• Scatterplot with axis

• Pie Chart with percentages

• [Github Heatmap](http://bl.ocks.org/tjdecke/5558084)


# Questions
1) How can I improve my business' average rating?
2) Which neighborhood should my business be located in based on the popularity of businesses in each neighborhood?
3) Do businesses with higher average ratings have more checkins per day/total photos?
