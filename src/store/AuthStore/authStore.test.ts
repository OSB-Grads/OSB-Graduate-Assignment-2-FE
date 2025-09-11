import { renderHook, waitFor } from "@testing-library/react";
import { getAuthStore } from "./AuthStoreGetters";

jest.mock('../utils/httpClientUtil', () => (
    {
        post: jest.fn().mockReturnValue({
            token: '',
        }),
    }
))

describe.skip("Auth Store", () => {
    it.only("should login correctly", async () => {
        const { result } = renderHook(getAuthStore);
        expect(result.current.isAuthenticated).toBe(false);

        result.current.login('username', 'password', false);

        await waitFor(() => {
            expect(result.current.isAuthenticated).toBe(true);
        })
    });

    it("should logout correctly", () => {
        // act(() => {
        //     useAuthStore.getState().logout();
        // });

        // const state = useAuthStore.getState();
        // expect(state.token).toBe(null);
        // expect(state.isAuthenticated).toBe(false);
    });
});