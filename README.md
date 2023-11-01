# Project manager spring boot react

- [Project manager spring boot react](#project-manager-spring-boot-react)
  - [Github repositories](#github-repositories)
  - [Application features](#application-features)
  - [Install TypeScript](#install-typescript)
  - [Create React application](#create-react-application)

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
    - [ ] Assigning tasks to issues or projects.
    - [ ] Monitoring task progress.
    - [ ] Tracking work hours for tasks.

4. **User Management:**

    - [ ] A list of all application users.
    - [ ] Creating new users.
    - [ ] Assigning users to issues and tasks.

5. **Search and Filtering:**

    - [ ] The ability to search and filter projects, issues, tasks, and users.

## Install TypeScript

1. Install globally `npm install -g typescript`
2. Check version `tsc --version`

## Create React application

1. In terminal 
    ```shell
    npx create-react-app frontend-project-manager --template typescript
    ```
2. Add Bootstrap: https://getbootstrap.com/docs/5.2/getting-started/introduction/#quick-start
3. file `public/index.html`
   Add CSS
    ```html
        <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    ```
    Add JavaScript
    ```html
     <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    ```
