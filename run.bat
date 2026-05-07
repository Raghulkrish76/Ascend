@echo off

echo Starting Django server...
cd ascend-backend
call venv\Scripts\activate
start "" cmd /c "python manage.py runserver"

cd ..

echo Starting React server...
cd ascend-frontend
npm run dev