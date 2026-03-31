import './style.css'

// Interface kursinfo
interface Course {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

// Formulär
const courseForm = document.querySelector("#course-form") as HTMLFormElement;

function displayCourse(course: Course): void {
  const courseList = document.querySelector("#course-list");
  courseList?.classList.remove("hidden");

  if (courseList) {
    const liEl = document.createElement("li");
    liEl.innerHTML = `${course.code} | ${course.name} | ${course.progression} | ${course.syllabus}`;
    
    courseList.appendChild(liEl);
  }
}

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const codeInput = document.querySelector("#course-code") as HTMLInputElement;
  const nameInput = document.querySelector("#course-name") as HTMLInputElement;
  const progressionSelection = document.querySelector("#progression") as HTMLSelectElement;
  const syllabusInput = document.querySelector("#syllabus") as HTMLInputElement;

  const newCourse: Course = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progressionSelection.value,
    syllabus: syllabusInput.value,
  };

  displayCourse(newCourse);
})