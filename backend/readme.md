### HHA Report Manager API

Welcome to the `readme` for the API for the HHA Report Manager, created by Team Orcus for CMPT373 with Brian Fraser in Fall 2021!

Below are the various API endpoints used by the project, and what kind of contents they might expect!

All endpoints except for **Authenticate** require bearer token authentication.

#
### Authentication

**Authenticate** `POST` `.../authenticate`

Requires: 

```json
{
  "username": "user",
  "password": "password"
}
```

Returns: 

`200`

```json
{
    "jwt": "bearertoken",
    "department": "Placeholder"
}
```

Or: `401` if `username` and `password` do not belong to a user.
#
### Departments


**Create Department**
`POST` `.../api/departments`

Requires:
```json
{
  "name": "Placeholder",
  "blurb": "Placeholder information!"
}
```

Note: `name` must be **unique**.

Returns:

`201`
```json
{
  "id": 16,
  "name": "Placeholder",
  "blurb": "Placeholder information!"
}
```
**Get Departments**
`GET` `.../api/departments`

Optional filter parameters: `name`

Returns:
`200`
```json
[
  {
    "id": 1,
    "name": "Placeholder",
    "blurb": "Placeholder information!"
  },
  {
    "id": 2,
    "name": "Placeholder",
    "blurb": "Placeholder information!"
  },
etc...
]
```
Or: `204` if no Departments exist.

**Get Department by ID**`GET` `.../api/departments/{id}`

Returns:
`204`
```json
{
  "id": {id},
  "name": "Placeholder",
  "blurb": "Placeholder information!"
}
```
Or: `404` if Department {id} does not exist

**Update Department by ID** `PUT` `.../api/departments/{id}`

Requires:

Any number of Department fields. 

Example given: Updating the department blurb.
```json
{
  "blurb": "Placeholder information, but updated!"
}
```
Fields should be omitted if they are not being updated.

Returns:
`200`
```json
{
  "id": {id},
  "name": "Placeholder",
  "blurb": "Placeholder information, but updated!"
}
```
Or: `404` if Department {id} does not exist

**Delete Department by ID** `DELETE` `.../api/departments/{id}`

Returns:

`204`

Or: `404` if Department {id} does not exist.

#
### Employees

**Create Employee** `POST` `.../api/employees`

Requires:

```json
{
    "username": "user",
    "firstName": "John",
    "lastName": "Smith",
    "department": "Placeholder",
    "departmentHead": false,
    "score": 0,
    "password": "hha"
}
```

Note: `username` must be **unique**.

Returns:
`201`
```json
{
    "id": 1,
    "username": "user",
    "firstName": "John",
    "lastName": "Smith",
    "department": "Placeholder",
    "departmentHead": false,
    "score": 0
}
```

**Get all Employees** `GET` `.../api/employees`

Optional filter parameters: `username`


Returns:

`200`
```json
[
    {
        "id": 17,
        "username": "user",
        "firstName": "John",
        "lastName": "Smith",
        "department": "Placeholder",
        "score": 0,
        "departmentHead": false
    },
  etc...
]
```

**Get Employee by ID** `GET` `.../api/employees/{id}`

Returns: `204`

```json
{
    "id": {id},
    "username": "user",
    "firstName": "John",
    "lastName": "Smith",
    "department": "Placeholder",
    "score": 0,
    "departmentHead": false
}
```
Or: `404` if Employee {id} does not exist.

**Update Employee by ID** `PUT` `.../api/employees/{id}`

Requires:

Any number of Employees fields.

Example given: Updating an Employee's score and department.
```json
{
  "department": "NICU",
  "score": 2
  
}
```
Fields should be omitted if they are not being updated.

Returns:

```json
{
    "id": {id},
    "username": "user",
    "firstName": "John",
    "lastName": "Smith",
    "department": "NICU",
    "score": 2,
    "departmentHead": false
}
```
Or: `404` if Employee {id} does not exist.

**Delete Employee by ID** `DELETE` `.../api/employees/{id}`

Returns:

`204` or `404` if Employee {id} does not exist.

#
### Messages

**Create new Message** `POST` `.../api/messages`

Requires:
```json
{
    "username": "user",
    "firstName": "John",
    "lastName": "Smith",
    "department": "Placeholder",
    "content": "Hello!"
}
```

Returns:

`201`
```json
{
    "id": 1,
    "username": "user",
    "firstName": "John",
    "lastName": "Smith",
    "department": "Placeholder",
    "timestamp": "2021-10-30T21:46:23.310624",
    "content": "Hello!",
    "replies": []
}
```

**Get All Messages** `GET` `.../api/messages`


Optional filter parameters: `username`, `department`

Returns:

`200`
```json
[
    {
        "id": 1,
        "username": "user",
        "firstName": "John",
        "lastName": "Smith",
        "department": "Placeholder",
        "timestamp": "2021-10-30T21:46:23.310624",
        "content": "Hello!",
        "replies": []
    },
  etc...
]
```

Or: `204` if no Messages exist.

**Get Message by ID** `GET` `.../api/messages/{id}`

Returns:

`200`
```json
{
    "id": {id},
    "username": "user",
    "firstName": "John",
    "lastName": "Smith",
    "department": "Placeholder",
    "timestamp": "2021-10-30T21:46:23.310624",
    "content": "Hello!",
    "replies": []
}
```
Or: `404` if Message {id} does not exist.

**Update Message by ID** `PUT` `.../api/messages/{id}`

Requires:

Any number of Message fields.

Example given: Updating the Message contents.
```json
{
  "content": "I edited my message!"
}
```
Fields should be omitted if they are not being updated.

Returns:
`200`
```json
{
  "id": {id},
  "username": "user",
  "firstName": "John",
  "lastName": "Smith",
  "department": "Placeholder",
  "timestamp": "2021-10-30T21:46:23.310624",
  "content": "I updated my message!",
  "replies": []
}
```
Or: `404` if Message {id} does not exist.

**Delete Message by ID** `DELETE` `.../api/messages/{id}

Returns: `204` Or: `404` if Message {id} does not exist.

**Add a Reply to a Message** `POST` `.../api/messages/{messageid}/replies`

Requires:

```json
{
    "username": "user2",
    "firstName": "Smith",
    "lastName": "John",
    "department": "Placeholder",
    "content": "Hi, John!"
}
```

Returns:

`200`

```json
{
  "id": {messageid},
  "username": "user",
  "firstName": "John",
  "lastName": "Smith",
  "department": "Placeholder",
  "timestamp": "2021-10-30T21:46:23.310624",
  "content": "Hello!",
  "replies": [
    {
        "id": 20,
        "username": "user1",
        "firstName": "Smith",
        "lastName": "John",
        "department": "Placeholder",
        "timestamp": "2021-10-30T21:57:19.55453",
        "content": "Hi, John!"
    }
  ]
}
```

Or: `404` if Message {id} does not exist.

**Update Reply by ID** `PUT` `.../api/messages/replies/{replyid}

Requires:

Any number of Reply fields.

Example given: Updating the Reply contents.
```json
{
  "content": "I edited my Reply!"
}
```
Fields should be omitted if they are not being updated.

Returns:

`200`

```json
{
  "id": {replyid},
  "username": "user1",
  "firstName": "Smith",
  "lastName": "John",
  "department": "Placeholder",
  "timestamp": "2021-10-30T21:57:19.55453",
  "content": "I edited my Reply!"
}
```

Or: `404` if Reply {replyid} does not exist.

**Delete Reply by ID** `DELETE` `.../api/messages/replies/{replyid}`

Returns: `204` Or: `404` if Reply {replyid} does not exist.

#
### Reports

**Create Report** `POST` `.../api/reports`

Requires:
```json
{
    "department": "Placeholder",
    "submitterUsername": "user",
    "submitterFirstName": "John",
    "submitterLastName": "Smith",
    "complete": false,
    "saved": false,
    "submitted": false,
    "template": false,
    "questions": [],
    "multipleChoiceQuestions": [],
    "patientInfo": []
}
```
Note: Combination of `department` and current month must be **unique**.

Returns: `201`

```json
{
    "id": 22,
    "department": "Placeholder",
    "month": "OCTOBER",
    "submitterUsername": "user",
    "submitterFirstName": "John",
    "submitterLastName": "Smith",
    "complete": false,
    "saved": false,
    "submitted": false,
    "template": false,
    "questions": [],
    "multipleChoiceQuestions": [],
    "patientInfo": []
}
```

**Get all Reports** `GET` `.../api/reports`

Optional filter parameters: `username`, `department`

Returns:

`200`

```json
[
    {
      "id": 22,
      "department": "Placeholder",
      "month": "OCTOBER",
      "submitterUsername": "user",
      "submitterFirstName": "John",
      "submitterLastName": "Smith",
      "complete": false,
      "saved": false,
      "submitted": false,
      "template": false,
      "questions": [],
      "multipleChoiceQuestions": [],
      "patientInfo": []
    },
  etc...
]
```

**Get Report by ID** `GET` `.../api/reports/{reportid}`

Returns:

`200`

```json
{
    "id": {reportid},
    "department": "Placeholder",
    "month": "OCTOBER",
    "submitterUsername": "user",
    "submitterFirstName": "John",
    "submitterLastName": "Smith",
    "complete": false,
    "saved": false,
    "submitted": false,
    "template": false,
    "questions": [],
    "multipleChoiceQuestions": [],
    "patientInfo": []
}
```

Or: `404` if Report {reportid} does not exist.

**Update Report by ID** `PUT` `.../api/reports/{reportid}`

Requires:

Any number of Report fields.

Example given: Updating the Report 'submitted' flag.
```json
{
  "submitted": true
}
```
Fields should be omitted if they are not being updated.

Returns:

`200`
```json
{
    "id": {reportid},
    "department": "Placeholder",
    "month": "OCTOBER",
    "submitterUsername": "user",
    "submitterFirstName": "John",
    "submitterLastName": "Smith",
    "complete": false,
    "saved": false,
    "submitted": true,
    "template": false,
    "questions": [],
    "multipleChoiceQuestions": [],
    "patientInfo": []
}
```

Or: `404` if Report {reportid} does not exist.
#
**Add a Written Answer Question to a Report** `POST` `.../api/reports/{reportid}/questions`

Requires:

```json
{
    "requiredByMSPP": true,
    "question": "How many patients this month?",
    "answer": "Lots!"
}
```

Returns:

`201`

```json
{
    "id": 1,
    "requiredByMSPP": true,
    "question": "How many patients this month?",
    "answer": "Lots!"
}
```

Or: `404` if Report {reportid} does not exist.

**Update Written Question** `PUT` `.../api/reports/questions/{questionid}`

Requires:

Any number of Written Question fields.

Example given: Updating the answer of a Question.
```json
{
  "answer": "Not as many as before."
}
```
Fields should be omitted if they are not being updated.

Returns:

`200`
```json
{
    "id": {questionid},
    "requiredByMSPP": true,
    "question": "How many patients this month?",
    "answer": "Not as many as before."
}
```

Or: `404` if Question {questionid} does not exist.

**Delete a Written Question** `DELETE` `.../api/reports/questions/{questionid}`

Returns: `204` or `404` if Question {questionid} does not exist.

#
**Add a Multiple Choice Question to a Report** `POST` `.../api/reports/{reportid}/questions/mcq`

Requires:

```json
{
    "requiredByMSPP": true,
    "question": "How many patients this month?",
    "choices": {
        "a": "lots!",
        "b": "the usual.",
        "c": "none!"
    },
    "choice": "a"
}
```

Returns:

`200`

```json
{
    "id": 2,
    "requiredByMSPP": true,
    "question": "How many patients this month?",
    "choices": {
        "a": "lots!",
        "b": "the usual.",
        "c": "none!"
    },
    "choice": "a"
}
```

Or: `404` if Report {reportid} does not exist.

**Update Multiple Choice Question** `PUT` `.../api/reports/questions/mcq/{mcq_id}

Requires:

Any number of Multiple Choice Question fields.

Example given: Updating the choice of an MCQ.
```json
{
  "choice": "b"
}
```
Fields should be omitted if they are not being updated.

Returns:
```json
{
    "id": {mcq_id},
    "requiredByMSPP": true,
    "question": "How many patients this month?",
    "choices": {
        "a": "lots!",
        "b": "the usual.",
        "c": "none!"
    },
    "choice": "b"
}
```

Or: `404` if MCQ {mcq_id} does not exist.

**Delete a Multiple Choice Question** `DELETE` `.../api/reports/questions/mcq/{mcq_id}`

Returns: `204` or `404` if MCQ {mcq_id} does not exist.
#
**Add Patient Incident Info to Report** `POST` `.../api/reports/{reportid}/patients`

Requires:

```json
{
    "information": "Patient experienced mild head trauma."
}
```

Returns:

`200`

```json
{
    "id": 1,
    "information": "Patient experienced mild head trauma."
}
```

Or: `404` if Report {reportid} does not exist.

**Update Patient Info** `PUT` `.../api/reports/patients/{patientinfoid}`

Requires:

```json
{
  "information": "Patient experience severe head trauma."
}
```

Returns:

`200`
```json
{
    "id": {patientinfoid},
    "information": "Patient experienced severe head trauma."
}
```

Or: `404` if Patient Info {patientinfoid} does not exist.

**Delete Patient Incident Info** `DELETE` `.../api/reports/patients/{patientinfoid}`

Returns: `204` or `404` if Patient Info {patientinfoid} does not exist.

