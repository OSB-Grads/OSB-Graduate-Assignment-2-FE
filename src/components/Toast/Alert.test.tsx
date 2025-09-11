import '@testing-library/jest-dom';
import { act, render, screen } from "@testing-library/react";
import Toast from './ToastComponent';

jest.useFakeTimers();
test("adds toast and clears if after the setTime", () => {
    render(<Toast type={'SUCCESS'} message={'Alert Test'} />);
    expect(screen.getByText("Alert Test")).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(5001);
    });
    expect(screen.queryByText('Test toast')).not.toBeInTheDocument();
});