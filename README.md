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
PLAYER_ROLE --- USER_GROUP_ROLE
USER_GROUP_ROLE --- PLAYER_GROUP
PLAYER_GROUP --- GAME
GAME --- GAME_USER_GROUP_ROLE
USER_GROUP_ROLE --- GAME_USER_GROUP_ROLE
```

## ERD

```mermaid
erDiagram
app_user ||--o{ user_group_role : ""
player_role ||--o{ user_group_role: ""
user_group_role }o--|| player_group : ""
player_group ||--o{ game : ""
game ||--|| game_user_group_role : ""
user_group_role }o--|| game_user_group_role : ""

app_user {
    serial id PK
    varchar name
    varchar email
    varchar password
}
player_role {
    serial id PK
    varchar name
}
user_group_role {
    serial id PK
    int user_id FK
    int group_id FK
    int role_id FK
}
player_group {
    serial id PK
    varchar name
}
game {
    serial id PK
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
