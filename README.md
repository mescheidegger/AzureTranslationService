## Third-Party Dependencies
This project uses third-party libraries and external APIs (e.g., Azure Translation Services). Their respective licenses and terms of service apply. This project is licensed under MIT, but usage of third-party services must comply with their own terms.

The entire codebase for this project was generated through prompt engineering with GPT4 as a proof of concept for leveraging a Microsoft Azure Translation service. 

The client side was built using create-react-app. The server side is Node with Express for routing.

All code was written by AI.

1. Create a MS Azure Subscription
2. Create a Translator Service under your description
3. Copy this project locally and install dependencies from package.json. 
4. Create a .env file in the root directory of the project.
5. Populate API_KEY, REGION, and ENDPOINT variables.
6. Run "npm startdev" in root directory for a local development instance.
7. Build scripts are configured for a digital ocean app platform deployment.

If you modify the client side of this implementation, you will need to run "npm run build" before deploying code.