/* eslint-disable react/prop-types */
import quizCompleteImg from "../../assets/quiz-complete.png";
import { useEffect } from "react";
import { updateUser } from "../../util/http";

export default function Summary({ userAnswers, QUESTIONS }) {
	let total_points = 10;
	const skippedAnswers = userAnswers.filter((answer) => answer === null);

	let user = JSON.parse(localStorage.getItem("user"));
	const gpa = user.totalGpa;
	console.log(gpa);

	const correctAnswers = userAnswers.filter(
		(answer, index) => answer === QUESTIONS[index].answer
	);

	const skippedAnswersShare = Math.round(
		(skippedAnswers.length / userAnswers.length) * 100
	);

	const correctAnswersShare = Math.round(
		(correctAnswers.length / userAnswers.length) * 100
	);

	const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

	if ((total_points += correctAnswersShare / 10) > 10) {
		total_points = 10;
	} else {
		total_points = 0;
	}

	useEffect(() => {
		const points = user.points + total_points;
		user = { ...user, points };
		localStorage.setItem("user", JSON.stringify(user));
		updateUser(user);
	}, [total_points, user]);

	return (
		<div id="summary">
			<img
				src={quizCompleteImg}
				alt="Trophy icon"
			/>
			<h2>Quiz Completed!</h2>
			<div id="summary-stats">
				<p>
					<span className="number">{skippedAnswersShare}%</span>
					<span className="text mt-4">skipped</span>
				</p>
				<p>
					<span className="number">{correctAnswersShare}%</span>
					<span className="text mt-4">correct</span>
				</p>
				<p>
					<span className="number">{wrongAnswersShare}%</span>
					<span className="text mt-4">incorrect</span>
				</p>
			</div>
			<ol>
				{userAnswers.map((answer, index) => {
					let cssClass = "user-answer";
					if (answer === null) {
						cssClass += " skipped";
					} else if (answer === QUESTIONS[index].answer) {
						cssClass += " correct";
					} else {
						cssClass += " wrong";
					}

					return (
						<li key={index}>
							<h3>{index + 1}</h3>
							<p className="question">{QUESTIONS[index].q}</p>
							<p className={cssClass}>{answer ?? "Skipped"}</p>
						</li>
					);
				})}
			</ol>
			<p>
				<span
					id="summary"
					className="points"
				>
					{(total_points += correctAnswersShare / 10)} points
				</span>
			</p>
		</div>
	);
}

/*
                [in the question timer] 
    function Quiztime(){
      return (
        <div classname = "quiztime">
          <Timer duration = {10*60*1000}/>
        </div>
      );
    }
    export defualt Quiztime;
    */
/*
  import react, {usestae, useffect} from "react";
  const timer = ({duration}) =>{
    const [time, setTime] = useState(duration);
      useEffect(()=>{
        if(time>0){
          setTimeout(()=>{
            setTime(time-1000)
          },1000)
        }
      },[time])
  useEffect(() => {
    setTimeout(() => {
      setTime(time—1000);
    }, 1000);
  }, [time]);
  const getFormattedTime = (millieseconds) => {
    let total_seconds = parseInt(Math.floor(millieseconds / 1000)); 
    let total_minutes = parseInt(Math.floor(total_seconds / 60)); 

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    return `${minutes}: ${seconds}`;
    return <div>{getFormatted Time (time)}</div>;
  };
  export default Timer;









  */
/*
const JoinQuiz = () => {
  const classes = useStyles();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [timer, setTimer] = useState(5);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(-1));

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let timerId;
    if (!isSubmitted) { // Only start the timer if quiz is not submitted
      timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(timerId);
            handleQuizSubmission(); // Automatically submit quiz when timer reaches 0
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId); // Clear the timer when component unmounts or quiz is submitted
  }, [isSubmitted]);

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswerIndex(-1); // Reset selected answer
    } else {
      handleQuizSubmission();
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setCurrentQuestionIndex(previousQuestionIndex);
    }
  };

  const handleQuizSubmission = () => {
    let totalScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswerIndex = userAnswers[i];
      if (userAnswerIndex !== -1) {
        if (question.answers[userAnswerIndex]?.correct) {
          totalScore += 1;
        }
      }
    }
    const scorePercentage = (totalScore / questions.length) * 100;
    const message = `Quiz submitted! Score: ${totalScore}/${questions.length} (${scorePercentage}%)`;
    setShowDialog(true);
    setDialogMessage(message);
    setIsSubmitted(true);
  };
    
  const handleAnswerSelect = (index, correct) => {
    if (!isSubmitted) {
      setSelectedAnswerIndex(index);
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[currentQuestionIndex] = index;
      setUserAnswers(updatedUserAnswers);
      if (correct) {
        setScore(score + 1);
      }
    }
  };
  
  useEffect(() => {
    // Update the selected answer index when the current question changes
    if (currentQuestionIndex >= 0) {
      setSelectedAnswerIndex(userAnswers[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, userAnswers]);

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
  };
*/
