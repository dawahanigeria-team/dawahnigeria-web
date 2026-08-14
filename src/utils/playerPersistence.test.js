import { sanitizePersistedUserPlayback } from "./playerPersistence";

test("keeps account preferences but drops unrelated persisted playback", () => {
  expect(
    sanitizePersistedUserPlayback({
      currentUser: { id: 42 },
      theme: "light",
      audioId: 164864,
      playing: true,
      pack: [{ nid: 164864 }],
      value: 73,
    })
  ).toEqual(
    expect.objectContaining({
      currentUser: { id: 42 },
      theme: "light",
      audioId: null,
      playing: false,
      pack: [],
      value: 0,
    })
  );
});
