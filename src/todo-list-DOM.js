import { todoListLogic } from './todo-list-logic.js';

const projectList = todoListLogic.projects;
console.log(projectList);

const todoListDOM = (function () {
	const Content = document.querySelector('#content');

	const sidebar = (function () {
		const sidebar = document.createElement('div');
		sidebar.setAttribute('id', 'sidebar');
		sidebar.textContent = 'sidebar';
		Content.appendChild(sidebar);
	})();

	const projects = (function () {
		const projects = document.createElement('div');
		projects.setAttribute('id', 'projects');
		Content.appendChild(projects);

		const projectTitle = document.createElement('div');
		// projectTitle.setAttribute('id', 'projects');
		projectTitle.textContent = 'projects';
		projects.appendChild(projectTitle);

		const projectLists = document.createElement('div');
		projectLists.setAttribute('id', 'project-list');
		projects.appendChild(projectLists);
		const projectBody = document.createElement('div');
		for (const list of projectList) {
			const newList = document.createElement('div');
			newList.setAttribute('id', list.title);
			newList.setAttribute('class', 'todo-list');
			newList.textContent = list.title;
			projectLists.appendChild(newList);
		}
	})();
})();

export { todoListDOM };
