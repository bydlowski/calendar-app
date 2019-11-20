# VanHack Calendar Page

> Events Calendar Redesign for VanHackaton

## Live version of web app

https://pedro-vanhack.netlify.com/

## Main features

* Search and tag/filter system to help user find events;
* Tags based on event type, location, application dates, start date and favorites;
* Option to select events as favorites right on the main page (option saved on localStorage);
* Slideshow to show highlighted events;
* Functional modal feature;
* Tagging system integrated to the modal;
* Option to apply to an event inside the modal (option saved on localStorage);
* Message informing the user if he is registered and button to unregister from an event inside the modal;
* Message on event list informing if user is registered for that event;
* Indication in event list if it is exclusive for premium users;
* Message inside the modal informing that event is exclusive for members and CTO button to register;
* Clear separation of event categories (open, finished registration, etc);
* Use of external API from mockable.io to populate event list and slideshow;
* Use of Server-Side Render to enhance performance;
* Use of Store to manage state;

## Built With

* [Vuejs](https://vuejs.org/)
* [Nuxt](https://nuxtjs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Axios](https://github.com/axios/axios)
* [Flickity](https://flickity.metafizzy.co/)
* [Buefy](https://buefy.org/)
* [Fuse.js](https://fusejs.io/)


## Running the project locally

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev
```

## Authors

* **Pedro Bydlowski** - [https://bydlow.ski/](https://bydlow.ski/)