import React from 'react';
import './App.css';

const tags = {
  animals: "animals",
  church: "church",
  craft: "craft",
  exercise: "exercise",
  food: "food",
  free: "free",
  learning: "learning",
  musical: "musical",
  indoors: "indoors",
  outdoors: "outdoors",
  sensory: "sensory",
  snow: "snow",
};

const activities = [
  {
    name: "Go on a walk",
    tags: [tags.outdoors, tags.exercise, tags.free],
  },
  {
    name: "Paint",
    tags: [tags.indoors, tags.craft, tags.free],
  },
  {
    name: "Go to the duck pond",
    tags: [tags.outdoors, tags.free, tags.animals]
  },
  {
    name: "Build a snowman",
    tags: [tags.outdoors, tags.free, tags.snow]
  },
  {
    name: "Read stories about Jesus",
    tags: [tags.indoors, tags.free, tags.church, tags.learning]
  },
  {
    name: "Tell stories about your ancestors",
    tags: [tags.indoors, tags.free, tags.church, tags.learning]
  },
  {
    name: "Read a book",
    tags: [tags.indoors, tags.free, tags.learning]
  },
  {
    name: "Sing a silly song",
    tags: [tags.indoors, tags.free, tags.learning, tags.musical]
  },
  {
    name: "Bake cookies",
    tags: [tags.indoors, tags.free, tags.food]
  },
  {
    name: "Make a rice sensory bin",
    tags: [tags.indoors, tags.free, tags.sensory]
  },
];

function Headline(props) {
  return (
    <h1>What should you do with your kids today?</h1>
  );
}

function FilterChip(props) {
  return (
    <button
      className={[props.isSelected ? "selected-filter" : "unselected-filter"]}
      onClick={() => props.onClick(props.tag)}
    >
      {props.tag}
    </button>
  )
}

function RandomizeButton(props) {
  return (
    <button
      className="randomize-button"
      onClick={() => props.onClick()}
    >
      Select activity
    </button>
  );
}

function ActivitySuggestion(props) {
  return (
    <div className="activity-suggestion">
      <p>You should</p>
      <h3>{props.activity}!</h3>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
      currentSuggestion: null,
    }
  }

  handleFilterClick(tag) {
    if (this.state.selectedFilters.some((item) => item === tag)) {
      this.setState(prevState => ({
        selectedFilters: prevState.selectedFilters.filter((item) => item !== tag)
      }))
    } else {
      this.setState(prevState => ({
        selectedFilters: [...prevState.selectedFilters, tag]
      }));
    }
  }

  pickRandomNumber(activitiesArray) {
    return Math.floor(Math.random() * activitiesArray.length);
  }

  handleSelectClick(tags) {
    let filteredActivities = [];

    //Filter activities
    if (this.state.selectedFilters.length === 0) {
      for (const item in activities) {
        filteredActivities.push(activities[item].name);
      }
    } else {
      for (const item in activities) {
        //If an activity's tags match one of the selected filters...
        if (activities[item].tags.some((item) => this.state.selectedFilters.includes(item))) {
          filteredActivities.push(activities[item].name);
        }
      }
    }

    //If one of the activities in the list is the same as the activity that's currently being suggested, take it out
    filteredActivities = filteredActivities.filter(item => item !== this.state.currentSuggestion);

    //Select random activity
    let randomActivity;
    if (filteredActivities.length >= 1) {
      randomActivity = filteredActivities[this.pickRandomNumber(filteredActivities)];
    } else {
      randomActivity = this.state.currentSuggestion;
    }

    //Set suggestion
    this.setState(prevState => ({
      currentSuggestion: randomActivity
    }))

    //Show suggestion
    const activityElement = document.querySelector('.activity-suggestion');
    if (!activityElement.classList.contains('clicked')) {
      activityElement.classList.add('clicked');
      document.querySelector('.randomize-button').innerHTML = 'Select a different activity';
    }
  }

  render() {
    const filters = [];
    for (const tag in tags) {
      filters.push(
        <FilterChip
          isSelected={
            this.state.selectedFilters.some((item) => item === tags[tag])
          }
          key={tag}
          onClick={() => this.handleFilterClick(tag)}
          tag={tags[tag]}
        />
      );
    }

    return (
      <div className="app">
        <Headline />
        <div className="filter-group">
          {filters}
        </div>
        <RandomizeButton onClick={() => this.handleSelectClick()} />
        <ActivitySuggestion activity={this.state.currentSuggestion} />
      </div>
    );
  }
}

export default App;