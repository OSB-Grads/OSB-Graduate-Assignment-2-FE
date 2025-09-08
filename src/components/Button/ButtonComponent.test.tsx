import {render,screen,fireEvent}from "@testing-library/react";
import ButtonComponent from "./ButtonComponent";
import styles from'./ButtonComponent.module.css';
import { describe,  expect,test, vi } from 'vitest'
describe("Button Component",()=>{
    test("renders with text",()=>{
        render(<ButtonComponent label="Click me"/>);
        const element=screen.queryByText("Click me");
        expect(element).not.toBeNull();
    });
    test("applies primary variant styles",()=>{
        render(<ButtonComponent label="Primary" variant="primary"/>);
        const button = screen.getByRole("button", { name: "Primary" }); 
        expect(button.classList.contains(styles.primary)).toBe(true);
    });
    test("applies secondary variant styles",()=>{
        render(<ButtonComponent label="Secondary" variant="secondary"/>);
        const button = screen.getByRole("button", { name: "Secondary" });
        expect(button.classList.contains(styles.secondary)).toBe(true);
    });
    test("isDisabled when disabled prop is true",()=>{
        render(<ButtonComponent label="Disabled" disabled/>);
        const button=screen.getByText("Disabled") as HTMLButtonElement;
        expect(button.disabled).toBe(true);
    });
    test("calls onClick when clicked",()=>{
        const handleClick =vi.fn();
        render(<ButtonComponent label="Click" onClick={handleClick}/>);
        fireEvent.click(screen.getByText("Click"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test(" does not call onClick when disabled",()=>{
        const handleClick =vi.fn();
        render(<ButtonComponent label="Disabled Click" onClick={handleClick} disabled/>);
        fireEvent.click(screen.getByText("Disabled Click"));
        expect(handleClick).toHaveBeenCalledTimes(0);
    });
})