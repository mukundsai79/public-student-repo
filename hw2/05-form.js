document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("regForm");
  const displays = {
    name: document.getElementById("nameDisplay"),
    email: document.getElementById("emailDisplay"),
    status: document.getElementById("statusDisplay"),
    courses: document.getElementById("coursesDisplay"),
    comments: document.getElementById("commentsDisplay"),
  };

  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Retrieve form values
    const { fullName, userEmail, regStatus, courses, userComments } =
      regForm.elements;
    const selectedCourses =
      Array.from(courses)
        .filter((course) => course.checked)
        .map((course) => course.value)
        .join(", ") || "None";

    // Populate the details
    displays.name.textContent = `Name: ${fullName.value}`;
    displays.email.textContent = `Email: ${userEmail.value}`;
    displays.status.textContent = `Status: ${
      regStatus.value || "Not Specified"
    }`;
    displays.courses.textContent = `Courses: ${selectedCourses}`;
    displays.comments.textContent = `Comments: ${
      userComments.value || "No comments"
    }`;
  });
});
