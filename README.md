# Project Title

Brief description of your project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them:

- Ruby version: 3.2.2
- Rails version: 7.0.8
- System dependencies

### Installing

A step by step series of examples that tell you how to get a development environment running.

#### Backend Setup

1. **Install Ruby on Rails and Ruby**: Make sure you have Ruby and Ruby on Rails installed on your system. You can find the installation instructions on the [Official Rails Guides](https://guides.rubyonrails.org/getting_started.html#creating-a-new-rails-project-installing-rails).

2. **Install Gems**: Navigate to your Rails application directory and run:

   ```bash
   bundle install
   ```

   This command installs all the gems listed in your Gemfile.

3. **Database Creation and Initialization**:

   - Migrate the database to create the necessary tables:

     ```bash
     rails active_storage:install
     rails db:migrate
     ```

#### Frontend Setup (Next.js Client)

1. **Install Node.js and npm**: Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

2. **Install Packages**: Navigate to your Next.js project directory and run:

   ```bash
   npm install
   ```

   This command installs all the packages listed in your `package.json` file.

3. **Run the Client**:

   ```bash
   npm run dev
   ```

   This command starts the Next.js development server.

### Running the Tests

Explain how to run the automated tests for this system.

### Deployment

Add additional notes about how to deploy this on a live system.

### Built With

- [cookies-next](https://www.npmjs.com/package/cookies-next) - The cookies management tool used for Next.js.
- [devise-api](https://github.com/nejdetkadir/devise-api) - Devise API for Ruby on Rails backend authentication.

### Contributing

Please read [CONTRIBUTING.md](#) for details on our code of conduct, and the process for submitting pull requests to us.

### Authors

- **Zhouyang Meng** - _Initial work_ - [Chester](https://github.com/YuyakeSys)
- **Ning An** - [Github](https://github.com/Annedrew)

### Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc.

### font awesome

npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

### react commands

- npm i --save react-select
- npm install react-dropzone
- npm install react-icons
- npm install next-auth
- npm config set legacy-peer-deps true (This command needs to be executed before installing react-google-login to configures npm to use legacy behavior.)
- npm install react-google-login
- npm i country-state-city