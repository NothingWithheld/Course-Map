'use strict'; // JavaScript Document

const COURSES = document.querySelectorAll("li");
const container = document.querySelector('.courses');
const infoDiv = document.getElementById('course-info');

container.addEventListener('mouseover', highlightClasses);
container.addEventListener('mouseout', dehighlightClasses);
container.addEventListener('click', clickClass);
container.addEventListener('mouseover', displayInfoDiv);
container.addEventListener('mouseover', insertCourseInfo);
container.addEventListener('mouseout', removeCourseInfo);
document.querySelector('footer').addEventListener('mouseover', hideInfoDiv);

let prerequisites = {
	'math--231' : ['math--221',],
	'math--241' : ['math--231',],
	'math--285' : ['math--241',],
	'math--415' : ['math--241',],
	'phys--212' : ['phys--211',],
	'phys--213' : ['phys--211',],
	'cs--101'   : ['math--221',],
	'ece--211'  : ['ece--110', 'phys--212',],
	'se--310'   : ['cs--101', 'tam--212', 'tam--251',],
	'se--311'   : ['se--310',],
	'se--312'   : ['se--310',],
	'se--320'   : ['cs--101', 'math--285', 'tam--212',],
	'se--424'   : ['se--320', 'math--415',],
	'se--494'   : ['se--261', 'se--311', 'ie--300', 'ie--310', 'tam--335',],
	'ie--300'   : ['math--241',],
	'tam--211'  : ['phys--211',],
	'tam--212'  : ['tam--211',],
	'tam--251'  : ['tam--211',],
	'tam--335'  : ['tam--212',],
 };

let precorequisites = {
	'chem--103' : ['chem--102',],
	'phys--211'  : ['math--231',],
	'phys--212' : ['math--241',],
	'phys--213' : ['math--241',],
	'ece--211'  : ['math--285',],
	'se--310'   : ['math--415',],
	'se--320'   : ['ece--211',],
	'ie--310'   : ['math--415',],
	'tam--211'  : ['math--241',],
}

let corequisites = {
	'chem--102' : ['chem--103',],
	'se--311'   : ['se--312',],
	'se--312'   : ['se--311',],
	'se--494'   : ['se--495',],
	'se--495'   : ['se--494',],
}

let courseDetails = {
	'chem--102' : '<h2>CHEM 102 (3)</h2><p>For students who have some prior knowledge of chemistry. Principles governing atomic structure, bonding, states of matter, stoichiometry, and chemical equilibrium.<br>Credit is not given for both CHEM 102 and CHEM 202. CHEM 102 and CHEM 103 are approved for General Education credit only as a sequence. Both courses must be completed to receive Natural Science and Technology credit. Prerequisite: Credit in or exemption from MATH 112; one year of high school chemistry or equivalent. All students enrolled in CHEM 102 should also enroll in CHEM 103.<br>Students must register for a combination of one lecture and one quiz section beginning with the same letter.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/CHEM/102</a>',
	'chem--103' : '<h2> CHEM 103 (1)</h2><p>Laboratory studies to accompany CHEM 102.<br>Additional fees may apply. See Class Schedule. Credit is not given for both CHEM 103 and CHEM 203. CHEM 102 and CHEM 103 are approved for General Education credit only as a sequence. Both courses must be completed to receive Natural Science and Technology credit. Prerequisite: Credit or concurrent registration in CHEM 102 is required.<br>CHEM 103 is the laboratory course that accompanies CHEM 102. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/CHEM/103</a>',
	'cs--101'   : '<h2>CS 101 (3)</h2><p>Fundamental principles, concepts, and methods of computing, with emphasis on applications in the physical sciences and engineering. Basic problem solving and programming techniques; fundamental algorithms and data structures; use of computers in solving engineering and scientific problems. Intended for engineering and science majors.<br>Prerequisite: MATH 220 or MATH 221.<br>Students must register for one lab-discussion and one lecture section. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/CS/101</a>',
	'design-eletive' : '<h2>Design Elective (3)</h2>',
	'ece--110'  : '<h2>ECE 110 (1-3)</h2><p>Introduction to selected fundamental concepts and principles in electrical engineering. Emphasis on measurement, modeling, and analysis of circuits and electronics while introducing numerous applications. Includes sub-discipline topics of electrical and computer engineering, for example, electromagnetics, control, signal processing, microelectronics, communications, and scientific computing basics. Lab work incorporates sensors and motors into an autonomous moving vehicle, designed and constructed to perform tasks jointly determined by the instructors and students.<br>Students must register for one lab and one lecture section. 1 hour of credit may be given for the lab taken alone with approval of the department.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/ECE/110</a>',
	'ece--211'  : '<h2>ECE 211 (2)</h2><p>Concepts from circuit and system analysis: linear systems; review of elementary circuit analysis; op amps; transient analysis; differential equation models of linear circuits and systems; Laplace transform.<br>Credit is not given for both ECE 211 and ECE 210. Prerequisite: ECE 110 and PHYS 212; credit or concurrent registration in MATH 285 or MATH 286.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/ECE/211</a>',
	'eng--100'  : '<h2>ENG 100 (0)</h2><p>Orientation required of new freshmen in the College of Engineering.<br>Approved for S/U grading only.<br>Freshmen should enroll in the section corresponding to their major.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/ENG/100</a>',
	'se--320'   : '<h2>SE 320 (4)</h2><p>Fundamental control systems and control systems technology. Sensors, actuators, modeling of physical systems, design and implementation of feedback controllers; operational techniques used in describing, analyzing and designing linear continuous systems; Laplace transforms; response via transfer functions; stability; performance specifications; controller design via transfer functions; frequency response; simple nonlinearities.<br>Credit is not given for both SE 320 and either AE 353 or ME 340. Prerequisite: CS 101, MATH 285, and TAM 212; credit or concurrent registration in ECE 211.</p><a>http://coecsl.ece.illinois.edu/ge320/<br>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/320</a>',
}

function insertCourseInfo(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	let courseName = target.classList[0];
	if (courseName in courseDetails) {
		infoDiv.insertAdjacentHTML('afterbegin', courseDetails[courseName]);
	}
}

function removeCourseInfo(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	let courseName = target.classList[0];
	let infoh2 = infoDiv.querySelector('h2');
	let infop = infoDiv.querySelector('p');
	let infoa = infoDiv.querySelector('a');
	infoh2.remove();
	infop.remove();
	infoa.remove();
}

function displayInfoDiv() {
	infoDiv.classList.remove('hidden');
}

function hideInfoDiv() {
	infoDiv.classList.add('hidden');
}

function resetHold(event) {
	for (let i = 0; i < COURSES.length; i++) {
		COURSES[i].classList.toggle( COURSES[i].classList[1] );
//		container.addEventListener('click', clickClass);
		container.addEventListener('mouseover', highlightClasses);
		container.addEventListener('mouseover', addMouseout);
		container.removeEventListener('click', resetHold);
		container.addEventListener('click', highlightClick);
	}
	container.addEventListener('mouseover', insertCourseInfo);
	container.addEventListener('mouseout', removeCourseInfo);
}

function addMouseout(event) {
	container.addEventListener('mouseout', dehighlightClasses);
	container.removeEventListener('mouseover', addMouseout);
	container.removeEventListener('click', highlightClick);
}

function clickClass(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	container.removeEventListener('mouseout', dehighlightClasses);
	container.removeEventListener('mouseover', highlightClasses);
//	container.removeEventListener('click', clickClass);	
	container.addEventListener('click', resetHold);
	container.removeEventListener('mouseover', insertCourseInfo);
	container.removeEventListener('mouseout', removeCourseInfo);
	document.querySelector('footer').removeEventListener('mouseover', hideInfoDiv);
}

function highlightClick(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	highlightClasses(event);
	container.removeEventListener('mouseover', addMouseout);
	container.removeEventListener('click', highlightClick);
}

function clickClassAgain(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	container.removeEventListener('click', clickClassAgain);	
	container.addEventListener('click', clickClass);
	container.addEventListener('mouseout', dehighlightClasses);
	container.addEventListener('mouseover', highlightClasses);
}

function highlightClasses(event) {
	highlightHovered(event);
	highlightPrereqs(event);
	highlightCoreqs(event);
	highlightPreCoreqs(event);
	decreaseImportance(event);
}

function dehighlightClasses(event) {
	decreaseImportance(event);
	highlightHovered(event);
	highlightPrereqs(event);
	highlightCoreqs(event);
	highlightPreCoreqs(event);
}

function highlightHovered(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	target.classList.toggle('highlight');
}

function highlightPrereqs(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	let courseName = target.classList[0];
	if (courseName in prerequisites) {
		let prereqCourses = prerequisites[courseName];
		for (let i = 0; i < prereqCourses.length; i++) {
			document.querySelector(`.${prereqCourses[i]}`).classList.toggle('prereq');
		}
	}
}

function highlightCoreqs(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	let courseName = target.classList[0];
	if (courseName in corequisites) {
		let coreqCourse = corequisites[courseName];
		for (let i = 0; i < coreqCourse.length; i++) {
			document.querySelector(`.${coreqCourse[i]}`).classList.toggle('coreq');
		}
	}
}

function highlightPreCoreqs(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	let courseName = target.classList[0];
	if (courseName in precorequisites) {
		let precoreqCourses = precorequisites[courseName];
		for (let i = 0; i < precoreqCourses.length; i++) {
			document.querySelector(`.${precoreqCourses[i]}`).classList.toggle('precoreq');
		}
	}
}

function decreaseImportance(event) {
	let target = event.target.closest('li');
	if (!target) return;
	if ( !container.contains(target) ) return;
	for (let i = 0; i < COURSES.length; i++) {
		if ( !( COURSES[i].classList.contains('highlight') || COURSES[i].classList.contains('prereq') || COURSES[i].classList.contains('coreq') || COURSES[i].classList.contains('precoreq') ) ) {
			COURSES[i].classList.toggle('opacity-down');
		}
	}
}