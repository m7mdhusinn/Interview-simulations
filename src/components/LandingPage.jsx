import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import '../style/LandingPage.css'; // تأكد من إضافة ملف الـ CSS الخاص بالتنسيقات

const LandingPage = () => {
  return (
    <>
      <MainLayout>
        <div className="landing-page-container ">
          <div className="text-center landing-page-content ">
            <div className="card  shadow-lg p-4 mb-4 rounded">
              <img
                src="/Free.png"
                alt="Logo"
                className="navbar-logo1 card-img-top"
              />
              <div className="card-body">
                <h1 className="display-4 fw-bold text-dark">Welcome to Smart Interview</h1>
                <p className="lead mb-4 text-dark">
                  في عالم العمل اليوم، تعتبر المقابلات الشخصية خطوة حاسمة نحو تحقيق أهدافك المهنية.
                  هنا في Smart Interview، نقدم لكم تجربة محاكاة متكاملة تساعدكم على الاستعداد للمقابلات بثقة واحترافية.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link to="/question" className="btn btn-primary btn-lg px-4 gap-3">
                    ابدأ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default LandingPage;
