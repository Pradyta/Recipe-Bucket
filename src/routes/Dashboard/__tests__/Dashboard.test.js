/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../index";
import "@testing-library/jest-dom";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { mockRecipeData } from "../../../constant";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Recipes Dashboard", () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  it("Show Loader while recipes are loading", async () => {
    act(() => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>,
        container
      );
    });
    const loadingContainer = await screen.findByTestId("loading");
    expect(loadingContainer).toBeInTheDocument();
  });

  it("Show italian recipes", async () => {
    // Mocking API call for getting recipes
    axios.get.mockImplementation(jest.fn(() => mockRecipeData));

    act(() => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>,
        container
      );
    });
    // Checking that the dom has 10 recipe cards
    await waitFor(() => {
      expect(screen.getAllByTestId("recipe-col")).toHaveLength(10);
    });
  });

  it("Search recipe", async () => {
    //   // Mocking API call for getting recipes
    axios.get.mockImplementation(jest.fn(() => mockRecipeData));

    act(() => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>,
        container
      );
    });
    const searchBox = screen.getByTestId("search-input");
    fireEvent.change(searchBox, { target: { value: "mexican" } });
    fireEvent.click(document.querySelector(".ant-input-search-button"));
    // Checking that the dom has 10 mexican recipe cards
    await waitFor(() => {
      expect(screen.getAllByTestId("recipe-col")).toHaveLength(10);
    });
  });
});
