# AVA: Automated Virtual Assessment

Ava is a web app built for the Yale Center for Emotional Intelligence. It is a research tool that allows researchers to send scheduled and customizable messages to study participants through SMS or email.

Researchers can create *studies*, recruit participants into *studies*, and send messages to and track participants over time.

## Development Info
Built on React/Redux stack, CI w/ Jenkins


### Participant Tracking
##### Participant Tracking
* Researcher should be able to see when a participant has completed a survey (webhooks) or replied to a message
* Be able to segment user participant data
* Researcher should be able to set up "expectations", and have a mechanism to track those expectations

##### Researcher should be able to send messages to participants
* Formats:
	* Email
	* SMS
* Selective Sending:
	* Based on filters (conditions)
	* Based on custom selection
* Types of Messages:
	* Manual Messages
	* Scheduled Messages
* Survey Aware
	* Know when surveys are completed
	* Look into Qualtrics & TypeForm

### Participant Management
##### Participant Registration
* MVP: Researcher should be able to enter user account information on behalf of participant
* User Metadata (location, school, role)
* Participant should be able to register without researcher action
	* Researcher should be able to send an invitation link/SMS to user

##### Groups
* Researcher should be able to assign groups/tags/metadata to participants
	* Group
		* Location (country, state)
		* Group name (i.e., school name)
	* Tags
		* Teacher
		* Administrator
		* Student
	* Metadata
		* Notes
		* Unstructured Data

Groups vs. Studies You can be part many groups (Yale Class of 2018).
	* Researcher should be able to assign participants to groups
	* Participant should be able to assign themselves to groups

##### Studies
There are two channels for communication: formal (through studies), informal communications (not part of a study).

##### Studies
Studies are scheduled messages (either via SMS/email) with reminders. Study is the high level concept; you can associate groups with Studies
* Study metadata:
	* Which school does it belong to?
	* Who are the participants?
	* Description etc.
	* Schedule
	* Reminders
		* Selective reminders for people who haven’t completed surveys
		* When are people reminded?
		* What are the reminder messages
		* How many reminders?
	* Dates
		* Randomization Feature
	* Downloading study data
		* Researchers should be able to download all communication between server & user in CSV format
	* Ability to copy studies (associated with one group to another group)

##### Other Ideas
* User facing metrics dashboard

