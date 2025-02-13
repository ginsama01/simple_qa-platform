## QA API
QA API server is built using Deno framework and PostgreSQL. Code structure is splited into several parts following the MVC models: database, controllers, services, utils.

Database query results are cached by Redis. Websocket is used between QA API and QA UI to update whenever a new question or answer is created without need of reloading. QA API calls to LLM API to create three new answers whenever a new question is created. Additionally, there are 10 api as below:
1. `GET /api/courses` Get information about all of the courses.
2. `GET /api/courses/:id` Get information about the course with specific id.
3. `GET /api/questions/?courseId={courseId}` Get all questions in a specific course.
4. `GET /api/questions/:id` Get information about a specific question.
5. `POST /api/questions` Post a new question.
6. `GET /api/answers/?questionId={questionId}` Get all answers in a specific question.
7. `POST /api/answers` Post a new answer.
8. `GET /api/upvote/question/:id?uuid={userUuid}` Get information about which question a specific user already upvoted in a course. 
9. `GET /api/upvote/answer/:id?uuid={userUuid}` Get information about which answer a specific user already upvoted in a question. 
10. `POST /api/upvote` Post a new upvote (either question or answer).

## QA UI
QA UI is built using Astro Svelte and Tailwind CSS. Code structure is splited into several parts: layout, components, api, stores. 

The summary of the application flow is as follows:
When users visit the site, a list of available courses will be displayed. Users can select any course they want to move to this course forum. On the course forum page, a list of questions will be displayed, in reasonable order (prioritize new questions and upvoted questions). Users can access any particular question page to view the answers. Users can also upvote the question (once for each course), and create new question (three answers will be added when a new question is created). Similarly, on the question page, a list of answers will be displayed, in reasonable order (prioritize new answers and upvoted answers). Users can upvote the answer (once for each question), and create new answer. New question or answer will be displayed at the top of course/question page without the need of reloading.

## Possible Improvements
- Using dynamic routes instead of storing information in localStorage when routing.