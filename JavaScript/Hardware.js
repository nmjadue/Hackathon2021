// Functions
  function buildQuiz(module){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
          // variable to store the list of possible answers
          const answers = [];
              // and for each available answer...
              for (letter in currentQuestion.answers) {

                  // ...add an HTML radio button
                  answers.push(
                      `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
                  );
              }

              // add this question and its answers to the output
              output.push(
                  `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
              );
          }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

function myFunction() {
  var popup = document.getElementById("myPopup");
  if (popup.innerHTML !== myQuestions[currentSlide]['hint']) {
     popup.innerHTML = myQuestions[currentSlide]['hint'];
     popup.classList.toggle("show");
   } else {
    popup.classList.toggle("show");
  }
}


  function showResults(module){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        submitAnswer(userAnswer, currentQuestion.correctAnswer);
        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';


      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      finishButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      finishButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  function submitAnswer(userAnswer, correctAnswer){

  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const finishButton = document.getElementById("finish");
  const myQuestions = [
    {
      question: "Your cell phone has hardware and software. What does hardware mean?",
      answers: {
        a: "it is super secure",
        b: "the physical pieces and technology of your phone",
        c: "applications and setting within your phone"
      },
      correctAnswer: "b",
        hint: "out of the options, what is best described by the word 'hard?'"
    },
    {
      question: "What is an example of hardware?",
      answers: {
        a: "your phone camera",
        b: "your email",
        c: "your password"

      },
      correctAnswer: "a",
        hint: "which can you physically touch?"
    },
    {
      question: "Let's Practice turning our phone on and off. First, find the power button. Which one is the power button?",
      answers: {
       a: "the long, thin one on the right-hand side",
       b: "the small one on the left-hand side on the top",
       c: "the small one on the left-hand side on the bottom"

      },
      correctAnswer: "a",
        hint: "which one is all by itself?"
    },
    {
      question: "Great! Now, we must find the volume button. Which one is NOT the volume button?",
      answers: {
        a: "the long, thin one on the right-hand side",
        b: "the long, thin one on the right-hand side",
        c: "the small one on the left-hand side on the bottom"
      },
      correctAnswer: "a",
        hint: "which one is the power button? The volume buttons must be the remaining options."
    },
    {
      question: "Excellent! Now that we have become acquainted with our options, let's turn our phone off. Hold down the power button, then ALSO hold down the top volume button. What do you see on your screen?",
      answers: {
        a: "Nothing",
        b: "3 images that look like long ovals",
        c: "an apple"
      },
      correctAnswer: "b",
        hint: "you may have to hold the buttons down for a few second before you see the correct screen! You may feel a little buzz too."
    },
    {
      question: "Now that we've reached our power down screen, take your finger and touch the image that says power. Slide it to the right, then leg go. What do you see now?",
      answers: {
        a: "Nothing",
        b: "3 images that look like long ovals",
        c: "an apple"
      },
      correctAnswer: "a",
        hint: "the power button looks like a little white circle with another red circle inside."
    },
    {
      question: "Let's practice turning our phone back on! Hold down the power button on the right hand side. What do you see?",
      answers: {
        a: "Nothing",
        b: "3 images that look like long ovals",
        c: "an apple",
      },
      correctAnswer: "c",
        hint: "you should only need to hold on to the power button a few seconds! Are you using the correct button?"
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const homeButton = document.getElementById("home");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  finishButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);