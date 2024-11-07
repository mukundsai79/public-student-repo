document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("userForm");
  const displays = document.querySelector(".modal-body");
  const submitModal = new bootstrap.Modal(
    document.getElementById("submitModal")
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    displays.innerHTML = "";

    if (!regForm.checkValidity()) {
      regForm.classList.add("was-validated");
      return;
    }

    let selectedCourses = [];

    regForm.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox.checked) {
        selectedCourses.push(checkbox.nextElementSibling.textContent);
      }
    });

    Array.from(regForm.elements).forEach((element) => {
      if (
        !element.name ||
        element.type === "submit" ||
        element.type === "checkbox"
      )
        return;

      const entryDiv = document.createElement("div");
      const labelSpan = document.createElement("span");
      labelSpan.className = "modal-label";
      labelSpan.textContent = `${element.name}: `;
      entryDiv.appendChild(labelSpan);

      const valueSpan = document.createElement("span");
      valueSpan.className = "modal-value";
      valueSpan.textContent = element.value;
      entryDiv.appendChild(valueSpan);

      displays.appendChild(entryDiv);

      if (element.name === "Registration Status") {
        if (selectedCourses.length > 0) {
          const coursesDiv = document.createElement("div");
          const coursesLabelSpan = document.createElement("span");
          coursesLabelSpan.className = "modal-label";
          coursesLabelSpan.textContent = "Courses Taken: ";
          coursesDiv.appendChild(coursesLabelSpan);

          const coursesValueSpan = document.createElement("span");
          coursesValueSpan.className = "modal-value";
          coursesValueSpan.textContent = selectedCourses.join(", ");
          coursesDiv.appendChild(coursesValueSpan);

          displays.appendChild(coursesDiv);
        }
      }
    });

    submitModal.show();
    regForm.classList.remove("was-validated");
  };

  regForm.addEventListener("submit", handleSubmit);
});
