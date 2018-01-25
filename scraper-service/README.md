# Facebook Page Scraper

## Testing locally
```serverless invoke local --function hello -s dev```

## Deploying
```serverless deploy --aws-profile=personal -s prod```

## Getting an FB page access token
1. get access token
2. exchange token
	```
	/oauth/access_token?  
		grant_type=fb_exchange_token&           
		client_id={app-id}&
		client_secret={app-secret}&
		fb_exchange_token={short-lived-token} 
	```

3. Get page access token
	```
	/{page-id}?fields=access_token
	```


TODO:
scrape comment statuses
- add reaction summary x 2 to comments table
- paginate reactions
- save reactions

Comments and subcomments
- add user details
- scrape post statuses?

- for posts, comments, subcomments, reactions handle 404 gracefully
- add tagging
- API: all posts
- API: 


