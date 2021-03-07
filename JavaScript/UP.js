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
      question: "You're moving up in the world! You're almost ready to start using apps. First, let's talk about passwords and security.",
      answers: {
        a: "yes!",
        b: "No, I'm tired."
      },
      correctAnswer: "a",
        hint: "this is an easy one!!!"
    },
    {
      question: "When you open an app you haven't used before, it may ask you for a username and password. What is a username?",
      answers: {
        a: "a username creates an identity so the application can recognize who you are",
        b: "a username verifies who you are"

      },
      correctAnswer: "a",
        hint: "usernames are often public, meaning many people may see it. If everyone knows a username, can you use it to prove your identity?"
    },
    {
      question: "So, what's a password then?",
      answers: {
        a: "a username creates an identity so the application can recognize who you are",
        b: "a username verifies who you are"

      },
      correctAnswer: "b",
        hint: "passwords are usually secret, meaning only you should know what your password is"
    },
    {
      question: "Great! You are almost ready to start registering for apps! Let's try to keep you information as safe as possible. The internet can be a scary place! Is it okay to use the same username in more than one app?",
      answers: {
        a: "yes, this is relatively safe!",
        b: "no. you should never repeat a username if you can help it",
      },
      correctAnswer: "a",
        hint: "Think about your name. How often do you share it with others?"
    },
    {
      question: "Since it's okay to use the same username in many apps, is it okay to use the same password?",
      answers: {
        a: "yes, this is relatively safe!",
        b: "no. you should never repeat a password if you can help it"
      },
      correctAnswer: "b",
        hint: "Think about it this way. Would you use the same key for every lock?"
    },
    {
      question: "Passwords are pretty important! What are some steps you can take to make a strong password?",
      answers: {
        a: "try to make it at least 12-14 characters long",
        b: "use letters, numbers, AND a symbol",
        c: "come up with a phrase, then make your password the first letters of each word",
        d: "all of the above"
      },
      correctAnswer: "d",
        hint: "What would make your password harder to guess?"
    },
    {
      question: "Wow! It sounds like passwords can be complicated. Am I supposed to memorize them all?",
      answers: {
        a: "yes!",
        b: "No, that's way too hard.",
      },
      correctAnswer: "b",
        hint: "Let's be honest. Do you remember what you ate for breakfast this morning? How about yesterday?"
    },
    {
      question: "Hm. How do I keep track of my passwords then?",
      answers: {
        a: "make one complicated password, then memorize just that one",
        b: "write them down in a notebook, and keep it in a safe place",
        c: "make a list of the passwords and email them to yourself"
      },
      correctAnswer: "b",
        hint: "with your method, could someone figure out your password?"
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