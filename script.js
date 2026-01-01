let semesterCount = 0;
const gradePoints = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.4,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.4,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
};

// Theme management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
    }
}

function addSemester() {
    semesterCount++;
    const container = document.getElementById('semestersContainer');
    
    const semesterDiv = document.createElement('div');
    semesterDiv.className = 'semester-container';
    semesterDiv.id = `semester${semesterCount}`;
    
    semesterDiv.innerHTML = `
        <div class="semester-header">
            <h3>📚 Semester ${semesterCount}</h3>
            <button class="btn btn-danger" onclick="removeSemester(${semesterCount})">❌ Remove</button>
        </div>
        <div class="semester-content">
            <div class="subject-header">
                <div>Subject Name</div>
                <div>Grade</div>
                <div>Credits</div>
                <div>Action</div>
            </div>
            <div id="subjects${semesterCount}">
                <div class="subject-row">
                    <input type="text" placeholder="Enter subject name" class="subject-name">
                    <select class="subject-grade">
                        <option value="">Select Grade</option>
                        <option value="A">A (4.0)</option>
                        <option value="A-">A- (3.7)</option>
                        <option value="B+">B+ (3.4)</option>
                        <option value="B">B (3.0)</option>
                        <option value="B-">B- (2.7)</option>
                        <option value="C+">C+ (2.4)</option>
                        <option value="C">C (2.0)</option>
                        <option value="D">D (1.0)</option>
                        <option value="F">F (0.0)</option>
                    </select>
                    <input type="number" min="1" max="10" placeholder="Credits" class="subject-credits" inputmode="numeric">
                    <button class="btn" onclick="addSubject(${semesterCount})">➕ Add Subject</button>
                </div>
            </div>
            <div class="semester-sgpa hidden" id="sgpa${semesterCount}">
                <strong>🎯 Semester SGPA: <span id="sgpaValue${semesterCount}">0.00</span></strong>
            </div>
        </div>
    `;
    
    container.appendChild(semesterDiv);
    
    // Trigger animation
    setTimeout(() => {
        semesterDiv.style.animationDelay = '0s';
    }, 100);
}

function removeSemester(semNum) {
    const semesterDiv = document.getElementById(`semester${semNum}`);
    if (semesterDiv) {
        semesterDiv.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            semesterDiv.remove();
            updateSemesterNumbers();
        }, 300);
    }
}

function addSubject(semNum) {
    const subjectsContainer = document.getElementById(`subjects${semNum}`);
    const newSubjectRow = document.createElement('div');
    newSubjectRow.className = 'subject-row';
    
    newSubjectRow.innerHTML = `
        <input type="text" placeholder="Enter subject name" class="subject-name">
        <select class="subject-grade">
            <option value="">Select Grade</option>
            <option value="A">A (4.0)</option>
            <option value="A-">A- (3.7)</option>
            <option value="B+">B+ (3.4)</option>
            <option value="B">B (3.0)</option>
            <option value="B-">B- (2.7)</option>
            <option value="C+">C+ (2.4)</option>
            <option value="C">C (2.0)</option>
            <option value="D">D (1.0)</option>
            <option value="F">F (0.0)</option>
        </select>
        <input type="number" min="1" max="10" placeholder="Credits" class="subject-credits" inputmode="numeric">
        <button class="btn btn-danger" onclick="removeSubject(this)">🗑️ Remove</button>
    `;
    
    subjectsContainer.appendChild(newSubjectRow);
}

function removeSubject(button) {
    const row = button.parentElement;
    row.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => {
        row.remove();
    }, 300);
}

function updateSemesterNumbers() {
    const semesters = document.querySelectorAll('.semester-container');
    semesterCount = 0;
    
    semesters.forEach((semester, index) => {
        semesterCount++;
        const newSemNum = index + 1;
        
        semester.id = `semester${newSemNum}`;
        semester.querySelector('.semester-header h3').textContent = `📚 Semester ${newSemNum}`;
        semester.querySelector('.semester-header button').setAttribute('onclick', `removeSemester(${newSemNum})`);
        
        const subjectsContainer = semester.querySelector('[id^="subjects"]');
        subjectsContainer.id = `subjects${newSemNum}`;
        
        const sgpaDiv = semester.querySelector('[id^="sgpa"]');
        sgpaDiv.id = `sgpa${newSemNum}`;
        
        const sgpaValue = semester.querySelector('[id^="sgpaValue"]');
        sgpaValue.id = `sgpaValue${newSemNum}`;
        
        const addSubjectBtn = semester.querySelector('.subject-row button:not(.btn-danger)');
        if (addSubjectBtn) {
            addSubjectBtn.setAttribute('onclick', `addSubject(${newSemNum})`);
        }
    });
}

function calculateSemesterSGPA(semNum) {
    const subjectsContainer = document.getElementById(`subjects${semNum}`);
    const subjectRows = subjectsContainer.querySelectorAll('.subject-row');
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    let validSubjects = 0;
    
    subjectRows.forEach(row => {
        const name = row.querySelector('.subject-name').value.trim();
        const grade = row.querySelector('.subject-grade').value;
        const credits = parseInt(row.querySelector('.subject-credits').value);
        
        if (name && grade && credits && credits > 0) {
            totalGradePoints += gradePoints[grade] * credits;
            totalCredits += credits;
            validSubjects++;
        }
    });
    
    if (validSubjects > 0) {
        const sgpa = totalGradePoints / totalCredits;
        const roundedSgpa = Math.round((sgpa + Number.EPSILON) * 100) / 100;
        document.getElementById(`sgpaValue${semNum}`).textContent = roundedSgpa.toFixed(2);
        document.getElementById(`sgpa${semNum}`).classList.remove('hidden');
        return { sgpa: roundedSgpa, credits: totalCredits };
    } else {
        document.getElementById(`sgpa${semNum}`).classList.add('hidden');
        return null;
    }
}

function calculateAll() {
    const semesters = document.querySelectorAll('.semester-container');
    const semesterResults = [];
    
    semesters.forEach((semester, index) => {
        const semNum = index + 1;
        const result = calculateSemesterSGPA(semNum);
        if (result) {
            semesterResults.push({
                semester: semNum,
                sgpa: result.sgpa,
                credits: result.credits
            });
        }
    });
    
    if (semesterResults.length === 0) {
        alert('📚 Please add at least one complete semester with subjects, grades, and credits.');
        return;
    }
    
    calculateCumulativeCGPA(semesterResults);
}

function calculateCumulativeCGPA(semesterResults) {
    const results = [];
    let cumulativeGradePoints = 0;
    let cumulativeCredits = 0;
    
    semesterResults.forEach(sem => {
        cumulativeGradePoints += sem.sgpa * sem.credits;
        cumulativeCredits += sem.credits;
        const cgpa = cumulativeGradePoints / cumulativeCredits;
        const roundedCgpa = Math.round((cgpa + Number.EPSILON) * 100) / 100;

        results.push({
            semester: sem.semester,
            credits: sem.credits,
            sgpa: sem.sgpa.toFixed(2),
            cgpa: roundedCgpa.toFixed(2)
        });
    });
    
    displayResults(results);
}

function displayResults(results) {
    const resultsBody = document.getElementById('resultsBody');
    const finalCGPA = document.getElementById('finalCGPA');
    const resultsSection = document.getElementById('resultsSection');
    
    resultsBody.innerHTML = '';
    
    results.forEach((result, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Semester ${result.semester}</td>
            <td>${result.credits}</td>
            <td>${result.sgpa}</td>
            <td><strong>${result.cgpa}</strong></td>
        `;
        row.style.animation = `fadeInUp 0.4s ease-out ${index * 0.1}s both`;
        resultsBody.appendChild(row);
    });
    
    const lastResult = results[results.length - 1];
    const cgpaValue = parseFloat(lastResult.cgpa);
    let emoji = '🎯';
    
    if (cgpaValue >= 3.7) emoji = '🏆';
    else if (cgpaValue >= 3.4) emoji = '🥇';
    else if (cgpaValue >= 3.0) emoji = '🥈';
    else if (cgpaValue >= 2.7) emoji = '🥉';
    
    finalCGPA.innerHTML = `${emoji} Final CGPA: ${lastResult.cgpa} ${emoji}`;
    
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function clearAll() {
    const container = document.getElementById('semestersContainer');
    container.innerHTML = '';
    document.getElementById('resultsSection').classList.add('hidden');
    semesterCount = 0;
}

// ==================== STORAGE FUNCTIONS ====================

function saveData() {
    const data = {
        semesterCount: semesterCount,
        semesters: []
    };
    
    const semesters = document.querySelectorAll('.semester-container');
    
    semesters.forEach((semester, index) => {
        const semNum = index + 1;
        const subjectsContainer = document.getElementById(`subjects${semNum}`);
        const subjectRows = subjectsContainer.querySelectorAll('.subject-row');
        
        const subjects = [];
        subjectRows.forEach(row => {
            const name = row.querySelector('.subject-name').value.trim();
            const grade = row.querySelector('.subject-grade').value;
            const credits = row.querySelector('.subject-credits').value;
            
            subjects.push({
                name: name,
                grade: grade,
                credits: credits
            });
        });
        
        data.semesters.push({
            semesterNumber: semNum,
            subjects: subjects
        });
    });
    
    localStorage.setItem('cgpaData', JSON.stringify(data));
    showSaveIndicator();
}

function loadData() {
    const savedData = localStorage.getItem('cgpaData');
    
    if (!savedData) {
        addSemester();
        return;
    }
    
    try {
        const data = JSON.parse(savedData);
        
        const container = document.getElementById('semestersContainer');
        container.innerHTML = '';
        semesterCount = 0;
        
        data.semesters.forEach(semesterData => {
            semesterCount++;
            const semesterDiv = document.createElement('div');
            semesterDiv.className = 'semester-container';
            semesterDiv.id = `semester${semesterCount}`;
            
            semesterDiv.innerHTML = `
                <div class="semester-header">
                    <h3>📚 Semester ${semesterCount}</h3>
                    <button class="btn btn-danger" onclick="removeSemester(${semesterCount})">❌ Remove</button>
                </div>
                <div class="semester-content">
                    <div class="subject-header">
                        <div>Subject Name</div>
                        <div>Grade</div>
                        <div>Credits</div>
                        <div>Action</div>
                    </div>
                    <div id="subjects${semesterCount}"></div>
                    <div class="semester-sgpa hidden" id="sgpa${semesterCount}">
                        <strong>🎯 Semester SGPA: <span id="sgpaValue${semesterCount}">0.00</span></strong>
                    </div>
                </div>
            `;
            
            container.appendChild(semesterDiv);
            
            const currentSemNum = semesterCount;
            const subjectsContainer = document.getElementById(`subjects${currentSemNum}`);
            
            semesterData.subjects.forEach((subject, index) => {
                const row = document.createElement('div');
                row.className = 'subject-row';
                
                if (index === 0) {
                    row.innerHTML = `
                        <input type="text" placeholder="Enter subject name" class="subject-name" value="${subject.name}">
                        <select class="subject-grade">
                            <option value="">Select Grade</option>
                            <option value="A" ${subject.grade === 'A' ? 'selected' : ''}>A (4.0)</option>
                            <option value="A-" ${subject.grade === 'A-' ? 'selected' : ''}>A- (3.7)</option>
                            <option value="B+" ${subject.grade === 'B+' ? 'selected' : ''}>B+ (3.4)</option>
                            <option value="B" ${subject.grade === 'B' ? 'selected' : ''}>B (3.0)</option>
                            <option value="B-" ${subject.grade === 'B-' ? 'selected' : ''}>B- (2.7)</option>
                            <option value="C+" ${subject.grade === 'C+' ? 'selected' : ''}>C+ (2.4)</option>
                            <option value="C" ${subject.grade === 'C' ? 'selected' : ''}>C (2.0)</option>
                            <option value="D" ${subject.grade === 'D' ? 'selected' : ''}>D (1.0)</option>
                            <option value="F" ${subject.grade === 'F' ? 'selected' : ''}>F (0.0)</option>
                        </select>
                        <input type="number" min="1" max="10" placeholder="Credits" class="subject-credits" value="${subject.credits}" inputmode="numeric">
                        <button class="btn" onclick="addSubject(${currentSemNum})">➕ Add Subject</button>
                    `;
                } else {
                    row.innerHTML = `
                        <input type="text" placeholder="Enter subject name" class="subject-name" value="${subject.name}">
                        <select class="subject-grade">
                            <option value="">Select Grade</option>
                            <option value="A" ${subject.grade === 'A' ? 'selected' : ''}>A (4.0)</option>
                            <option value="A-" ${subject.grade === 'A-' ? 'selected' : ''}>A- (3.7)</option>
                            <option value="B+" ${subject.grade === 'B+' ? 'selected' : ''}>B+ (3.4)</option>
                            <option value="B" ${subject.grade === 'B' ? 'selected' : ''}>B (3.0)</option>
                            <option value="B-" ${subject.grade === 'B-' ? 'selected' : ''}>B- (2.7)</option>
                            <option value="C+" ${subject.grade === 'C+' ? 'selected' : ''}>C+ (2.4)</option>
                            <option value="C" ${subject.grade === 'C' ? 'selected' : ''}>C (2.0)</option>
                            <option value="D" ${subject.grade === 'D' ? 'selected' : ''}>D (1.0)</option>
                            <option value="F" ${subject.grade === 'F' ? 'selected' : ''}>F (0.0)</option>
                        </select>
                        <input type="number" min="1" max="10" placeholder="Credits" class="subject-credits" value="${subject.credits}" inputmode="numeric">
                        <button class="btn btn-danger" onclick="removeSubject(this)">🗑️ Remove</button>
                    `;
                }
                
                subjectsContainer.appendChild(row);
            });
        });
        
        console.log('✅ Data loaded successfully!');
    } catch (error) {
        console.error('Error loading data:', error);
        addSemester();
    }
}

function showSaveIndicator() {
    let indicator = document.getElementById('saveIndicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'saveIndicator';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-size: 14px;
        `;
        indicator.textContent = '💾 Saved!';
        document.body.appendChild(indicator);
        
        const animStyle = document.createElement('style');
        animStyle.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(animStyle);
    } else {
        indicator.style.display = 'block';
    }
    
    setTimeout(() => {
        indicator.style.display = 'none';
    }, 2000);
}

function clearAllData() {
    if (confirm('⚠️ Are you sure you want to clear all data? This will delete all semesters and subjects permanently.')) {
        localStorage.removeItem('cgpaData');
        const container = document.getElementById('semestersContainer');
        container.innerHTML = '';
        document.getElementById('resultsSection').classList.add('hidden');
        semesterCount = 0;
        addSemester();
        alert('✅ All data cleared!');
    }
}

function setupAutoSave() {
    const container = document.getElementById('semestersContainer');
    
    let saveTimeout;
    container.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveData();
        }, 1000);
    });
    
    container.addEventListener('change', function(e) {
        if (e.target.classList.contains('subject-grade')) {
            saveData();
        }
    });
}

// Store original functions
const _addSemester = addSemester;
const _removeSemester = removeSemester;
const _addSubject = addSubject;
const _removeSubject = removeSubject;

// Wrap functions to auto-save
addSemester = function() {
    _addSemester();
    setTimeout(() => saveData(), 100);
};

removeSemester = function(semNum) {
    _removeSemester(semNum);
    setTimeout(() => saveData(), 400);
};

addSubject = function(semNum) {
    _addSubject(semNum);
    setTimeout(() => saveData(), 100);
};

removeSubject = function(button) {
    _removeSubject(button);
    setTimeout(() => saveData(), 400);
};

// Add CSS animation for fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Initialize
loadTheme();
loadData(); // Load saved data instead of just adding a semester
setupAutoSave(); // Enable auto-save

// Enhanced mobile keyboard handling
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                this.style.fontSize = '16px';
            }
        });
    });
});