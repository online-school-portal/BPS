
const SUPABASE_URL = "https://irelkjvppoisvjpopdpb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZWxranZwcG9pc3ZqcG9wZHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTUwMDAsImV4cCI6MjA4MTkzMTAwMH0.osF4wEZ-zm3cXScD1W8gMOkG81O2TbDJ8L47YvIIryw";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

let allStudents = [];
let allTeachers = [];

function loadStudents(list = allStudents) {
  const container = document.getElementById("studentsContainer");
  if (!container) return;
  container.innerHTML = "";

  // The 'grid' class in the parent container handles the layout
  container.className = "grid"; 

  list.forEach(student => {
    const card = document.createElement("div");
    card.className = "data-card"; // This matches the CSS we added earlier

    card.innerHTML = `
      <div class="data-card-header">
        <div class="card-avatar">
          ${student.full_name ? student.full_name.charAt(0) : 'S'}
        </div>
        <div class="card-info">
          <h4>${student.full_name}</h4>
          <p>ID: ${student.student_id}</p>
        </div>
      </div>
      
      <div class="card-body">
        <span class="card-label">Current Class</span>
        <span class="card-value">${student.student_class || "N/A"}</span>
        
        <span class="card-label">Sex</span>
        <span class="card-value">${student.sex || "N/A"}</span>
        
        <span class="card-label">Parent</span>
        <span class="card-value">${student.parent_name || "N/A"}</span>

        <span class="card-label">Phone</span>
        <span class="card-value">${student.parent_phone || "N/A"}</span>
      </div>

      <div class="card-actions">
        <button onclick="openEditStudentModal('${encodeURIComponent(student.student_id)}')" class="btn-edit">
          Edit Profile
        </button>
        <button onclick="deleteStudent('${encodeURIComponent(student.student_id)}')" class="btn-delete">
          Delete
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

 /* function loadStudents(list = allStudents) {
  const container = document.getElementById("studentsContainer");
  if (!container) return;
  container.innerHTML = "";

  list.forEach(student => {
    const card = document.createElement("div");
    card.className = "border p-4 rounded shadow mb-4";

    card.innerHTML = `
      <p><strong>ID:</strong> ${student.student_id}</p>
      <p><strong>Name:</strong> ${student.full_name}</p>
      <p><strong>Sex:</strong> ${student.sex || ""}</p>
      <p><strong>Date of Birth:</strong> ${student.date_of_birth || ""}</p>
      <p><strong>Nationality:</strong> ${student.nationality || ""}</p>
      <p><strong>State of Origin:</strong> ${student.state_of_origin || ""}</p>
      <p><strong>LGA:</strong> ${student.lga || ""}</p>
      <p><strong>Student Address:</strong> ${student.student_address || ""}</p>
      <p><strong>Admission Class:</strong> ${student.admission_class || ""}</p>
      <p><strong>Current Class:</strong> ${student.student_class || ""}</p>
      <p><strong>Parent Name:</strong> ${student.parent_name || ""}</p>
      <p><strong>Parent Phone:</strong> ${student.parent_phone || ""}</p>
      <p><strong>Parent Email:</strong> ${student.parent_email || ""}</p>
      <p><strong>Guardian Name:</strong> ${student.guardian_name || ""}</p>
      <p><strong>Guardian Phone:</strong> ${student.guardian_phone || ""}</p>
      <p><strong>Guardian Email:</strong> ${student.guardian_email || ""}</p>
      <p><strong>Sibling Name:</strong> ${student.sibling_name || ""}</p>
      <p><strong>Sibling Class:</strong> ${student.sibling_class || ""}</p>
      <p><strong>Sibling Sex:</strong> ${student.sibling_sex || ""}</p>
      <div class="flex gap-2 mt-2">
        <button onclick="openEditStudentModal('${encodeURIComponent(student.student_id)}')" class="action-btn">Edit</button>
        <button onclick="deleteStudent('${encodeURIComponent(student.student_id)}')" class="action-btn delete-btn">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
} */

function loadTeachers() {
  const container = document.getElementById("teachersContainer");
  if (!container) return;
  container.innerHTML = "";

  // Ensure the container uses the new grid layout
  container.className = "grid";

  allTeachers.forEach(teacher => {
    const card = document.createElement("div");
    card.className = "data-card";

    card.innerHTML = `
      <div class="data-card-header">
        <div class="card-avatar" style="background: #e0e7ff; color: #4338ca;">
          ${teacher.full_name ? teacher.full_name.charAt(0) : 'T'}
        </div>
        <div class="card-info">
          <h4>${teacher.full_name}</h4>
          <p>${teacher.qualification || "Faculty"}</p>
        </div>
      </div>
      
      <div class="card-body">
        <span class="card-label">Subject</span>
        <span class="card-value" style="color: #4f46e5; font-weight: 700;">
          ${teacher.subject_specialization || "N/A"}
        </span>
        
        <span class="card-label">Class Teacher</span>
        <span class="card-value">${teacher.class_teacher || "None"}</span>
        
        <span class="card-label">Experience</span>
        <span class="card-value">${teacher.years_of_experience ? teacher.years_of_experience + ' Years' : "N/A"}</span>

        <span class="card-label">Phone</span>
        <span class="card-value">${teacher.phone || "N/A"}</span>
      </div>

      <div class="card-actions">
        <button onclick="openEditTeacherModal('${encodeURIComponent(teacher.id)}')" class="btn-edit">
          Edit Profile
        </button>
        <button onclick="deleteTeacher('${encodeURIComponent(teacher.id)}')" class="btn-delete">
          Remove
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

 /*function loadTeachers() {
  const container = document.getElementById("teachersContainer");
  if (!container) return;
  container.innerHTML = "";

  allTeachers.forEach(teacher => {
    const card = document.createElement("div");
    card.className = "border p-4 rounded shadow mb-4";

    card.innerHTML = `
      <p><strong>ID:</strong> ${teacher.teacher_id || teacher.id}</p>
      <p><strong>Name:</strong> ${teacher.full_name}</p>
      <p><strong>Subject Specialization:</strong> ${teacher.subject_specialization || ""}</p>
      <p><strong>Qualification:</strong> ${teacher.qualification || ""}</p>
      <p><strong>Phone:</strong> ${teacher.phone || ""}</p>
      <p><strong>Email:</strong> ${teacher.email || ""}</p>
      <p><strong>Class Teacher:</strong> ${teacher.class_teacher || ""}</p>
      <p><strong>Years of Experience:</strong> ${teacher.years_of_experience || ""}</p>
      <p><strong>Joining Date:</strong> ${teacher.joining_date || ""}</p>
      <div class="flex gap-2 mt-2">
        <button onclick="openEditTeacherModal('${encodeURIComponent(teacher.id)}')" class="action-btn">Edit</button>
        <button onclick="deleteTeacher('${encodeURIComponent(teacher.id)}')" class="action-btn delete-btn">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
} */

function populateTransferDropdownFromAll() {
  const select = document.getElementById("transferStudentSelect");
  if (!select) return;

  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Select Student --";
  select.appendChild(defaultOption);

  allStudents.forEach(student => {
    const option = document.createElement("option");
    option.value = student.student_id;
    option.textContent = `${student.name} (${student.student_class})`;
    select.appendChild(option);
  });
}

// Hamburger navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Show default or last active section
  const lastSection = localStorage.getItem("activeSection") || "register";
  showSection(lastSection);
});

// Show/hide sections
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
    sec.style.display = "none";
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
    target.style.display = "block";
  }

  // Close hamburger menu
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  if (navLinks && hamburger) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }

  // Save active section to localStorage
  localStorage.setItem("activeSection", sectionId);
}

/* =======================
   STUDENTS
======================= */

   /* lucide.createIcons();

    function previewImage(input) {
      const preview = document.getElementById('photo-preview');
      const placeholder = document.getElementById('placeholder-text');
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.src = e.target.result;
          preview.classList.remove('hidden');
          placeholder.classList.add('hidden');
        }
        reader.readAsDataURL(input.files[0]);
      }
    } */
    
    // Initialize all Lucide icons after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
});

// Image preview function
function previewImage(input) {
  const preview = document.getElementById('photo-preview');
  const placeholder = document.getElementById('placeholder-text');
  
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
      placeholder.classList.add('hidden');
    };
    reader.readAsDataURL(input.files[0]);
  }
}

    
async function fetchStudents() {
  const { data, error } = await supabaseClient
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return console.error(error);

  allStudents = data;
  loadStudents();
  populateTransferDropdownFromAll();
}

async function registerStudent(payload) {
  const { error } = await supabaseClient
    .from("students")
    .insert(payload);

  if (error) return alert(error.message);
  await fetchStudents();
}

async function updateStudent(studentId, payload) {
  const { error } = await supabaseClient
    .from("students")
    .update(payload)
    .eq("student_id", studentId);

  if (error) return alert(error.message);
  await fetchStudents();
}

async function deleteStudent(studentIdEncoded) {
  const studentId = decodeURIComponent(studentIdEncoded);
  if (!confirm("Delete student?")) return;

  const { error } = await supabaseClient
    .from("students")
    .delete()
    .eq("student_id", studentId);

  if (error) return alert(error.message);
  await fetchStudents();
}

window.openEditStudentModal = async function(studentIdEncoded) {
  const studentId = decodeURIComponent(studentIdEncoded);

  const { data: student, error } = await supabaseClient
    .from("students")
    .select("*")
    .eq("student_id", studentId)
    .single();

  if (error) return alert(error.message);

  const form = document.getElementById("editStudentForm");

  // Map form input names to database columns
  const fieldMap = {
    fullName: "full_name",
    studentId: "student_id",
    studentClass: "student_class",
    admissionClass: "admission_class",
    dateOfBirth: "date_of_birth",
    sex: "sex",
    stateOfOrigin: "state_of_origin",
    nationality: "nationality",
    lga: "lga",
    studentAddress: "student_address",
    parentName: "parent_name",
    parentPhone: "parent_phone",
    parentEmail: "parent_email",
    parentAddress: "parent_address",
    guardianName: "guardian_name",
    guardianPhone: "guardian_phone",
    guardianEmail: "guardian_email",
    guardianAddress: "guardian_address",
    siblingName: "sibling_name",
    siblingClass: "sibling_class",
    siblingGender: "sibling_gender"
  };

  Object.keys(fieldMap).forEach(formField => {
    if (form[formField]) {
      form[formField].value = student[fieldMap[formField]] ?? "";
    }
  });

  document.getElementById("editStudentModal").classList.remove("hidden");

  // Cancel button
  const cancelBtn = document.getElementById("closeStudentModal");
  if (cancelBtn) cancelBtn.onclick = () => {
    document.getElementById("editStudentModal").classList.add("hidden");
  };
};

document.getElementById("studentClassFilter").addEventListener("change", e => {
  const selected = e.target.value;
  const filtered = selected === "all"
    ? allStudents
    : allStudents.filter(s => s.student_class === selected);
  loadStudents(filtered);
});

/* =======================
   TEACHERS
======================= */

async function fetchTeachers() {
  const { data, error } = await supabaseClient
    .from("teachers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return console.error(error);

  allTeachers = data;
  loadTeachers();
}

async function addTeacher(payload) {
  const { error } = await supabaseClient
    .from("teachers")
    .insert(payload);

  if (error) return alert(error.message);
  await fetchTeachers();
}

async function updateTeacher(id, payload) {
  const { error } = await supabaseClient
    .from("teachers")
    .update(payload)
    .eq("id", id);

  if (error) return alert(error.message);
  await fetchTeachers();
}

async function deleteTeacher(idEncoded) {
  const id = decodeURIComponent(idEncoded);
  if (!confirm("Delete teacher?")) return;

  const { error } = await supabaseClient
    .from("teachers")
    .delete()
    .eq("id", id);

  if (error) return alert(error.message);
  await fetchTeachers();
}

async function openEditTeacherModal(idEncoded) {
  const id = decodeURIComponent(idEncoded);
  const teacher = allTeachers.find(t => t.id === id);
  if (!teacher) return alert("Teacher not found");

  const form = document.getElementById("editTeacherForm");

  const fieldMap = {
    editTeacherUuid: "id",             // hidden UUID
    teacherId: "teacher_id",
    fullName: "full_name",
    phone: "phone",
    email: "email",
    qualification: "qualification",
    subjectSpecialization: "subject_specialization",
    classTeacher: "class_teacher",
    yearsOfExperience: "years_of_experience",
    joiningDate: "joining_date"
  };

  Object.keys(fieldMap).forEach(formField => {
    if (form[formField]) {
      form[formField].value = teacher[fieldMap[formField]] ?? "";
    }
  });

  document.getElementById("editTeacherModal").classList.remove("hidden");

  // Cancel button
  const cancelBtn = document.getElementById("closeTeacherModal");
  if (cancelBtn) cancelBtn.onclick = () => {
    document.getElementById("editTeacherModal").classList.add("hidden");
  };
}
/* =======================
   SUBJECTS
======================= */
let allSubjects = [];

// Fetch subjects for a selected class
async function fetchSubjects(className) {
  if (!className) return;

  const { data, error } = await supabaseClient
    .from("subjects")
    .select("*")
    .eq("class", className)
    .order("name", { ascending: true });

  if (error) return console.error(error);

  allSubjects = data;
  displayRegisteredSubjects();
}

// Display subjects in the registeredSubjects div
function displayRegisteredSubjects() {
  const container = document.getElementById("registeredSubjects");
  container.innerHTML = "";

  allSubjects.forEach(subj => {
    const div = document.createElement("div");
    div.className = "flex items-center justify-between mb-2 border p-2 rounded";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = subj.name; // Only show subject name

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
    deleteBtn.onclick = async () => {
      if (!confirm("Delete this subject?")) return;

      const { error } = await supabaseClient
        .from("subjects")
        .delete()
        .eq("id", subj.id);

      if (error) return alert(error.message);
      fetchSubjects(document.getElementById("subjectClass").value); // refresh list
    };

    div.appendChild(nameSpan);
    div.appendChild(deleteBtn);
    container.appendChild(div);
  });
}

// Add subjects
document.getElementById("subjectForm").addEventListener("submit", async e => {
  e.preventDefault();
  const className = document.getElementById("subjectClass").value;
  if (!className) return alert("Select a class.");

  const inputs = document.querySelectorAll(".subject-input");
  const subjectsToAdd = Array.from(inputs)
    .map(input => input.value.trim())
    .filter(name => name);

  if (!subjectsToAdd.length) return alert("Enter at least one subject.");

  try {
    for (const name of subjectsToAdd) {
      await supabaseClient.from("subjects").insert({ name, class: className });
    }
    alert("Subjects added successfully!");
    fetchSubjects(className);
    e.target.reset();
  } catch (err) {
    console.error(err);
    alert("Failed to add subjects.");
  }
});

// Update subjects display when class changes
document.getElementById("subjectClass").addEventListener("change", e => {
  fetchSubjects(e.target.value);
});

/* =======================
   TRANSFER
======================= */
async function doTransferStudent(studentId, newClass) {
  const { error } = await supabaseClient
    .from("students")
    .update({ student_class: newClass })
    .eq("id", studentId); // UUID field in your DB

  if (error) throw error;
}

// DOM elements
const transferClassSelect = document.getElementById("transferClass");
const transferStudentSelect = document.getElementById("transferStudent");
const newClassSelect = document.getElementById("newClass");
const transferForm = document.getElementById("transferForm");

// Load students when a class is selected
transferClassSelect.addEventListener("change", () => {
  const selectedClass = transferClassSelect.value;

  // Clear existing options
  transferStudentSelect.innerHTML = `<option value="">--Select Student--</option>`;

  if (!selectedClass) return;

  // Filter students in that class
  const studentsInClass = allStudents.filter(
    s => s.student_class === selectedClass
  );

  if (studentsInClass.length === 0) {
    alert("No students in this class yet!");
    return;
  }

  // Populate dropdown
  studentsInClass.forEach(student => {
    const option = document.createElement("option");
    option.value = student.id; // UUID for transfer
    option.textContent = `${student.full_name} (${student.student_id})`;
    transferStudentSelect.appendChild(option);
  });
});

// Handle form submission
transferForm.addEventListener("submit", async e => {
  e.preventDefault();

  const studentId = transferStudentSelect.value;
  const newClass = newClassSelect.value;

  if (!studentId || !newClass) {
    return alert("Select a student and a new class");
  }

  try {
    await doTransferStudent(studentId, newClass);
    alert("Student transferred successfully!");

    // Refresh the dropdown for the selected class
    transferClassSelect.dispatchEvent(new Event("change"));
  } catch (err) {
    console.error(err);
    alert("Failed to transfer student: " + err.message);
  }
});


/* =======================
   RESULTS SECTION
======================= */
const resultClassSelect = document.getElementById("resultClass");
const resultStudentSelect = document.getElementById("resultStudent");
const resultSubjectsContainer = document.getElementById("resultSubjects");
const resultForm = document.getElementById("resultForm");

/* ===============================
   GRADE CALCULATION
================================ */
 function calculateGrade(total) {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 45) return "D";
  return "F";
} 

/* ===============================
   LOAD SUBJECTS BY CLASS
================================ */
async function loadSubjectsByClass(className) {
  try {
    const { data, error } = await supabaseClient
      .from("subjects")
      .select("*")
      .eq("class", className)
      .order("name");

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error(err);
    alert("Failed to load subjects: " + err.message);
    return [];
  }
}

/* ===============================
   LOAD STUDENTS BY CLASS
================================ */
async function loadStudentsByClass(className) {
  try {
    const { data: students, error } = await supabaseClient
      .from("students")
      .select("*")
      .eq("student_class", className)
      .order("full_name");

    if (error) throw error;

    // Always return an array, even if empty
    return students || [];
  } catch (err) {
    console.error(err);
    alert("Failed to load students: " + err.message);
    return [];
  }
}

/* ===============================
   RENDER SUBJECT INPUTS
================================ */
function renderSubjectInputs(subjects) {
  resultSubjectsContainer.innerHTML = "";

  subjects.forEach(subj => {
    const row = document.createElement("div");

    // Add class and dataset attribute
    row.classList.add("subject-row");
    row.dataset.subjectId = subj.id;

    row.className +=
      " border p-3 rounded-xl mb-4 grid grid-cols-1 gap-3 sm:grid-cols-8 sm:items-center";

    row.innerHTML = `
      <div class="font-semibold sm:col-span-3">${subj.name}</div>

      <div><input type="number" name="test1_${subj.id}" placeholder="Test (20)" class="subject-input border p-2 rounded-xl w-full sm:w-20"></div>
      <div><input type="number" name="test2_${subj.id}" placeholder="Test (20)" class="subject-input border p-2 rounded-xl w-full sm:w-20"></div>
      <div><input type="number" name="exam_${subj.id}" placeholder="Exam (60)" class="subject-input border p-2 rounded-xl w-full sm:w-20"></div>

      <input type="hidden" name="total_${subj.id}" value="0">
      <input type="hidden" name="grade_${subj.id}" value="F">
    `;

    resultSubjectsContainer.appendChild(row);

    // Auto grade updater
    ["test1", "test2", "exam"].forEach(type => {
      const input = row.querySelector(`[name="${type}_${subj.id}"]`);
      if (!input) return;

      input.addEventListener("input", () => {
        const t1 = parseInt(row.querySelector(`[name="test1_${subj.id}"]`)?.value) || 0;
        const t2 = parseInt(row.querySelector(`[name="test2_${subj.id}"]`)?.value) || 0;
        const exam = parseInt(row.querySelector(`[name="exam_${subj.id}"]`)?.value) || 0;

        const total = t1 + t2 + exam;
        const grade = calculateGrade(total);

        const totalField = row.querySelector(`[name="total_${subj.id}"]`);
        const gradeField = row.querySelector(`[name="grade_${subj.id}"]`);

        if (totalField) totalField.value = total;
        if (gradeField) gradeField.value = grade;
      });
    });
  });
}

/* ===============================
   CLASS CHANGE HANDLER
================================ */
resultClassSelect.addEventListener("change", async () => {
  const className = resultClassSelect.value;
  if (!className) return;

  // Reset student dropdown safely
  resultStudentSelect.innerHTML = '<option value="">--Select Student--</option>';

  // Load students (always returns an array)
  const students = await loadStudentsByClass(className);

  students.forEach(s => {
    const option = document.createElement("option");
    option.value = s.id;
    option.textContent = s.full_name;
    resultStudentSelect.appendChild(option);
  });

  // Load subjects for the class safely
  const subjects = await loadSubjectsByClass(className);
  renderSubjectInputs(subjects);
});

/* ===============================
   SUBMIT RESULTS FORM HANDLER
================================ */
resultForm.addEventListener("submit", async e => {
  e.preventDefault();

  const studentId = resultStudentSelect.value;
  const className = resultClassSelect.value;
  const term = document.getElementById("resultTerm")?.value;
  const session = document.getElementById("resultSession")?.value.trim();
  const gender = document.getElementById("studentGender")?.value;

  if (!studentId || !className || !term || !session || !gender) {
    return alert("Please select class, student, term, gender and enter academic session.");
  }

  const subjectRows = resultSubjectsContainer.querySelectorAll(".subject-row");
  if (!subjectRows.length) return alert("No subjects to save.");

  /* ---------- 1. Subject Results ---------- */
  const resultsArray = [];

  subjectRows.forEach(row => {
    const subjectId = row.dataset.subjectId;

    const test1 = parseInt(row.querySelector(`[name="test1_${subjectId}"]`)?.value) || 0;
    const test2 = parseInt(row.querySelector(`[name="test2_${subjectId}"]`)?.value) || 0;
    const exam  = parseInt(row.querySelector(`[name="exam_${subjectId}"]`)?.value) || 0;

    const total = test1 + test2 + exam;
    const grade = calculateGrade(total);

    resultsArray.push({
      subject_id: subjectId,
      subject_name: row.querySelector(".font-semibold")?.textContent || "Unknown",
      test1,
      test2,
      exam,
      total,
      grade
    });
  });

  /* ---------- 2. Psychomotor ---------- */
  const psychomotorData = {};
  document.querySelectorAll("#psychomotorBody tr").forEach(row => {
    const name = row.querySelector("td:first-child")?.textContent?.trim();
    if (!name) return;

    const selected = row.querySelector('input[type="radio"]:checked');
    psychomotorData[name.toLowerCase().replace(/\s+/g, "_")] =
      selected ? parseInt(selected.value) : null;
  });

  /* ---------- 3. Affective ---------- */
  const affectiveData = {};
  document.querySelectorAll("#affectiveBody tr").forEach(row => {
    const name = row.querySelector("td:first-child")?.textContent?.trim();
    if (!name) return;

    const selected = row.querySelector('input[type="radio"]:checked');
    affectiveData[name.toLowerCase().replace(/\s+/g, "_")] =
      selected ? parseInt(selected.value) : null;
  });

  /* ---------- 4. Attendance ---------- */
  const attendance = {
    days_opened: parseInt(document.getElementById("daysOpened")?.value) || 0,
    days_present: parseInt(document.getElementById("daysPresent")?.value) || 0,
    days_absent: parseInt(document.getElementById("daysAbsent")?.value) || 0
  };

  /* ---------- 5. Term Duration ---------- */
  const term_duration = {
    term_begins: document.getElementById("termBegins")?.value || null,
    term_ends: document.getElementById("termEnds")?.value || null,
    next_term_begins: document.getElementById("nextTermBegins")?.value || null
  };

  /* ---------- 6. Comments ---------- */
  const teacherComment = document.getElementById("teacherComment")?.value.trim() || "";
  const headmasterComment = document.getElementById("headmasterComment")?.value.trim() || "";

  /* ---------- 7. Payload ---------- */
  const payload = {
    student_id: studentId,
    class: className,
    term,
    session,
    gender,
    results: resultsArray,
    psychomotor_domain: psychomotorData,
    affective_domain: affectiveData,
    attendance,
    term_duration,
    teacher_comment: teacherComment,
    headmaster_comment: headmasterComment
  };

  /* ---------- 8. Save ---------- */
  try {
    const { error } = await supabaseClient
      .from("results")
      .insert(payload);

    if (error) throw error;

    alert("Results saved successfully!");
    resultForm.reset();
    resultSubjectsContainer.innerHTML = "";

    document
      .querySelectorAll('#psychomotorBody input[type="radio"], #affectiveBody input[type="radio"]')
      .forEach(r => r.checked = false);

  } catch (err) {
    console.error(err);
    alert("Failed to save results: " + err.message);
  }
});

/*========== MANAGE RESULTS SECTION (FULL CODE) ==========*/

const manageClassSelect = document.getElementById("manageResultClass");
const manageStudentContainer = document.getElementById("manageStudentContainer");
const editResultModal = document.getElementById("editResultModal");
const editResultForm = document.getElementById("editResultForm");
const editResultSubjects = document.getElementById("editResultSubjects");

let currentEditingResult = null;

// ---------- 1. Core Logic (Grading & Comments) ----------
function calculateGrade(total) {
  if (total >= 70) return "A1";
  if (total >= 65) return "B2";
  if (total >= 60) return "B3";
  if (total >= 55) return "C4";
  if (total >= 50) return "C5";
  if (total >= 45) return "D7";
  if (total >= 40) return "E8";
  return "F9";
}

function getComment(grade) {
  const map = { "A1": "Excellent", "B2": "V. Good", "B3": "V. Good", "C4": "Good", "C5": "Credit", "D7": "Pass", "E8": "Pass", "F9": "Poor" };
  return map[grade] || "Fair";
}

// ---------- 2. Fetch & Render List ----------
async function renderStudents(className) {
  if (!className) return;
  manageStudentContainer.innerHTML = "<div class='p-10 text-center text-gray-400 animate-pulse'>Fetching records...</div>";

  try {
    const { data, error } = await supabaseClient
      .from("results")
      .select(`*, students!inner (full_name, student_id)`)
      .eq("class", className);

    if (error) throw error;
    
    manageStudentContainer.innerHTML = "";
    if (!data.length) {
      manageStudentContainer.innerHTML = `<p class="p-4 text-gray-500 text-center w-full">No results found for this class.</p>`;
      return;
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "data-card border p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow";
      const studentName = item.students?.full_name || "Unknown";
      const studentPublicId = item.students?.student_id || item.student_id; 

      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4 border-b pb-3">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">${studentName.charAt(0)}</div>
          <div>
            <h4 class="font-bold text-gray-800 leading-tight">${studentName}</h4>
            <p class="text-xs text-gray-500">ID: ${studentPublicId}</p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button onclick="viewResultPreview('${item.student_id}')" class="bg-blue-50 text-blue-700 py-2 rounded-lg text-[10px] font-black uppercase">View</button>
          <button onclick="handleEditClick('${item.student_id}')" class="bg-gray-50 text-gray-700 py-2 rounded-lg text-[10px] font-black uppercase">Edit</button>
          <button onclick="deleteResult('${item.student_id}')" class="bg-red-50 text-red-600 py-2 rounded-lg text-[10px] font-black uppercase">Delete</button>
        </div>`;
      manageStudentContainer.appendChild(card);
    });
  } catch (err) {
    manageStudentContainer.innerHTML = `<p class="text-red-500 p-4 text-center">Connection Error.</p>`;
  }
}

// ---------- 3. View Report (New Tab) ----------
async function viewResultPreview(studentId) {
  try {
    // ---------- Fetch student result ----------
    const { data, error } = await supabaseClient
      .from("results")
      .select("*, students(full_name, student_id)")
      .eq("student_id", studentId);

    if (error || !data.length) return alert("Result record not found.");
    
    const row = data[0];
    const results = row.results || [];

    const numSubjects = results.length;
    const totalMarks = results.reduce((sum, s) => sum + ((s.test1 || 0) + (s.test2 || 0) + (s.exam || 0)), 0);
    const maxTotal = numSubjects * 100; // max marks
    const percentage = maxTotal ? ((totalMarks / maxTotal) * 100).toFixed(2) : 0;
    const overallGrade = calculateGrade(totalMarks);

    // ---------- Determine position ----------
    const { data: classData } = await supabaseClient
      .from("results")
      .select("student_id, results")
      .eq("class", row.class)
      .eq("term", row.term)
      .eq("session", row.session);

    let classTotals = [];
    if (classData && classData.length) {
      classTotals = classData.map(r => {
        const total = (r.results || []).reduce((sum, s) => sum + ((s.test1 || 0) + (s.test2 || 0) + (s.exam || 0)), 0);
        return { student_id: r.student_id, total };
      }).sort((a, b) => b.total - a.total);
    }
    
    const noInClass = classData && classData.length ? classData.length : 1;
    
    const position = classTotals.findIndex(c => c.student_id === studentId) + 1 || 1; // default 1 if not found
    
    function formatPosition(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

    // ---------- Subjects Table ----------
    const rowsHtml = results.map(s => {
      const total = (s.test1 || 0) + (s.test2 || 0) + (s.exam || 0);
      const grade = calculateGrade(total);
      return `
        <tr>
          <td class="px-2 py-1 border border-black text-left uppercase">${s.subject_name}</td>
          <td class="px-2 py-1 border border-black text-center">${s.test1 || 0}</td>
          <td class="px-2 py-1 border border-black text-center">${s.test2 || 0}</td>
          <td class="px-2 py-1 border border-black text-center">${s.exam || 0}</td>
          <td class="px-2 py-1 border border-black text-center bg-gray-100">${total}</td>
          <td class="px-2 py-1 border border-black text-center">${grade}</td>
          <td class="px-2 py-1 border border-black text-center italic">${getComment(grade)}</td>
        </tr>`;
    }).join("");

    // Summary Footer inside table
    const summaryRowHtml = `
  <tr class="bg-gray-200 font-bold">
    <!-- Subjects -->
    <td class="px-2 py-1 border border-black text-center">
      ${numSubjects} Subjects
    </td>
    
    <!-- T1 + T2 + Exam combined -->
<td colspan="3" class="px-2 py-1 border border-black font-bold">
  <div style="display:flex; justify-content:center; align-items:center; width:100%;">
    ${totalMarks}
  </div>
</td>

    <!-- Total / Percentage -->
    <td class="px-2 py-1 border border-black text-center font-bold">
      ${percentage}%
    </td>

    <!-- Grade -->
    <td class="px-2 py-1 border border-black text-center font-bold">
      ${overallGrade}
    </td>

    <!-- Comment -->
    <td class="px-2 py-1 border border-black text-center italic">
      ${getComment(overallGrade)}
    </td>
  </tr>
`;

    // ---------- Psychomotor ----------
    const psychomotor = row.psychomotor_domain || {};
    const psychomotorHtml = Object.entries(psychomotor).map(([activity, score]) => {
      const cols = [100, 85, 75, 65, 55].map(val => `<td class="px-2 py-1 border border-black text-center">${score === val ? "✔" : ""}</td>`).join("");
      return `<tr>
        <td class="px-2 py-1 border border-black font-bold text-left">${formatName(activity)}</td>
        ${cols}
      </tr>`;
    }).join("");

    // ---------- Affective ----------
    const affective = row.affective_domain || {};
    const affectiveHtml = Object.entries(affective).map(([trait, score]) => {
      const cols = [100, 85, 75, 65, 55].map(val => `<td class="px-2 py-1 border border-black text-center">${score === val ? "✔" : ""}</td>`).join("");
      return `<tr>
        <td class="px-2 py-1 border border-black font-bold text-left">${formatName(trait)}</td>
        ${cols}
      </tr>`;
    }).join("");

    // ---------- Comments ----------
    const teacherComment = row.teacher_comment || "N/A";
    const headmasterComment = row.headmaster_comment || "N/A";

    function formatName(str) {
      return str.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // ---------- Attendance ----------
const attendance = row.attendance || {};
const daysOpened = attendance.days_opened ?? "-";
const daysPresent = attendance.days_present ?? "-";
const daysAbsent = attendance.days_absent ?? "-";

// ---------- Term Duration ----------
const termDuration = row.term_duration || {};
const termBegins = termDuration.term_begins || "N/A";
const termEnds = termDuration.term_ends || "N/A";
const nextTermBegins = termDuration.next_term_begins || "N/A";
    
    // ---------- Full HTML ----------
    const reportHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Report - ${row.students?.full_name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');
    
    body { 
      font-family: 'Source Sans Pro', sans-serif; 
      background: #f4f4f4; 
      margin: 0;
      padding: 10px;
      color: #000;
    }

    .report-card { 
      background: white;
      width: 210mm;
      min-height: 297mm;
      margin: auto; 
      padding: 12mm; 
      box-sizing: border-box;
      border: 1px solid #ccc;
    }

    /* Header Section with Logo placeholder */
    .header-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      position: relative;
    }
    .logo {
  position: absolute;
  left: 0;
  width: 80px;
  height: 80px;
  border: 1px dashed #ccc; /* Placeholder for school logo */
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

    .header-text { text-align: center; }
    .school-name { font-size: 26px; font-weight: 800; margin: 0; }
    .motto { font-size: 12px; font-weight: bold; font-style: italic; margin: 2px 0; }
    .address { font-size: 11px; margin: 0; width: 100%; }
    
    .report-banner { 
      border: 2px solid #000;
      border-left: none; border-right: none;
      padding: 6px; 
      font-weight: bold; 
      font-size: 13px; 
      margin: 15px 0;
      text-align: center;
      text-transform: uppercase;
    }

    /* Student Info Grid - Matching the image's 2-column structure */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
      margin-bottom: 15px;
    }
    .info-item {
      display: flex;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
    }
    .label {
      width: 120px;
      padding: 4px 8px;
      font-weight: bold;
      font-size: 11px;
      border-right: 1px solid #000;
      text-transform: uppercase;
    }
    .value {
      padding: 4px 8px;
      font-size: 11px;
      flex-grow: 1;
    }

    /* Tables */
    table { width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 15px; }
    th, td { border: 1px solid #000; padding: 4px; }
    th { text-transform: uppercase; }
    .sub-head { font-size: 9px; }

    .columns { display: flex; gap: 15px; }
    .left-col { flex: 2.2; }
    .right-col { flex: 1; }

    .section-title { 
      font-size: 11px; font-weight: bold; text-align: center; 
      padding: 4px; border: 1px solid #000; border-bottom: none;
      text-transform: uppercase;
    }

    .comment-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border: 1px solid #000;
      margin-top: -1px;
    }
    .comment-box {
      padding: 8px;
      border-right: 1px solid #000;
      font-size: 10px;
      min-height: 60px;
    }
    .comment-box:last-child { border-right: none; }
    
    .signature-area {
      border: 1px solid #000;
      border-top: none;
      padding: 10px;
      text-align: center;
      font-size: 11px;
    }

    @media print {
      body { background: white; padding: 0; }
      .report-card { border: none; width: 100%; }
      .no-print { display: none; }
      @page { size: A4; margin: 10mm; }
    }
    .no-print { text-align: center; padding: 20px; }
    button { padding: 10px 20px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>

  <div class="no-print">
    <button onclick="window.print()">PRINT REPORT CARD</button>
  </div>

  <div class="report-card">
    <div class="header-container">
    <div class="logo">
          <img src="https://raw.githubusercontent.com/online-school-portal/BPS/8714bf2fac15d55f8c8b781b5a5d163cc6cde776/logo.jpg" alt="School Logo"></div>
      <div class="header-text">
        <h1 class="school-name">BELIEVER'S PRAISE CHRISTIAN SCHOOL</h1>
        <div class="motto">MOTTO: GOD FIRST</div>
        <p class="address">7 URHOBOGHARA STREET, AGBARHO DELTA STATE</p>
        <p class="address" style="font-weight: bold;">TEL: 07034644748, 09070904998</p>
      </div>
    </div>

    <div class="report-banner">CONTINUOUS ASSESSMENT REPORT</div>
    
    
    <div class="info-grid">
  <div class="info-item">
    <div class="label">Name</div>
    <div class="value">${row.students?.full_name}</div>
  </div>

  <div class="info-item">
    <div class="label">Student ID</div>
    <div class="value">${row.students?.student_id || row.student_id}</div>
  </div>

  <div class="info-item">
    <div class="label">Class</div>
    <div class="value">${row.class}</div>
  </div>

  <div class="info-item">
    <div class="label">Gender</div>
    <div class="value">${row.gender || "N/A"}</div>
  </div>

  <div class="info-item">
    <div class="label">Term</div>
    <div class="value">${row.students?.current_term || row.term}</div>
  </div>

  <div class="info-item">
    <div class="label">Academic Session</div>
    <div class="value">${row.students?.session || row.session || "N/A"}</div>
  </div>

  <div class="info-item">
    <div class="label">No. in Class</div>
    <div class="value">${classTotals.length}</div>
  </div>

  <div class="info-item">
    <div class="label">Position</div>
    <div class="value">${formatPosition(position)}</div>
  </div>
</div>
    
    <div style="display: flex; gap: 15px;">
      <div style="flex: 1;">
        <div class="section-title">Attendance</div>
        <table>
          <thead><tr><th>Days Opened</th><th>Days Present</th><th>Days Absent</th></tr></thead>
          <tbody style="text-align:center;"><tr><td>${daysOpened}</td><td>${daysPresent}</td><td>${daysAbsent}</td></tr></tbody>
        </table>
      </div>
      <div style="flex: 1;">
        <div class="section-title">Terminal Duration</div>
        <table>
          <thead><tr><th>Term Begins</th><th>Term Ends</th><th>Next Term</th></tr></thead>
          <tbody style="text-align:center;"><tr><td>${termBegins}</td><td>${termEnds}</td><td>${nextTermBegins}</td></tr></tbody>
        </table>
      </div>
    </div>

    <div class="columns">
      <div class="left-col">
        <div class="section-title">Academic Progress Summaries (Cognitive)</div>
        <table>
          <thead>
            <tr>
              <th rowspan="2" style="text-align:left;">Subjects</th>
              <th colspan="2">Test Scores</th>
              <th>Exam</th>
              <th>Total</th>
              <th rowspan="2">Grade</th>
              <th rowspan="2">Comments</th>
            </tr>
            <tr class="sub-head">
              <th>20%</th><th>20%</th><th>60%</th><th>100%</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
            ${summaryRowHtml}
          </tbody>
        </table>

        <div class="comment-section">
          <div class="comment-box">
            <strong>TEACHER'S COMMENT:</strong><br>${teacherComment || "..."}
          </div>
          <div class="comment-box">
            <strong>HEADMASTER'S COMMENT:</strong><br>${headmasterComment || "..."}
          </div>
        </div>
        <div class="signature-area">
          <strong>HEADMASTER'S SIGNATURE:</strong> _________________________________
        </div>
      </div>
      
      <div class="right-col">
  <div class="section-title">Affective Domain</div>
  <table>
    <thead>
      <tr>
        <th style="text-align:left;">Behaviour</th>
        <th>100</th>
        <th>85</th>
        <th>75</th>
        <th>65</th>
        <th>55</th>
      </tr>
    </thead>
    <tbody>
      ${affectiveHtml || "<tr><td colspan='6' class='text-center'>No data</td></tr>"}
    </tbody>
  </table>

  <div class="section-title">Psychomotor Domain</div>
  <table>
    <thead>
      <tr>
        <th style="text-align:left;">Activities</th>
        <th>100</th>
        <th>85</th>
        <th>75</th>
        <th>65</th>
        <th>55</th>
      </tr>
    </thead>
    <tbody>
      ${psychomotorHtml || "<tr><td colspan='6' class='text-center'>No data</td></tr>"}
    </tbody>
  </table>
</div>
    </div>
  </div>
</body>
</html>
`;
    
    const newWindow = window.open("", "_blank");
    newWindow.document.write(reportHtml);
    newWindow.document.close();

  } catch (err) {
    console.error(err);
    alert("Error loading report.");
  }
}

// ---------- 4. Edit Modal Logic ----------
async function handleEditClick(studentId) {
  try {
    // ---------- FETCH SINGLE STUDENT RESULT ----------
    const { data, error } = await supabaseClient
      .from("results")
      .select("*, students(full_name, student_id, sex)")
      .eq("student_id", studentId)
      .single(); // ensures a single object is returned

    if (error || !data) return alert("Result not found.");
    currentEditingResult = data;

    // ---------- NORMALIZE JSON FIELDS ----------
    const subjects = Array.isArray(data.results)
      ? data.results
      : JSON.parse(data.results || "[]");

    const psychomotor = typeof data.psychomotor_domain === "string"
      ? JSON.parse(data.psychomotor_domain)
      : data.psychomotor_domain || {};

    const affective = typeof data.affective_domain === "string"
      ? JSON.parse(data.affective_domain)
      : data.affective_domain || {};

    const attendance = typeof data.attendance === "string"
      ? JSON.parse(data.attendance)
      : data.attendance || {};

    const termDuration = typeof data.term_duration === "string"
      ? JSON.parse(data.term_duration)
      : data.term_duration || {};

    // ---------- 1. Subjects ----------
    const subjectFieldsHtml = subjects.map((s, i) => `
      <div class="p-3 border rounded-xl bg-gray-50 mb-3 subject-row" data-subject-id="${s.subject_id ?? i}">
        <label class="block text-[10px] font-black uppercase text-gray-500 mb-2">${s.subject_name ?? "Subject"}</label>
        <div class="grid grid-cols-3 gap-3">
          <input type="number" name="test1_${s.subject_id ?? i}" value="${s.test1 ?? 0}" class="border p-2 text-center rounded-lg font-bold" placeholder="T1">
          <input type="number" name="test2_${s.subject_id ?? i}" value="${s.test2 ?? 0}" class="border p-2 text-center rounded-lg font-bold" placeholder="T2">
          <input type="number" name="exam_${s.subject_id ?? i}" value="${s.exam ?? 0}" class="border p-2 text-center rounded-lg font-bold bg-white border-blue-200" placeholder="Exam">
        </div>
      </div>
    `).join("") || "<p class='text-xs text-gray-400'>No subjects found</p>";

    // ---------- 2. Psychomotor ----------
    const psychomotorHtml = Object.entries(psychomotor).map(([skill, val]) => `
      <div class="flex items-center gap-3 mb-2">
        <label class="flex-1 text-[10px] font-bold uppercase">${skill.replace(/_/g, " ")}</label>
        <input type="number" name="psych_${skill}" value="${val ?? ""}" class="w-16 text-center border rounded-lg p-1">
      </div>
    `).join("") || "<p class='text-xs text-gray-400'>No data</p>";

    // ---------- 3. Affective ----------
    const affectiveHtml = Object.entries(affective).map(([trait, val]) => `
      <div class="flex items-center gap-3 mb-2">
        <label class="flex-1 text-[10px] font-bold uppercase">${trait.replace(/_/g, " ")}</label>
        <input type="number" name="affective_${trait}" value="${val ?? ""}" class="w-16 text-center border rounded-lg p-1">
      </div>
    `).join("") || "<p class='text-xs text-gray-400'>No data</p>";

    // ---------- 4. Attendance ----------
    const attendanceHtml = `
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label class="text-[10px] font-bold uppercase">Days Opened</label>
          <input type="number" name="attendance_days_opened" value="${attendance.days_opened ?? ""}" class="border p-1 w-full">
        </div>
        <div>
          <label class="text-[10px] font-bold uppercase">Days Present</label>
          <input type="number" name="attendance_days_present" value="${attendance.days_present ?? ""}" class="border p-1 w-full">
        </div>
        <div>
          <label class="text-[10px] font-bold uppercase">Days Absent</label>
          <input type="number" name="attendance_days_absent" value="${attendance.days_absent ?? ""}" class="border p-1 w-full">
        </div>
      </div>
    `;

    // ---------- 5. Term Duration ----------
    const termDurationHtml = `
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label class="text-[10px] font-bold uppercase">Term Begins</label>
          <input type="date" name="term_begins" value="${termDuration.term_begins ?? ""}" class="border p-1 w-full">
        </div>
        <div>
          <label class="text-[10px] font-bold uppercase">Term Ends</label>
          <input type="date" name="term_ends" value="${termDuration.term_ends ?? ""}" class="border p-1 w-full">
        </div>
        <div>
          <label class="text-[10px] font-bold uppercase">Next Term Begins</label>
          <input type="date" name="next_term_begins" value="${termDuration.next_term_begins ?? ""}" class="border p-1 w-full">
        </div>
      </div>
    `;

    // ---------- 6. Comments ----------
    const commentsHtml = `
      <div class="p-3 border rounded-xl bg-gray-50 mb-3">
        <label class="block text-[10px] font-black uppercase text-gray-500 mb-2">Teacher Comment</label>
        <textarea name="teacher_comment" class="w-full border p-2 rounded-lg" rows="3">${data.teacher_comment ?? ""}</textarea>
      </div>
      <div class="p-3 border rounded-xl bg-gray-50 mb-3">
        <label class="block text-[10px] font-black uppercase text-gray-500 mb-2">Headmaster Comment</label>
        <textarea name="headmaster_comment" class="w-full border p-2 rounded-lg" rows="3">${data.headmaster_comment ?? ""}</textarea>
      </div>
    `;

    // ---------- 7. Render everything ----------
    editResultSubjects.innerHTML = `
      <div class="mb-6 text-center border-b pb-4">
        <h3 class="font-black text-blue-600">${data.students?.full_name}</h3>
        <p class="text-xs text-gray-400 font-bold">ID: ${data.students?.student_id}</p>
        <p class="text-xs text-gray-400 font-bold">Gender: <input type="text" name="gender" value="${data.gender ?? ""}" class="border p-1 w-24 text-center"></p>
        <p class="text-xs text-gray-400 font-bold">Term: <input type="text" name="term" value="${data.term ?? ""}" class="border p-1 w-24 text-center"></p>
        <p class="text-xs text-gray-400 font-bold">Session: <input type="text" name="session" value="${data.session ?? ""}" class="border p-1 w-24 text-center"></p>
      </div>

      ${subjectFieldsHtml}

      <h3 class="mt-4 font-bold">Psychomotor Domain</h3>
      ${psychomotorHtml}

      <h3 class="mt-4 font-bold">Affective Domain</h3>
      ${affectiveHtml}

      <h3 class="mt-4 font-bold">Attendance</h3>
      ${attendanceHtml}

      <h3 class="mt-4 font-bold">Term Duration</h3>
      ${termDurationHtml}

      ${commentsHtml}

      <div class="mt-8 flex gap-3">
        <button type="submit" class="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black">SAVE CHANGES</button>
        <button type="button" onclick="closeModal()" class="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black">CANCEL</button>
      </div>
    `;

    // show modal
    editResultModal.classList.remove("hidden");

  } catch (err) {
    console.error(err);
    alert("Fetch error.");
  }
}


// ---------- 5. Update & Delete ----------
editResultForm.onsubmit = async (e) => {
  e.preventDefault();
  if (!currentEditingResult) return;

  try {
    // ---------- 1. Update subject results ----------
    const updatedResults = currentEditingResult.results.map((s, i) => {
      const t1 = parseInt(editResultForm[`t1_${i}`]?.value) || 0;
      const t2 = parseInt(editResultForm[`t2_${i}`]?.value) || 0;
      const ex = parseInt(editResultForm[`ex_${i}`]?.value) || 0;
      const total = t1 + t2 + ex;
      return {
        subject_id: s.subject_id || i,
        subject_name: s.subject_name,
        test1: t1,
        test2: t2,
        exam: ex,
        total,
        grade: calculateGrade(total)
      };
    });


    // ---------- 2. Update psychomotor ----------
    const psychomotorData = {};
    Object.keys(currentEditingResult.psychomotor_domain || {}).forEach(key => {
      psychomotorData[key] = parseInt(editResultForm[`psych_${key}`]?.value) || 0;
    });

    // ---------- 3. Update affective ----------
    const affectiveData = {};
    Object.keys(currentEditingResult.affective_domain || {}).forEach(key => {
      affectiveData[key] = parseInt(editResultForm[`affective_${key}`]?.value) || 0;
    });

    // ---------- 4. Update comments ----------
    const teacherComment = editResultForm["teacher_comment"]?.value.trim() || "";
    const headmasterComment = editResultForm["headmaster_comment"]?.value.trim() || "";

    // ---------- 5. Update gender, term, session ----------
    const gender = editResultForm["gender"]?.value || "";
    const term = editResultForm["term"]?.value || "";
    const session = editResultForm["session"]?.value || "";

    // ---------- 6. Update attendance ----------
    const attendance = {
      days_opened: parseInt(editResultForm["attendance_days_opened"]?.value) || 0,
      days_present: parseInt(editResultForm["attendance_days_present"]?.value) || 0,
      days_absent: parseInt(editResultForm["attendance_days_absent"]?.value) || 0
    };

    // ---------- 7. Update term duration ----------
    const termDuration = {
      term_begins: editResultForm["term_begins"]?.value || "",
      term_ends: editResultForm["term_ends"]?.value || "",
      next_term_begins: editResultForm["next_term_begins"]?.value || ""
    };

    // ---------- 8. Build payload ----------
    const payload = {
      results: updatedResults,
      psychomotor_domain: psychomotorData,
      affective_domain: affectiveData,
      teacher_comment: teacherComment,
      headmaster_comment: headmasterComment,
      gender,
      term,
      session,
      attendance,
      term_duration: termDuration
    };

    // ---------- 9. Submit update ----------
    const { error } = await supabaseClient
      .from("results")
      .update(payload)
      .eq("student_id", currentEditingResult.student_id);

    if (error) throw error;

    alert("Saved Successfully!");
    closeModal();
    renderStudents(manageClassSelect.value);

  } catch (err) {
    console.error(err);
    alert("Failed to save changes: " + err.message);
  }
};

// ---------- Delete Result ----------
async function deleteResult(studentId) {
  if (!confirm("Delete this result permanently?")) return;
  const { error } = await supabaseClient
    .from("results")
    .delete()
    .eq("student_id", studentId);
    
  if (!error) renderStudents(manageClassSelect.value);
}

// ---------- Close Modal ----------
function closeModal() {
  editResultModal.classList.add("hidden");
  editResultSubjects.innerHTML = "";
  currentEditingResult = null;
}

// ---------- 6. Init ----------
if (manageClassSelect) {
  manageClassSelect.addEventListener("change", (e) => renderStudents(e.target.value));
}

/* =======================
   REALTIME (v2)
======================= */

supabaseClient
  .channel("students-live")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "students" },
    () => fetchStudents()
  )
  .subscribe();

/* =======================
   FORM SUBMISSIONS
======================= */
// Register student
document.getElementById("registrationForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;

  const payload = {
    student_id: form.studentId.value,
    full_name: form.fullName.value,
    sex: form.sex.value || null,
    date_of_birth: form.dateOfBirth.value || null,
    nationality: form.nationality.value || null,
    state_of_origin: form.stateOfOrigin.value || null,
    lga: form.lga.value || null,
    student_address: form.studentAddress.value || null,
    parent_name: form.parentName.value || null,
    parent_phone: form.parentPhone.value || null,
    parent_email: form.parentEmail.value || null,
    guardian_name: form.guardianName.value || null,
    guardian_phone: form.guardianPhone.value || null,
    guardian_email: form.guardianEmail.value || null,
    student_class: form.studentClass.value || null,
    admission_class: form.admissionClass.value || null,
    // You can also save sibling info if your DB has columns for it
    sibling_name: form.siblingName ? form.siblingName.value : null,
    sibling_class: form.siblingClass ? form.siblingClass.value : null,
    sibling_sex: form.siblingGender ? form.siblingGender.value : null
  };

  try {
    const { data, error } = await supabaseClient
      .from("students")
      .insert(payload);

    if (error) throw error;

    alert("Student registered successfully!");
    form.reset();
    fetchStudents(); // refresh the list
    showSection("register");
  } catch (err) {
    console.error(err);
    alert("Failed to register student: " + err.message);
  }
});

// Add teacher
document.getElementById("editTeacherForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  
  const uuid = form.editTeacherUuid.value; // this is Supabase row UUID
  const payload = {
    teacher_id: form.teacherId.value,
    full_name: form.fullName.value,
    phone: form.phone.value,
    email: form.email.value,
    qualification: form.qualification.value,
    subject_specialization: form.subjectSpecialization.value,
    class_teacher: form.classTeacher.value,
    years_of_experience: parseInt(form.yearsOfExperience.value) || null,
    joining_date: form.joiningDate.value
  };

  if (!uuid) return alert("Missing teacher ID for update");

  try {
    await updateTeacher(uuid, payload);
    alert("Teacher updated successfully!");
    document.getElementById("editTeacherModal").classList.add("hidden");
    await fetchTeachers();
  } catch (err) {
    console.error(err);
    alert("Failed to update teacher");
  }
});

document.getElementById("teacherForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;

  const payload = {
    teacher_id: form.teacherId.value,
    full_name: form.fullName.value,
    phone: form.phone.value,
    email: form.email.value || null,
    qualification: form.qualification.value || null,
    subject_specialization: form.subjectSpecialization.value,
    class_teacher: form.classTeacher.value || null,
    years_of_experience: parseInt(form.yearsOfExperience.value) || null,
    joining_date: form.joiningDate.value || null
  };

  try {
    await addTeacher(payload);
    alert("Teacher added successfully!");
    form.reset();
    await fetchTeachers();
  } catch (err) {
    console.error(err);
    alert("Failed to add teacher");
  }
});

/* =======================
   INITIAL FETCH
======================= */
document.addEventListener("DOMContentLoaded", () => {
  fetchStudents();
  fetchTeachers();
});

