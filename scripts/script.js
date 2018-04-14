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
	'design-elective' : '<h2>Design Elective (3)</h2>',
	'ece--110'  : '<h2>ECE 110 (1-3)</h2><p>Introduction to selected fundamental concepts and principles in electrical engineering. Emphasis on measurement, modeling, and analysis of circuits and electronics while introducing numerous applications. Includes sub-discipline topics of electrical and computer engineering, for example, electromagnetics, control, signal processing, microelectronics, communications, and scientific computing basics. Lab work incorporates sensors and motors into an autonomous moving vehicle, designed and constructed to perform tasks jointly determined by the instructors and students.<br>Students must register for one lab and one lecture section. 1 hour of credit may be given for the lab taken alone with approval of the department.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/ECE/110</a>',
	'ece--211'  : '<h2>ECE 211 (2)</h2><p>Concepts from circuit and system analysis: linear systems; review of elementary circuit analysis; op amps; transient analysis; differential equation models of linear circuits and systems; Laplace transform.<br>Credit is not given for both ECE 211 and ECE 210. Prerequisite: ECE 110 and PHYS 212; credit or concurrent registration in MATH 285 or MATH 286.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/ECE/211</a>',
	'eng--100'  : '<h2>ENG 100 (0)</h2><p>Orientation required of new freshmen in the College of Engineering.<br>Approved for S/U grading only.<br>Freshmen should enroll in the section corresponding to their major.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/ENG/100</a>',
	'engineering-science-elective' : '<h2> ENGINEERING SCIENCE ELECTIVE (3)</h2>',
	'free-elective--1' : '<h2>FREE ELECTIVE</h2>',
	'free-elective--2' : '<h2>FREE ELECTIVE</h2>',
	'ie--300'   : '<h2>IE 300 (3)</h2><p>Nature of probabilistic models for observed data; discrete and continuous distribution function models; inferences on universe parameters based on sample values; control charts, acceptance sampling, and measurement theory.<br>Credit is not given for both IE 300 and CEE 202. Prerequisite: MATH 241.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/IE/300</a>',
	'ie--310'   : '<h2>IE 310 (3)</h2><p>Linear Optimization - Simplex method, duality, and sensitivity analysis, Transportation and Assignment Problems, Network Optimization Models, Dynamic Programming, Nonlinear optimization, and Discrete optimization.<br>Credit is not given for both IE 310 and CEE 201. Prerequisite: Credit or concurrent registration in MATH 415.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/IE/310</a>',
	'lee--1'    : '<h2>Liberal Education Elective (3)</h2>',
	'lee--2'    : '<h2>Liberal Education Elective (3)</h2>',
	'lee--3'    : '<h2>Liberal Education Elective (3)</h2>',
	'lee--4'    : '<h2>Liberal Education Elective (3)</h2>',
	'lee--5'    : '<h2>Liberal Education Elective (3)</h2>',
	'lee--6'    : '<h2>Liberal Education Elective (3)</h2>',
	'math--221' : '<h2>MATH 221 (4)</h2><p>First course in calculus and analytic geometry for students with some calculus background; basic techniques of differentiation and integration with applications including curve sketching; antidifferentation, the Riemann integral, fundamental theorem, exponential and trigonometric functions.<br>Credit is not given for both MATH 221 and either MATH 220 or MATH 234. Prerequisite: An adequate ALEKS placement score as described at http://math.illinois.edu/ALEKS/ and either one year of high school calculus or a minimum score of 2 on the AB Calculus AP exam.<br>Students must register for one discussion and one lecture section beginning with the same letter. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/MATH/221</a>',
	'math--231' : '<h2>MATH 231 (3)</h2><p>Second course in calculus and analytic geometry: techniques of integration, conic sections, polar coordinates, and infinite series.<br>Prerequisite: MATH 220 or MATH 221.<br>Students must register for one discussion and one lecture section beginning with the same letter in Fall and Spring terms only. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/MATH/231</a>',
	'math--241' : '<h2>MATH 241 (4)</h2><p>Third course in calculus and analytic geometry including vector analysis: Euclidean space, partial differentiation, multiple integrals, line integrals and surface integrals, the integral theorems of vector calculus.<br>Credit is not given for both MATH 241 and MATH 292. Prerequisite: MATH 231.<br>Students must register for one discussion and one lecture section beginning with the same letter in Fall and Spring terms only. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/MATH/241</a>',
	'math--285' : '<h2>MATH 285 (3)</h2><p>Techniques and applications of ordinary differential equations, including Fourier series and boundary value problems, and an introduction to partial differential equations. Intended for engineering majors and others who require a working knowledge of differential equations.<br>Credit is not given for both MATH 285 and any of MATH 284, MATH 286, MATH 441. Prerequisite: MATH 241.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/MATH/285</a>',
	'math--415' : '<h2>MATH 415 (3)</h2><p>Introductory course emphasizing techniques of linear algebra with applications to engineering; topics include matrix operations, determinants, linear equations, vector spaces, linear transformations, eigenvalues, and eigenvectors, inner products and norms, orthogonality, equilibrium, and linear dynamical systems.<br>3 or 4 undergraduate hours. 3 or 4 graduate hours. Credit is not given for both MATH 415 and any of MATH 125, MATH 225, MATH 410, or MATH 416. 4 hours of credit requires approval of the instructor and department with completion of additional work of substance. Prerequisite: MATH 241 or consent of instructor.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/MATH/415</a>',
	'phys--211' : '<h2>PHYS 211 (4)</h2><p>Newton\'s Laws, work and energy, static properties and fluids, oscillations, transverse waves, systems of particles, and rotations. A calculus-based approach for majors in engineering, mathematics, physics and chemistry.<br>Credit is not given for both PHYS 211 and PHYS 101. Prerequisite: Credit or concurrent registration in MATH 231.<br>For students in engineering, mathematics, physics and chemistry. Exams are given in the evening (during fall and spring semesters). Register for a lecture (A) section, a discussion (D) section and a laboratory (L) section. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/PHYS/211</a>',
	'phys--212' : '<h2>PHYS 212 (4)</h2><p>Coulomb\'s Law, electric fields, Gauss\' Law, electric potential, capacitance, circuits, magnetic forces and fields, Ampere\'s law, induction, electromagnetic waves, polarization, and geometrical optics. A calculus-based approach for majors in engineering, mathematics, physics, and chemistry.<br>Credit is not given for both PHYS 212 and PHYS 102. Prerequisite: PHYS 211; credit or concurrent registration in MATH 241.<br>For students in engineering, mathematics, physics and chemistry. Exams are given in the evening (during fall and spring semesters). Register for a lecture (A) section, a discussion (D) section and a laboratory (L) section. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/PHYS/212</a>',
	'phys--213' : '<h2>PHYS 213 (2)</h2><p>First and second laws of thermodynamics including kinetic theory of gases, heat capacity, heat engines, introduction to entropy and statistical mechanics, and introduction to application of free energy and Boltzmann factor. A calculus-based approach for majors in engineering, mathematics, physics and chemistry.<br>Credit is not given for both PHYS 213 and PHYS 101. Prerequisite: PHYS 211; credit or concurrent registration in MATH 241.<br>For students in engineering, mathematics, physics and chemistry. Exams are given in the evening (during fall and spring semesters). PHYS 213 meets only during part of the term; check the meeting dates. Register for a lecture (A) section, a discussion (D) section and a laboratory (L) section. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/PHYS/213</a>',
	'rhet--105' : '<h2>RHET 105 (4)</h2><p>Introduction in research-based writing and the construction of academic, argumentative essays that use primary and secondary sources as evidence. This course fulfills the Campus Composition I general education requirement.<br>Credit is not given for both RHET 105 and any of these other Comp I courses: RHET 101, RHET 102, CMN 111 or CMN 112.<br>Students whose second language is English should take an English placement test through the Division of English as an International Language, before signing up for rhetoric. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/RHET/105</a>',
	'se--100'   : '<h2>SE 100 (1)</h2><p>Overview of the engineering profession, the Industrial & Enterprise Systems Engineering Department, and the curricula in Industrial Engineering and Systems Engineering and Design.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/100</a>',
	'se--101'   : '<h2>SE 101 (3)</h2><p>Computer-aided design (CAD) software modeling of parts and assemblies. Parametric and non-parametric solid, surface, and wireframe models. Part editing and two-dimensional documentation of models. Planar projection theory, including sketching of perspective, isometric, multiview, auxiliary, and section views. Spatial visualization exercises. Dimensioning guidelines, tolerancing techniques. Team design project.<br>Credit is not given for both SE 101 and ME 170.<br>Students must register for one lab and one lecture section beginning with the same letter. Engineering students must obtain a dean\'s approval to drop this course after the second week of instruction.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/101</a>',
	'se--261'   : '<h2>SE 261 (1)</h2><p>Important elements and metrics of business and contemporary engineering economics: wealth creation, cash flow diagrams, internal rate of return, net present value, breakeven analysis, companies, corporations, profits, prices, balance sheets, income statements, and the basics of business plan writing. Particular emphasis is given to preparation for the economic analysis component of engineering practice.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/261</a>',
	'se--290'   : '<h2>SE 290 (0)</h2><p>Lecture-discussion series by department faculty and visiting professional engineers addressing ethics, professional registration, the role of technical societies, and the relation of engineering to such disciplines as economics, sociology, and government.<br>Approved for Letter and S/U grading.<br>It is recommended this seminar be taken in the sophomore year.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/290</a>',
	'se--310'   : '<h2>SE 310 (3)</h2><p>Fundamental concepts in the classical and computer-based analysis and design of structural and machine components and assemblies. External loads, internal forces, and displacements in statically determinate and indeterminate configurations: kinematics of linkages, gears, and cams; static forces in machines.<br>Prerequisite: CS 101, TAM 212, and TAM 251. Credit or concurrent enrollment in MATH 415.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/310</a>',
	'se--311'   : '<h2>SE 311 (3)</h2>',
	'se--312'   : '<h2>SE 312 (1)</h2>',
	'se--320'   : '<h2>SE 320 (4)</h2><p>Fundamental control systems and control systems technology. Sensors, actuators, modeling of physical systems, design and implementation of feedback controllers; operational techniques used in describing, analyzing and designing linear continuous systems; Laplace transforms; response via transfer functions; stability; performance specifications; controller design via transfer functions; frequency response; simple nonlinearities.<br>Credit is not given for both SE 320 and either AE 353 or ME 340. Prerequisite: CS 101, MATH 285, and TAM 212; credit or concurrent registration in ECE 211.</p><a>http://coecsl.ece.illinois.edu/ge320/<br>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/320</a>',
	'se--424'   : '<h2>SE 424 (3)</h2>',
	'se--494'   : '<h2>SE 494 (3)</h2><p>Senior engineering project - team component. Student teams of three or four, guided by faculty advisors, develop solutions to real-world engineering problems provided by industry-partnering companies, subject to realistic constraints and supported by economic analyses and recommendations for implementation. Prototype solutions fabricated where practical. Multiple reports and presentations throughout the term. Several trips to company typical. Common project grade for all team members. SE 494 and SE 495 taken concurrently fulfill the Advanced Composition Requirement. Approval of the department is required to register.<br>3 undergraduate hours. No graduate credit. Prerequisite: SE 261, SE 390 and; SE 311, IE 300, IE 310, and TAM 335; or IE 310, IE 311, and IE Technical Elective; credit or concurrent registration in a SE Design Elective and IE Engineering Science Elective. Must enroll concurrently in SE 495.<br>Must enroll concurrently in SE 495.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/494</a>',
	'se--495'   : '<h2>SE 495 (2)</h2><p>Adjunct to SE 494. Senior engineering project -- individual component. Individual grade for each team member. SE 494 and SE 495 taken concurrently fulfill the Advanced Composition Requirement.<br>2 undergraduate hours. No graduate credit. Prerequisite: Concurrent registration in SE 494.<br>Must enroll concurrently in SE 494.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/SE/495</a>',
	'sfo--1'    : '<h2>Secondary Field Option (3)</h2>',
	'sfo--2'    : '<h2>Secondary Field Option (3)</h2>',
	'sfo--3'    : '<h2>Secondary Field Option (3)</h2>',
	'sfo--4'    : '<h2>Secondary Field Option (3)</h2>',
	'tam--211'  : '<h2>TAM 211 (3)</h2><p>Forces, moments, and couples; resultants of force systems; equilibrium analysis and free-body diagrams; analysis of forces acting on members of trusses, frames, etc.; shear-force and bending-moment distributions; Coulomb friction; centroids, center of mass, moment of inertia, polar moment of inertia, and product of inertia; virtual work; hydrostatic pressure; applications of statics in design.<br>Credit is not given for both TAM 211 and TAM 210. Prerequisite: PHYS 211; credit or concurrent registration in MATH 241.<br>Students must register for one discussion and one lecture section.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/TAM/211</a>',
	'tam--212'  : '<h2>TAM 212 (3)</h2><p>Kinematics and dynamics of the three-dimensional motion of particles; kinematics and dynamics of the plane motion of rigid bodies; methods of work energy and impulse momentum; moving reference frames.<br>Prerequisite: TAM 210 or TAM 211.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/TAM/212</a>',
	'tam--251'  : '<h2>TAM 251 (3)</h2><p>Relationship between internal stresses and deformations produced by external forces acting on deformable bodies, and design principles based on mechanics of solids: normal stresses, shear stresses, and deformations produced by tensile, compressive, torsional, and bending loading of members; beam deflections; elastic energy and impact; multi-dimensional stress states; buckling of columns.<br>Prerequisite: TAM 210 or TAM 211.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/TAM/251</a>',
	'tam--335'  : '<h2>TAM 335 (4)</h2><p>Fluid statics; continuity, momentum, and energy principles via control volumes; ideal and real fluid flow; introduction to the Navier-Stokes equation; similitude; laminar and turbulent boundary layers; closed-conduit flow, open-channel flow, and turbomachinery.<br>Prerequisite: TAM 212.<br>Labs will not meet until the first full week of class. Students must register for one lab and one lecture section.</p><a>https://courses.illinois.edu/schedule/DEFAULT/DEFAULT/TAM/335</a>',
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