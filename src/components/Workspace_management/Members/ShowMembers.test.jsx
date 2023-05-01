import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import user from "@testing-library/user-event";
import anonymous from "../../../static/images/workspace_management/members/anonymous.png";
import ShowMembers from "./ShowMembers";

test("it shows one row for each member", async () => {
  const members = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "JohnDoe@gmail.com",
      image: anonymous,
    },
    {
      id: 2,
      firstName: "Sina",
      lastName: "Alinejad",
      email: "sinaalinejad4@gmail.com",
      image: anonymous,
    },
    {
      id: 3,
      firstName: "Mohammad",
      lastName: "Osoolian",
      email: "dsoolian@gmail.com",
      image: anonymous,
    },
  ];
  const go_to_profile = vi.fn();
  const removeMember = vi.fn();
  render(
    <ShowMembers
      members={members}
      go_to_profile={go_to_profile}
      removeMember={removeMember}
    />
  );
  const rows = document.querySelectorAll("tr");
  expect(rows).toHaveLength(members.length + 1);
});

test("it shows one image for each member", async () => {
  const members = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "JohnDoe@gmail.com",
      image: anonymous,
    },
    {
      id: 2,
      firstName: "Sina",
      lastName: "Alinejad",
      email: "sinaalinejad4@gmail.com",
      image: anonymous,
    },
    {
      id: 3,
      firstName: "Mohammad",
      lastName: "Osoolian",
      email: "dsoolian@gmail.com",
      image: anonymous,
    },
  ];
  const go_to_profile = vi.fn();
  const removeMember = vi.fn();
  render(
    <ShowMembers
      members={members}
      go_to_profile={go_to_profile}
      removeMember={removeMember}
    />
  );
  const images = document.querySelectorAll("img");
  expect(images).toHaveLength(members.length);
});

test("it shows email and names of the members correctly", async () => {
  const members = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "JohnDoe@gmail.com",
      image: anonymous,
    },
    {
      id: 2,
      firstName: "Sina",
      lastName: "Alinejad",
      email: "sinaalinejad4@gmail.com",
      image: anonymous,
    },
    {
      id: 3,
      firstName: "Mohammad",
      lastName: "Osoolian",
      email: "dsoolian@gmail.com",
      image: anonymous,
    },
  ];
  const go_to_profile = vi.fn();
  const removeMember = vi.fn();
  render(
    <ShowMembers
      members={members}
      go_to_profile={go_to_profile}
      removeMember={removeMember}
    />
  );
  const names = screen.getAllByRole("fullname");
  const emails = screen.getAllByRole("email_input");
  for (let i = 0; i < members.length; i++) {
    expect(names[i]).toHaveTextContent(
      members[i].firstName + " " + members[i].lastName
    );
    expect(emails[i]).toHaveTextContent(members[i].email);
  }
});

test("it goes to member profile after clicking the profile button", async () => {
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
  const go_to_profile = vi.fn();
  const removeMember = vi.fn();
  render(
    <ShowMembers
      members={members}
      go_to_profile={go_to_profile}
      removeMember={removeMember}
    />
  );
  const profile_button = document.querySelector("#JohnDoe");
  user.click(profile_button);
  expect(go_to_profile).toHaveBeenCalled();
});

test("it opens a Delete Dialog for removing specified member", async () => {
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
  const go_to_profile = vi.fn();
  const removeMember = vi.fn();
  render(
    <ShowMembers
      members={members}
      go_to_profile={go_to_profile}
      removeMember={removeMember}
    />
  );
  const open_remove_dialog = document.querySelector("#open_remove_dialog");
  user.click(open_remove_dialog);
  expect(screen.getByText("بله")).toBeInTheDocument();
  expect(screen.getByText("خیر")).toBeInTheDocument();
});

test("it opens a Delete Dialog for removing specified member", async () => {
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
  const go_to_profile = vi.fn();
  const removeMember = vi.fn();
  render(
    <ShowMembers
      members={members}
      go_to_profile={go_to_profile}
      removeMember={removeMember}
    />
  );
  const open_remove_dialog = document.querySelector("#open_remove_dialog");
  user.click(open_remove_dialog);
  const yes_button = screen.getByText("بله");
  user.click(yes_button);
  expect(removeMember).toHaveBeenCalled();
});
