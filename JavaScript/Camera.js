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
      question: "Let's practice using our camera. First, we must open the camera app. Which icon do you think is for the camera?",
      answers: {
        a: "instagram",
        b: "the photo one",
        c: "the one that looks like a camera"

      },
      correctAnswer: "c",
      hint: "No hint"
    },
    {
      question: "Once we open up the camera, we must decide if we want flash. Where can we turn on or off flash?",
      answers: {
        a: "the lightning in the upper left corner",
        b: "the photo one",
        c: "i genuinely do not care about the flash setting go home"

      },
      correctAnswer: "a",
      hint: "No hint"
    },
    {
      question: "Great! We can also decide if we want to be in selfie mode or normal mode. Where can we change this setting?",
      answers: {
        a: "by swiping left and right",
        b: "the circuluar arrows on the bottom corner",
        c: "i genuinely do not care go home"

      },
      correctAnswer: "b",
      hint: "No hint"
    },
        {
      question: "Time to point and shoot! How do we actually take the photo?",
      answers: {
        a: "by swiping left and right",
        b: "the circuluar arrows on the bottom corner",
        c: "the white circular button in the middle on the bottom"

      },
      correctAnswer: "c",
          hint: "Try it! What happens?"
    },

      {
      question: "Yay we took a picture! Where can we check it out?",
      answers: {
        a: "going to the icon on the bottom left corner",
        b: "from the home screen, choosing the icon that says photos",
        c: "both"

      },
      correctAnswer: "c",
        hint: "Try it! What happens?"
    }
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