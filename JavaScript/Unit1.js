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

  // function myPopup() {
  //   var popup = document.getElementById("myPopup");
  //   popup.classList.toggle("show");
  // }

function showResult(){

    showResults("code")
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
        myPopup()
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
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
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
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Your cell phone has hardware and software. What does hardware mean?",
      answers: {
        a: "it is super secure",
        b: "the physical pieces and technology of your phone",
        c: "applications and setting within your phone"
      },
      correctAnswer: "b",
        module: "hardware"
    },
    {
      question: "What is an example of hardware?",
      answers: {
        a: "your phone camera",
        b: "your email",
        c: "your password"

      },
      correctAnswer: "a",
        module: "hardware"
    },
    {
      question: "Let's Practice turning our phone on and off. First, find the power button. Which one is the power button?",
      answers: {
       a: "the long, thin one on the right-hand side",
       b: "the small one on the left-hand side on the top",
       c: "the small one on the left-hand side on the bottom"

      },
      correctAnswer: "a",
        module: "hardware"
    },
    {
      question: "Great! Now, we must find the volume button. Which one is NOT the volume button?",
      answers: {
        a: "the long, thin one on the right-hand side",
        b: "the long, thin one on the right-hand side",
        c: "the small one on the left-hand side on the bottom"
      },
      correctAnswer: "a",
        module: "hardware"
    },
    {
      question: "Excellent! Now that we have become acquainted with our options, let's turn our phone off. Hold down the power button, then ALSO hold down the top volume button. What do you see on your screen?",
      answers: {
        a: "Nothing",
        b: "3 images that look like long ovals",
        c: "an apple"
      },
      correctAnswer: "b",
        module: "hardware"
    },
    {
      question: "Now that we've reached our power down screen, take your finger and touch the image that says power. Slide it to the right, then leg go. What do you see now?",
      answers: {
        a: "Nothing",
        b: "3 images that look like long ovals",
        c: "an apple"
      },
      correctAnswer: "a",
        module: "hardware"
    },
    {
      question: "Let's practice turning our phone back on! Hold down the power button on the right hand side. What do you see?",
      answers: {
        a: "Nothing",
        b: "3 images that look like long ovals",
        c: "an apple",
      },
      correctAnswer: "c",
        module: "hardware"
    },
    {
      question: "Now that we are becoming more comfortable with our phone, let's talk about software! What is software?",
      answers: {
        a: "programs that exist within your phone",
        b: "information",
        c: "passwords"
      },
      correctAnswer: "a",
        module: "software"
    },
    {
      question: "Let's practice using your phone. First, unlock you phone. What do you see?",
      answers: {
        a: "the time, date, and blurbs of information ",
        b: "a bunch of colored icons in front of a background",
        c: "numbers"
      },
      correctAnswer: "b",
        module: "software"
    },
    {
      question: "Let's make a phone call! First, find the green icon with a phone drawn on it. Touch the icon. At the botton, select the icon that looks like a waffle and says keypad. What do you see?",
      answers: {
        a: "names of people I may want to call ",
        b: "people who I have spoken to recently",
        c: "numbers of a phone"
      },
      correctAnswer: "c",
        module: "software"
    },
    {
      question: "Let's call someone! Type in the phone number of who you would like to call. Then, touch the green icon at the bottom of the screen. Put the phone to your ear. Did the call dial?",
      answers: {
        a: "yes",
        b: "no"
      },
      correctAnswer: "a",
        module: "software"
    },
    {
      question: "I hope you had a great conversation. Let's do something else! Let's go to the home screen. What is the home screen?",
      answers: {
        a: "the phone screen numbers",
        b: "the colorful icons in front of a background",
        c: "the screen when my phone is locked."
      },
      correctAnswer: "b",
        module: "software"
    },
    {
      question: "Now that you know what the home screen is, how do you get there?",
      answers: {
        a: "use your thumb to swipe up from the bottom of the screen",
        b: "press the power button quickly",
        c: "press the up volume button then the down."
      },
      correctAnswer: "a",
        module: "software"
    },
    {
      question: "Now that you're on the homescreen, you should see that your phone already has many applications or 'apps.' You can navigate through your app library by swiping left and right. Try it!",
      answers: {
        a: "yes!",
        b: "No, I'm tired."

      },
      correctAnswer: "a",
        module: "software"
    },
    {
      question: "You're moving up in the world! You're almost ready to start using apps. First, let's talk about passwords and security.",
      answers: {
        a: "yes!",
        b: "No, I'm tired."
      },
      correctAnswer: "a",
        module: "password"
    },
    {
      question: "When you open an app you haven't used before, it may ask you for a username and password. What is a username?",
      answers: {
        a: "a username creates an identity so the application can recognize who you are",
        b: "a username verifies who you are"

      },
      correctAnswer: "a",
        module: "password"
    },
    {
      question: "So, what's a password then?",
      answers: {
        a: "a username creates an identity so the application can recognize who you are",
        b: "a username verifies who you are"

      },
      correctAnswer: "b",
        module: "password"
    },
    {
      question: "Great! You are almost ready to start registering for apps! Let's try to keep you information as safe as possible. The internet can be a scary place! Is it okay to use the same username in more than one app?",
      answers: {
        a: "yes, this is relatively safe!",
        b: "no. you should never repeat a username if you can help it",
      },
      correctAnswer: "a",
        module: "password"
    },
    {
      question: "Since it's okay to use the same username in many apps, is it okay to use the same password?,
      answers: {
        a: "yes, this is relatively safe!",
        b: "no. you should never repeat a password if you can help it"
      },
      correctAnswer: "b",
        module: "password"
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
        module: "password"
    },
    {
      question: "Wow! It sounds like passwords can be complicated. Am I supposed to memorize them all?",
      answers: {
        a: "yes!",
        b: "No, that's way too hard.",
      },
      correctAnswer: "b",
        module: "password"
    },
    {
      question: "Hm. How do I keep track of my passwords then?",
      answers: {
        a: "make one complicated password, then memorize just that one
        b: "write them down in a notebook, and keep it in a safe place",
        c: "make a list of the passwords and email them to yourself"
      },
      correctAnswer: "b",
        module: "password"
    },
    {
      question: "Which of the following is hardware?",
      answers: {
        a: "camera"
        b: "email",
        c: "the internet"
      },
      correctAnswer: "a",
        module: "hardwaresoftwarereview"
    },
    {
      question: "Let's make a phone call! First, find the green icon with a phone drawn on it. Touch the icon. At the botton, select the icon that looks like a waffle and says keypad. What do you see?",
      answers: {
        a: "names of people I may want to call ",
        b: "people who I have spoken to recently",
        c: "numbers of a phone"
      },
      correctAnswer: "c",
        module: "software"
    },
    {
      question: "Let's call someone! Type in the phone number of who you would like to call. Then, touch the green icon at the bottom of the screen. Put the phone to your ear. Did the call dial?",
      answers: {
        a: "yes",
        b: "no"
      },
      correctAnswer: "a",
        module: "software"
    },
    {
      question: "I hope you had a great conversation. Let's do something else! Let's go to the home screen. What is the home screen?",
      answers: {
        a: "the phone screen numbers",
        b: "the colorful icons in front of a background",
        c: "the screen when my phone is locked."
      },
      correctAnswer: "b",
        module: "software"
    },
    {
      question: "Now that you know what the home screen is, how do you get there?",
      answers: {
        a: "use your thumb to swipe up from the bottom of the screen",
        b: "press the power button quickly",
        c: "press the up volume button then the down."
      },
      correctAnswer: "a",
        module: "software"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d",
        module: "code"
    },


  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResult);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);