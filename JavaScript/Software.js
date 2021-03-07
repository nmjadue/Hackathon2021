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
    {{
      question: "Now that we are becoming more comfortable with our phone, let's talk about software! What is software?",
      answers: {
        a: "programs that exist within your phone",
        b: "information",
        c: "passwords"
      },
      correctAnswer: "a",
        hint: "Think about what hardware means. What does hardware not cover?"
    },
    {
      question: "Let's practice using your phone. First, unlock you phone. What do you see?",
      answers: {
        a: "the time, date, and blurbs of information ",
        b: "a bunch of colored icons in front of a background",
        c: "numbers"
      },
      correctAnswer: "b",
        hint: "If a friend set up your phone for you, they may have given you a pin or password. Make sure to enter this to unlock your phone"
    },
    {
      question: "Let's make a phone call! First, find the green icon with a phone drawn on it. Touch the icon. At the botton, select the icon that looks like a waffle and says keypad. What do you see?",
      answers: {
        a: "names of people I may want to call ",
        b: "people who I have spoken to recently",
        c: "numbers of a phone"
      },
      correctAnswer: "c",
        hint: "there were a lot of steps in this question! Make sure you followed the steps precisely."
    },
    {
      question: "Let's call someone! Type in the phone number of who you would like to call. Then, touch the green icon at the bottom of the screen. Put the phone to your ear. Did the call dial?",
      answers: {
        a: "yes",
        b: "no"
      },
      correctAnswer: "a",
        hint: "If the call did not dial, be sure to make sure the phone number was typed correctly. Also, make sure you selected the green icon."
    },
    {
      question: "I hope you had a great conversation. Let's do something else! Let's go to the home screen. What is the home screen?",
      answers: {
        a: "the phone screen numbers",
        b: "the colorful icons in front of a background",
        c: "the screen when my phone is locked."
      },
      correctAnswer: "b",
        hint: "if you just unlocked your phone, what does it look like?"
    },
    {
      question: "Now that you know what the home screen is, how do you get there?",
      answers: {
        a: "use your thumb to swipe up from the bottom of the screen",
        b: "press the power button quickly",
        c: "press the up volume button then the down."
      },
      correctAnswer: "a",
        hint: "this one is tricky. Why don't you try some of the options and see what happens?"
    },
    {
      question: "Now that you're on the homescreen, you should see that your phone already has many applications or 'apps.' You can navigate through your app library by swiping left and right. Try it!",
      answers: {
        a: "yes!",
        b: "No, I'm tired."

      },
      correctAnswer: "a",
        hint: "this is an easy one!!!"
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