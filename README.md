# Real time and Muti-modal Software Framework for Reinforcement Learning

What is this
===============
This projec is related to the researh where a human can help teach a software agent to learn faster.For example, you have have someone play a game of Mario, and use this demonstration to help the agent learn. Or, you have have someone watch an agent playing Mario and interrupt to say "you should have jumped here". Or, you have someone watch an agent playing Mario and interrupt to say "you just messed up here." In the past, we've focused on doing things locally - building an interface for these kind of interactions isn't so bad when you just have someone sit down in front of a laptop. But, ideally, we'd be able to run these kinds of experiments over the web.

What our framework can do
===============
* Interact with Turkers recruited via Amazon’s Mechanical Turk, as well as human subjects recruited from other venues
* Support multiple forms of human guidance, including explicit reward, action advice, demonstrations, and shaping reward function construction.
* Handle bi-directional requests, where guidance can be initiated by either the human teacher or the student agent. 
* Allow for real-time interaction with a live agent, as well as pre-recorded agent behaviors.
* Allow a person to go forward and backward in time to provide human guidance at different points in previous trajectories
* Be compatible with at least 3 tasks implemented in OpenAI gym.

Getting started
===============

The following instructions will get you a copy of this project and you can run the project on your local machine.

### Prerequisites

You need to install the following software:

* Node

* npm

### Dependencies

* react 
> The main Javascript library we are using for building user interfaces.
* react-device-detect
> npm package that used to detect the type of device of user for better user experience
* react-html-parser
> npm package that used to convert HTML strings into React components. Avoids the use of dangerouslySetInnerHTML and converts standard HTML elements, attributes and inline styles into their React equivalents.
* react-router
> npm package that used to provide routing in React
* antd
> Ant-design is an enterprise-class UI design language and React UI library.Most of our framework's UI design based on this library.
* websocket
> npm package that used to build web-socket connection with our backend server. We are relying on web-socket to receive the game frames and communicating between the front end and the back end.
* axios
> npm package that used to send GET and POST request to our api endpoints
* uuid
> npm package used to generate uuid(universally unique identifier). We use uuidv4 in our project as the userId to identify each user uniquelly.

### Clone

* Clone this repo to your local machine using `git clone https://github.com/IRLL-Org/RL_framework_frontend.git`

### Setup

> Install the package for frontend 

```shell
$ npm install 
```

### Run

> Run frontend 

```shell
$ npm start
```

### Build
```
$ npm run build
```
