# Project manager spring boot react

-   [Project manager spring boot react](#project-manager-spring-boot-react)
    -   [Github repositories](#github-repositories)
    -   [Application features](#application-features)
    -   [Technology stack](#technology-stack)
    -   [Install TypeScript](#install-typescript)
    -   [Create React application](#create-react-application)
    -   [Commit prefixes:](#commit-prefixes)

## Github repositories

Backend: https://github.com/pawelNu/backend-project-manager

Frontend: https://github.com/pawelNu/frontend-project-manager

## Application features

1. **Project Management:**

    - [ ] A list of all projects.
    - [ ] Creating new projects.
    - [ ] Editing existing projects.
    - [ ] Deleting existing projects.
    - [ ] Project details, including descriptions, deadlines, priorities, etc.

2. **Issue Management:**

    - [ ] A list of all issues within a project.
    - [ ] Creating new issues.
    - [ ] Assigning issues to projects.
    - [ ] Adding history to issues (e.g., change descriptions and updates).
    - [ ] Assigning tasks to issues.
    - [ ] Assigning parent issues (issues to which a given issue is linked).

3. **Task Management:**

    - [ ] A list of all tasks within a project.
    - [ ] Creating new tasks.
    - [ ] Assigning tasks to issues.
    - [ ] Assigning tasks to projects.
    - [ ] Monitoring task progress.

4. **User Management:**

    - [ ] A list of all application users.
    - [ ] Creating new users.
    - [ ] Assigning users to issues.
    - [ ] Assigning users to tasks.

5. **Search and Filtering:**

    - [ ] The ability to search and filter projects, issues, tasks, and users.

## Technology stack

-   Node.js v18.18.0
-   Typescript v5.2.2
-   React v18.2.0
-   Bootstrap v5.2.3

## Install TypeScript

1. Install globally `npm install -g typescript`
2. Check version `tsc --version`

## Create React application

1. In terminal
    ```shell
    npx create-react-app frontend-project-manager --template typescript
    ```
2. Add Bootstrap: https://getbootstrap.com/docs/5.2/getting-started/introduction/#quick-start to file `public/index.html`

## Commit prefixes:

-   feat (task_no): The new feature you're adding to a particular application
-   fix (task_no): A bug fix
-   style (task_no): Feature and updates related to styling
-   refactor (task_no): Refactoring a specific section of the codebase
-   test (task_no): Everything related to testing
-   docs (task_no): Everything related to documentation
-   chore (task_no): Regular code maintenance. [ You can also use emojis to represent commit types]
