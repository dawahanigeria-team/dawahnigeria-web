import * as type from "../Redux/Actions/Types";
import { getStore } from "../store/storeRegistry";
import { refreshAccessToken } from "./tokenRefresh";

jest.mock("axios", () => ({ post: jest.fn() }));
jest.mock("../store/storeRegistry", () => ({ getStore: jest.fn() }));

describe("token refresh recovery", () => {
  it("clears a stale access token when no refresh token exists", async () => {
    const dispatch = jest.fn();
    getStore.mockReturnValue({
      getState: () => ({ user: { token: "expired", refreshToken: null } }),
      dispatch,
    });

    await expect(refreshAccessToken()).rejects.toThrow("No refresh token available");
    expect(dispatch).toHaveBeenCalledWith({ type: type.LOGOUT });
  });
});
