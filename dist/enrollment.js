"use strict";

// localStorage.clear();

document.addEventListener("DOMContentLoaded", function () {
  const enrollmentTable = document.getElementById("enrollment-table");

  const enrollmentStudentId = document.getElementById("student-id-enrollment");
  const courseSelection = document.getElementById("course-selection");

  const newEnrollmentSaveBtn = document.getElementById(
    "new-enrollment-save-button"
  );

  const courses = JSON.parse(localStorage.getItem("courses")) || [];

  let enrolls = JSON.parse(localStorage.getItem("enrolls")) || [];
  let enrollId = parseInt(localStorage.getItem("enrollmentIdCounter")) || 1;

  enrolls.forEach((enroll) => {
    appendEnrollsToTable(enroll);
  });

  for (let i = 1; i <= courses.length; i++) {
    courseSelection.innerHTML += `
      <div class="flex">
          <input id="courseID-${
            courses[i - 1].id
          } hs-checkbox-group-${i}" type="checkbox"
               class="shrink-0 mt-0.5 border-gray-200 rounded text-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800 transition-all duration-200 ease-in-out" value="${
                 courses[i - 1].code
               }">
          <label for="hs-checkbox-group-${i}" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">
          ${courses[i - 1].code}
          </label>
      </div>
    `;
  }

  const studentFullName = function (id) {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find((student) => student.id === id);
    if (student) {
      return `${student.firstName} ${student.lastName}`;
    } else {
      return "ID not found";
    }
  };

  newEnrollmentSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedCourses = [];

    courseSelection
      .querySelectorAll("input[type=checkbox]:checked")
      .forEach((checkbox) => {
        selectedCourses.push(checkbox.value);
      });

    if (!parseInt(enrollmentStudentId.value) || selectedCourses.length === 0) {
      alert("Please select at least one course and enter a valid student ID.");
      return;
    }

    const newEnrollment = {
      id: enrollId++,
      studentId: parseInt(enrollmentStudentId.value),
      studentFullName: studentFullName(parseInt(enrollmentStudentId.value)),
      selectedCourses: selectedCourses,
    };

    if (newEnrollment.studentFullName == "ID not found") {
      alert("Invalid student ID.");
      return;
    }

    const duplicateEnrolls = enrolls.find(
      (e) =>
        e.studentId === newEnrollment.studentId && e.id !== newEnrollment.id
    );

    if (duplicateEnrolls) {
      alert("This student already exists in the system.");
      return;
    }

    enrolls.push(newEnrollment);
    localStorage.setItem("enrolls", JSON.stringify(enrolls));
    localStorage.setItem("enrollmentIdCounter", enrollId);

    appendEnrollsToTable(newEnrollment);
    window.HSStaticMethods.autoInit();

    // Clear input fields
    enrollmentStudentId.value = "";
    courseSelection
      .querySelectorAll("input[type=checkbox]")
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
  });

  function appendEnrollsToTable(enroll) {
    const newElement = document.createElement("tr");
    newElement.classList.add("bg-white", "dark:bg-neutral-900");
    newElement.id = `enrollmentRow-${enroll.id}`;
    newElement.innerHTML = `
        <td class="size-px whitespace-nowrap">
            <div class="px-6 py-2">
                <div id="td-studentId-${
                  enroll.id
                }" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                    ${enroll.studentId}
                </div>
            </div>
        </td>
        <td class="size-px whitespace-nowrap">
            <div class="px-6 py-2">
                <p id="td-studentFullName-${
                  enroll.id
                }" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                    ${enroll.studentFullName}
                </p>
            </div>
        </td>
        <td class="h-px w-72 min-w-72 ">
            <div class="px-6 py-2">
                <p id="td-courses-selected-${
                  enroll.id
                }" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                    ${enroll.selectedCourses.join(", ")}
                </p>
            </div>
        </td>
        <td class="size-px whitespace-nowrap">
            <div class="px-6 py-2 flex gap-2">
                <button id="editEnrollmentBtn-${enroll.id}"
                    class="flex items-center justify-center w-7 h-7 rounded-full border border-[--tertiary-color] bg-[--light-secondary-color] hover:bg-[--secondary-color] transition-all duration-200 ease-in-out"
                    aria-haspopup="dialog" aria-expanded="false" aria-controls="modal-${
                      enroll.id
                    }"
                    data-hs-overlay="#modal-${enroll.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor" class="size-4">
                        <path
                            d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />

                    </svg>
                </button>

                <!-- Edit Student Modal Start -->

                <div id="modal-${enroll.id}"
                    class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                    role="dialog" tabindex="-1" aria-labelledby="modal-${
                      enroll.id
                    }-label">
                    <div
                        class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                        <div
                            class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                            <div
                                class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                                <h3 id="modal-${enroll.id}-label"
                                    class="font-bold text-gray-800 dark:text-white">

                                    Edit Enrollment
                                </h3>
                                <button type="button"
                                    class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                    aria-label="Close" data-hs-overlay="#modal-${
                                      enroll.id
                                    }">
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
                                        Student
                                    </div>

                                    <div class="mt-2 space-y-3">
                                        <input id="studentId-${
                                          enroll.id
                                        }" type="text"
                                            class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                            placeholder="Student ID" value=${
                                              enroll.studentId
                                            }>

                                        <div
                                            class="inline-block text-sm font-medium dark:text-white">
                                            Courses
                                        </div>
                                        
                                        <div id="editCourses-${
                                          enroll.id
                                        }" class="grid grid-cols-3 sm:grid-cols-4 gap-x-6 gap-y-4">



                                        </div>
                                    </div>
                                </div>
                                <!-- End Section -->
                            </form>

                            <div
                                class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                                <button id="closeEditEnrollmentModalBtn-${
                                  enroll.id
                                }" type="button"
                                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[--secondary-color] bg-[--light-secondary-color] text-gray-800 shadow-sm hover:bg-[--secondary-color] focus:outline-none focus:bg-[--secondary-color] disabled:opacity-50 disabled:pointer-events-none  transition-all duration-200 ease-in-out"
                                    data-hs-overlay="#modal-${enroll.id}">
                                    Close
                                </button>
                                <button id="updateEnrollmentBtn-${
                                  enroll.id
                                }" type="button"
                                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[--quaternary-color] bg-[--secondary-color] text-gray-900 hover:text-white hover:bg-[--tertiary-color] focus:outline-none focus:bg-[--tertiary-color] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 ease-in-out" data-hs-overlay="#modal-${
                                      enroll.id
                                    }">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Edit Student Modal End -->

                <button id = "removeEnrollmentBtn-${enroll.id}"
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

    enrollmentTable.appendChild(newElement);

    for (let i = 1; i <= courses.length; i++) {
      // Create the newElement element
      const newElement = document.createElement("div");
      newElement.classList.add("flex");
      newElement.innerHTML = `
              <input id="editCourseId-${i}-${enroll.id}" type="checkbox"
                   class="shrink-0 mt-0.5 border-gray-200 rounded text-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800 transition-all duration-200 ease-in-out" value="${
                     courses[i - 1].code
                   }">
              <label for="editCourseId-${i}-${
        enroll.id
      }" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">
              ${courses[i - 1].code}
              </label>
        `;

      const editCourses = document.querySelector(`#editCourses-${enroll.id}`);
      editCourses.appendChild(newElement);

      if (enroll.selectedCourses.includes(courses[i - 1].code)) {
        document.querySelector(
          `#editCourseId-${i}-${enroll.id}`
        ).checked = true;
      } else {
        document.querySelector(
          `#editCourseId-${i}-${enroll.id}`
        ).checked = false;
      }
    }

    newElement
      .querySelector(`#editEnrollmentBtn-${enroll.id}`)
      .addEventListener("click", function () {
        editEnrollment(enroll.id);
      });

    newElement
      .querySelector(`#removeEnrollmentBtn-${enroll.id}`)
      .addEventListener("click", function () {
        removeEnrollment(enroll.id, newElement);
      });
  }

  function editEnrollment(id) {
    const enroll = enrolls.find((s) => s.id === id);
    if (!enroll) return;

    const studentIdInput = document.querySelector(`#studentId-${id}`);
    const editCourseSelection = document.querySelector(`#editCourses-${id}`);

    const updateEnrollmentBtn = document.querySelector(
      `#updateEnrollmentBtn-${id}`
    );

    const selectedCourses = [];

    updateEnrollmentBtn.addEventListener("click", function () {
      enroll.studentId = studentIdInput.value;

      enroll.studentFullName = studentFullName(parseInt(enroll.studentId));

      const duplicateEnrolls = enrolls.find(
        (e) => e.studentId === enroll.studentId && e.id !== enroll.id
      );

      if (duplicateEnrolls) {
        alert("This student already exists in the system.");
        return;
      }

      editCourseSelection
        .querySelectorAll("input[type=checkbox]:checked")
        .forEach((checkbox) => {
          selectedCourses.push(checkbox.value);
        });
      enroll.selectedCourses = selectedCourses;

      if (
        !parseInt(studentIdInput.value) ||
        selectedCourses.length === 0
      ) {
        alert(
          "Please select at least one course and enter a valid student ID."
        );
        window.HSStaticMethods.autoInit();
        return;
      }

      localStorage.setItem("enrolls", JSON.stringify(enrolls));

      const enrollmentRow = enrollmentTable.querySelector(
        `#enrollmentRow-${id}`
      );

      enrollmentRow.querySelector(
        `#td-studentId-${id}`
      ).textContent = `${enroll.studentId}`;

      enrollmentRow.querySelector(`#td-studentFullName-${id}`).textContent =
        studentFullName(parseInt(enroll.studentId));
      enrollmentRow.querySelector(`#td-courses-selected-${id}`).textContent =
        selectedCourses.join(`, `);

      window.HSStaticMethods.autoInit();
    });
  }

  function removeEnrollment(id, rowElement) {
    // Ask for confirmation before removing
    const confirmed = confirm(
      "Are you sure you want to remove this enrollment?"
    );

    // If the user confirms, proceed with removal
    if (confirmed) {
      enrolls = enrolls.filter((e) => e.id !== id);
      localStorage.setItem("enrolls", JSON.stringify(enrolls));
      enrollmentTable.removeChild(rowElement);
    }
  }
});
