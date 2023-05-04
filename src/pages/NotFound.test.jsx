import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import NotFound from "./NotFound";
import { MemoryRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


describe("NotFound", () => {
    test("renders page not found message",async () => {
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

    test("renders 404 error message",async () => {
        const initialState = {user: {
            profile_pic: null
        }};
        const mockStore = configureStore();
        store = mockStore(initialState);
        let store; 
        const { getByText } = render(<MemoryRouter>
            <Provider store={store}>
                <NotFound />
            </Provider>
        </MemoryRouter>);
        expect(getByText("صفحه مورد نظر شما یافت نشد. لطفا آدرس صفحه را بررسی کنید.")).toBeInTheDocument();
    });

    test("renders page not found image",async () => {
        const initialState = {user: {
            profile_pic: null
        }};
        const mockStore = configureStore();
        store = mockStore(initialState);
        let store; 
        const { getByText } = render(<MemoryRouter>
            <Provider store={store}>
                <NotFound />
            </Provider>
        </MemoryRouter>);

        expect(getByText("All Rights Reserved © Projma.ir")).toBeInTheDocument();
    });
});
