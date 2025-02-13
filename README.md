# Designing and Building Scalable Web Applications / Course Project II Template

Provides an endpoint for a large language model (a small model with poor quality responses included), an API endpoint starter for the QA platform, and an UI starter for the QA platform.

Starting the application up for the first time may take a while, as it also downloads the (small) large language model (approx. 250 megabytes) and packages it into an image.

## Running the app

Please refer to the `RUNNING.md` file on how to run the app in debug and production mode as well as how to run the e2e test and K6 performance test.

## Features achieved
My project achieved all requirements (both for passing and passing with merits).
### Requirements for passing
- Basic Q&A functionality
- Generating answers with a large language model
- Authentication
- Configurations
- Database, schema and indexes
- Testing
- Documentation

### Requirements for passing with merits
- A single user (defined by the user uuid) can post at most one question and answer per minute. If a user with the same user uuid attempts to post another question or answer within the span of a minute, the question or answer is rejected, and the user is told to wait for a while.
- When scrolling on the course page (that lists questions) or the question page (that lists answers) and reaching (nearly) the bottom of the page, the application retrieves more content, twenty at a time (i.e. the application has an infinite scrolling functionality). Note: You can test with Security Engineering course as well as Question 1 at this course.
- In case of new questions or answers, the content shown to the user is updated automatically without a need to refresh the page. Do not implement automatic updates for the votes.
- All Kubernetes configurations.
- The application looks good and feels good to use. The application is styled using TailwindCSS, the styles are meaningful, and the styling is consistent. 