# WebDev-L1-To-Do-Web-App-# ✈️ Departure Board – To-Do List

A to-do list app styled like an airport departure board. Every task is a "flight": pending tasks are **Departures** (status: BOARDING) and completed tasks move to **Arrivals** (status: ARRIVED).

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

!

**Live demo:** _add your GitHub Pages link here_

## Features

- Add tasks with the input field and **Add Task** button (or press Enter)
- New tasks appear instantly in the **Pending Tasks** list with an auto-numbered gate code (G01, G02, ...)
- **Mark Complete** moves a task to the **Completed Tasks** list, and **Mark Pending** moves it back
- **Edit** a task inline (Enter or Save to confirm, Esc to cancel)
- **Delete** a task permanently from either list
- Live counters: "X pending" and "Y completed"
- Timestamps showing when each task was added and completed
- Tasks persist across page refreshes using `localStorage`
- Friendly empty-state messages when a list has no tasks
- Responsive layout for desktop and mobile
- Keyboard-friendly, visible focus styles, and reduced-motion support

## Tech Stack

- HTML5
- CSS3 (custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6)

## Project Structure

```
departure-board/
├── index.html    # Page structure
├── style.css     # Styling and color palette
├── script.js     # App logic and localStorage
└── README.md
```

## Getting Started

1. Clone the repository:
```bash
   git clone https://github.com/your-username/departure-board.git
```
2. Open the folder:
```bash
   cd departure-board
```
3. Open `index.html` in any modern browser.

No installation or server is needed.

## How to Use

| Action | How |
| --- | --- |
| Add a task | Type in the input box, then click **Add Task** or press Enter |
| Complete a task | Click **Mark Complete** |
| Move it back | Click **Mark Pending** on a completed task |
| Edit a task | Click **Edit**, change the text, then press Enter or click **Save** (Esc cancels) |
| Delete a task | Click **Delete** |

## Customizing the Colors

All colors are defined as CSS variables at the top of `style.css`. Change them in one place to re-theme the whole app:

```css
:root {
  --board: #0E1A2B;   /* board panels */
  --amber: #FFB627;   /* departures accent */
  --go:    #3DDC97;   /* arrivals accent */
  /* ... */
}
```

## Data Storage

Tasks are saved in your browser's `localStorage` under the keys `departure-board-tasks` and `departure-board-seq`. Data stays on your device and is never sent anywhere. Clearing your browser data removes your tasks.

## Deploying to GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and the `/ (root)` folder, then save.
4. Your app will be live at `https://your-username.github.io/departure-board/`.

## Future Improvements

- Drag and drop to reorder tasks
- Due dates and priority labels
- Search and filter
- Dark/light theme toggle
- Export and import tasks as JSON

## License

This project is licensed under the MIT License. Feel free to use and modify it.
