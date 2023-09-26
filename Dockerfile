# Use an official Node.js runtime as the base image
FROM node:19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build your React app (use npm run build or yarn build)
RUN npm run build

# Expose the port your app listens on (usually 3000 for Create React App)
EXPOSE 3000

# Define the command to start your app (usually npm start or yarn start)
CMD ["npm", "start"]