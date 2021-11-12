import React, { useState } from 'react';
import './App.css';
import tags from './tags.json';
import activities from './activities.json';

function Headline(props) {
  return (
    <h1>What should you do with your kids today?</h1>
  );
}

function FilterChip(props) {
  return (
    <button
      className={`
      ${props.isSelected ? 'selected-filter' : 'unselected-filter'}
      ${props.isAvailable ? '' : 'unavailable-filter'}
      `}
      onClick={() => props.onClick(props.tag)}
    >
      {props.tag}
    </button>
  )
}

function FilterGroup(props) {
  const filters = [];
  for (const tag of tags) {
    filters.push(
      <FilterChip
        isAvailable={
          props.availableFilters.includes(tag)
        }
        isSelected={
          props.selectedFilters.includes(tag)
        }
        key={tag}
        onClick={() => props.addRemoveFilter(tag)}
        tag={tag}
      />
    );
  }

  return (
    <div className="filter-group">
      {filters}
    </div>
  );
}

function RandomizeButton(props) {
  return (
    <button
      className="randomize-button"
      onClick={() => props.onClick()}
    >
      {props.clicked ? 'Select a different activity' : 'Select activity'}
    </button>
  );
}

function ActivitySuggestion(props) {
  return (
    <div className={`
      activity-suggestion 
      ${props.clicked ? 'clicked' : ''}
      `}
    >
      <p>You should</p>
      <h3>{props.activity}!</h3>
    </div>
  );
}

function useFilters(initialState) {
  const [selectedFilters, setSelectedFilters] = useState(initialState || []);

  //Given a filter, adds it to selectedFilters if it's not already there, or removes it if it is already there.
  const addRemoveFilter = (filter) => {
    //If the filter is already in selectedFilters...
    if (selectedFilters.some((item) => item === filter)) {
      setSelectedFilters(prevFilters => prevFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters(prevFilters => [...prevFilters, filter]);
    }
  }

  return [selectedFilters, addRemoveFilter];
}

function randomSelection(currentSuggestion, selectedFilters) {
  let filteredActivities = [];

  //Filter activities
  if (selectedFilters.length === 0) {
    for (const item in activities) {
      filteredActivities.push(activities[item].name);
    }
  } else {
    for (const item in activities) {
      const isInActivityTags = (filter) => activities[item].tags.includes(filter);
      //If an activity includes all of the selected filters...
      if (selectedFilters.every(isInActivityTags)) {
        filteredActivities.push(activities[item].name);
      }
    }
  }

  //If one of the activities in the list is the same as the activity that's currently being suggested, take it out
  filteredActivities = filteredActivities.filter(item => item !== currentSuggestion);

  let randomActivity;
  //If there aren't any other viable activities besides the one that's already being suggested...
  if (filteredActivities.length === 0) {
    randomActivity = currentSuggestion;
  } else {
    const randomNum = Math.floor(Math.random() * filteredActivities.length);
    randomActivity = filteredActivities[randomNum];
  }
  return randomActivity;
}

function App(props) {
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [selectedFilters, addRemoveFilter] = useFilters();

  const handleSelectClick = () => {
    const randomActivity = randomSelection(currentSuggestion, selectedFilters);

    //Set suggestion
    setCurrentSuggestion(randomActivity);

    //Show suggestion
    if (!hasBeenClicked) {
      setHasBeenClicked(true);
    }
  }

  // Only show available filters
  const availableFilters = new Set();

  for (const activity of activities) {
    //If the activity item's tags contain ALL of the filters in the selectedFilters list...
    if (selectedFilters.every(filter => activity.tags.includes(filter))) {
      for (const tag of activity.tags) {
        availableFilters.add(tag);
      }
    }
  }

  return (
    <div className="app">
      <Headline />
      <FilterGroup
        addRemoveFilter={addRemoveFilter}
        availableFilters={[...availableFilters]}
        selectedFilters={selectedFilters}
      />
      <RandomizeButton
        clicked={hasBeenClicked}
        onClick={handleSelectClick}
      />
      <ActivitySuggestion
        activity={currentSuggestion}
        clicked={hasBeenClicked}
      />
    </div>
  );

}

export default App;