'use strict'; // JavaScript Document

const COURSES = document.querySelectorAll("li");
console.log(COURSES);

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

let container = document.querySelector('.courses');
console.log(container);

container.addEventListener('mouseover', highlightClasses);
container.addEventListener('mouseout', dehighlightClasses);