"use client";
import { _TeamData } from "@/libs/interface";
import "@/styles/leaderboard.scss";
import moment from "moment-timezone";
import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] : any = React.useState();

  useEffect(() => {
      const fetchLeaderboard = async () => {
        await fetch('/api/team', {
          method: "POST"
        }).then(res => res.json())
        .then(data => {
          setLeaderboard(data.data);
        })
      }
      fetchLeaderboard();
      setInterval(() => {
        fetchLeaderboard();
      }, 10000);
  }, []);

  return (
    <div id="leaderboard-container">
      <Tabs id="leaderboard-tab">
        <span id="leaderboard-heading">LEADERBOARD</span>
        <TabList className="tab-list-container">
          <Tab className="tab-list-item">
            CTF 01{" "}
            <span className="tab-list-item-title">
              THE BEGINNNG <br />
              <small>12-22-21</small>
            </span>
          </Tab>
          <Tab className="tab-list-item" disabled>
            COMING <br /> SOON <br />
            <small>00-00-00</small>
          </Tab>
        </TabList>

        <TabPanel className="tab-panel">
          <table id="leaderboard-table">
            <thead>
              <tr>
                <th>TEAM</th>
                <th>POINTS</th>
                <th>MEMBERS</th>
                <th>CHALLEGES</th>
                <th>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((team: _TeamData, i: number) => (
                  <tr key={team.team_id}>
                    <td style={{ position: "relative" }}> 
                      <span className="leaderboard-ranking">{i == 0 && "1st"}</span>
                      <span className="leaderboard-ranking">{i == 1 && "2nd"}</span>
                      {team.team_name}</td>
                    <td>{team.team_points_earned}</td>
                    <td>{team.team_members.length}</td>
                    <td>{team.team_challenges_completed.length}</td>
                    <td>{moment(team.updatedAt).tz('Asia/Manila').format("hh:mm:ss A")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No Teams Found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default React.memo(Leaderboard);
