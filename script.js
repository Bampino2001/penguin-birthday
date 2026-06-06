let currentChapterIdx = 0;
const totalChapters = 11;
let tapClickCount = 0;
let paperClickCount = 0;
let currentQuestionIdx = 0;

// Quiz Questions Database Configuration
const quizQuestions = [
  {
    question: "What fake name did you give me?",
    options: ["Naledi", "Natasha", "Nokuthula"],
    correct: 1
  },
  {
    question: "What subject started our chaos?",
    options: ["Math Functions", "History", "Law Research"],
    correct: 0
  },
  {
    question: "Which animal interrupted our cuddle session?",
    options: ["A stray cat", "A pigeon", "An owl"],
    correct: 2
  },
  {
    question: "What did you refuse to open for me?",
    options: ["Your WhatsApp", "A tap 🚰", "Facebook"],
    correct: 1
  }
];

// Solid Show/Hide Page Router System
function goToScene(nextSceneId) {
  const allScenes = document.querySelectorAll('.story-section');
  allScenes.forEach(scene => {
    scene.classList.add('hidden');
  });

  const nextScene = document.getElementById(nextSceneId);
  if (nextScene) {
    nextScene.classList.remove('hidden');
    updateProgressBar(nextScene);
    window.scrollTo(0, 0); 
    
    // Build quiz dynamically if she lands on it
    if (nextSceneId === 'sceneQuiz') {
      currentQuestionIdx = 0;
      document.getElementById('quizNextBtn').classList.add('hidden');
      document.querySelector('.stars').style.opacity = '0.2';
      loadQuizQuestion();
    }
  }
}

// Progress Bar Manager Tracker
function updateProgressBar(sceneElement) {
  const progressContainer = document.getElementById('progressContainer');
  if (!sceneElement || sceneElement.id === 'heroScene') {
    progressContainer.classList.add('hidden');
    return;
  }
  
  progressContainer.classList.remove('hidden');
  const chapterName = sceneElement.getAttribute('data-chapter');
  
  const order = ['scene0', 'sceneLawyer', 'scene1', 'scene2', 'scenePaper', 'sceneTap', 'scene3', 'sceneQuiz', 'scene4', 'scene5', 'sceneVoice', 'scene6'];
  currentChapterIdx = order.indexOf(sceneElement.id) + 1;

  document.getElementById('chapterTitle').innerText = chapterName;
  const percentage = (currentChapterIdx / totalChapters) * 100;
  document.getElementById('progressBarFill').style.width = Math.min(percentage, 100) + '%';
}

// Playful Paper Throwing Mechanics
function throwPaperBall() {
  const paper = document.getElementById('interactivePaper');
  const floor = document.getElementById('paperFloor');
  const reply = document.getElementById('paperResponse');
  const nextBtn = document.getElementById('paperNextBtn');
  
  paperClickCount++;

  const oldPaper = document.createElement('div');
  oldPaper.innerText = '🗞️';
  oldPaper.style.position = 'absolute';
  oldPaper.style.bottom = '15px';
  oldPaper.style.left = Math.floor(Math.random() * 70 + 15) + '%';
  oldPaper.style.fontSize = '2rem';
  oldPaper.style.opacity = '0.7';
  oldPaper.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
  floor.appendChild(oldPaper);

  paper.style.animation = 'none';
  setTimeout(() => {
    paper.style.animation = 'paperFlyAcross 0.6s ease-in-out forwards';
  }, 10);

  if (paperClickCount === 1) {
    reply.innerText = "Incoming! 🚀 Look out!";
  } else if (paperClickCount === 2) {
    reply.innerText = "Hey! Stop working so hard and look at me 😂 🗞️";
  } else if (paperClickCount === 3) {
    reply.innerText = "Missed me! 😜 Put down the law books!";
  } else {
    reply.innerText = "Okay okay, let's move on before you throw something heavy... 💀😂";
    paper.style.display = 'none'; 
    nextBtn.classList.remove('hidden'); 
    return;
  }

  setTimeout(() => {
    if (paperClickCount < 4) {
      paper.style.animation = 'none';
    }
  }, 580);
}

// Original Tap Game Logic Restored
function handleTapClick() {
  const btn = document.getElementById('evadingBtn');
  const reply = document.getElementById('tapResponse');
  const nextBtn = document.getElementById('tapNextBtn');
  
  tapClickCount++;

  if (tapClickCount === 1) {
    btn.style.position = 'absolute';
    btn.style.top = Math.floor(Math.random() * 50 + 20) + '%';
    btn.style.left = Math.floor(Math.random() * 50 + 20) + '%';
    reply.innerText = "Refused. (Try clicking it again!)";
  } else if (tapClickCount === 2) {
    btn.style.top = Math.floor(Math.random() * 50 + 20) + '%';
    btn.style.left = Math.floor(Math.random() * 50 + 20) + '%';
    reply.innerText = "Still running away... standard stubborn behavior! 😂";
  } else {
    btn.style.position = 'static';
    btn.classList.add('disabled-tap-btn');
    btn.disabled = true;
    btn.innerText = "Fine... here is your water 😒";
    reply.innerText = "Success! You finally broke through her defenses.";
    nextBtn.classList.remove('hidden');
  }
}

// Dynamic Quiz Loader
function loadQuizQuestion() {
  const quizBox = document.getElementById('quizBox');
  const feedback = document.getElementById('quizFeedback');
  feedback.innerText = "";
  
  if (currentQuestionIdx >= quizQuestions.length) {
    // Show final blessing layout card
    quizBox.innerHTML = `
      <div class="blessing-card">
        <h3>"Ukhule ntombi, uqhubeke uyiphathe kahle" ❤️</h3>
      </div>
    `;
    document.getElementById('quizNextBtn').classList.remove('hidden');
    return;
  }

  const data = quizQuestions[currentQuestionIdx];
  let optionsHtml = data.options.map((opt, index) => {
    return `<button class="quiz-opt-btn" onclick="handleQuizAnswer(${index})">${opt}</button>`;
  }).join('');

  quizBox.innerHTML = `
    <div class="quiz-card">
      <p class="quiz-q-text">${data.question}</p>
      <div class="quiz-options-stack">${optionsHtml}</div>
    </div>
  `;
}

// Quiz Core Validation logic with your teasing combination
function handleQuizAnswer(selectedIndex) {
  const data = quizQuestions[currentQuestionIdx];
  const feedback = document.getElementById('quizFeedback');
  const starLayer = document.querySelector('.stars');

  if (selectedIndex === data.correct) {
    // Light up background stars with a scaling multiplier
    let currentOpacity = parseFloat(starLayer.style.opacity) || 0.2;
    starLayer.style.opacity = Math.min(currentOpacity + 0.2, 1.0);
    
    currentQuestionIdx++;
    loadQuizQuestion();
  } else {
    feedback.innerText = "Haaw Janet! Did you even read the book? 🤦🏽‍♂️😂 Natasha would have known the answer to this one... 😑😂";
    
    // Shake animation trigger
    const card = document.querySelector('.quiz-card');
    if (card) {
      card.classList.remove('shake-card');
      void card.offsetWidth; // Force re-render reflow
      card.classList.add('shake-card');
    }
  }
}

// Owl Flight Click
function triggerOwlFlight() {
  const owl = document.getElementById('interactiveOwl');
  const nextBtn = document.getElementById('owlNextBtn');
  
  owl.classList.add('flying-away');
  
  setTimeout(() => {
    nextBtn.classList.remove('hidden');
  }, 1200);
}

// Clapping Hands Particle Storm Spawner Generator
function triggerClappingStorm() {
  const body = document.body;
  const totalClaps = 35; // Dense screen coverage count

  for (let i = 0; i < totalClaps; i++) {
    const clap = document.createElement('div');
    clap.innerText = '👏';
    clap.className = 'floating-clap';
    
    // Spread coordinates randomly across complete screen coordinates
    clap.style.left = Math.random() * 100 + 'vw';
    clap.style.bottom = '-50px';
    clap.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
    clap.style.animationDelay = (Math.random() * 2) + 's';
    clap.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
    
    body.appendChild(clap);

    // Housekeep generated elements out of node tree safely
    setTimeout(() => {
      clap.remove();
    }, 4500);
  }
}

// Audio Volume and Finished Event listener links
document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById('bgMusic');
  const voiceNote = document.getElementById('voiceNotePlayer');
  const instruction = document.getElementById('voiceInstruction');

  if (voiceNote && bgMusic) {
    voiceNote.onplay = () => { bgMusic.volume = 0.1; };
    voiceNote.onpause = () => { bgMusic.volume = 1.0; };
    
    voiceNote.onended = () => { 
      bgMusic.volume = 1.0; 
      instruction.innerText = "Beautiful singing! 🎉👏";
      triggerClappingStorm(); // Fires the celebration hands
    };
  }
});
