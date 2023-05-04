import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "./Landing";
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe("Landing", () => {
    // it("renders a title in the document head",async () => {
        // const initialState = {
        //     user: {
        //         profile_pic: null
        //     }
        // };
        // const mockStore = configureStore();
        // store = mockStore(initialState);
        // let store;
        // render(
        //     <Provider store={store}>
        //         <MemoryRouter>
        //             <Landing />
        //         </MemoryRouter>
        //     </Provider>
        // );
    //     expect(document.title).toEqual("پروجما");
    //     // // get title by id
    //     // const title = document.querySelector("#title");
    //     // expect(title).toBeInTheDocument();
    // });

    it("renders the header component", () => {
        const initialState = {
            user: {
                profile_pic: null
            }
        };
        const mockStore = configureStore();
        store = mockStore(initialState);
        let store;
        screen.width = 1000;
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Landing />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByRole("banner")).toBeInTheDocument();
        // set the screen width to 500px to test the mobile view
        // screen.width = 400;
        // expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    // it("renders the first paragraph of text", async () => {
    //     const initialState = {
    //         user: {
    //             profile_pic: null
    //         }
    //     };
    //     const mockStore = configureStore();
    //     store = mockStore(initialState);
    //     let store;
    //     screen.width = 1000;
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <Landing />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //     // expect(getByText("از ابزارهای مدیریت موجود استفاده")).toBeInTheDocument();
    //     const paragraph = screen.getByText(
    //         /از ابزارهای مدیریت موجود استفاده/i
    //     );
    //     expect(paragraph).toBeInTheDocument();
    // });

    // it("renders the first top image", () => {
    //     render(<Landing />);
    //     const image = screen.getByRole("img", { name: /good team/i });
    //     expect(image).toBeInTheDocument();
    // });

    // it("renders the second paragraph of text", () => {
    //     render(<Landing />);
    //     const paragraph = screen.getByText(
    //         /از ابزارهای مدیریت موجود استفاده/i,
    //         { selector: "div > div > div > div > div > div > div > div > p" }
    //     );
    //     expect(paragraph).toBeInTheDocument();
    // });

    // it("renders the second top image", () => {
    //     render(<Landing />);
    //     const image = screen.getByRole("img", { name: /software engineer/i });
    //     expect(image).toBeInTheDocument();
    // });

    // it("renders the first card", () => {
    //     render(<Landing />);
    //     expect(screen.getByText(/Card 1 Title/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Card 1 Detail/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Card 1 Text/i)).toBeInTheDocument();
    // });

    // it("renders the second card", () => {
    //     render(<Landing />);
    //     expect(screen.getByText(/Card 2 Title/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Card 2 Detail/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Card 2 Text/i)).toBeInTheDocument();
    // });

    // it("renders the third card", () => {
    //     render(<Landing />);
    //     expect(screen.getByText(/Card 3 Title/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Card 3 Detail/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Card 3 Text/i)).toBeInTheDocument();
    // });

    // it("renders the footer component", () => {
    //     render(<Landing />);
    //     expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    // });
});
