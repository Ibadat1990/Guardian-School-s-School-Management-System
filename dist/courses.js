"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const coursesTable = document.getElementById("courses-table");

  const courseCode = document.getElementById("course-code");
  const courseName = document.getElementById("course-name");
  const courseDescription = document.getElementById("course-description");

  const newCourseSaveButton = document.getElementById("new-course-save-button");
  const newCourseCloseButton = document.getElementById(
    "new-course-close-button"
  );

  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  let courseId = parseInt(localStorage.getItem("courseIdCounter")) || 1;
  const enrolls = JSON.parse(localStorage.getItem("enrolls")) || [];
  console.log(enrolls);

  function courseOccurrences(enrolls, targetCourse) {
    let studentNames = [];
    let studentIds = [];

    for (let key in enrolls) {
      if (enrolls[key].selectedCourses.includes(targetCourse)) {
        studentNames.push(enrolls[key].studentFullName);
        studentIds.push(enrolls[key].studentId);
      }
    }

    return {studentNames, studentIds};
  }

  courses.forEach((course) => {
    appendCourseToTable(course);
  });

  newCourseSaveButton.addEventListener("click", (e) => {
    e.preventDefault();

    const code = courseCode.value.trim().toUpperCase();
    const name = courseName.value.trim();
    const description = courseDescription.value.trim();

    if (!code || !name || !description) {
      alert("All fields are required.");
      return;
    }

    let newCourse = {
      id: courseId++,
      code: code,
      name: name,
      description: description,
    };

    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
    localStorage.setItem("courseIdCounter", courseId);

    appendCourseToTable(newCourse);
    window.HSStaticMethods.autoInit();

    // Clear input fields
    courseCode.value = "";
    courseName.value = "";
    courseDescription.value = "";
  });

  function appendCourseToTable(course) {
    if (
      !course ||
      !course.id ||
      !course.code ||
      !course.name ||
      !course.description
    ) {
      console.error("Invalid course data", course);
      return;
    }
    const courseCountStudentNames = courseOccurrences(enrolls, course.code).studentNames;
    const courseCountStudentIds = courseOccurrences(enrolls, course.code).studentIds;
    console.log(courseCountStudentNames);
    console.log(courseCountStudentIds);
    const newElement = document.createElement("tr");
    newElement.classList.add("bg-white", "dark:bg-neutral-900");
    newElement.id = `courseRow-${course.id}`;
    newElement.innerHTML = `
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2">
        <div id="td-courseCode-${course.id}" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
            ${course.code}
        </div>
    </div>
</td>
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2">
        <p id="td-courseName-${course.id}" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
            ${course.name}
        </p>
    </div>
</td>
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2 flex items-center gap-3">
      <p id="td-studentsEnrolled-${course.id}" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
          ${courseCountStudentNames.length} Students
      </p>
      <button type="button" class="flex items-center justify-center w-7 h-7 rounded-full border border-[--tertiary-color] bg-[--light-secondary-color] hover:bg-[--secondary-color] transition-all duration-200 ease-in-out" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scroll-inside-body-modal-${course.id}" data-hs-overlay="#hs-scroll-inside-body-modal-${course.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
              <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>

      </button>
      <div id="hs-scroll-inside-body-modal-${course.id}" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="hs-scroll-inside-body-modal-${course.id}-label">
        <div class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3 id="hs-scroll-inside-body-modal-${course.id}-label" class="font-bold text-gray-800 dark:text-white">
                 Students Enrolled in ${course.code}
              </h3>
              <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-scroll-inside-body-modal-${course.id}">
                <span class="sr-only">Close</span>
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div class="p-4 overflow-y-auto">
              <div class="flex gap-4">
                <div>
                  <div class="font-semibold text-base mb-1">ID</div>
                  ${courseCountStudentIds.join(".<br>")}.
                </div>
                <div>
                  <div class="font-semibold text-base mb-1">Student Name</div>
                  ${courseCountStudentNames.join("<br>")}
                </div>
              </div>
            </div>
            <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" data-hs-overlay="#hs-scroll-inside-body-modal-${course.id}">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</td>
<td class="h-px w-72 min-w-72">
    <div class="px-6 py-2">
        <p id="td-courseDescription-${course.id}" class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
            ${course.description}
        </p>
    </div>
</td>
<td class="size-px whitespace-nowrap">
    <div class="px-6 py-2 flex gap-2">
        <button id="editCourseBtn-${course.id}"
            class="flex items-center justify-center w-7 h-7 rounded-full border border-[--tertiary-color] bg-[--light-secondary-color] hover:bg-[--secondary-color] transition-all duration-200 ease-in-out"
            aria-haspopup="dialog" aria-expanded="false" aria-controls="modal-${course.id}"
            data-hs-overlay="#modal-${course.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor" class="size-4">
                <path
                    d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path
                    d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
            </svg>
        </button>

        <!-- Edit Course Modal Start -->

        <div id="modal-${course.id}"
            class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
            role="dialog" tabindex="-1" aria-labelledby="modal-${course.id}-label">
            <div
                class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                <div
                    class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div
                        class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 id="modal-${course.id}-label"
                            class="font-bold text-gray-800 dark:text-white">
                            Edit Course
                        </h3>
                        <button type="button"
                            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                            aria-label="Close" data-hs-overlay="#modal-${course.id}">
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
                                Course Information
                            </div>

                            <div class="mt-2 space-y-3">
                                <input id="courseCode-${course.id}" type="text"
                                    class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Course Code" value="${course.code}">
                                <input id="courseName-${course.id}" type="text"
                                    class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Last Name" value="${course.name}">
                                <textarea id="courseDescription-${course.id}"
                                    class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Description...">${course.description}</textarea>
                            </div>
                        </div>
                        <!-- End Section -->
                    </form>

                    <div
                        class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button id="closeCourseEditModalBtn-${course.id}" type="button"
                            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[--secondary-color] bg-[--light-secondary-color] text-gray-800 shadow-sm hover:bg-[--secondary-color] focus:outline-none focus:bg-[--secondary-color] disabled:opacity-50 disabled:pointer-events-none  transition-all duration-200 ease-in-out"
                            data-hs-overlay="#modal-${course.id}">
                            Close
                        </button>
                        <button id="updateCourseInfoBtn-${course.id}" type="button"
                            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[--quaternary-color] bg-[--secondary-color] text-gray-900 hover:text-white hover:bg-[--tertiary-color] focus:outline-none focus:bg-[--tertiary-color] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 ease-in-out" data-hs-overlay="#modal-${course.id}">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Course Modal End -->

        <button id="removeCourseBtn-${course.id}"
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

    coursesTable.appendChild(newElement);

    newElement
      .querySelector(`#editCourseBtn-${course.id}`)
      .addEventListener("click", function () {
        editCourse(course.id);
      });

    newElement
      .querySelector(`#removeCourseBtn-${course.id}`)
      .addEventListener("click", function () {
        removeCourse(course.id, newElement);
      });
  }

  function editCourse(id) {
    const course = courses.find((c) => c.id === id);
    if (!course) return;

    const modal = document.getElementById(`modal-${id}`);

    const courseCodeInput = modal.querySelector(`#courseCode-${id}`);
    const courseNameInput = modal.querySelector(`#courseName-${id}`);
    const courseDescriptionInput = modal.querySelector(
      `#courseDescription-${id}`
    );
    const updateCourseInfoBtn = modal.querySelector(
      `#updateCourseInfoBtn-${id}`
    );

    updateCourseInfoBtn.addEventListener("click", function () {
      if (courseCodeInput.value.trim()) {
        course.code = courseCodeInput.value.trim();
      } else {
        alert("Course code is required");
        return; // Exit the function if the course code is missing
      }

      if (courseNameInput.value) {
        course.name = courseNameInput.value;
      } else {
        alert("Course name is required");
        return; // Exit the function if the course name is missing
      }

      if (courseDescriptionInput.value) {
        course.description = courseDescriptionInput.value.trim();
      } else {
        alert("Course description is required");
        return; // Exit the function if the course description is missing
      }

      const duplicateCourse = courses.find(
        (c) =>
          c.code.toLowerCase() === course.code.toLowerCase() &&
          c.id !== course.id
      );

      if (duplicateCourse) {
        alert("This course code already exists in the system.");
        return;
      }

      localStorage.setItem("courses", JSON.stringify(courses));

      const courseRow = coursesTable.querySelector(`#courseRow-${id}`);

      courseRow.querySelector(`#td-courseCode-${id}`).textContent =
        course.code.toUpperCase();

      courseRow.querySelector(`#td-courseName-${id}`).textContent = course.name;

      courseRow.querySelector(`#td-courseDescription-${id}`).textContent =
        course.description;
    });
  }

  function removeCourse(id, rowElement) {
    const confirmed = confirm("Are you sure you want to remove this course?");
    if (confirmed) {
      courses = courses.filter((c) => c.id !== id);
      localStorage.setItem("courses", JSON.stringify(courses));
      coursesTable.removeChild(rowElement);
    }
  }
});
