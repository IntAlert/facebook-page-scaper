# facebook-page-scaper
This application scrapes the posts and comments on a given Facebook page. It incremenally updates its record of the page's activity and identifies deleted posts or comments.

Below are further details of the three components of the app. 

## Context
This app will be used to collect data for research by International Alert on public Facebook pages that we host in the Eurasia region. We have a strict and well-publicised policy of removing posts/comments that are derogatory or abusive towards any ethnic group and we remove these as part of our moderation process. 

These inappropriate comments form the most important part of our research. Understanding the language used in regions of conflict / post-conflict informs our strategy for reducing any intra-community tensions.

We currently do this analysis by hand and need a quick and robust tool to replace.

The page we will initially scrape is: https://www.facebook.com/unheardvoices.intalert/

## Component: Scaper
Everytime the scraper runs it will incrementally append new posts and comments in its database. 

If a post or comment has been deleted/hidden since a previous scrape, the record of the post/comment will be tagged as deleted in the application's database.

## Component: API endpoints

eg. `GET 127.0.0.1:3000/api/page` 
Outputs a single JSON object that describes all posts and nested comments.

eg. `GET 127.0.0.1:3000/api/page/deleted_comments`
Outputs a JSON list of all deleted comments. Each deleted comment includes the parent post (and parent comments, if the deleted comments is a reply to a comment)

## Component: Admin UI
eg. `GET 127.0.0.1:3000/`
A single page app to display data provided by the two API endpoints

## Desired technology stack
Ideally, this app will be built with:
- NodeJS
- An appropriate database
- It will most likely be deployed as three AWS Lambda functions

## Potential further work
- Angular2 (or alternative) UI
- CSV output alternative to JSON endpoints
- Functions easily customisable to scrape multiple pages

## Licensing
- All code will be published under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/)
