import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, } from "react-dom/test-utils";


import ExtendedCard from "./ExtendedCard";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("hide content after click Clouse btn", () => {

    act(() => {
        render(<ExtendedCard  />, container);
    });


    const target = document.querySelector(".ExtendedCard");
    const btn = document.querySelector("#closebtn");

    expect(window.getComputedStyle(target).display).toBe('block');

    act(() => {
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(window.getComputedStyle(target).display).toBe('none');




});