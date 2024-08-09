
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
  2) create three new branches: 
  ```
	git branch -b dev
	git branch -b green
	git branch -b blue
  ``` 
  4) Copy .env.template to .env and replace the dummy values with your own (Use s6pack Cloud app to create these variables or use s6pack Cloud as reference to create your own necessary services).
  5) (Optional) For AWS access key and secret, it would be best to create IAM user/credentials with the following limited permissions (replace ```domain_name``` with your domain name):
    ```{
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
				"arn:aws:s3:::dev.domain_name.com/*"
        		"arn:aws:s3:::green.domain_name.com",
				"arn:aws:s3:::green.domain_name.com/*"
        		"arn:aws:s3:::blue.domain_name.com",
				"arn:aws:s3:::blue.domain_name.com/*"
			]
		}
      ]
    }```
  6) Create Github secrets for the following Workflow variables:
      
      ENV_FILE_DEV
      ENV_FILE_GREEN
      ENV_FILE_BLUE
        
      Eache of these secrets need to contain all of the variables and values found in the .env.template file. Be sure to replace the specific stack's values as needed for each branch. Keep all the vairables safe somewhaere on your local computer because once saved in github you will not be able
	  to view them again. 
  7) Add these individual secrets used in the workflow templates:

      AWS_BUCKET_NAME_DEV
      AWS_BUCKET_NAME_GREEN
      AWS_BUCKET_NAME_BLUE
      AWS_ACCESS_KEY_ID
      AWS_SECRET_ACCESS_KEY
      AWS_REGION
      
  8) Push your branch



# Mantis Free React Material UI Dashboard Template [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Download%20Mantis%20React%20-%20The%20professional%20Material%20designed%20React%20Admin%20Dashboard%20Template%20&url=https://mantisdashboard.io&via=codedthemes&hashtags=reactjs,webdev,developers,javascript)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Price](https://img.shields.io/badge/price-FREE-0098f7.svg)](https://github.com/codedthemes/mantis-free-react-admin-template/blob/main/LICENSE)
[![GitHub package version](https://img.shields.io/github/package-json/v/codedthemes/mantis-free-react-admin-template)](https://github.com/codedthemes/mantis-free-react-admin-template/)

Mantis is a free and open source React redux dashboard template made using the Material UI React component library with aim of flexibility and better customizability.


