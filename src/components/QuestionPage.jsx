import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import '../style/QuestionPage.css'; // استيراد ملف CSS

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleFinalSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('يرجى الإجابة على جميع الأسئلة.');
      return;
    }

    const responsesData = questions.map((question) => ({
      questionId: question.QuestionID,
      answerText: answers[question.QuestionID] || ''
    }));

    try {
      const response = await axios.post('http://127.0.0.1:5000/save-evaluate', responsesData);
      navigate('/result', { state: { evaluationResults: response.data.results } });
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('حدث خطأ أثناء إرسال الإجابات.');
    }
  };

  const handleChange = (e, questionId) => {
    const updatedAnswers = { ...answers, [questionId]: e.target.value };
    setAnswers(updatedAnswers);
  };

  return (
    <MainLayout>
      <div className="question-page">
        <div className="container">
          <h1 className="page-title">الأسئلة</h1>
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.QuestionID} className="question-card">
                <h2>{question.QuestionText}</h2>
                <textarea
                  className="form-control answer-input"
                  value={answers[question.QuestionID] || ''}
                  onChange={(e) => handleChange(e, question.QuestionID)}
                  rows="4"
                  placeholder="أدخل إجابتك هنا"
                ></textarea>
              </div>
            ))
          ) : (
            <p className="loading-text">جاري تحميل الأسئلة...</p>
          )}
          <button onClick={handleFinalSubmit} className="btn btn-primary submit-btn">
            إرسال جميع الإجابات
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuestionPage;
