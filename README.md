## Set up the Task Tracker Tutorial Realm Backend

https://www.youtube.com/watch?v=lqo0Yf7lnyg&ab_channel=MongoDB

https://docs.mongodb.com/realm/tutorial/

https://docs.mongodb.com/realm/tutorial/realm-app/

## Overview
Before we can implement any client SDK functionality for the Task Tracker, we need to create a backend Realm app to serve SDK requests like authentication and Realm Sync. To make this easier and faster, we've already prepared a backend Realm app configuration for you, complete with functions, triggers, a schema, and the Realm Sync configuration you'll need to connect with one of our front-end tutorial apps.

NOTE
- Tutorial Video https://youtu.be/lqo0Yf7lnyg
- Watch this video to follow along as we walk through this tutorial!

## To use our pre-made backend, you'll have to:

- Create an Atlas account, if you don't already have one. (3 minutes)
- Create a free Atlas cluster running MongoDB 4.4 or higher. (5 minutes)
- Install the Realm CLI. (5 minutes)
- Add a programmatic API key to your Atlas project and use it to log into the Realm CLI. (5 minutes)
- Use the Realm CLI to create a new Task Tracker backend Realm app with our pre-made Task Tracker backend. (5 minutes)
- Once we've finished these steps, we can start writing code to implement a frontend using Swift, Kotlin, or JavaScript.

## A. Create an Atlas Account
Time estimate: 3 minutes

To begin, you'll need a MongoDB Atlas account. If you've already got an existing MongoDB Atlas Account, you can proceed to the next step. If you don't have an Atlas account, follow the steps below to create one:

1. Navigate to the MongoDB Atlas login page.

- Click Login.
- Either enter a new set of user credentials or click the Sign Up with Google button.
- Click Sign Up to create your account.
- Follow the prompts to create an organization and project in your Atlas account. You can use the default suggested names or enter your own.

![The Atlas UI after creating an organization and project.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/atlas-create-project-and-organization.png?raw=true)

When you finish creating your organization and project, you should end up on a screen that prompts you to create an Atlas cluster:

![The Atlas UI after creating an organization and project.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/atlas-create-cluster.png?raw=true)

TIP
See:
For additional details on how to create an account, see Create an Atlas Account.

## B. Create a Free Atlas Cluster
Time estimate: 5 minutes

NOTE
MongoDB Version 4.4 or Higher Required
In order to use Realm Sync, your Atlas cluster must use MongoDB version 4.4 or higher. When setting up your cluster, select MongoDB 4.4 (or a higher version) from the dropdown menu under Additional Settings.

Next, you'll need an MongoDB Atlas cluster running MongoDB 4.4 or higher. If you've already created a free cluster in your Atlas project running a version of MongoDB lower than 4.4, you can create a new project in Atlas and then create a new cluster running MongoDB 4.4 or higher in that project using the instructions below. If you haven't created any clusters yet, follow the instructions below to create your first free cluster:

Log into your MongoDB Atlas account at cloud.mongodb.com.
Once you're logged into your account, Atlas should prompt you to create your first cluster. In the Shared Clusters category, click Create a Cluster. Alternatively, you can click Build a Cluster from the project view in your Atlas account.

## Creating a cluster with the Atlas UI.
- Under Cloud Provider & Region, select AWS and N. Virginia (us-east-1).
- Under Additional Settings, select MongoDB 4.4 (or a higher version) from the Select a Version dropdown.
- Under Cluster Name, enter the name Cluster0 for your new cluster.
- Click the Create Cluster button at the bottom of the page.
- After creating your cluster, Atlas should launch the project view for your Atlas account. In this view, you'll see Atlas's progress as it initializes your new cluster:

![The Atlas UI after creating an organization and project.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/atlas-creating-cluster.png?raw=true)

TIP
See:
For additional details on how to create a MongoDB Atlas cluster, see Deploy a Free Tier Cluster.

## C. Install the Realm CLI
Time estimate: 5 minutes

Now that you've created a cluster to use as the data source for your Realm app, we need some way to create the app itself. In most cases you'd use the Realm UI, which you can access through the Atlas UI. However, for the purposes of this tutorial, we're going to use the Realm Command Line Interface, also known as realm-cli.

We're using the Realm CLI because realm-cli allows you to manage your Realm apps programmatically using JSON configuration files instead of the Realm UI. This lets you get started with a pre-prepared app configuration faster. Follow the instructions below to install the Realm CLI in your development environment using either a package manager or the realm-cli binary:

Realm CLI is available on npm. To install it on your system, ensure that you have Node.js installed and then run the following command in your shell:

```java
npm install -g mongodb-realm-cli
```

NOTE
Realm CLI Version Compatibility
This tutorial is compatible with version 2 of realm-cli. If you already have the CLI installed, check your version to make sure that it's compatible with this tutorial.

```java
realm-cli --version
```

## D. Add an API Key to Your Atlas Project & Log into the Realm CLI
Time estimate: 5 minutes

Now that you've got realm-cli installed to your development environment, you'll need a way to authenticate using realm-cli. For security reasons, realm-cli only allows login using a programmatic API key, so we'll begin by creating a programmatic API Key that you can use to administrate your new Atlas project:

- Click Access Manager at the top of the Atlas UI. Select the Project Access option from the dropdown.
- Navigate to the API Keys tab.
- Click the Create API Key button.
- In the Description text box, enter "API Key for the MongoDB Realm CLI".

![Creating an API Key in the Atlas UI](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/atlas-create-api-key.png?raw=true)

In the Project Permissions dropdown, select "Project Owner" and deselect "Project Read Only".

![Grant your API Key "Project Owner" permissions.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/atlas-api-key-permissions.png?raw=true)

(I did not see this as an available option)

- Click Next.
- Copy your Public API Key and save it somewhere.
- Copy your Private API Key and save it somewhere; after leaving this page, you will no longer be able to view it via the Realm UI.
- Click the Add Access List Entry button.
- Click Use Current IP Address.
- Click Save.
- When you have safely recorded your private API key, click Done to navigate back to the Project Access Manager page.
- Use the following command in your terminal to authenticate with the Realm CLI:

```java
realm-cli login --api-key <public API key> --private-api-key <private API key>
```

If realm-cli produces output like the following, you have successfully authenticated:

```java
Successfully logged in
```

TIP
See:
For additional details about how to create a programmatic API key in MongoDB Atlas, see the documentation for configuring API access.

TIP
See:
For additional details about authenticating using a programmatic API key with realm-cli, see the Realm CLI authentication guide.

## E. Use the Realm CLI to Create a New Task Tracker Backend Realm App
Time estimate: 5 minutes

Now that you've got an Atlas account, an Atlas cluster running MongoDB 4.4 or higher, and an authenticated realm-cli session, you're ready to fetch the Task Tracker backend configuration. Begin by downloading the realm-tutorial-backend github repository using the git command line tool:

Run the following command to download the pre-made Task Tracker backend configuration:

```java
git clone https://github.com/mongodb-university/realm-tutorial-backend.git
```

You should see output like the following:

```java
Cloning into 'realm-tutorial-backend'...
remote: Enumerating objects: 39, done.
remote: Counting objects: 100% (39/39), done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 39 (delta 3), reused 39 (delta 3), pack-reused 0
Receiving objects: 100% (39/39), 7.25 KiB | 1.81 MiB/s, done.
Resolving deltas: 100% (3/3), done.
```

The directory where you ran the above git clone command should now contain another directory called realm-tutorial-backend. We'll use the contents of that directory to create your very own Task Tracker Realm app backend with the Realm CLI.

Navigate into the root directory of the realm-tutorial-backend project:

```java
cd realm-tutorial-backend
```

Run the push command of realm-cli to create your app.

```java
realm-cli push
```

realm-cli may take a few seconds to query your Atlas project, but you should soon see the following output:

```java
Do you wish to create a new app? [y/n]
```

Press "y", then press ENTER to confirm your intention to create a new app.

realm-cli will prompt you for the following details:

```java
App name [tasktracker]:
App Location
App Deployment Model
App Environment
```

My output
```java
ealm-cli push
Determining changes
The following reflects the proposed changes to your Realm app
--- realm_config.json
+++ realm_config.json
@@ -3,6 +3,7 @@
     "config_version": 20210101,
     "name": "tasktracker",
     "location": "US-VA",
-    "deployment_model": "GLOBAL"
+    "deployment_model": "GLOBAL",
+    "environment": "production"
 }
 

? Please confirm the changes shown above Yes
Creating draft
Pushing changes
Deploying draft
Deployment complete
Successfully pushed app up: tasktracker-aubpu
```

Press ENTER at each prompt to use the default value for your app configuration.

Press "y", then press ENTER to confirm the values for the app configuration
You should see the following output if your push command successfully created a new app:

```java
Successfully pushed app up
```

You can confirm that your app was created successfully by navigating to the Realm tab in the Atlas UI. You should see a Realm app named tasktracker:

![A newly created TaskTracker backend in the Atlas UI.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/realm-app-tasktracker.png?raw=true)

TIP
To understand the purpose of the files in the backend app repo, see Realm Application Configuration.

## F. Verify that the Task Tracker Backend is Properly Configured
Time estimate: 5 minutes

Now that you've successfully created your application, it's time to explore the provided configuration. You can access your app by navigating to the Realm tab in the Atlas UI. Click on the card representing the tasktracker app to launch the Realm UI for managing the Task Tracker backend.

![The Realm UI displays a newly created TaskTracker backend.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/tasktracker-realm-ui.png?raw=true)

Now that we can view the configuration of our app in the Realm UI, we can take a look at all of the configuration uploaded from the JSON in realm-tutorial-backend. If you'd rather jump straight into a client SDK guides, you can find the links in the What's Next? section below.

## Schema

![The Realm UI displays the schema for Task data.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/tasktracker-schema.png?raw=true)

The Schema section of the Realm UI displays information about the structure of the data stored in our linked Atlas cluster. In this section, you should see a cluster called mongodb-atlas that contains two collections: Task and User. You can navigate to the Schema tab to view the JSON Schema that defines the structure of the data in each collection.

While MongoDB's document model allows us to store data in a wide variety of shapes and sizes, Realm Database and Realm Sync require data to follow a set schema. Data that follows this schema synchronizes between the MongoDB Atlas linked data source and devices connected to your Realm app via a client SDK. This schema should match the models defined in client applications, with minor exceptions.

TIP
See also:
- Schemas

## Authentication

![The Realm UI displays the details of Email/Password authentication in Task Tracker.](https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App/blob/main/images/tasktracker-email-password.png?raw=true)


In the Authentication Providers tab of the Authentication section, you'll find information about the different ways that users can log into the Task Tracker app. In the provided Task Tracker configuration, users can only log in via "Email/Password" authentication, which lets users define an email username and a secret password known only to them to access their account in your Realm app.

If you click on the Email/Password entry in the list of authentication providers, you can view the details of Task Tracker's Email/Password authentication configuration. There are a few important fields here:

- User Confirmation Method: we've selected "automatically confirm users" so that users can log in immediately after creating an account. In a production application, you might prefer to "send a confirmation email" so that users can confirm ownership of their email accounts.
- Password Reset Method: we've selected "run a password reset function", but resetFunc doesn't actually implement any logic: it always fails. For a production application, you'd want to implement a function that actually resets the user's password if they forget it.

TIP
See:
To learn more about authentication in MongoDB Realm, see the documentation on Authentication.

## Sync
In the Sync section, you'll find information about Realm Sync, which synchronizes data between client devices and your MongoDB Atlas cluster. To enable sync, we've defined a partition key, which sorts the data in Atlas into multiple realms. We've chosen an easy-to-understand name for our partition key: _partition. Task Tracker also defines permissions for Realm Sync, which determine what partitions each user can access. Click the Define Permissions dropdown to view the permission definitions, which call the canReadPartition and canWritePartition functions to determine whether a user can read or write a particular realm.

TIP
See:
To learn more about Realm Sync, see Realm Sync Overview.

## Custom User Data & Permissions
In MongoDB Realm, each user can have an associated custom data object. We designed this app to use data stored in the user's custom data to determine permissions -- that is, whether that user can read or write a given realm or set of data, such as a project. While Realm allows clients to read and write data depending on how you configure your app permissions, we configured this app so that only system functions running on the backend can modify a user's custom data object. This prevents clients from arbitrarily granting themselves permissions.

TIP
See:
To learn more about custom user data, see Enable Custom User Data.

## Functions
The Functions section contains the Task Tracker app's executable backend logic. This includes functions that:

- add a team member to a user's project
- determine whether or not a user can read a particular partition
- determine whether or not a user can write to a particular partition
- create a new user document in the synced Atlas cluster
- fetch the members of a user's project
- remove a team member from a user's project
- reset a user's password (unimplemented)
- Click on any of the functions to view the JavaScript function definition. You can even run the function with test input.

TIP
See:
To learn more about functions in MongoDB Realm, see the documentation on functions.

## Triggers
In the Triggers section, you'll find information about triggers, certain criteria that, when met, execute logic in the Task Tracker backend via a function. In Task Tracker, you'll find one trigger: onNewUser. Click on the trigger to see details about the type of trigger and the function that that trigger activates. onNewUser has just one purpose: when a new user creates an account (hence the "Create" action type and the "Authentication" trigger type), onNewUser calls the createNewUserDocument function which initializes the custom user data for that user. This provides the first data needed to create that user's personal project, and allows them to start adding to-do tasks or even other users as project members.

TIP
See:
To learn more about triggers in MongoDB Realm, see the documentation on triggers.

## What's Next?
You just built a functional task tracker application backend with MongoDB Realm. Great job!

Now that you have a working Realm application, you can follow one of our client application tutorials to connect to your Realm app and manage tasks from a mobile or web application.

- iOS (Swift)
- Android (Kotlin)
- React Native (JavaScript)
- Web/GraphQL (JavaScript)
- Node