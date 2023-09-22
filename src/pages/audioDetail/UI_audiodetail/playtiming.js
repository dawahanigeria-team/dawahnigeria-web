export const playTimingDesktop = (currentTime, duration) => {
  if (currentTime === 0 || isNaN(currentTime) || isNaN(duration)) {
    return `00:00:00/00:00:00`;
  } else {
    let currentHours = Math.floor(currentTime / 3600);
    let currentMinutes = Math.floor((currentTime % 3600) / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    let durationHours = Math.floor(duration / 3600);
    let durationMinutes = Math.floor((duration % 3600) / 60);
    let durationSeconds = Math.floor(duration % 60);

    const formattedCurrentTime = `${currentHours
      .toString()
      .padStart(2, "0")}:${currentMinutes
      .toString()
      .padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`;

    const formattedDuration = `${durationHours
      .toString()
      .padStart(2, "0")}:${durationMinutes
      .toString()
      .padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;

    return `${formattedCurrentTime}/${formattedDuration}`;
  }
};

//audio res
export const playTimingRes = (currentTime) => {
  if (currentTime === 0) {
    return "00:00:00";
  } else {
    let currentHours = Math.floor(currentTime / 3600);
    let currentMinutes = Math.floor((currentTime % 3600) / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    const formattedCurrentTime = `${currentHours
      .toString()
      .padStart(2, "0")}:${currentMinutes
      .toString()
      .padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`;

    return `${formattedCurrentTime}`;
  }
};

export const durationFormat = (duration) => {
  if (isNaN(duration)) {
    return `00:00:00`;
  } else {
    let durationHours = Math.floor(duration / 3600);
    let durationMinutes = Math.floor((duration % 3600) / 60);
    let durationSeconds = Math.floor(duration % 60);

    const formattedDuration = `${durationHours
      .toString()
      .padStart(2, "0")}:${durationMinutes
      .toString()
      .padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;

    return `${formattedDuration}`;
  }
};
