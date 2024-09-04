"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const studentsTable = document.getElementById("students-table");

  const studentFirstName = document.getElementById("student-first-name");
  const studentLastName = document.getElementById("student-last-name");
  const studentAge = document.getElementById("student-age");

  const newStudentSaveButton = document.getElementById(
    "new-student-save-button"
  );

  let students = JSON.parse(localStorage.getItem("students")) || [];
  let studentId = parseInt(localStorage.getItem("studentIdCounter")) || 1;

  students.forEach((student) => {
    appendStudentToTable(student);
  });

  function getCoursesById(enrolls, studentId) {
    for (let key in enrolls) {
      if (parseInt(enrolls[key].studentId) === studentId) {
        return enrolls[key].selectedCourses.join(", ");
      }
    }
    return null; // If no matching ID is found
  }

  newStudentSaveButton.addEventListener("click", (e) => {
    e.preventDefault();

    const firstName = studentFirstName.value.trim();
    const lastName = studentLastName.value.trim();
    const age = parseInt(studentAge.value.trim());

    if (!firstName) {
      alert("First name is required.");
      return;
    }

    if (isNaN(age) || age < 0) {
      alert("invalid age");
      return;
    }

    const duplicateStudent = students.find(
      (student) =>
        student.firstName.toLowerCase() === firstName.toLowerCase() &&
        student.lastName.toLowerCase() === lastName.toLowerCase() &&
        student.age === age
    );

    if (duplicateStudent) {
      alert("This student already exists in the system.");

      // Clear input fields
      studentFirstName.value = "";
      studentLastName.value = "";
      studentAge.value = "";

      return;
    }

    let newStudent = {
      id: studentId++,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };

    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("studentIdCounter", studentId);

    appendStudentToTable(newStudent);
    window.HSStaticMethods.autoInit();

    // Clear input fields
    studentFirstName.value = "";
    studentLastName.value = "";
    studentAge.value = "";
  });

  function appendStudentToTable(student) {
    let enrolls = JSON.parse(localStorage.getItem("enrolls")) || [];
    console.log(enrolls)
    const courses = getCoursesById(enrolls, student.id);
    console.log(courses);
    const newElement = document.createElement("tr");
    newElement.classList.add("bg-white", "dark:bg-neutral-900");
    newElement.id = `studentRow-${student.id}`;
    newElement.innerHTML = `
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2">
        <div class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
            ${student.id}
        </div>
    </div>
</td>
<td class="h-px w-72">
    <div class="px-6 py-2">
        <p id="td-studentName-${student.id}" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
            ${student.firstName} ${student.lastName}
        </p>
    </div>
</td>
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2">
        <p id="td-studentAge-${student.id}" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
            ${student.age}
        </p>
    </div>
</td>
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2">
        <p id="td-enrolledCourses-${student.id}" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
            ${courses}
        </p>
    </div>
</td>
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2 flex gap-2">
        <button id="editStudentBtn-${student.id}"
            class="flex items-center justify-center w-7 h-7 rounded-full border border-[--tertiary-color] bg-[--light-secondary-color] hover:bg-[--secondary-color] transition-all duration-200 ease-in-out"
            aria-haspopup="dialog" aria-expanded="false" aria-controls="modal-${student.id}"
            data-hs-overlay="#modal-${student.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor" class="size-4">
                <path
                    d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path
                    d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
            </svg>
        </button>

        <!-- Edit Student Modal Start -->

        <div id="modal-${student.id}"
            class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
            role="dialog" tabindex="-1" aria-labelledby="modal-${student.id}-label">
            <div
                class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                <div
                    class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div
                        class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="modal-${student.id}-label"
                            class="font-bold text-gray-800 dark:text-white">
                            Edit Student
                        </h3>
                        <button type="button"
                            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                            aria-label="Close" data-hs-overlay="#modal-${student.id}">
                            <span class="sr-only">Close</span>
                            <svg class="shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <form class="p-4">
                        <!-- Section -->
                        <div
                            class="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <div
                                class="inline-block text-sm font-medium dark:text-white">
                                Personal Information
                            </div>

                            <div class="mt-2 space-y-3">
                                <input id="studentFirstName-${student.id}" type="text"
                                    class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="First Name" value="${student.firstName}">
                                <input id="studentLastName-${student.id}" type="text"
                                    class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Last Name" value="${student.lastName}">
                                <input id="studentAge-${student.id}" type="text"
                                    class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Age" value="${student.age}">
                            </div>
                        </div>
                        <!-- End Section -->
                    </form>

                    <div
                        class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button id="closeStudentEditModalBtn-${student.id}" type="button"
                            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[--secondary-color] bg-[--light-secondary-color] text-gray-800 shadow-sm hover:bg-[--secondary-color] focus:outline-none focus:bg-[--secondary-color] disabled:opacity-50 disabled:pointer-events-none  transition-all duration-200 ease-in-out"
                            data-hs-overlay="#modal-${student.id}">
                            Close
                        </button>
                        <button id="updateStudentInfoBtn-${student.id}" type="button"
                            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[--quaternary-color] bg-[--secondary-color] text-gray-900 hover:text-white hover:bg-[--tertiary-color] focus:outline-none focus:bg-[--tertiary-color] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 ease-in-out" data-hs-overlay="#modal-${student.id}">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Student Modal End -->

        <button id="removeStudentBtn-${student.id}"
            class="flex items-center justify-center w-7 h-7 rounded-full border border-[--tertiary-color] text-[--warning-color] bg-[--light-secondary-color] hover:bg-[--secondary-color] transition-all duration-200 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor" class="size-4">
                <path fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</td>
`;

    studentsTable.appendChild(newElement);

    newElement
      .querySelector(`#editStudentBtn-${student.id}`)
      .addEventListener("click", function () {
        editStudent(student.id);
      });

    newElement
      .querySelector(`#removeStudentBtn-${student.id}`)
      .addEventListener("click", function () {
        removeStudent(student.id, newElement);
      });
  }

  function editStudent(id) {
    const student = students.find((s) => s.id === id);
    if (!student) return;

    const modal = document.getElementById(`modal-${id}`);

    const firstNameInput = modal.querySelector(`#studentFirstName-${id}`);
    const lastNameInput = modal.querySelector(`#studentLastName-${id}`);
    const ageInput = modal.querySelector(`#studentAge-${id}`);
    const updateStudentInfoBtn = modal.querySelector(
      `#updateStudentInfoBtn-${id}`
    );

    updateStudentInfoBtn.addEventListener("click", function () {
      student.firstName = firstNameInput.value;
      student.lastName = lastNameInput.value;
      student.age = parseInt(ageInput.value.trim());

      if (!firstNameInput.value) {
        alert("First name is required.");
        return;
      }

      if (isNaN(ageInput.value.trim()) || ageInput.value.trim() <= 0) {
        alert("Please enter a valid age greater than 0.");
        return;
      }

      const duplicateStudent = students.find(
        (s) =>
          s.firstName.toLowerCase() === student.firstName.toLowerCase() &&
          s.lastName.toLowerCase() === student.lastName.toLowerCase() &&
          s.age === student.age &&
          s.id !== student.id
      );

      if (duplicateStudent) {
        alert("This student already exists in the system.");
        return;
      }

      localStorage.setItem("students", JSON.stringify(students));

      const studentRow = studentsTable.querySelector(`#studentRow-${id}`);
      studentRow.querySelector(
        `#td-studentName-${id}`
      ).textContent = `${student.firstName} ${student.lastName}`;

      studentRow.querySelector(`#td-studentAge-${id}`).textContent =
        student.age;
    });
  }

  function removeStudent(id, rowElement) {
    const confirmed = confirm("Are you sure you want to remove this student?");

    if (confirmed) {
      students = students.filter((s) => s.id !== id);
      localStorage.setItem("students", JSON.stringify(students));
      studentsTable.removeChild(rowElement);
    }
  }
});
