# from flask import Flask, request, jsonify
# import pyodbc
# import requests
# from flask_cors import CORS

# # إعداد Flask
# app = Flask(__name__)
# CORS(app)

# # إعداد الاتصال بقاعدة البيانات
# connection = pyodbc.connect(
#     "Driver={SQL Server};"
#     "Server=M7MD;"          # اسم الخادم
#     "Database=InterviewDB;" # اسم قاعدة البيانات
#     "UID=sa;"               # اسم المستخدم
#     "PWD=sa1;"              # كلمة المرور
# )
# cursor = connection.cursor()

# # وظيفة تقييم الإجابة باستخدام النموذج المحلي model_ai
# def evaluate_answer(question_id, user_answer):
#     """
#     تقييم الإجابة باستخدام model_ai المحلي.
#     """
#     try:
#         # استدعاء النموذج المحلي
#         api_url = "http://127.0.0.1:5001/evaluate"  # استبدل بالـ endpoint الخاص بـ model_ai
#         data = {
#             'questionId': question_id,
#             'answerText': user_answer
#         }

#         # إرسال الطلب للنموذج
#         response = requests.post(api_url, json=data)

#         # التحقق من الاستجابة
#         if response.status_code != 200:
#             return f"Error: Model API returned status code {response.status_code}."

#         # تحليل الاستجابة
#         response_json = response.json()
#         score = response_json.get("score", 5)  # درجة افتراضية 5 إذا لم يتم العثور على نتيجة
#         feedback = response_json.get("feedback", "لم يتم تقديم ملاحظات.")

#         return f"{score}: {feedback}"

#     except Exception as e:
#         return f"Error: {str(e)}"

# # API لجلب الأسئلة
# @app.route('/questions', methods=['GET'])
# def get_questions():
#     """
#     جلب قائمة الأسئلة من قاعدة البيانات.
#     """
#     try:
#         cursor.execute("SELECT QuestionID, QuestionText FROM Questions")
#         questions = cursor.fetchall()
#         result = [{"QuestionID": q.QuestionID, "QuestionText": q.QuestionText} for q in questions]
#         return jsonify(result)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # API لحفظ الإجابات وتقييمها
# @app.route('/save-evaluate', methods=['POST'])
# def save_and_evaluate():
#     """
#     حفظ الإجابة وتقييمها باستخدام model_ai.
#     """
#     try:
#         # استلام البيانات من الطلب
#         data = request.json
#         print(data)
#         question_id = data['questionId']
#         user_answer = data['answerText']

#         # حفظ الإجابة في قاعدة البيانات
#         cursor.execute("""
#             INSERT INTO Answers (questionId, answerText, SubmittedAt)
#             VALUES (?, ?, GETDATE())
#         """, (question_id, user_answer))
#         cursor.execute("SELECT SCOPE_IDENTITY()")
#         answer_id = cursor.fetchone()[0]  # جلب AnswerID الجديد

#         # تقييم الإجابة باستخدام model_ai
#         evaluation = evaluate_answer(question_id, user_answer)
        
#         # التحقق من التقييم
#         if "Error" in evaluation:
#             print(evaluation)
#             return jsonify({"error": evaluation}), 400

#         # استخراج الدرجة والتعليقات من التقييم
#         try:
#             score = int(evaluation.split(":")[0])  # استخراج الدرجة
#             feedback = evaluation.split(":")[1].strip() if ":" in evaluation else evaluation
#         except ValueError:
#             return jsonify({"error": "Invalid score format in evaluation"}), 400

#         # حفظ التقييم في قاعدة البيانات
#         cursor.execute("""
#             INSERT INTO Evaluations (AnswerID, Score, Feedback)
#             VALUES (?, ?, ?)
#         """, (answer_id, score, feedback))
#         connection.commit()  # تأكيد التغييرات

#         return jsonify({'answerid': answer_id, "score": score, "feedback": feedback})
    
#     except Exception as e:
#         print(f"Error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
import pyodbc
import requests
from flask_cors import CORS
import logging

# إعداد Flask
app = Flask(__name__)
CORS(app)

# إعداد الاتصال بقاعدة البيانات
connection = pyodbc.connect(
    "Driver={SQL Server};"
    "Server=M7MD;"          # اسم الخادم
    "Database=InterviewDB;" # اسم قاعدة البيانات
    "UID=sa;"               # اسم المستخدم
    "PWD=sa1;"              # كلمة المرور
)
cursor = connection.cursor()

# إعداد التسجيل
logging.basicConfig(level=logging.DEBUG)

# وظيفة تقييم الإجابة باستخدام النموذج المحلي model_ai
def evaluate_answer(question_id, user_answer):
    """
    تقييم الإجابة باستخدام model_ai المحلي.
    """
    try:
        # استدعاء النموذج المحلي
        api_url = "http://127.0.0.1:5001/evaluate"  # استبدل بالـ endpoint الخاص بـ model_ai
        data = {
            'questionId': question_id,
            'answerText': user_answer
        }

        # إرسال الطلب للنموذج
        response = requests.post(api_url, json=data)

        # التحقق من الاستجابة
        if response.status_code != 200:
            return f"Error: Model API returned status code {response.status_code}."

        # تحليل الاستجابة
        response_json = response.json()
        score = response_json.get("score", 5)  # درجة افتراضية 5 إذا لم يتم العثور على نتيجة
        feedback = response_json.get("feedback", "لم يتم تقديم ملاحظات.")

        return f"{score}: {feedback}"

    except Exception as e:
        return f"Error: {str(e)}"

# API لجلب الأسئلة
@app.route('/questions', methods=['GET'])
def get_questions():
    """
    جلب قائمة الأسئلة من قاعدة البيانات.
    """
    try:
        cursor.execute("SELECT QuestionID, QuestionText FROM Questions")
        questions = cursor.fetchall()
        result = [{"QuestionID": q.QuestionID, "QuestionText": q.QuestionText} for q in questions]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# API لحفظ الإجابات وتقييمها
@app.route('/save-evaluate', methods=['POST'])
def save_and_evaluate():
    """
    حفظ الإجابة وتقييمها باستخدام model_ai.
    """
    try:
        # استلام البيانات من الطلب
        data = request.json
        logging.debug(f"Received data: {data}")

        results = []  # قائمة لتجميع النتائج

        # التأكد من أن البيانات هي قائمة من القواميس
        if isinstance(data, list):  # إذا كانت البيانات قائمة من القواميس
            for entry in data:
                if isinstance(entry, dict):  # التأكد من أن كل عنصر هو قاموس
                    question_id = entry.get('questionId')
                    user_answer = entry.get('answerText')

                    if question_id and user_answer:
                        logging.debug(f"Starting transaction for question {question_id}...")

                        # بدء معاملة جديدة لكل سؤال
                        cursor.execute("BEGIN TRANSACTION")

                        try:
                            # حفظ الإجابة في قاعدة البيانات
                            logging.debug(f"Inserting answer for question {question_id}...")

                            cursor.execute(""" 
                            INSERT INTO Answers (questionId, answerText, SubmittedAt)
                            OUTPUT INSERTED.AnswerID
                            VALUES (?, ?, GETDATE())
                            """, (question_id, user_answer))

                            # التحقق من القيمة المرجعة من INSERT
                            answer_id = cursor.fetchone()[0]
                            if answer_id is None:
                                logging.error(f"Error: AnswerID not returned for question {question_id}")
                                cursor.execute("ROLLBACK TRANSACTION")
                                continue

                            # التقييم باستخدام model_ai
                            evaluation = evaluate_answer(question_id, user_answer)

                            # التحقق من التقييم
                            if "Error" in evaluation:
                                logging.error(f"Evaluation error: {evaluation}")
                                cursor.execute("ROLLBACK TRANSACTION")
                                continue

                            # استخراج الدرجة والتعليقات من التقييم
                            try:
                                score = int(evaluation.split(":")[0])  # استخراج الدرجة
                                feedback = evaluation.split(":")[1].strip() if ":" in evaluation else evaluation
                            except ValueError:
                                logging.error("Invalid score format in evaluation")
                                cursor.execute("ROLLBACK TRANSACTION")
                                continue

                            # حفظ التقييم في قاعدة البيانات
                            logging.debug(f"Inserting evaluation for AnswerID {answer_id}...")

                            cursor.execute(""" 
                                INSERT INTO Evaluations (AnswerID, Score, Feedback)
                                VALUES (?, ?, ?)
                            """, (answer_id, score, feedback))

                            # تأكيد المعاملة
                            logging.debug(f"Committing transaction for question {question_id}...")
                            connection.commit()

                            # إضافة النتيجة إلى القائمة
                            results.append({
                                "questionId": question_id,
                                "score": score,
                                "feedback": feedback
                            })

                        except Exception as e:
                            logging.error(f"Error during transaction for question {question_id}: {str(e)}")
                            cursor.execute("ROLLBACK TRANSACTION")
                            continue

                else:
                    logging.error("Each entry in the data should be a dictionary.")
                    return jsonify({"error": "Invalid data structure."}), 400

            # إرجاع النتائج
            return jsonify({"status": "success", "results": results}), 200

        else:
            logging.error("The received data should be a list of dictionaries.")
            return jsonify({"error": "Invalid data format."}), 400

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
