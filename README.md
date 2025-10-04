# FlowFit

FlowFit is a full-stack React App that helps users balance study and workout routines. It combines session tracking, workout splits, and an interactive calendar to visualize progress.

---

## Features

- **Study Timer**: Log study sessions with duration, title, and description.  
- **Workout Log**: Create workout splits, add exercises, track sets and reps.  
- **Calendar View**: Daily, weekly, and monthly views with color-coded study/workout tracking.  
- **Firebase Integration**: Real-time data persistence for sessions and splits.  
- **Interactive UI**: Styled with **Tailwind CSS** and enhanced with **Lucide icons**.  

---

## Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend / Database**: Firebase Firestore  
- **Icons & UI**: Lucide icons  
- **Version Control**: Git, GitHub  

---

## Installation

1. Clone the repository:
git clone https://github.com/lewischn/flowfit.git
cd flowfit
2. Install dependencies:
npm install
3. Create a .env file in the root directory and add your Firebase configuration:
- REACT_APP_FIREBASE_API_KEY=your_api_key
- REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
- REACT_APP_FIREBASE_PROJECT_ID=your_project_id
- REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
- REACT_APP_FIREBASE_APP_ID=your_app_id
4. Start the development server:
npm start
## Usage
- Switch between Study Timer, Workout Log, and Calendar using the tabs.
- Create workout splits and exercises, then log sets/reps during workouts.
- Study sessions can include duration, title, and notes.
- Calendar shows activity trends and allows viewing session details per day.

## License

MIT License

