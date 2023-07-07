import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Members from "./Members";

vi.mock("../../utilities/axiosConfig", () => ({
  __esModule: true,
  default: {
    get: vi.fn(() =>
      Promise.resolve({
        data: [
          {
            user: {
              id: 1,
              first_name: "John",
              last_name: "Doe",
              username: "johndoe",
              email: "johndoe@example.com",
            },
            profile_pic: null,
          },
          {
            user: {
              id: 2,
              first_name: "Jane",
              last_name: "Doe",
              username: "janedoe",
              email: "janedoe@example.com",
            },
            profile_pic: null,
          },
        ],
      })
    ),
    patch: vi.fn(() => Promise.resolve()),
  },
}));

describe("Members Component", () => {
  const params = { board_id: 1, task_id: 1 };
  const setDoers = vi.fn();
  const doer = [
    {
      email: "johndoe@example.com",
      username: "johndoe",
      first_name: "John",
      last_name: "Doe",
      profile_pic: null,
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders Members component", async () => {
    render(<Members params={params} setDoers={setDoers} doer={doer} />);
    expect(screen.getByText(/اعضا/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      screen.logTestingPlaygroundURL();
      expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    });
  });

  test("renders members with initials if profile pic is not available", async () => {
    render(<Members params={params} setDoers={setDoers} doer={doer} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  // test("selects a member and calls add_to_doers function", async () => {
  //   render(<Members params={params} setDoers={setDoers} doer={doer} />);
  //   fireEvent.click(screen.getByRole("button"));
  //   const checkbox = await screen.findAllByRole("checkbox");
  //   let firstUncheckedBox = null;
  //   for (let i = 0; i < checkbox.length; i++) {
  //     if (!checkbox[i].checked) {
  //       firstUncheckedBox = checkbox[i];
  //       break;
  //     }
  //   }
  //   console.log("UUUUUUUUUUUUUUUUUUUUUUUUU");
  //   console.log(firstUncheckedBox);
  //   fireEvent.click(firstUncheckedBox);
  //   expect(setDoers).toHaveBeenCalled();
  //   expect(setDoers).toHaveBeenCalledWith([
  //     {
  //       email: "johndoe@example.com",
  //       username: "johndoe",
  //       first_name: "John",
  //       last_name: "Doe",
  //       profile_pic: null,
  //     },
  //     {
  //       email: "janedoe@example.com",
  //       username: "janedoe",
  //       first_name: "Jane",
  //       last_name: "Doe",
  //       profile_pic: null,
  //     },
  //   ]);
  // });

  // test("unselects a member and calls delete_from_doers function", async () => {
  //   render(<Members params={params} setDoers={setDoers} doer={doer} />);
  //   fireEvent.click(screen.getByRole("button"));
  //   const checkbox = await screen.findByRole("checkbox");
  //   fireEvent.click(checkbox);
  //   fireEvent.click(checkbox);
  //   expect(setDoers).toHaveBeenCalledTimes(1);
  //   expect(setDoers).toHaveBeenCalledWith([]);
  // });
});
