import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import anonymous from "../../../static/images/workspace_management/members/anonymous.png";
import ShowMembersInDrawer from "./ShowMembersInDrawer";

test("it shows member image for all the members", async () => {
  const members = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      userName: "JohnDoe",
      email: "JohnDoe@gmail.com",
      image: anonymous,
    },
    {
      id: 2,
      firstName: "Sina",
      lastName: "Alinejad",
      userName: "SinaAlinejad",
      email: "sinaalinejad4@gmail.com",
      image: anonymous,
    },
    {
      id: 3,
      firstName: "Mohammad",
      lastName: "Osoolian",
      userName: "dsoolian",
      email: "dsoolian@gmail.com",
      image: anonymous,
    },
  ];
  render(
    <MemoryRouter>
      <ShowMembersInDrawer members={members} />
    </MemoryRouter>
  );
  const images = document.querySelectorAll("img");
  expect(images).toHaveLength(members.length);
});

test("it shows a link to member profile for all users", async () => {
  const members = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      userName: "JohnDoe",
      email: "JohnDoe@gmail.com",
      image: anonymous,
    },
    {
      id: 2,
      firstName: "Sina",
      lastName: "Alinejad",
      userName: "SinaAlinejad",
      email: "sinaalinejad4@gmail.com",
      image: anonymous,
    },
    {
      id: 3,
      firstName: "Mohammad",
      lastName: "Osoolian",
      userName: "dsoolian",
      email: "dsoolian@gmail.com",
      image: anonymous,
    },
  ];
  render(
    <MemoryRouter>
      <ShowMembersInDrawer members={members} />
    </MemoryRouter>
  );
  const links = document.querySelectorAll("a");
  expect(links).toHaveLength(members.length);
});

test("links contain the url of member's public profile", async () => {
  const members = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      userName: "JohnDoe",
      email: "JohnDoe@gmail.com",
      image: anonymous,
    },
    {
      id: 2,
      firstName: "Sina",
      lastName: "Alinejad",
      userName: "SinaAlinejad",
      email: "sinaalinejad4@gmail.com",
      image: anonymous,
    },
    {
      id: 3,
      firstName: "Mohammad",
      lastName: "Osoolian",
      userName: "dsoolian",
      email: "dsoolian@gmail.com",
      image: anonymous,
    },
  ];
  render(
    <MemoryRouter>
      <ShowMembersInDrawer members={members} />
    </MemoryRouter>
  );
  const links = document.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    expect(links[i]).toHaveAttribute(
      "href",
      `/profileview/${members[i].userName}`
    );
  }
});
