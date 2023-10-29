import React, { useState, useEffect, useRef } from "react";
import AddTeamIcon from "../png/AddTeamIcon.png";

const SettingsComponent = ({ handleSettingsDone, teams, setTeams }) => {
  const handleTeamNameChange = (index, event) => {
    const updatedTeams = [...teams];
    updatedTeams[index].name = event.target.value;
    setTeams(updatedTeams);
  };

  const addTeam = () => {
    setTeams([
      ...teams,
      {
        name: "",
        correctAnswers: 0,
        passAnswers: 0,
        isCurrentTeam: false,
        playedThisRound: false,
      },
    ]);
  };

  return (
    <div className="settings-component">
      <label onClick={addTeam}>
        <img src={AddTeamIcon} className="add-team-icon" />
      </label>
      {teams.map((team, index) => (
        <div key={index}>
          <label>
            קבוצה מס' - {index + 1}
            <input
              type="text"
              value={team.name}
              onChange={(event) => handleTeamNameChange(index, event)}
            />
          </label>
          <br />
        </div>
      ))}
      {/* <button onClick={addTeam}>Add Team</button> */}
      {!!teams.length && (
        <button className="settings-done" onClick={handleSettingsDone}>
          אאאאאאאאאאאאאאלף
        </button>
      )}
    </div>
  );
};

export default SettingsComponent;
