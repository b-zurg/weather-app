# Description
This project was intended to be a simple weather app that would allow one to do the following
1. Search and select a city that you would like to view the weather of
2. Show some insights into the current weather, such as temperature and so on
3. Show some insights into the forecast, allowing one to select days in the future and view a line chart with 24 hours of data displayed at a time. 

## Optional Goals
1. Turn the app into a PWA
1. Save local state to local storate
1. Have the option to integrate with firebase and save the local state to an account
1. Have a fully qualified country name in the results instead of the country code
1. Allow to switch the graph to show preciptation, humidity and other daily metrics

# Decisions
## Api
After looking around a bit it seemed like the OpenWeatherMap api was the easiest to jump into with free features.  This turned out to be a mistake. I was overall not very happy with the quality of the API at the end of the project and sometimes it would be very slow.  But it did get the job done.  For example the free api does not seem to provide precipitation information even though it explicitly says it does on its docs. 

It also sometimes does not return forecast information for a city which is quite annoying.

## State Management
Over time I've learned that you should treat remote state and local state as two separate things.  For remote state (server requests etc.) I used react query to help me manage it. I also opted to use the natively available fetch api as it does the job fine.

For local state I used redux toolkit.  I think it makes redux's philosophy finally a practical reality and is miles better to write than older redux code.

## Styling
I think tailwind is the ultimate conclusion of the search for an effective styling solution.  I have extensive experience with other methods - JSS, emotion, styled-components etc.  They all come with drawbacks that tailwind does not.  It was a pleasure to be able to use utility classes again to make components.

## Organization
The components are somewhat aligned with the concept of atomic design, which says that UI components have different levels of complexity, and that higher complexity components should be clearly composed of smaller complexity ones.

Of course it becomes a bit challenging to neatly organize things and some things I wish I had split up better of course.

Additionally I have a `lib` folder which is intended to have non-react unit-testable code as well as interfaces related to the domains.  Typically everything in here would be done with TDD but since thi was a short project not everything is tested.

## Translations
I rolled out my own simple localization solution with the same interface as react-18n.  I think setting up react-18n is actually too much to start with but if we use the same interface then at a future point refactoring to use it would be no problem.

## Prototyping
Instead of using something like storybook to prototype components as I was developing them I made a `/test` route and page in the app and simply made a component that would display the other components as I would set them up.  This is effectively what one would do with storybook but without the maintenance costs. It's also without the maturity so I would only do something like this for quick prototyping.

## Routing
I do wish I had set up the routing properly. I was flipping in and out of wanting to use redux to manage some state and react router, and I think that it's possible they would have some synergy but currently didn't use router for more than simply having a `/test` page. 

## Graphing
So most people would just use D3 and call it a day. Maybe to save myself time I should have done the same but I have experience with d3 fighting against react, as they both try to manipulate the dom and if you're not careful will conflict with each other.  

Also to be honest creating svgs directly in my experience is not so hard. Especially once the basic utility functions (e.g. scale) are there. 

I rolled out everything myself because that's what I would actually do in a mature project. 

## Responsiveness
I tried to make the UI responsive but it is not the most mature UI. I had to time box what I could do. But at a very basic level it is responsive.


# Getting Started
## 0. Prerequisite Reading
You should be familiar with
* React/web-dev basics
* React query
* Redux toolkit
* Tailwind CSS
* Typescript

At the very least google unfamiliar topics before diving into development.

## 0.5 Clone and install dependencies
The project is using pnpm, so run `pnpm install`

## 1. `.env` File
You'll need a .env file filled out with the api key. Copy the `.env.template` file and make an account at https://openweathermap.org/api 
Then copy your api key in to the value of REACT_APP_OPENMAP_WEATHER_API_KEY

## 2. Start the app
`pnpm start` to run it, your browser should open automatically.

## Basic Scripts
- `pnpm start` starts up dev mode with hot reloading and serves the app at [http://localhost:3000](http://localhost:3000) 
- `pnpm test` runs all of the jest tests in interactive watch mode
- `pnpm run build` builds the production application to the `build` folder;
