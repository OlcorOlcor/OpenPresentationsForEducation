# Open Slides
Welcome to Open Slides!
Open slides is a tool designed for creating extensible presentation, where the user has full control over the output.

Presentations are written in Markdown and exported in either Reveal.js or in plain HTML thats ready for custom made JavaScript for presenting.

Presentations are split into multiple *lanes*. At the basic level *lane* is just a linear collection of slides, but each lane can have an entirely different meaning.
Including the main presentation, speaker notes or optional chapters.
Its up to the user to decide how they want to use each lane.

The application is live on github pages, you can check it out [here](https://olcorolcor.github.io/OpenPresentationsForEducation/). 

## Instalation
To get the application running on your machine first clone the repository and enter the root directory.

```bash
git clone https://github.com/OlcorOlcor/OpenPresentationsForEducation.git
cd OpenPresentationsForEducation
```

Afterwards install dependancies using npm.

```bash
npm install
```

Lastly start the application with the following command.

```bash
npm run start
```

Alternatively you can use a docker image.

```bash
docker build -t open_slides .
docker run -p 3000:3000 open_slides
```
