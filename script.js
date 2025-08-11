// بخش اول: پیام خوش آمد
const messageBox = document.getElementById("welcome-message")
const nameInput = document.getElementById("nameInput")
const setNameBtn = document.getElementById("setNameBtn")

if (messageBox && nameInput && setNameBtn) {
    setNameBtn.addEventListener("click", () => {
        const userName = nameInput.value.trim()
        if (userName) {
            messageBox.textContent = `Welcome, ${userName}!`
        } else {
            messageBox.textContent = "Welcome, guest!"
        }
    })
}

// بخش دوم: تغییر وضعیت دانش‌آموز (اصلاح typo و شرط)
const statusSpan = document.getElementById("status")
const statusInput = document.getElementById("studentStatus")  // اصلاح نام متغیر اینجا
const updateStudentsStatus = document.getElementById("updateStudentStatus")

if (statusSpan && statusInput && updateStudentsStatus) {
    updateStudentsStatus.addEventListener("click", function(){
        let newStatus = statusInput.value.trim()
        if (newStatus !== "") {
            statusSpan.textContent = newStatus
        } else {
            alert("Please enter a status")
        }
    })
}

// بخش سوم: نمایش اطلاعات تماس)
const showEmailBtn = document.getElementById("showEmail")
const showPhoneBtn = document.getElementById("showPhone")
const hideContactBtn = document.getElementById("hideContact")
const contactDetails = document.getElementById("contactDetails")

const studentEmail = "rabianezami786@gmail.com"
const studentPhone = "+93 748 945 001"

if (showEmailBtn && showPhoneBtn && hideContactBtn && contactDetails) {
    showEmailBtn.addEventListener("click", function(){
        contactDetails.textContent = `Email: ${studentEmail}`
    })

    showPhoneBtn.addEventListener("click", function(){
        contactDetails.textContent = `Phone: ${studentPhone}`
    })

    hideContactBtn.addEventListener("click", function(){
        contactDetails.textContent = ""
    })
}

// بخش چهارم: دورها
const courseList = document.querySelector("#courseList");
const addCourseBtn = document.querySelector("#addCourseBtn");
const filterAllBtn = document.querySelector("#filterAll");
const filterGrade10Btn = document.querySelector("#filterGrade10");
const filterGrade11Btn = document.querySelector("#filterGrade11");
const error = document.querySelector("#error");

if (courseList && addCourseBtn && filterAllBtn && filterGrade10Btn && filterGrade11Btn && error) {

    const courses = [
      { name: "Math", grade: "10" },
      { name: "English", grade: "11" },
      { name: "History", grade: "10" },
    ];

    let currentFilter = "all";

    function renderCourse() {
      courseList.innerHTML = "";

      const filteredCourses = currentFilter === "all" ? courses : courses.filter(c => c.grade === currentFilter);

      filteredCourses.forEach((course, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex flex-column gap-1";
        li.dataset.grade = course.grade; 

        const headerDiv = document.createElement("div");
        headerDiv.className = "d-flex justify-content-between align-items-center";

        const courseName = document.createElement("span");
        courseName.textContent = `${course.name} (Grade ${course.grade})`; 

        const detailBtn = document.createElement("button");
        detailBtn.className = "btn btn-outline-success btn-sm";
        detailBtn.textContent = "Show Details";

        headerDiv.appendChild(courseName);
        headerDiv.appendChild(detailBtn);

        const detailsDiv = document.createElement("div");
        detailsDiv.className =
          "mt-2 p-2 bg-light border border-success rounded shadow-sm text-muted d-none d-flex justify-content-between align-items-center";

        const detailsText = document.createElement("span");
        detailsText.textContent = `Details of ${course.name} for Grade ${course.grade}`;

        const closeBtn = document.createElement("button");
        closeBtn.className = "btn btn-sm btn-outline-danger";
        closeBtn.innerHTML = "&times;";

        detailBtn.addEventListener("click", () => {
          detailsDiv.classList.remove("d-none");
          detailBtn.classList.add("d-none");
        });

        closeBtn.addEventListener("click", () => {
          detailsDiv.classList.add("d-none");
          detailBtn.classList.remove("d-none");
        });

        detailsDiv.appendChild(detailsText);
        detailsDiv.appendChild(closeBtn);

        li.appendChild(headerDiv);
        li.appendChild(detailsDiv);

        courseList.appendChild(li);
      });

      if (filteredCourses.length === 0) {
        courseList.innerHTML = `<li class="list-group-item text-center text-muted">No courses found for Grade ${currentFilter}</li>`;
      }
    }

    renderCourse();

    addCourseBtn.addEventListener("click", () => {
      const input = document.querySelector("#courseInput");
      const gradeSelect = document.querySelector("#gradeSelect");
      const newCourse = input.value.trim();
      const newGrade = gradeSelect.value;

      if (newCourse === "") {
        error.textContent = "Course name cannot be empty!";
        return;
      }

      courses.push({ name: newCourse, grade: newGrade });
      input.value = "";
      error.textContent = "";
      renderCourse();
    });

    filterAllBtn.addEventListener("click", () => {
      currentFilter = "all";
      renderCourse();
    });

    filterGrade10Btn.addEventListener("click", () => {
      currentFilter = "10";
      renderCourse();
    });

    filterGrade11Btn.addEventListener("click", () => {
      currentFilter = "11";
      renderCourse();
    });

}

// بخش پنجم: فرم تماس 
const form = document.querySelector("#contactForm")

if (form) {
  const nameInput = document.querySelector("#name")
  const emailInput = document.querySelector("#email")
  const messageInput = document.querySelector("#message")

  const nameError = document.querySelector("#nameError")
  const emailError = document.querySelector("#emailError")
  const messageError = document.querySelector("#messageError")

  const success = document.querySelector("#success")

  function validateName(name) {
    if (!name.trim()) return "Name is required"
    if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(name)) return "Only letters (English or Persian) allowed"
    return ""
  }

  function validateEmail(email) {
    if (!email.trim()) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format"
    return ""
  }

  function validateMessage(message) {
    if (!message.trim()) return "Message is required"
    return ""
  }

  function clearErrors() {
    [nameError, emailError, messageError].forEach(el => el.textContent = "")
    ;[nameInput, emailInput, messageInput].forEach(el => {
      el.classList.remove("is-invalid", "is-valid")
    })
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("input", () => {
        const errorElement = document.querySelector(`#${input.id}Error`)
        errorElement.textContent = ""
        input.classList.remove("is-invalid", "is-valid")
    })
  })

  form.addEventListener("submit", function (e) {
    e.preventDefault()

    clearErrors()
    success.classList.add("d-none")

    const name = nameInput.value
    const email = emailInput.value
    const message = messageInput.value

    let hasError = false

    const nameValidation = validateName(name)
    if (nameValidation) {
      nameError.textContent = nameValidation
      nameInput.classList.add("is-invalid")
      hasError = true
    } else {
      nameInput.classList.add("is-valid")
    }

    const emailValidation = validateEmail(email)
    if (emailValidation) {
      emailError.textContent = emailValidation
      emailInput.classList.add("is-invalid")
      hasError = true
    } else {
      emailInput.classList.add("is-valid")
    }

    const messageValidation = validateMessage(message)
    if (messageValidation) {
      messageError.textContent = messageValidation
      messageInput.classList.add("is-invalid")
      hasError = true
    } else {
      messageInput.classList.add("is-valid")
    }

    if (!hasError) {
      success.textContent = "Message sent successfully ✅"
      success.classList.remove("d-none")

      form.reset()
      ;[nameInput, emailInput, messageInput].forEach(el => {
        el.classList.remove("is-valid")
      })

      setTimeout(() => {
        success.classList.add("d-none")
        success.textContent = ""
      }, 3000)
    }
  })
}
