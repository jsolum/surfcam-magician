import React from "react";
import { useHistory } from "react-router-dom";

import useLocation from "../hooks/useLocation";

import SelectWithDefault from "./SelectWithDefault";

const sortByName = (items) => {
  const sortedNames = items
    .map(item => item.name)
    .sort((a, b) => a.localeCompare(b));

  return sortedNames.reduce((sortedItems, sortedName) => {
    const item = items.find(item => item.name === sortedName);
    return sortedItems.concat(item);
  }, []);
};

const SpotPicker = () => {
  let history = useHistory();
  let [
    location,
    selected,
    setSelected,
    setLocation,
    setLoading
  ] = useLocation();

  return (
    <div>
      <div className="level">
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.continent}
            options={sortByName(location.continents)}
            selectFunc={event => {
              setLoading(true);
              setSelected({
                continent: event.target.value,
                country: null,
                region: null,
                area: null,
                spot: null
              });
              setLocation({
                ...location,
                countries: [],
                regions: [],
                areas: [],
                spots: []
              });
            }}
            defaultText={"Select a Continent"}
          />
        </div>
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.country}
            options={sortByName(location.countries)}
            selectFunc={event => {
              setLoading(true);
              setSelected({
                ...selected,
                country: event.target.value,
                region: null,
                area: null,
                spot: null
              });
              setLocation({ ...location, regions: [], areas: [], spots: [] });
            }}
            defaultText={"Select a Country"}
          />
        </div>
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.region}
            options={sortByName(location.regions)}
            selectFunc={event => {
              setLoading(true);
              setSelected({
                ...selected,
                region: event.target.value,
                area: null,
                spot: null
              });
              setLocation({ ...location, areas: [], spots: [] });
            }}
            defaultText={"Select a Region"}
          />
        </div>
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.area}
            options={sortByName(location.areas)}
            selectFunc={event => {
              setLoading(true);
              setSelected({
                ...selected,
                area: event.target.value,
                spot: null
              });
              setLocation({ ...location, spots: [] });
            }}
            defaultText={"Select an Area"}
          />
        </div>
        <div className="level-item">
          <div className="select">
            <select
              defaultValue={selected.spot || "default"}
              onChange={event => {
                setLoading(true);
                setSelected({ ...selected, spot: event.target.value });
              }}
            >
              <option value="default" disabled>
                Select a Spot
              </option>
              {sortByName(location.spots).map(spot => {
                return (
                  <option
                    key={spot.id}
                    value={spot.id}
                    disabled={!spot.hasCameras}
                  >
                    {spot.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="level-item">
          <button
            className="button is-primary"
            disabled={selected.spot == null}
            onClick={() => history.push(`/spot/${selected.spot}`)}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotPicker;
