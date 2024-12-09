import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import '../style/ResultPage.css'; // ملف CSS خارجي للتصميم الإضافي

const ResultPage = () => {
  const location = useLocation();
  const [evaluationResults, setEvaluationResults] = useState([]);

  useEffect(() => {
    // تأكد من أن البيانات موجودة قبل محاولة الوصول إليها
    if (location.state?.evaluationResults) {
      setEvaluationResults(location.state.evaluationResults);
    } else {
      console.error('لا توجد نتائج تقييم');
    }
  }, [location]);

  return (
    <MainLayout>
      <div className="container result-page">
        <h2 className="text-center mt-4 mb-4">نتائج إجاباتك</h2>
        {evaluationResults.length > 0 ? (
          <div className="result-cards">
            {evaluationResults.map((result, index) => (
              <div key={index} className="card card1 mb-4 shadow ">
                <div className="card-body">
                  <h5 className="card-title1">سؤال {index + 1}</h5>
                  <p className="card-text1">
                    <strong>الدرجة: </strong>
                    <span
                      className={`score ${
                        result.score < 5 ? 'low-score' : 'high-score'
                      }`}
                    >
                      {result.score !== undefined ? result.score : 'غير متوفرة'}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>التعليقات: </strong>
                    {result?.feedback || 'لا توجد تعليقات'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-5">لا توجد نتائج لعرضها.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default ResultPage;
