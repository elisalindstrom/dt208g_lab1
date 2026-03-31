import './style.css'

/* Interface kursinfo
interface CourseInfo {
  code: string
  name: string
  progression: string
  syllabys: string
} */

const courseForm = document.querySelector("#course-form") as HTMLFormElement;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log("Test");
})