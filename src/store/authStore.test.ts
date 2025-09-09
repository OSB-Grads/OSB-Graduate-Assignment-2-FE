import {act} from "react";
import { useAuthStore } from "./authStore";

describe("Auth Store",()=>{
    it("should login correctly",()=>{
        act(()=>{
            useAuthStore.getState().login("test-token");
        });

        const state=useAuthStore.getState();
        expect(state.token).toBe("test-token");
        expect(state.isAuthenticated).toBe(true);
    });

    it("should logout correctly",()=>{
        act(()=>{
            useAuthStore.getState().logout();
        });

        const state=useAuthStore.getState();
        expect(state.token).toBe(null);
        expect(state.isAuthenticated).toBe(false);
    });
});