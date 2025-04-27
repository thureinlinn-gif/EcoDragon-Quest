# EcoDragon-Quest

EcoDragon Quest
Overview
EcoDragon Quest is a web application designed to combat health issues caused by air pollution and campus waste at Drexel University. By gamifying recycling, the app encourages students to reduce waste, improve air quality, and enhance physical and mental well-being. Built for the Dragon Hack hackathon (Medical Track + Social Impact), it addresses respiratory issues (e.g., asthma, allergies), infections from litter, and stress from polluted campuses through engaging features like points, badges, health feedback, and AI-driven education.
Features

Log Recycling: Log recycled items (Plastic, Metal, Paper, Glass) or weights to earn points, reducing air pollution.
Health Feedback: Displays air quality improvements (e.g., “By recycling 2.3 lbs, you contributed to 0.02% cleaner air”) to highlight lung health benefits.
Waste Calculator: Calculate points from waste weights, reinforcing pollution reduction.
Health Benefits Chart: Visualizes gains in air quality, lung health, and mental well-being (600x300px, powered by Chart.js).
Gamification: Earn badges (e.g., Eco Starter, Green Dragon) and compete on a leaderboard to foster healthy habits.
AI Chat: Powered by Google’s Gemini API, answers health and recycling questions (e.g., “How does recycling reduce asthma risks?”).
Responsive UI: Green-themed, animated interface with audio feedback for an engaging experience.
Impact Statistics: Tracks community health impact (e.g., 2.8k lbs reduced, 342 health champions).

Tech Stack

Frontend: HTML5, CSS3, JavaScript
Libraries: Chart.js (charts), Google Gemini API (AI chat)
External Resources: Icons8 (icons), SoundJay (audio)
Deployment: Static web app, deployable on GitHub Pages, Netlify, or similar

Installation
To run EcoDragon Quest locally, follow these steps:
Prerequisites

Web browser (e.g., Chrome, Firefox)
Text editor (e.g., VS Code)
Git (optional, for cloning)
A valid Google Gemini API key (for AI chat)

Steps

Clone the Repository:
git clone https://github.com/your-username/ecodragon-quest.git
cd ecodragon-quest


Set Up Gemini API Key:

Obtain a Google Gemini API key from Google Cloud.
In script.js, replace YOUR_GEMINI_API_KEY with your key:const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY', ...




Run the App:

Open index.html in a browser (e.g., double-click or use a local server).
Alternatively, use a local server for better testing:npx http-server

Then navigate to http://localhost:8080.


Verify Functionality:

Log a recycling action (e.g., Plastic) and check health feedback.
View charts on the Stats page.
Test AI chat with a question like “How does recycling help lung health?”



Usage

Home Page: Click “Start Improving Health Now!” to begin.
Log Recycle:
Enter your name to enable recycling buttons.
Log items (e.g., Plastic, +10 points) or input waste weights in the calculator.
View health feedback (e.g., “By recycling 2.3 lbs, you contributed to 0.02% cleaner air”).


Dashboard: Track points, badges, and progress toward the next badge.
Leaderboard: Compete with others as a “Health Champion.”
Stats: Explore charts showing recycling and health impacts (air quality, lung health, mental well-being).
AI Chat: Ask health/recycling questions (e.g., “How does pollution affect asthma?”).

Project Structure
ecodragon-quest/
├── index.html       # Main HTML file with UI and styles
├── script.js        # JavaScript logic (state, functions, charts)
├── README.md        # This file

Health Impact
EcoDragon Quest addresses critical health issues:

Air Pollution: Reduces PM2.5 and VOCs from waste incineration, lowering asthma and allergy risks.
Campus Cleanliness: Decreases litter, reducing infections and improving study environments.
Mental Well-being: Cleaner campuses reduce stress and anxiety.
Community Health: Engages 342+ users to cut pollution from 2,000+ tons of annual waste, easing respiratory symptoms.

Future Enhancements

IoT Bins: Integrate smart bins for real-time recycling tracking.
Air Quality Data: Add live PM2.5 monitoring for precise health feedback.
Personalized AI: Offer tailored health tips (e.g., “Recycle plastics to cut VOCs triggering allergies”).
Campus Campaigns: Launch health-focused initiatives to reduce respiratory illnesses and stress.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

Please follow the Code of Conduct (to be added).
License
This project is licensed under the MIT License (to be added).
Contact

Email: support@drexelwasteapp.com
Phone: (215) 895-1234
Social: Twitter | Instagram (links to be added)

Acknowledgments

Drexel University: Inspiration for addressing campus waste and health.
Dragon Hack: Platform for developing this health-focused solution.
Icons8: Icons for UI elements.
Google Gemini API: AI chat functionality.
Chart.js: Visualization of health impacts.


EcoDragon Quest: Breathe easier, live healthier, and make Drexel a cleaner campus! 🩺🌬️
