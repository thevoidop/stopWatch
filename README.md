# stopWatch

## Overview:

This application implements a stopwatch that tracks time in the format `mm:ss.ms` (minutes, seconds, and milliseconds).
Additionally, the app supports capturing lap times, displaying them below the timer in the format `Lap X: mm:ss.ms`.
The stopwatch has the following functionality:

-   Start/Pause
-   Reset
-   Lap Time Tracking

(Live Demo)[https://stopdotwatch.netlify.app]

## Features:

1. **Start/Pause Timer:**

    - When the user clicks the start button, the stopwatch starts running, updating the time every 10 milliseconds.
    - When the user clicks the stop button, the stopwatch pauses, and the button changes to a play icon.
    - The time is displayed in the format `mm:ss.ms`.

2. **Lap Functionality:**

    - Clicking the "Lap" button captures the current time (minutes, seconds, and milliseconds) and saves it as a lap.
    - The lap is added to a list of laps displayed below the timer.
    - Each lap is displayed with its index (e.g., "Lap 1", "Lap 2") and the time at which it was captured (e.g., `01:34.25`).

3. **Reset Timer:**

    - Clicking the reset button stops the timer, sets the time to `00:00.00`, and clears the lap history.

4. **Responsive and Interactive Design:**
    - The app is built using React, and it features a clean and responsive design with buttons for controlling the timer and displaying the laps.

## How It Works:

The app uses React hooks (`useState` and `useEffect`) to manage the state and handle the interval-based timer updates.

### State Variables:

-   `min`: Tracks the minutes of the timer.
-   `sec`: Tracks the seconds of the timer.
-   `ms`: Tracks the milliseconds of the timer.
-   `isRunning`: A boolean that tracks whether the stopwatch is running.
-   `intervalId`: Stores the ID of the active interval, allowing it to be cleared when the timer is stopped.
-   `laps`: An array that holds all the lap times captured during the stopwatch session.

### Functions:

1. **`storeLaps` (Lap Functionality):**

    - Captures the current time (formatted as `mm:ss.ms`) when the user clicks the "Lap" button.
    - Adds the captured time to the `laps` array state using the `setLaps` function.

    ```
    const storeLaps = () => {
        const lapTime = formatTime(min, sec, ms);
        setLaps((prevLaps) => [...prevLaps, lapTime]); // Add new lap to the previous laps array
    };
    ```

2. **`resetTimer` (Reset Functionality):**

    - Resets the stopwatch to `00:00.00` and clears the laps array when the "Reset" button is clicked.
    - Stops the timer by clearing the interval.

    ```
    const resetTimer = () => {
        clearInterval(intervalId); // Clear any ongoing intervals
        setMin(0);
        setSec(0);
        setMs(0);
        setIsRunning(false); // Stop the timer
        setLaps([]); // Clear lap history
    };
    ```

3. **`initiateTimer` (Start/Pause Functionality):**

    - Starts the timer using `setInterval` when the stopwatch is paused.
    - Stops the timer by clearing the interval when the stopwatch is running.

    ```
    const initiateTimer = () => {
        const stateImage = document.getElementById("stateImage");

        if (isRunning) {
            clearInterval(intervalId); // Stop the timer if it's running
            setIsRunning(false);
            stateImage.src = "/icons/play.svg"; // Change icon to play
        } else {
            const id = setInterval(() => {
                setMs((prevMs) => {
                    if (prevMs >= 99) {
                        setSec((prevSec) => {
                            if (prevSec >= 59) {
                                setMin((prevMin) => prevMin + 1); // Increment minute
                                return 0;
                            }
                            return prevSec + 1; // Increment second
                        });
                        return 0; // Reset milliseconds
                    }
                    return prevMs + 1; // Increment milliseconds
                });
            }, 10); // Update every 10 milliseconds

            setIntervalId(id); // Store interval ID for cleanup
            setIsRunning(true); // Set isRunning to true to indicate the stopwatch is running
            stateImage.src = "/icons/stop.svg"; // Change icon to stop
        }
    };
    ```

4. **`formatTime` (Formatting the Time):**

    - A helper function that formats the time into `mm:ss.ms`, ensuring the minutes, seconds, and milliseconds are properly padded with leading zeroes where needed.

    ```
    const formatTime = (min, sec, ms) => {
        const pad = (num) => (num < 10 ? "0" + num : num); // Pad numbers with leading zeroes if necessary
        return `${pad(min)}:${pad(sec)}.${ms < 10 ? "0" + ms : ms}`; // Return formatted time
    };
    ```

### Example of Lap Tracking:

When the user clicks the "Lap" button, the app captures the current time and displays it in the laps section:

-   **Lap 1:** `00:12.34`
-   **Lap 2:** `00:45.67`
-   **Lap 3:** `01:05.89`

## File Structure:

The project has the following basic file structure:

-   `src/`
    -   `App.js`: Main React component handling the stopwatch and lap functionality.
    -   `App.css`: Contains the styles for the stopwatch app.
    -   `index.js`: The entry point for the React application.

## How to Run the Project:

### Prerequisites:

-   Node.js and npm (or yarn) installed on your machine.

### Steps:

1. Clone the repository:

    ```
    git clone https://github.com/your-username/stopwatch-lap-tracker.git
    ```

2. Navigate to the project directory:

    ```
    cd stopwatch-lap-tracker
    ```

3. Install the dependencies:

    ```
    npm install
    ```

    or if using yarn:

    ```
    yarn install
    ```

4. Start the application:

    ```
    npm start
    ```

    or if using yarn:

    ```
    yarn start
    ```

5. Open your browser and navigate to `http://localhost:3000/` to view the stopwatch app.

## Conclusion:

This app demonstrates how to build a simple but functional stopwatch with lap tracking using React. The use of hooks (`useState`, `useEffect`) to manage the timer state and track lap times makes it a practical and interactive tool for timing tasks or activities that require lap tracking.

Enjoy using the stopwatch and feel free to contribute to this project by adding more features or improving the design!
