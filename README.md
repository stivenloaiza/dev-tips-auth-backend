# **Microservices with Authentication and Tip Management**

This project involves the development of multiple microservices that include authentication functionalities using X-API-Key, registration, and management of technological tips. The main goal is to ensure that user requests are secure, traceable, and can provide useful information efficiently and safely. Below are the key functionalities, technologies used, and development practices adopted for this project.


## Content Table

* Characteristics.
* Functionalities.
* Requirements.
* Local Configuration.
* Running the App.
* Queries in Postman and Swagger.
* Gitflow Branching Strategy
* Participants.
* License.

## Characteristics

* Secure Authentication
* Technological Tips Management
* Scalable and Maintainable Development
* Efficient Data Storage
* Documentation and Collaboration
* Best Development Practices
* Security and Traceability

## Functionalities

**Authentication** 
* Implementation of authentication based on X-API-Key to secure access to the services.
* API key management including creation, update, deletion, and restriction by IP.

**Tip Management**
* Registration and management of technological tips.
* Organization of tips by levels, technologies, sub-technologies, and languages.
* Efficient search and filtering of tips.

**Technologies Used**
* **NestJS:** Framework for building scalable and maintainable microservices.
* **TypeScript:** Programming language that provides static typing and advanced development features.
* **MongoDB:** NoSQL database used to store tips and user records.
* **Swagger:** Tool for API documentation that facilitates the creation of interactive documentation.
* **Confluence:** Platform for team documentation and collaboration.

**Development Practices**
* **Security:** Use of X-API-Key authentication to protect access to the microservices.
* **Traceability:** Logging all user requests for monitoring and auditing purposes.
* **Code Best Practices:** Use of design patterns, SOLID principles, and code reviews.
* **Testing:** Implementation of unit, integration, and end-to-end tests to ensure software quality.
* **Extensive Documentation:** Creation of documentation in Swagger and Confluence to facilitate the use and maintenance of the microservices.

## Requirements

* Node.js (v14 or higher)
* npm (v6 or higher) or yarn (optional)
* MongoDB: Version 4.4 or higher

## Local Configuration

Para ejecutar el proyecto localmente, clona el repositorio y configura las variables de entorno necesarias para la base de datos y JWT.

1. Clone the repository:

    ``` bash
    git clone https://github.com/stivenloaiza/dev-tips-auth-backend.git
    cd dev-tips-auth-backend
    ```

2. Install the necessary dependencies:

    ``` bash
    npm install
    ```

3. Copy the .env.example file to a new .env file and configure the necessary environment variables:

    ``` bash
    cp .env.example .env    
    ```

Edit the .env file and configure the following values:

    // EXECUTION ENVIRONMENT (local | production)
    ENVIRONMENT =

    // PERSISTENCE LOCAL
    // Local connection example: mongodb://localhost:27017/{DB_NAME_LOCAL}
    DB_CONNECTION = mongodb://
    DB_HOST_LOCAL = localhost:27017/
    DB_NAME_LOCAL =

    // PERSISTENCE PRODUCTION
    // Production connection example: mongodb+srv://{DB_USERNAME}:       {DB_PASSWORD}{DB_HOST_PRODUCTION}/{DB_NAME_PRODUCTION}?retryWrites=true&w=majority
    DB_HOST_REMOTE =
    DB_NAME_REMOTE =
    DB_USERNAME =
    DB_PASSWORD =    

These steps will allow you to execute the project. Additionally, you must develop the environment variables according to your needs.

## Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Queries in Postman and Swagger

...


## Gitflow Branching Strategy

This project follows the Gitflow strategy, a robust model for software development. Here is how the branches are organized and their purpose:

* `main:` Main branch with stable code for production. 
* `dev:` Development branch with the latest features before production. 
* `feat/AT-20-NameTask:` Branch of tasks with functionalities, identified by a Jira ID in addition to the task name.

The work is integrated into the 'dev' branch for integration testing. Once 'dev' is stable and ready to be released, it is merged into 'main'.

If you want to contribute to the project, create a new branch from 'dev' using the appropriate prefix (feat/AT-20-NameTask). After finishing your work and testing, open a Pull Request towards 'dev'.

## Participants

The participants in the creation process during the "Microservices with Authentication and Tip Management" project were:

* Julian Roman.
* Camilo Manco.
* Angelica Hernandez.
* Hernan.
* Camila Sepulveda

## License

Nest is [MIT licensed](LICENSE).
