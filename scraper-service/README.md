# Facebook Page Scraper

## Testing locally
```serverless invoke local --function hello -s dev```
or
```npm run hello```

## Deploying
```serverless deploy --aws-profile=alert_fb_scraper -s prod```

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
- add user a data to comments
- ensure access token is not expired when detecting deletions
- add tagging
- API: all posts


