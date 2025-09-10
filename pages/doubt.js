// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Store doubts in localStorage
let doubts = JSON.parse(localStorage.getItem('doubts')) || [];

// Sample doubts if none exist
if (doubts.length === 0) {
  doubts = [
    {
      id: 1,
      title: "How to optimize React component rendering?",
      category: "web-development",
      description: "I'm building a complex React application and noticing performance issues with component re-rendering. What are the best practices to optimize React component rendering?",
      date: new Date().toISOString(),
      answers: []
    },
    {
      id: 2,
      title: "What's the difference between SQL and NoSQL databases?",
      category: "databases",
      description: "I'm starting a new project and need to choose between SQL and NoSQL databases. Can someone explain the key differences and when to use each?",
      date: new Date().toISOString(),
      answers: []
    }
  ];
  localStorage.setItem('doubts', JSON.stringify(doubts));
}

// Form submission handler
document.getElementById('doubtForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  
  if (title && category && description) {
    const newDoubt = {
      id: Date.now(),
      title,
      category,
      description,
      date: new Date().toISOString(),
      answers: []
    };
    
    doubts.push(newDoubt);
    localStorage.setItem('doubts', JSON.stringify(doubts));
    
    renderDoubts();
    
    // Reset form
    this.reset();
    
    // Scroll to doubts section
    document.getElementById('doubts').scrollIntoView({ behavior: 'smooth' });
  }
});

// Render doubts to the page
function renderDoubts() {
  const doubtsList = document.getElementById('doubtsList');
  doubtsList.innerHTML = '';
  
  doubts.forEach(doubt => {
    const doubtElement = document.createElement('div');
    doubtElement.className = 'doubt-item';
    doubtElement.innerHTML = `
      <div class="doubt-header">
        <div class="doubt-title">${doubt.title}</div>
        <div class="doubt-category">${doubt.category}</div>
      </div>
      <div class="doubt-content">${doubt.description}</div>
      <div class="doubt-footer">
        <div>Posted on ${new Date(doubt.date).toLocaleDateString()}</div>
        <button class="answer-btn" onclick="toggleAnswerForm(${doubt.id})">Answer</button>
      </div>
      <div class="answer-form" id="answerForm-${doubt.id}">
        <textarea placeholder="Write your answer here..." id="answerText-${doubt.id}"></textarea>
        <button class="answer-submit" onclick="submitAnswer(${doubt.id})">Submit Answer</button>
      </div>
      <div class="answers" id="answers-${doubt.id}">
        ${doubt.answers.map(answer => `
          <div class="answer-item">
            <div class="answer-header">
              <div>Community Member</div>
              <div>${new Date(answer.date).toLocaleDateString()}</div>
            </div>
            <div class="answer-content">${answer.text}</div>
          </div>
        `).join('')}
      </div>
    `;
    
    doubtsList.appendChild(doubtElement);
  });
}

// Toggle answer form visibility
window.toggleAnswerForm = function(doubtId) {
  const answerForm = document.getElementById(`answerForm-${doubtId}`);
  const answersSection = document.getElementById(`answers-${doubtId}`);
  
  if (answerForm.style.display === 'block') {
    answerForm.style.display = 'none';
  } else {
    answerForm.style.display = 'block';
    answersSection.style.display = 'block';
  }
}

// Submit answer to a doubt
window.submitAnswer = function(doubtId) {
  const answerText = document.getElementById(`answerText-${doubtId}`).value;
  
  if (answerText) {
    const doubtIndex = doubts.findIndex(d => d.id === doubtId);
    
    if (doubtIndex !== -1) {
      doubts[doubtIndex].answers.push({
        text: answerText,
        date: new Date().toISOString()
      });
      
      localStorage.setItem('doubts', JSON.stringify(doubts));
      renderDoubts();
    }
  }
}

// Initial render
renderDoubts();
