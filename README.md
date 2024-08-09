
# s6pack - Client App
###### <sup>*For the s6pack Cloud App click [here](https://github.com/bmiles-development/s6pack-cloud).*</sup>
1. Serverless
2. Scalable
3. Secure
4. Software as a
5. Service
6. Starter
* Pack

![s6pack](./public/s6pack.svg)



#SETUP
  ** This setup uses a deployment strategy by Sharath Vignesh explained [here](https://sharathvignesh.medium.com/ci-cd-deploy-react-app-to-aws-s3-using-github-actions-3f6d77783190).
  1) Clone this repository and cd into the project folder.
  2) delete the .git folder 
  3) Create a new project in Github (eg: s6pack-example)
  4) Create three new branches: 
  		```
		git branch -b dev
		git branch -b green
		git branch -b blue
  		```
  5) Push the three branches: dev, blue, and green live.
		```
		git push -u origin dev
		git push -u origin blue
		git push -u origin green
		```
		You will likely get github action errors emailed to you. Ignore them for now.
  6) Copy .env.template to .env and replace the dummy values with your own (Use s6pack Cloud app to create these variables or use s6pack Cloud as reference to create your own necessary services). Populate the commented out live versons as well for copying into git hub secrets for deploying later.
		```
		REACT_APP_AWS_REGION = "{your region here eg: us-west-1}"
		```
		User pool ids can be found [here](https://us-west-1.console.aws.amazon.com/cognito/v2/idp/user-pools). Add to the variable in the .env file here:
		```
		REACT_APP_USER_POOL_ID = "us-west-1_{dev pool id here}"
		```
		For the blue and green env variables, use the dataStackLive_user_pool 

		Next populate the User Pool App Client ID. It can be found in the AWS console by clicking the user pool name, then click the ```App Integration``` tab, then at the bottom section under ```App client list``` you will see a list of App clients called something like ```dataStackDev-non_generated_secret_client```. Copy the ```Client ID``` and paste it here:
		```
		REACT_APP_USER_POOL_WEB_CLIENT_ID="{client id here}"
		```
		For the blue and green env variables, use the dataStackLive_user_pool.

		Next, find the Identity Pool Ids [here](https://us-west-1.console.aws.amazon.com/cognito/v2/identity/identity-pools). Populate the vairable below using the dataStackDev-Identity-pool:
		```
		REACT_APP_AWS_IDENTITY_POOL_ID = "us-west-1:{dev pool id here}"
		```
		For the blue and green env variables, use the dataStackLive_identity_pool.

  7) For AWS access key and secret, create a new IAM user [here](https://us-east-1.console.aws.amazon.com/iam/home?region=us-west-1#/users/create) (eg: a User named ClientAppGithubWorkfows) 
  8) Select ```Attach policies directly``` 
  9) On the "Specify Permissions" page, click ```JSON``` and paste the following limited permissions (replace ```domain_name``` with your domain name):
    	```
		{
			"Version": "2012-10-17",
			"Statement": [
				{
					"Sid": "AccessToGetBucketLocation",
					"Effect": "Allow",
					"Action": [
						"s3:GetBucketLocation"
					],
					"Resource": [
						"arn:aws:s3:::*"
					]
				},
				{
					"Sid": "AccessToWebsiteBuckets",
					"Effect": "Allow",
					"Action": [
						"s3:PutBucketWebsite",
						"s3:PutObject",
						"s3:PutObjectAcl",
						"s3:GetObject",
						"s3:ListBucket",
						"s3:DeleteObject"
					],
					"Resource": [
						"arn:aws:s3:::dev.domain_name.com",
						"arn:aws:s3:::dev.domain_name.com/*",
						"arn:aws:s3:::green.domain_name.com",
						"arn:aws:s3:::green.domain_name.com/*",
						"arn:aws:s3:::blue.domain_name.com",
						"arn:aws:s3:::blue.domain_name.com/*"
					]
				}
			]
		}
		```
  10) Create a Policy Name (eg. ClientAppGithubWorkfowsPolicy) and click ```Create Policy```.
  11) Create Github Secrets for Actions. In your github project for the following Workflow variables:
      ```
      ENV_FILE_DEV
      ENV_FILE_GREEN
      ENV_FILE_BLUE
      ```
      Each of these Github Secrets need to contain all of the variables and values found in the .env file you've just edited. Keep all the vairables safe somewhere on your local computer because once saved in Github Secrets you will not be able to view them again. 
  12) Create seperate Github Secrets for each of the variables below. These are used in the Github Workflow templates which can be found in the .github/workflows folder:

      AWS_BUCKET_NAME_DEV
      AWS_BUCKET_NAME_GREEN
      AWS_BUCKET_NAME_BLUE
      AWS_ACCESS_KEY_ID
      AWS_SECRET_ACCESS_KEY
      AWS_REGION
      
  13) Push the three branches: dev, blue, and green live.
		```
		git push -u origin dev
		git push -u origin blue
		git push -u origin green
		```



# Mantis Free React Material UI Dashboard Template [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Download%20Mantis%20React%20-%20The%20professional%20Material%20designed%20React%20Admin%20Dashboard%20Template%20&url=https://mantisdashboard.io&via=codedthemes&hashtags=reactjs,webdev,developers,javascript)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Price](https://img.shields.io/badge/price-FREE-0098f7.svg)](https://github.com/codedthemes/mantis-free-react-admin-template/blob/main/LICENSE)
[![GitHub package version](https://img.shields.io/github/package-json/v/codedthemes/mantis-free-react-admin-template)](https://github.com/codedthemes/mantis-free-react-admin-template/)

Mantis is a free and open source React redux dashboard template made using the Material UI React component library with aim of flexibility and better customizability.


