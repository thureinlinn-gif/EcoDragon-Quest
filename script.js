 // State
 let userPoints = 0;
 let userName = "Guest";
 let recyclingStats = {
   plastic: 0,
   metal: 0,
   paper: 0,
   glass: 0
 };
 let weeklyRecycling = [0, 0, 0, 0, 0, 0, 0]; // Last 7 days
 let totalWasteRecycled = 0; // Total weight in lbs
 const pointsPerItem = {
   plastic: 10,
   metal: 8,
   paper: 7,
   glass: 6
 };
 const pointsPerPound = {
   plastic: 20,
   metal: 15,
   paper: 12,
   glass: 10
 };
 const badges = [
   { name: "Eco Starter", points: 100, image: "https://img.icons8.com/color/48/medal.png" },
   { name: "Green Dragon", points: 250, image: "https://img.icons8.com/color/48/dragon.png" },
   { name: "Sustainability Hero", points: 500, image: "https://img.icons8.com/color/48/hero.png" }
 ];

 // Mock leaderboard data with badges and stars
 const mockLeaderboardData = [
   { name: "Alex", points: 750, stars: 3, badge: "Gold" },
   { name: "Sam", points: 600, stars: 3, badge: "Gold" },
   { name: "Taylor", points: 450, stars: 2, badge: "Silver" },
   { name: "Jordan", points: 300, stars: 2, badge: "Silver" },
   { name: "Casey", points: 200, stars: 1, badge: "Bronze" }
 ];

 // Combine user and mock data for leaderboard
 let leaderboardData = [...mockLeaderboardData];

 // Audio for score increase
 const cheerAudio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3'); // Placeholder; replace with actual audio URL

 // Page navigation
 function showPage(pageId) {
   document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
   document.getElementById(pageId).style.display = 'block';
   if (pageId === 'leaderboard') updateLeaderboard();
   if (pageId === 'stats') initCharts();
   if (pageId === 'dashboard') updateDashboard();
 }

 // Save user name
 function saveName() {
   const nameInput = document.getElementById('userName').value.trim();
   if (nameInput) {
     userName = nameInput;
     document.getElementById('displayName').textContent = userName;
     document.getElementById('plasticBtn').disabled = false;
     document.getElementById('metalBtn').disabled = false;
     document.getElementById('paperBtn').disabled = false;
     document.getElementById('glassBtn').disabled = false;
     updateLeaderboard();
   } else {
     alert("Please enter a valid name!");
   }
 }

 // Log recycling action
 function logRecycle(category) {
   recyclingStats[category]++;
   userPoints += pointsPerItem[category];
   // Assume 0.5 lbs per item for health feedback
   totalWasteRecycled += 0.5;
   // Update weekly recycling (assume latest day)
   weeklyRecycling[weeklyRecycling.length - 1]++;
   updateDashboard();
   updateLeaderboard();
   showCelebration();
   updateHealthFeedback();
   // Play cheer audio
   cheerAudio.play().catch(() => {
     console.log("Audio playback failed");
   });
 }

 // Calculate points from waste amounts
 function calculateWastePoints() {
   const plasticWeight = parseFloat(document.getElementById('plasticWeight').value) || 0;
   const metalWeight = parseFloat(document.getElementById('metalWeight').value) || 0;
   const paperWeight = parseFloat(document.getElementById('paperWeight').value) || 0;
   const glassWeight = parseFloat(document.getElementById('glassWeight').value) || 0;

   if (plasticWeight < 0 || metalWeight < 0 || paperWeight < 0 || glassWeight < 0) {
     document.getElementById('wasteResult').textContent = "Please enter non-negative weights!";
     return;
   }

   // Calculate points based on weight
   const plasticPoints = Math.round(plasticWeight * pointsPerPound.plastic);
   const metalPoints = Math.round(metalWeight * pointsPerPound.metal);
   const paperPoints = Math.round(paperWeight * pointsPerPound.paper);
   const glassPoints = Math.round(glassWeight * pointsPerPound.glass);
   const totalPoints = plasticPoints + metalPoints + paperPoints + glassPoints;

   // Update recycling stats (assuming 1 item per 0.5 lbs for simplicity)
   recyclingStats.plastic += Math.round(plasticWeight / 0.5);
   recyclingStats.metal += Math.round(metalWeight / 0.5);
   recyclingStats.paper += Math.round(paperWeight / 0.5);
   recyclingStats.glass += Math.round(glassWeight / 0.5);

   // Update total waste recycled
   totalWasteRecycled += plasticWeight + metalWeight + paperWeight + glassWeight;

   // Update user points
   userPoints += totalPoints;

   // Update weekly recycling
   weeklyRecycling[weeklyRecycling.length - 1] += Math.round((plasticWeight + metalWeight + paperWeight + glassWeight) / 0.5);

   // Display result
   document.getElementById('wasteResult').textContent = `Points earned: ${totalPoints} (Plastic: ${plasticPoints}, Metal: ${metalPoints}, Paper: ${paperPoints}, Glass: ${glassPoints})`;

   // Update health feedback
   updateHealthFeedback();

   // Update dashboard and leaderboard
   updateDashboard();
   updateLeaderboard();

   // Show celebration and play audio
   showCelebration();
   cheerAudio.play().catch(() => {
     console.log("Audio playback failed");
   });

   // Reset inputs
   document.getElementById('plasticWeight').value = '';
   document.getElementById('metalWeight').value = '';
   document.getElementById('paperWeight').value = '';
   document.getElementById('glassWeight').value = '';
 }

 // Update health feedback
 function updateHealthFeedback() {
   // Assume 100 lbs of waste recycled = 1% air quality improvement
   const airQualityImprovement = (totalWasteRecycled / 100).toFixed(2);
   document.getElementById('healthFeedback').textContent = `By recycling ${totalWasteRecycled.toFixed(1)} lbs, you contributed to ${airQualityImprovement}% cleaner air — supporting lung health for you and your community!`;
 }

 // Update dashboard
 function updateDashboard() {
   document.getElementById('userPoints').textContent = userPoints;

   // Find next badge
   let nextBadge = badges.find(b => userPoints < b.points) || badges[badges.length - 1];
   document.getElementById('nextBadge').textContent = `${nextBadge.name} (${nextBadge.points} points)`;

   // Calculate progress
   const prevBadge = badges.find(b => b.points <= userPoints) || { points: 0 };
   const progress = ((userPoints - prevBadge.points) / (nextBadge.points - prevBadge.points)) * 100;
   document.getElementById('progressFill').style.width = `${Math.min(progress, 100)}%`;

   // Update badges
   const unlockedBadges = badges.filter(b => userPoints >= b.points);
   document.getElementById('badges').textContent = unlockedBadges.length ? unlockedBadges.map(b => b.name).join(', ') : 'None';

   // Update badge images
   const badgesImages = document.getElementById('badgesImages');
   badgesImages.innerHTML = '';
   unlockedBadges.forEach(badge => {
     const img = document.createElement('img');
     img.src = badge.image;
     img.alt = badge.name;
     badgesImages.appendChild(img);
   });
 }

 // Show celebration animation
 function showCelebration() {
   const celebration = document.getElementById('celebration');
   celebration.style.display = 'block';
   setTimeout(() => celebration.style.display = 'none', 2000);
 }

 // Update and populate leaderboard
 function updateLeaderboard() {
   // Determine user's stars and badge
   let userStars = 0;
   let userBadge = "None";
   if (userPoints >= 500) {
     userStars = 3;
     userBadge = "Gold";
   } else if (userPoints >= 250) {
     userStars = 2;
     userBadge = "Silver";
   } else if (userPoints >= 100) {
     userStars = 1;
     userBadge = "Bronze";
   }

   // Remove existing user entry
   leaderboardData = leaderboardData.filter(user => user.name !== userName);
   // Add or update user entry
   leaderboardData.push({ name: userName, points: userPoints, stars: userStars, badge: userBadge });
   // Sort by points (descending)
   leaderboardData.sort((a, b) => b.points - a.points);

   // Populate table
   const tbody = document.getElementById('leaderboardTable');
   tbody.innerHTML = '';
   leaderboardData.forEach((user, index) => {
     const starsHtml = '<img src="https://img.icons8.com/color/48/star.png" alt="Star">'.repeat(user.stars);
     const badgeHtml = user.badge !== "None" ? `<img src="https://img.icons8.com/color/48/medal.png" alt="${user.badge}" class="badge-img"> ${user.badge}` : "None";
     const row = document.createElement('tr');
     row.innerHTML = `
       <td>${index + 1}</td>
       <td>${user.name}</td>
       <td>${user.points}</td>
       <td><span class="stars">${starsHtml}</span> ${badgeHtml}</td>
     `;
     tbody.appendChild(row);
   });
 }

 // Initialize charts
 let itemsChart = null;
 let pieChart = null;
 let weeklyChart = null;
 let healthChart = null;
 function initCharts() {
   // Destroy existing charts to prevent overlap
   if (itemsChart) itemsChart.destroy();
   if (pieChart) pieChart.destroy();
   if (weeklyChart) weeklyChart.destroy();
   if (healthChart) healthChart.destroy();

   // Item Types Chart (Bar)
   itemsChart = new Chart(document.getElementById('itemsChart'), {
     type: 'bar',
     data: {
       labels: ['Plastic', 'Metal', 'Paper', 'Glass'],
       datasets: [{
         label: 'Items Recycled',
         data: [
           recyclingStats.plastic,
           recyclingStats.metal,
           recyclingStats.paper,
           recyclingStats.glass
         ],
         backgroundColor: ['#4caf50', '#66bb6a', '#81c784', '#a5d6a7']
       }]
     },
     options: {
       responsive: true,
       maintainAspectRatio: false,
       scales: {
         y: { beginAtZero: true, title: { display: true, text: 'Number of Items' } }
       }
     }
   });

   // Pie Chart (Distribution)
   pieChart = new Chart(document.getElementById('pieChart'), {
     type: 'pie',
     data: {
       labels: ['Plastic', 'Metal', 'Paper', 'Glass'],
       datasets: [{
         label: 'Recycling Distribution',
         data: [
           recyclingStats.plastic,
           recyclingStats.metal,
           recyclingStats.paper,
           recyclingStats.glass
         ],
         backgroundColor: ['#4caf50', '#66bb6a', '#81c784', '#a5d6a7']
       }]
     },
     options: {
       responsive: true,
       maintainAspectRatio: false
     }
   });

   // Weekly Recycling Chart (Line)
   weeklyChart = new Chart(document.getElementById('weeklyChart'), {
     type: 'line',
     data: {
       labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
       datasets: [{
         label: 'Recycling Actions',
         data: weeklyRecycling,
         borderColor: '#4caf50',
         backgroundColor: 'rgba(76, 175, 80, 0.2)',
         fill: true
       }]
     },
     options: {
       responsive: true,
       maintainAspectRatio: false,
       scales: {
         y: { beginAtZero: true }
       }
     }
   });

   // Health Benefits Chart (Bar)
   healthChart = new Chart(document.getElementById('healthChart'), {
     type: 'bar',
     data: {
       labels: ['Air Quality', 'Lung Health', 'Mental Well-being'],
       datasets: [{
         label: 'Health Impact (% Improvement)',
         data: [
           (totalWasteRecycled / 100).toFixed(2), // Air quality
           (totalWasteRecycled / 150).toFixed(2), // Lung health
           (totalWasteRecycled / 200).toFixed(2)  // Mental well-being
         ],
         backgroundColor: ['#d81b60', '#f06292', '#f8bbd0']
       }]
     },
     options: {
       responsive: true,
       maintainAspectRatio: false,
       scales: {
         y: {
           beginAtZero: true,
           title: { display: true, text: '% Improvement' },
           max: 5 // Cap for visibility
         }
       }
     }
   });
 }

 // AI Chat functionality with Google Gemini API
 async function sendChat() {
   const input = document.getElementById('chatInput').value.trim();
   const responseEl = document.getElementById('chatResponse');
   if (!input) {
     responseEl.textContent = "Please enter a question!";
     return;
   }

   responseEl.textContent = "Loading...";

   try {
     const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBuSOkYyrhIZLLONakznUdxoyyYU967HGU', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         contents: [{
           parts: [{
             text: input
           }]
         }]
       })
     });

     if (!response.ok) throw new Error('API request failed');
     const data = await response.json();
     const text = data.candidates[0].content.parts[0].text || "Sorry, I couldn't process your question.";
     responseEl.textContent = text;
   } catch (error) {
     responseEl.textContent = "Error: Unable to connect to AI service.";
     console.error(error);
   }
 }

 // Initialize
 updateLeaderboard();
 showPage('home');