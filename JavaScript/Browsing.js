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

      question: "Let's practice using our apps. Which one of these apps is for browsing the internet?",
      answers: {
        a: "you must click on a link from somewhere else first",
        b: "at the bottom",
        c: "at the top"
      },
      correctAnswer: "c",
      hint: "Where would you put a title of a book?"
    },
    {
      question:  "Scroll all the way to the top, then let go. You should see 3 small icons on the bottom. What happens if you push the one on the far right, that looks like 2 squares?",
      answers: {
        a: "it refreshes the page",
        b: "all the tabs you have open expand so that you can select them",
        c: "it opens saved pages, or bookmarks"
      },
      correctAnswer: "b",
      hint: "try it! What happens?"

    },
    {
      question: "Nice! Now try the book icon. What happens?",
      answers: {
        a: "it refreshes the page",
        b: "all the tabs you have open expand so that you can select them",
        c: "it opends saved pages, or bookmarks"

      },
      correctAnswer: "c",
      hint: "try it! What happens?"
    },
        {
      question: "Great! Now, try the circular arrow at the top right. What happens?",
      answers: {
        a: "it refreshes the page",
        b: "all the tabs you have open expand so that you can select them",
        c: "it opends saved pages, or bookmarks"
      },
      correctAnswer: "a",
          hint: "try it! What happens?"
    },

      {
      question: "Let's try email. Which icon opens up the email application?",
      answers: {
        a: "the birdie",
        b: "the big F",
        c: "the envelope! That's TOO EASY"
      },
      correctAnswer: "c",
        hint: "what just makes you think mail?"
    },

      {
      question: "If someone set up mail for you, what do you see?",
      answers: {
        a: "the birdie",
        b: "your inbox",
        c: "the envelope! That's TOO EASY"

      },
      correctAnswer: "b",
        hint: "if someone is sending you mail, where would you see it? What would you call it?"
    },

          {
      question: "Let's send a message! Which icon do you select?",
      answers: {
        a: "the three lines in the bottom left",
        b: "the square with pencil in the bottom right",
        c: "the envelope! That's TOO EASY"

      },
      correctAnswer: "b",
        hint: "We've already used the envelope image!"
    },

          {
      question: "Maybe the most important part about sending an email correctly is typing in the email address correctly. They must follow a price format. What format does that look like?",
      answers: {
        a: "domain@username.com, ex. google@puppies.com",
        b: "username@password.com, ex. puppies@ismellyourfeet.com",
        c: "username@doman.com, ex. puppies@google.com"
      },

      correctAnswer: "c",
        hint: "Remember, passwords are kept secret!"
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