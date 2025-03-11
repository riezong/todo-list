import { todoListLogic } from './todo-list-logic.js';

const projectList = todoListLogic.projects;
// console.log(projectList[0]);
// console.log(listTodo, typeof listTodo);
// console.log(listTodo.getTodos());

const todoListDOM = (function () {
	const Content = document.querySelector('#content');

	function renderSidebar() {
		const sidebar = document.createElement('div');
		sidebar.setAttribute('id', 'sidebar');
		sidebar.textContent = 'sidebar';
		Content.appendChild(sidebar);
	}

	function renderProjectList() {
		const projects = document.createElement('div');
		projects.setAttribute('id', 'projects');
		Content.appendChild(projects);

		const projectTitle = document.createElement('h1');
		// projectTitle.setAttribute('id', 'projects');
		projectTitle.textContent = 'projects';
		projects.appendChild(projectTitle);

		const projectLists = document.createElement('div');
		projectLists.setAttribute('id', 'project-list');
		projects.appendChild(projectLists);

		for (const list of projectList) {
			// console.log(list, typeof list);
			// console.log(list.getTodos(), typeof list.getTodos());
			const todos = list.getTodos();
			// console.log(todos, typeof todos);

			const newList = document.createElement('div');
			newList.setAttribute('id', list.title);
			newList.setAttribute('class', 'todo-list');

			const listTitle = document.createElement('h1');
			listTitle.textContent = list.title;
			newList.appendChild(listTitle);

			if (todos.length > 0) {
				for (const item of todos) {
					newList.appendChild(renderTodoItem(item, todos));
				}
			}

			projectLists.appendChild(newList);
		}
	}

	function renderTodoItem(item, todos) {
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

		const removeItem = document.createElement('button');
		removeItem.textContent = 'Delete';
		removeItem.addEventListener('click', () =>
			deleteItem(item, todos, newItem)
		);
		newItem.appendChild(removeItem);

		return newItem;
	}

	function deleteItem(item, todos, newItem) {
		newItem.remove();
		todos.splice(todos.indexOf(item), 1); // Remove the item
		console.log(todos);
	}

	renderSidebar();
	renderProjectList();
})();

export { todoListDOM };
