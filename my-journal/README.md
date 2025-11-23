# JOURNAL APP
This is a React based journal application that allows users to create, view and manage journal entries. The app integrates with the JSONPlaceholder API to simulate real-world API interactions for CRUD operations.

Project Purpose: Built as a code challenge to demonstrate proficiency in React, state management, API integration and component architecture.

## Getting Started
Make sure you have the following;
1.Node.js
2.npm
3.A web browser

### Installations
1.Git clone git@github.com:Shareonniey/journal-sharon-onyango.git
2.cd into my-journal
3.Install Dependacies
-npm install

## Usage- As a user I am able to;
1.View Entries: All journal entries are automatically loaded when the app starts

2.Create Entries: Click "New Entry" to open the form, fill in title and body (both required), then submit

3.Mark Important: Click the star icon on any entry to mark it as important (local state only)

4.Edit Entries: Click the edit button on an entry to modify its content

5.Delete Entries: Click the delete button to remove an entry from the list

6.Filter: Use the "Show Important Only" toggle to filter entries

## API Intergration
The application uses JSONPlaceholder API as the backend:

Base URL: `https://jsonplaceholder.typicode.com/posts`

GET /posts: Fetch all journal entries

POST /posts: Create new journal entry

PUT/PATCH /posts/:id: Update existing entry

DELETE /posts/:id: Delete entry .

## Licence
Distributed under the MIT License.

