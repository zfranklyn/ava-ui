# AVA: Automated Virtual Assessment

Ava is a web app built for the Yale Center for Emotional Intelligence. It is a research tool that allows researchers to send scheduled and customizable messages to study participants through SMS or email.

Researchers can create *studies*, recruit participants into *studies*, and send messages to and track participants over time.

## Example Scenarios
1. School-wide, year-long study
We need to send weekly SMS surveys to a fixed group of students and teachers for a year. You should be able to track who did the survey, and automatically schedule text messages to remind delinquent users to complete the survey. You should be able to send custom messages to participants at any point.


### Participant Tracking
- Participant Tracking
	- Researcher should be able to see when a participant has completed a survey (webhooks) or replied to a message
	- Researcher should be able to set up "expectations", and have a mechanism to track those expectations

### Participant Communication
- Researcher should be able to send messages to participants
	- Based on filters (conditions)
	- Based on custom selection

### Participant Management
- Participant Registration
	- Researcher should be able to enter user account information on behalf of participant
	- Researcher should be able to send an invitation link/SMS to user
	- Participant should be able to register without researcher action
- Participant Group Assignment
	- Researcher should be able to assign groups/tags to participants

Groups vs. Studies
You can be part many groups (Yale Class of 2018).

	- Researcher should be able to assign participants to groups
	- Participant should be able to assign themselves to groups

- Groups
	- Should have uniquely generated IDs


## Development Info
Built on React/Redux stack, CI w/ Jenkins


