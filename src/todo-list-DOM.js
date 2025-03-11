import { todoListLogic } from './todo-list-logic.js';
// console.log(projectList[0]);
// console.log(listTodo, typeof listTodo);
// console.log(listTodo.getTodos());

const todoListDOM = (function () {
	const projectList = todoListLogic.projects;
	const todoListClass = todoListLogic.todoList;
	const listTodo = projectList[0];
	const todoItemClass = todoListLogic.todoItem;

	const Content = document.querySelector('#content');

	function renderSidebar() {
		const sidebar = document.createElement('div');
		sidebar.setAttribute('id', 'sidebar');
		sidebar.textContent = 'sidebar';
		Content.appendChild(sidebar);
	}

	function renderProjectContainer() {
		const projectsContainer = document.createElement('div');
		projectsContainer.setAttribute('id', 'projects');
		Content.appendChild(projectsContainer);
	}

	function renderProjectTitleBar() {
		const projectsContainer = document.querySelector('#projects');

		const titleBar = document.createElement('div');
		titleBar.setAttribute('id', 'title-bar');
		projectsContainer.appendChild(titleBar);

		const pageTitle = document.createElement('h1');
		pageTitle.textContent = 'projects';
		titleBar.appendChild(pageTitle);

		const addItemButton = document.createElement('button');
		addItemButton.setAttribute('id', 'add-item');
		addItemButton.textContent = 'New Todo Item';
		addItemButton.addEventListener('click', () => newTodoButton());
		titleBar.appendChild(addItemButton);
	}

	function newTodoButton() {
		const test = new todoItemClass(
			'exercise',
			'walk 5000 steps',
			'2025-03-10',
			1,
			'The Odin Project',
			true
		);

		console.log(listTodo, typeof listTodo);
		listTodo.add(test);

		refreshProjectList();
	}

	function renderProjectList() {
		const projectsContainer = document.querySelector('#projects');

		const projectLists = document.createElement('div');
		projectLists.setAttribute('id', 'project-list');
		projectsContainer.appendChild(projectLists);

		for (const currentProject of projectList) {
			// console.log(list, typeof list);
			// console.log(list.getTodos(), typeof list.getTodos());
			const todos = currentProject.getTodos();
			// console.log(todos, typeof todos);

			const projectDisplay = document.createElement('div');
			projectDisplay.setAttribute('id', currentProject.title);
			projectDisplay.setAttribute('class', 'todo-list');

			const projectTitle = document.createElement('h1');
			projectTitle.textContent = currentProject.title;
			projectDisplay.appendChild(projectTitle);

			if (todos.length > 0) {
				for (const item of todos) {
					projectDisplay.appendChild(renderTodoItem(item, todos));
				}
			}

			projectLists.appendChild(projectDisplay);
		}
	}

	function refreshProjectList() {
		const projectsContainer = document.querySelector('#projects');
		while (projectsContainer.firstChild) {
			projectsContainer.removeChild(projectsContainer.lastChild);
		}
		renderProjectContainer();
		renderProjectTitleBar();
		renderProjectList();
	}

	function renderTodoItem(item, todos) {
		console.log(item);

		const todoDisplay = document.createElement('div');
		todoDisplay.setAttribute('id', item.title);
		todoDisplay.setAttribute('class', 'todo-item');

		const todoTitle = document.createElement('h1');
		todoTitle.textContent = item.title;
		todoDisplay.appendChild(todoTitle);

		const todoDetailsContainer = document.createElement('div');
		todoDisplay.appendChild(todoDetailsContainer);

		const todoDueDate = document.createElement('p');
		todoDueDate.textContent = item.dueDate;
		todoDisplay.appendChild(todoDueDate);

		const toggleDetailsButton = document.createElement('button');
		toggleDetailsButton.textContent = 'Show More';
		toggleDetailsButton.addEventListener('click', () =>
			toggleItemDetails(
				item,
				todos,
				todoDisplay,
				todoDetailsContainer,
				toggleDetailsButton
			)
		);
		todoDisplay.appendChild(toggleDetailsButton);

		const deleteItemButton = document.createElement('button');
		deleteItemButton.textContent = 'Delete';
		deleteItemButton.addEventListener('click', () =>
			deleteItem(item, todos, todoDisplay)
		);
		todoDisplay.appendChild(deleteItemButton);

		return todoDisplay;
	}

	function toggleItemDetails(
		item,
		todos,
		todoDisplay,
		todoDetailsContainer,
		toggleDetailsButton
	) {
		switch (toggleDetailsButton.textContent) {
			case 'Show More':
				const itemDescription = document.createElement('h2');
				itemDescription.textContent = item.description;
				todoDetailsContainer.appendChild(itemDescription);

				const itemPriority = document.createElement('p');
				itemPriority.textContent = item.priority;
				todoDetailsContainer.appendChild(itemPriority);

				const itemNotes = document.createElement('p');
				itemNotes.textContent = item.notes;
				todoDetailsContainer.appendChild(itemNotes);

				const editDetailsButton = document.createElement('button');
				editDetailsButton.textContent = 'Edit';
				editDetailsButton.addEventListener('click', () => editItemDetails());
				todoDisplay.appendChild(editDetailsButton);

				toggleDetailsButton.textContent = 'Hide';
				break;

			case 'Hide':
				while (todoDetailsContainer.firstChild) {
					todoDetailsContainer.removeChild(todoDetailsContainer.lastChild);
				}

				todoDisplay.removeChild(todoDisplay.lastChild);

				toggleDetailsButton.textContent = 'Show More';
				break;

			default:
				break;
		}
	}

	function deleteItem(item, todos, newItem) {
		newItem.remove();
		todos.splice(todos.indexOf(item), 1); // Remove the item
		console.log(todos);
	}

	function editItemDetails() {}

	renderSidebar();
	renderProjectContainer();
	renderProjectTitleBar();
	renderProjectList();
})();

export { todoListDOM };
