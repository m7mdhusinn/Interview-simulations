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
            <img
              src="/Free.png"
              alt="Logo"
              className="navbar-logo"
             
            />
            <h1 className="display-4 fw-bold text-dark">Welcome to Smart Interview</h1>
            <div className="col-lg-8 mx-auto">
              <p className="lead mb-4 text-light">
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
      </MainLayout>
    </>
  );
};

export default LandingPage;
