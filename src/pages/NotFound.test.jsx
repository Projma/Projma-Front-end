import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import NotFound from "./NotFound";
import { MemoryRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// test("renders the not found page with the correct message",async () => {
//     render(<MemoryRouter>
//         <NotFound />
//     </MemoryRouter>);
//     expect(screen.getByText(/صفحه مورد نظر یافت نشد/i)).toBeInTheDocument();
// });


describe("NotFound", () => {
    test("renders page not found message", () => {
        const initialState = {user: {
            profile_pic: null
        }};
        const mockStore = configureStore();
        store = mockStore(initialState);
        let store; 
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <NotFound />
                </MemoryRouter>
            </Provider>
        );
        expect(getByText("صفحه مورد نظر یافت نشد")).toBeInTheDocument();
    });

    test("renders 404 error message", () => {
        // const { getByText } = render(<NotFound />);
        const { getByText } = render(<MemoryRouter>
            <Provider >
                <NotFound />
            </Provider>
        </MemoryRouter>);
        expect(getByText("ارور 404")).toBeInTheDocument();
    });

    // test("renders page not found image", () => {
    //     // const { getByAltText } = render(<NotFound />);
    //     const { getByAltText } = render(<MemoryRouter>
    //         <Provider >
    //             <NotFound />
    //         </Provider>
    //     </MemoryRouter>);
    //     expect(getByAltText("Page Not Found")).toBeInTheDocument();
    // });
});
