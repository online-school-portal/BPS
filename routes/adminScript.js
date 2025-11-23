

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    function showSection(id){
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }

    const API_URL = "https://bps-qgmn.onrender.com";
    let allStudents = [];
    let allTeachers = [];

    async function fetchStudents() {
      try {
        const res = await fetch(`${API_URL}/api/admin/students`);
        allStudents = await res.json();
        renderStudents(allStudents);
        populateResultDropdowns();
        populateTransferDropdown();
      } catch(err){ console.error(err); }
    }

    async function fetchTeachers() {
      try {
        const res = await fetch(`${API_URL}/api/teachers`);
        allTeachers = await res.json();
        renderTeachers(allTeachers);
        populateResultDropdowns();
      } catch(err){ console.error(err); }
    }

    function renderStudents(list){
      const tbody = document.getElementById('studentsBody');
      tbody.innerHTML = '';
      list.forEach(std => {
        tbody.innerHTML += `
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">${std.studentId}</td>
            <td style="padding:10px;border:1px solid #ddd;">${std.fullName}</td>
            <td style="padding:10px;border:1px solid #ddd;">${std.studentClass || '-'}</td>
            <td style="padding:10px;border:1px solid #ddd;">
              <button class="action-btn" onclick='editStudent("${JSON.stringify(std)}")'>Edit</button>
              <button class="action-btn delete-btn" onclick='deleteStudent("${std.studentId}")'>Delete</button>
            </td>
          </tr>
        `;
      });
    }

    function renderTeachers(list){
      const tbody = document.getElementById('teachersBody');
      tbody.innerHTML = '';
      list.forEach(t => {
        tbody.innerHTML += `
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">${t.teacherId || '-'}</td>
            <td style="padding:10px;border:1px solid #ddd;">${t.fullName}</td>
            <td style="padding:10px;border:1px solid #ddd;">${t.subjectSpecialization || '-'}</td>
            <td style="padding:10px;border:1px solid #ddd;">
              <button class="action-btn" onclick='editTeacher("${JSON.stringify(t)}")'>Edit</button>
              <button class="action-btn delete-btn" onclick='deleteTeacher("${t.teacherId}")'>Delete</button>
            </td>
          </tr>
        `;
      });
    }

    function filterStudentsByClass(){
      const selected = document.getElementById('studentClassFilter').value;
      if(selected === 'all') return renderStudents(allStudents);
      renderStudents(allStudents.filter(s => s.studentClass === selected));
    }

    function populateResultDropdowns() {
      const studentSelect = document.getElementById('resultStudent');
      const teacherSelect = document.getElementById('resultTeacher');
      if(!studentSelect || !teacherSelect) return;

      studentSelect.innerHTML = '<option value="">--Select Student--</option>';
      teacherSelect.innerHTML = '<option value="">--Select Teacher--</option>';

      allStudents.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.studentId;
        opt.textContent = `${s.fullName} (${s.studentId})`;
        studentSelect.appendChild(opt);
      });
      allTeachers.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.teacherId;
        opt.textContent = `${t.fullName} (${t.teacherId})`;
        teacherSelect.appendChild(opt);
      });
    }

    function populateTransferDropdown() {
      const transferSelect = document.getElementById('transferStudent');
      if(!transferSelect) return;
      transferSelect.innerHTML = '<option value="">--Select Student--</option>';
      allStudents.forEach(s=>{
        const opt = document.createElement('option');
        opt.value = s.studentId;
        opt.textContent = `${s.fullName} (${s.studentClass})`;
        transferSelect.appendChild(opt);
      });
    }

    // STUDENT FORM
    const registrationForm = document.getElementById('registrationForm');
    if(registrationForm){
      registrationForm.addEventListener('submit', async e=>{
        e.preventDefault();
        const form = e.target;
        const data = {
          fullName: form.fullName.value,
          studentId: form.studentId.value,
          dateOfBirth: form.dateOfBirth.value,
          nationality: form.nationality.value,
          parentName: form.parentName.value,
          parentPhone: form.parentPhone.value,
          guardianName: form.guardianName.value,
          guardianPhone: form.guardianPhone.value,
          lga: form.lga.value,
          studentClass: form.studentClass.value
        };
        try{
          const res = await fetch(`${API_URL}/api/admin/students`, {
            method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
          });
          const result = await res.json();
          if(result.success){ alert('Student registered!'); form.reset(); fetchStudents(); }
          else alert(result.message||'Failed to register student.');
        } catch(err){ console.error(err); alert('Failed to connect to server.'); }
      });
    }

    function editStudent(student){
      student = JSON.parse(student);
      showSection('register');
      const form = document.getElementById('registrationForm');
      form.fullName.value = student.fullName;
      form.studentId.value = student.studentId;
      form.dateOfBirth.value = student.dateOfBirth;
      form.nationality.value = student.nationality;
      form.parentName.value = student.parentName;
      form.parentPhone.value = student.parentPhone;
      form.guardianName.value = student.guardianName;
      form.guardianPhone.value = student.guardianPhone;
      form.lga.value = student.lga;
      form.studentClass.value = student.studentClass;

      form.onsubmit = async e=>{
        e.preventDefault();
        const data = {
          fullName: form.fullName.value,
          studentId: form.studentId.value,
          dateOfBirth: form.dateOfBirth.value,
          nationality: form.nationality.value,
          parentName: form.parentName.value,
          parentPhone: form.parentPhone.value,
          guardianName: form.guardianName.value,
          guardianPhone: form.guardianPhone.value,
          lga: form.lga.value,
          studentClass: form.studentClass.value
        };
        try {
          const res = await fetch(`${API_URL}/api/admin/students/${student.studentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          if(result.success){ 
            alert('Student updated!');
            form.reset(); 
            form.onsubmit = registrationForm.onsubmit; // restore default submit
            fetchStudents(); 
          } else alert(result.message || 'Failed to update student.');
        } catch(err){ console.error(err); alert('Failed to connect to server.'); }
      };
    }

    async function deleteStudent(studentId){
      if(!confirm('Are you sure you want to delete this student?')) return;
      try {
        const res = await fetch(`${API_URL}/api/admin/students/${studentId}`, { method:'DELETE' });
        const result = await res.json();
        if(result.success){ alert('Student deleted'); fetchStudents(); }
        else alert(result.message || 'Failed to delete student.');
      } catch(err){ console.error(err); alert('Failed to connect to server.'); }
    }

    // TEACHER FORM
    const teacherForm = document.getElementById('teacherForm');
    if(teacherForm){
      teacherForm.addEventListener('submit', async e=>{
        e.preventDefault();
        const form = e.target;
        const data = {
          fullName: form.fullName.value,
          phone: form.phone.value,
          email: form.email.value,
          qualification: form.qualification.value,
          subjectSpecialization: form.subjectSpecialization.value,
          classTeacher: form.classTeacher.value,
          yearsOfExperience: form.yearsOfExperience.value,
          joiningDate: form.joiningDate.value
        };
        try {
          const res = await fetch(`${API_URL}/api/teachers`, {
            method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
          });
          const result = await res.json();
          if(result.success){ alert('Teacher added'); form.reset(); fetchTeachers(); }
          else alert(result.message || 'Failed to add teacher.');
        } catch(err){ console.error(err); alert('Failed to connect to server.'); }
      });
    }

    function editTeacher(teacher){
      teacher = JSON.parse(teacher);
      showSection('addTeacher');
      const form = document.getElementById('teacherForm');
      form.fullName.value = teacher.fullName;
      form.phone.value = teacher.phone;
      form.email.value = teacher.email;
      form.qualification.value = teacher.qualification;
      form.subjectSpecialization.value = teacher.subjectSpecialization;
      form.classTeacher.value = teacher.classTeacher;
      form.yearsOfExperience.value = teacher.yearsOfExperience;
      form.joiningDate.value = teacher.joiningDate;

      form.onsubmit = async e=>{
        e.preventDefault();
        const data = {
          fullName: form.fullName.value,
          phone: form.phone.value,
          email: form.email.value,
          qualification: form.qualification.value,
          subjectSpecialization: form.subjectSpecialization.value,
          classTeacher: form.classTeacher.value,
          yearsOfExperience: form.yearsOfExperience.value,
          joiningDate: form.joiningDate.value
        };
        try{
          const res = await fetch(`${API_URL}/api/teachers/${teacher.teacherId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          if(result.success){
            alert('Teacher updated');
            form.reset();
            form.onsubmit = teacherForm.onsubmit;
            fetchTeachers();
          } else alert(result.message || 'Failed to update teacher.');
        } catch(err){ console.error(err); alert('Failed to connect to server.'); }
      };
    }

    async function deleteTeacher(teacherId){
      if(!confirm('Are you sure you want to delete this teacher?')) return;
      try{
        const res = await fetch(`${API_URL}/api/teachers/${teacherId}`, { method:'DELETE' });
        const result = await res.json();
        if(result.success){ alert('Teacher deleted'); fetchTeachers(); }
        else alert(result.message || 'Failed to delete teacher.');
      } catch(err){ console.error(err); alert('Failed to connect to server.'); }
    }

    // ADD RESULTS FORM
    const resultForm = document.getElementById('resultForm');
    if(resultForm){
      resultForm.addEventListener('submit', async e=>{
        e.preventDefault();
        const form = e.target;
        const data = {
          studentId: form.studentId.value,
          teacherId: form.teacherId.value,
          subject: form.subject.value,
          score: form.score.value,
          grade: form.grade.value
        };
        try{
          const res = await fetch(`${API_URL}/api/results`, {
            method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
          });
          const result = await res.json();
          if(result.success){ alert('Result added'); form.reset(); }
          else alert(result.message || 'Failed to add result.');
        } catch(err){ console.error(err); alert('Failed to connect to server.'); }
      });
    }

    // TRANSFER STUDENTS FORM
    const transferForm = document.getElementById('transferForm');
    if(transferForm){
      transferForm.addEventListener('submit', async e=>{
        e.preventDefault();
        const studentId = document.getElementById('transferStudent').value;
        const newClass = document.getElementById('newClass').value;
        if(!studentId || !newClass){ alert('Please select student and new class'); return; }
        try{
          const res = await fetch(`${API_URL}/api/admin/students/${studentId}/transfer`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ studentClass: newClass })
          });
          const result = await res.json();
          if(result.success){ alert('Student transferred'); fetchStudents(); transferForm.reset(); }
          else alert(result.message || 'Failed to transfer student.');
        } catch(err){ console.error(err); alert('Failed to connect to server.'); }
      });
    }

    // INITIAL FETCH
    fetchStudents();
    fetchTeachers();
    
    const editStudentModal = document.getElementById('editStudentModal');
const editStudentForm = document.getElementById('editStudentForm');
let currentEditingStudentId = null;

// Open modal and prefill
function editStudent(studentData){
  const student = JSON.parse(studentData);
  currentEditingStudentId = student.studentId;

  // Fill the form
  editStudentForm.fullName.value = student.fullName;
  editStudentForm.studentId.value = student.studentId;
  editStudentForm.dateOfBirth.value = student.dateOfBirth;
  editStudentForm.nationality.value = student.nationality;
  editStudentForm.parentName.value = student.parentName;
  editStudentForm.parentPhone.value = student.parentPhone;
  editStudentForm.guardianName.value = student.guardianName;
  editStudentForm.guardianPhone.value = student.guardianPhone;
  editStudentForm.lga.value = student.lga;
  editStudentForm.studentClass.value = student.studentClass;

  editStudentModal.classList.remove('hidden');
}

// Close modal
document.getElementById('closeStudentModal').addEventListener('click', ()=>{
  editStudentModal.classList.add('hidden');
});

// Submit changes
editStudentForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const form = e.target;
  const data = {
    fullName: form.fullName.value,
    studentId: form.studentId.value,
    dateOfBirth: form.dateOfBirth.value,
    nationality: form.nationality.value,
    parentName: form.parentName.value,
    parentPhone: form.parentPhone.value,
    guardianName: form.guardianName.value,
    guardianPhone: form.guardianPhone.value,
    lga: form.lga.value,
    studentClass: form.studentClass.value
  };

  try{
    const res = await fetch(`${API_URL}/api/admin/students/${currentEditingStudentId}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if(result.success){
      alert('Student updated!');
      editStudentModal.classList.add('hidden');
      fetchStudents();
    } else alert(result.message || 'Failed to update student.');
  } catch(err){
    console.error(err);
    alert('Failed to connect to server.');
  }
});


const editTeacherModal = document.getElementById('editTeacherModal');
const editTeacherForm = document.getElementById('editTeacherForm');
let currentEditingTeacherId = null;

// Open modal and prefill
function editTeacher(teacherData){
  const teacher = JSON.parse(teacherData);
  currentEditingTeacherId = teacher.teacherId;

  editTeacherForm.fullName.value = teacher.fullName;
  editTeacherForm.phone.value = teacher.phone;
  editTeacherForm.email.value = teacher.email;
  editTeacherForm.qualification.value = teacher.qualification;
  editTeacherForm.subjectSpecialization.value = teacher.subjectSpecialization;
  editTeacherForm.classTeacher.value = teacher.classTeacher;
  editTeacherForm.yearsOfExperience.value = teacher.yearsOfExperience;
  editTeacherForm.joiningDate.value = teacher.joiningDate;

  editTeacherModal.classList.remove('hidden');
}

// Close modal
document.getElementById('closeTeacherModal').addEventListener('click', ()=>{
  editTeacherModal.classList.add('hidden');
});

// Submit changes
editTeacherForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const form = e.target;
  const data = {
    fullName: form.fullName.value,
    phone: form.phone.value,
    email: form.email.value,
    qualification: form.qualification.value,
    subjectSpecialization: form.subjectSpecialization.value,
    classTeacher: form.classTeacher.value,
    yearsOfExperience: form.yearsOfExperience.value,
    joiningDate: form.joiningDate.value
  };

  try{
    const res = await fetch(`${API_URL}/api/teachers/${currentEditingTeacherId}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if(result.success){
      alert('Teacher updated!');
      editTeacherModal.classList.add('hidden');
      fetchTeachers();
    } else alert(result.message || 'Failed to update teacher.');
  } catch(err){
    console.error(err);
    alert('Failed to connect to server.');
  }
});
