import './style.css'

// Interface kursinfo
interface Course {
  code: string;
  name: string;
  progression: "A" | "B" | "C"; // Literal types
  syllabus: string;
}
printCourse();

// Formulär
const courseForm = document.querySelector("#course-form") as HTMLFormElement;
const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;

// Lägg till kurs vid submit
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let savedCourses: Course[] = JSON.parse(localStorage.getItem("courses") || "[]");

  const codeInput = document.querySelector("#course-code") as HTMLInputElement;
  const nameInput = document.querySelector("#course-name") as HTMLInputElement;
  const progressionSelection = document.querySelector("#progression") as HTMLSelectElement;
  const syllabusInput = document.querySelector("#syllabus") as HTMLInputElement;

  const newCourse: Course = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progressionSelection.value as "A" | "B" | "C",
    syllabus: syllabusInput.value,
  };

  // Kontroll om kurskoden redan finns sparad i localStorage
  let courseExists: boolean = savedCourses.some(course => course.code === newCourse.code);

  // Om kurskoden inte finns sparad
  if (courseExists === false) {
    errorMessage.classList.add("hidden");
    courseForm.reset();

    savedCourses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(savedCourses));

    printCourse();
  } else {
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "Kursen är redan sparad, försök med en annan kurskod";
  }
})

// Skriv ut kurs i kurslista
function printCourse(): void {
  const courseList = document.querySelector("#course-list") as HTMLUListElement;
  courseList.innerHTML = "";

  let savedCourses: Course[] = JSON.parse(localStorage.getItem("courses") || "[]");

  if (savedCourses.length === 0) {
    courseList.classList.add("hidden");
    return;
  }
  courseList.classList.remove("hidden");

  savedCourses.forEach(course => {
    const liEl = document.createElement("li");
    liEl.innerHTML = `<div class="list-head">
                      <span class="strong">${course.code}</span>
                      <button class="remove-btn">Ta bort</button>
                      </div>
                      <div class="list-row">
                      <span>${course.name}</span>
                      <span>Progression ${course.progression}</span>
                      <a href="${course.syllabus}" target="_blank">Kursplan</a>
                      </div>`;

    courseList.appendChild(liEl);

    const deleteBtn = liEl.querySelector(".remove-btn") as HTMLButtonElement;
    deleteBtn.addEventListener("click", () => {
      deleteCourse(course.code);
    })
  })
}

// Ta bort kurs från kurslista
function deleteCourse(code: string): void {
  let savedCourses: Course[] = JSON.parse(localStorage.getItem("courses") || "[]");
  savedCourses = savedCourses.filter(course => course.code !== code);
  localStorage.setItem("courses", JSON.stringify(savedCourses));
  printCourse();
}