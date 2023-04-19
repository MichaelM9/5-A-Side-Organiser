# 5 A Side Organiser

## What is the Application?

An all-in-one application for football organisers and players alike which allows all parties involved to provide and access the necessary information around the setup of a football game in one location.

## Why is this Necessary

Organising a game of football between friends should be a care free process, however this is not the case in my experience. A system reliant on on dms, group chats or even word of mouth provides so many issues for the organiser and there is little in the way of tracking or consistency. Confusion around game dates/times, who is going to the games and paying for the games are some of the biggest problems that have risen from my personal 5-a-side that could be eliminated with the correct application. So why not aim for a way to gather all the information one needs and display it in a concise and user friendly way to make organising less of a hassel and reduce confusion of the players within the group?

## Application Aims

- A single application to organise/participate in a football game
- User Role based system
- Creation/management of football groups
- A collection of involved groups
- Football game proposal, participation and setup

## MVP

- User accounts and login page
- Football group creation with user invitation
- User Roles within groups i.e. Admin, Organiser and Player
- Football game setup (dates, times, locations, no. of players etc.) by Organiser
- Football game accepting by Players
- Random team allocation

## Stretch Goals

- User game notificaions (push and/or email)
- Post game poles (Player of the Match, best goal etc.)
- Player ratings for team allocation balance
- User payment?

## Domain Model

```mermaid
flowchart
APP_USER --- USER_GROUP_ROLE
USER_ROLE --- USER_GROUP_ROLE
USER_GROUP_ROLE --- USER_GROUP
USER_GROUP --- GAME
GAME --- GAME_USER_GROUP_ROLE
USER_GROUP_ROLE --- GAME_USER_GROUP_ROLE
```

## ERD

```mermaid
erDiagram
app_user ||--o{ user_group_role : ""
user_role ||--o{ user_group_role: ""
user_group_role }o--|| user_group : ""
user_group ||--o{ game : ""
game ||--|| game_user_group_role : ""
user_group_role }o--|| game_user_group_role : ""

app_user {
    serial id PK
    varchar first_name
    varchar last_name
    varchar email
    varchar password
}
user_role {
    serial id PK
    varchar name
}
user_group_role {
    serial id PK
    int user_id FK
    int group_id FK
    int role_id FK
}
user_group {
    serial id PK
    varchar name
}
game {
    serial id PK
    int group_id FK
    date date
    timestamp time
    varchar location
}
game_user_group_role {
    serial id PK
    int game_id FK
    int user_group_role_id FK
}
```

## API Design

### Users

`GET /users` Returns a list of all current users

Response `200 OK`

```json
[
  {
    "id": 1,
    "firstName": "Michael",
    "lastName": "Mackin",
    "email": "michaelmackin@email.com"
  },
  {
    "id": 2,
    "firstName": "Marcus",
    "lastName": "Rashford",
    "email": "mrashford@email.com"
  }
]
```

`GET /users/{id}` Returns a user by the respective id

Response `200 OK`

```json
{
  "id": 1,
  "firstName": "Michael",
  "lastName": "Mackin",
  "email": "michaelmackin@email.com"
}
```

`GET /users/{id}/groups` Returns a list of groups by user id

Response `200 OK`

```json
{
  "groups": ["Premier League", "La Liga", "Serie A"]
}
```

`POST /users` Adds a new user

Response `201 CREATED`

```json
{
  "firstName": "Lionel",
  "lastName": "Messi",
  "email": "lmessi@email.com"
}
```

`POST /users/{id}/groups/{id}` Adds a group to a user

Response `201 CREATED`

`PUT /users/{id}` Updates a user by the respective id

Response `200 OK`

```json
{
  "firstName": "Lionel",
  "lastName": "Messi",
  "email": "lmessi123@email.com"
}
```

---

### Groups

`GET /groups/{id}/users` Returns a list of all users within a group

Response `200 OK`

```json
{
  "name": "Premier League",
  "users": [
    { "userId": 1, "firstName": "Marcus", "lastName": "Rashford" },
    { "userId": 2, "firstName": "Pep", "lastName": "Guardiola" },
    { "userId": 3, "firstName": "Mohamed", "lastName": "Salah" }
  ]
}
```

`GET /groups/{id}/games` Returns a list of all games within a group

Response `200 OK`

```json
{
  "games": ["Game 1", "Game 2", "Game 3", "Game 4"]
}
```

`POST /groups` Adds a group

Response `201 CREATED`

```json
{
  "name": "La Liga"
}
```

`DELETE /groups/{id}` Deletes a group by its group id

Response `204 NO CONTENT`

---

### Games

`GET /games/{id}` Returns a game by its game id

Response `200 OK`

```json
{
  "date": "2023-1-1",
  "time": "12:00:00",
  "location": "Old Trafford"
}
```

`GET /games/{id}/users` Returns a list of users for a game

Response `200 OK`

```json
{
  "users": [
    { "userId": 1, "firstName": "Marcus", "lastName": "Rashford" },
    { "userId": 2, "firstName": "Pep", "lastName": "Guardiola" },
    { "userId": 3, "firstName": "Mohamed", "lastName": "Salah" }
  ]
}
```

`POST /games/groups/{id}` Adds a game for a group

Response `201 CREATED`

```json
{
  "date": "2023-1-2",
  "time": "14:00:00",
  "location": "Ethiad"
}
```

`POST /games/{id}/users/{id}` Adds a user to a game

Response `201 CREATED`
