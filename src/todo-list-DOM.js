import { todoListLogic } from './todo-list-logic.js';

const projectList = todoListLogic.projects;
// console.log(projectList[0]);
// console.log(listTodo, typeof listTodo);
// console.log(listTodo.getTodos());

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
			// console.log(list, typeof list);
			// console.log(list.getTodos(), typeof list.getTodos());
			const todos = list.getTodos();
			// console.log(todos, typeof todos);

			const newList = document.createElement('div');
			newList.setAttribute('id', list.title);
			newList.setAttribute('class', 'todo-list');
			newList.textContent = list.title;

			if (todos.length > 0) {
				for (const item of todos) {
					console.log(item);

					const newItem = document.createElement('div');
					newItem.setAttribute('id', item.title);
					newItem.setAttribute('class', 'todo-item');

					const itemTitle = document.createElement('h1');
					itemTitle.textContent = item.title;
					newItem.appendChild(itemTitle);

					const itemDescription = document.createElement('h2');
					itemDescription.textContent = item.description;
					newItem.appendChild(itemDescription);

					const itemDue = document.createElement('p');
					itemDue.textContent = item.dueDate;
					newItem.appendChild(itemDue);

					const itemPriority = document.createElement('p');
					itemPriority.textContent = item.priority;
					newItem.appendChild(itemPriority);

					const itemNotes = document.createElement('p');
					itemNotes.textContent = item.notes;
					newItem.appendChild(itemNotes);

					newList.appendChild(newItem);
				}
			}

			projectLists.appendChild(newList);
		}
	})();
})();

export { todoListDOM };
