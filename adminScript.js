
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

    lucide.createIcons();

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
   SAVE RESULTS
================================ */
resultForm.addEventListener("submit", async e => {
  e.preventDefault();

  const studentId = resultStudentSelect.value;
  const className = resultClassSelect.value;

  if (!studentId || !className) {
    return alert("Please select class and student.");
  }

  const subjectRows =
    resultSubjectsContainer.querySelectorAll(".subject-row");

  if (!subjectRows.length) {
    return alert("No subjects to save.");
  }

  const resultsArray = [];

  subjectRows.forEach(row => {
    const subjectId = row.dataset.subjectId;

    const test1 =
      parseInt(row.querySelector(`[name="test1_${subjectId}"]`)?.value) || 0;
    const test2 =
      parseInt(row.querySelector(`[name="test2_${subjectId}"]`)?.value) || 0;
    const exam =
      parseInt(row.querySelector(`[name="exam_${subjectId}"]`)?.value) || 0;

    const total = test1 + test2 + exam;
    const grade = calculateGrade(total);

    resultsArray.push({
      subject_id: subjectId,
      subject_name:
        row.querySelector(".font-semibold")?.textContent || "Unknown",
      test1,
      test2,
      exam,
      total,
      grade
    });
  });

  const payload = {
    student_id: studentId,
    class: className,
    results: resultsArray
  };

  try {
    const { error } = await supabaseClient
      .from("results")
      .insert(payload);

    if (error) throw error;

    alert("Results saved successfully!");
    resultForm.reset();
    resultSubjectsContainer.innerHTML = "";
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
    const { data, error } = await supabaseClient
      .from("results")
      .select("*, students(full_name, student_id)")
      .eq("student_id", studentId);

    if (error || !data.length) return alert("Result record not found.");
    const row = data[0];
    const results = row.results || [];
    
    let rowsHtml = results.map(s => {
      const total = (s.test1 || 0) + (s.test2 || 0) + (s.exam || 0);
      const grade = calculateGrade(total);
      return `
        <tr style="border-bottom: 1px solid black; font-size: 12px; font-weight: bold;">
          <td style="padding: 8px; border-right: 1px solid black; text-align: left; text-transform: uppercase;">${s.subject_name}</td>
          <td style="padding: 8px; border-right: 1px solid black; text-align: center;">${s.test1 || 0}</td>
          <td style="padding: 8px; border-right: 1px solid black; text-align: center;">${s.test2 || 0}</td>
          <td style="padding: 8px; border-right: 1px solid black; text-align: center;">${s.exam || 0}</td>
          <td style="padding: 8px; border-right: 1px solid black; text-align: center; background: #f9f9f9;">${total}</td>
          <td style="padding: 8px; border-right: 1px solid black; text-align: center;">${grade}</td>
          <td style="padding: 8px; text-align: center; font-style: italic;">${getComment(grade)}</td>
        </tr>`;
    }).join("");

    const reportHtml = `
      <html>
        <head>
          <title>Report - ${row.students?.full_name}</title>
          <style>
            body { font-family: serif; padding: 40px; color: black; line-height: 1.4; }
            .report-card { max-width: 800px; margin: auto; border: 4px double black; padding: 30px; }
            .header { text-align: center; border-bottom: 2px solid black; margin-bottom: 20px; padding-bottom: 10px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; text-transform: uppercase; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; border: 1px solid black; }
            th { background: #eee; text-transform: uppercase; font-size: 11px; padding: 10px; border: 1px solid black; }
            @media print { .no-print { display: none; } }
            button { padding: 10px 20px; background: #15803d; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="no-print" style="text-align:center; margin-bottom:20px;">
            <button onclick="window.print()">PRINT AS PDF</button>
            <button onclick="window.close()" style="background:#4b5563; margin-left:10px;">CLOSE</button>
          </div>
          <div class="report-card">
            <div class="header">
              <h1 style="margin:0;">BELIEVER'S PRAISE CHRISTIAN SCHOOL</h1>
              <p style="font-size:12px; font-weight:bold;">7 URHOBOGHARA STREET, AGBARHO DELTA STATE</p>
              <h2 style="text-decoration:underline; font-size:14px;">ACADEMIC PROGRESS REPORT</h2>
            </div>
            <div class="info-grid">
              <div><strong>Name:</strong> ${row.students?.full_name}</div>
              <div style="text-align:right;"><strong>ID:</strong> ${row.students?.student_id || row.student_id}</div>
              <div><strong>Class:</strong> ${row.class}</div>
              <div style="text-align:right;"><strong>Term:</strong> FIRST TERM</div>
            </div>
            <table>
              <thead><tr><th>Subjects</th><th>T1</th><th>T2</th><th>Exam</th><th>Total</th><th>Grade</th><th>Comment</th></tr></thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </div>
        </body>
      </html>`;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(reportHtml);
    newWindow.document.close();
  } catch (err) { alert("Error loading report."); }
}

// ---------- 4. Edit Modal Logic ----------
async function handleEditClick(studentId) {
  try {
    const { data, error } = await supabaseClient
      .from("results")
      .select("*, students(full_name, student_id)")
      .eq("student_id", studentId);
    
    if (error || !data.length) return alert("Not found.");
    currentEditingResult = data[0];
    editResultSubjects.innerHTML = "";
    
    const fieldsHtml = currentEditingResult.results.map((s, i) => `
      <div class="p-3 border rounded-xl bg-gray-50 mb-3">
        <label class="block text-[10px] font-black uppercase text-gray-500 mb-2">${s.subject_name}</label>
        <div class="grid grid-cols-3 gap-3">
          <input type="number" name="t1_${i}" value="${s.test1}" class="border p-2 text-center rounded-lg font-bold" placeholder="T1">
          <input type="number" name="t2_${i}" value="${s.test2}" class="border p-2 text-center rounded-lg font-bold" placeholder="T2">
          <input type="number" name="ex_${i}" value="${s.exam}" class="border p-2 text-center rounded-lg font-bold bg-white border-blue-200" placeholder="Exam">
        </div>
      </div>`).join("");

    editResultSubjects.innerHTML = `
      <div class="mb-6 text-center border-b pb-4">
        <h3 class="font-black text-blue-600">${currentEditingResult.students?.full_name}</h3>
        <p class="text-xs text-gray-400 font-bold">ID: ${currentEditingResult.students?.student_id}</p>
      </div>
      <div class="space-y-4 max-h-[55vh] overflow-y-auto pr-2">${fieldsHtml}</div>
      <div class="mt-8 flex gap-3">
        <button type="submit" class="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black">SAVE CHANGES</button>
        <button type="button" onclick="closeModal()" class="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black">CANCEL</button>
      </div>`;
    editResultModal.classList.remove("hidden");
  } catch (err) { alert("Fetch error."); }
}

// ---------- 5. Update & Delete ----------
editResultForm.onsubmit = async (e) => {
  e.preventDefault();
  if (!currentEditingResult) return;

  const updated = currentEditingResult.results.map((s, i) => {
    const t1 = parseInt(editResultForm[`t1_${i}`].value) || 0;
    const t2 = parseInt(editResultForm[`t2_${i}`].value) || 0;
    const ex = parseInt(editResultForm[`ex_${i}`].value) || 0;
    const total = t1 + t2 + ex;
    return { subject_name: s.subject_name, test1: t1, test2: t2, exam: ex, total: total, grade: calculateGrade(total) };
  });

  const { error } = await supabaseClient.from("results").update({ results: updated }).eq("student_id", currentEditingResult.student_id);

  if (!error) {
    alert("Saved Successfully!");
    closeModal();
    renderStudents(manageClassSelect.value);
  }
};

async function deleteResult(studentId) {
  if (!confirm("Delete this result permanently?")) return;
  const { error } = await supabaseClient.from("results").delete().eq("student_id", studentId);
  if (!error) renderStudents(manageClassSelect.value);
}

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
