import { todoListLogic } from './todo-list-logic.js';
import { compareAsc, format } from 'date-fns';

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

	function renderDialog() {
		const dialog = document.createElement('dialog');
		dialog.setAttribute('id', 'dialog');
		dialog.textContent = 'New Todo Item';
		Content.appendChild(dialog);

		const dialogContent = document.createElement('div');
		dialogContent.setAttribute('class', 'dialogContent');
		dialog.appendChild(dialogContent);

		const todoForm = document.createElement('form');
		todoForm.setAttribute('id', 'todoForm');
		dialogContent.appendChild(todoForm);

		const fields = [
			'title',
			'dueDate',
			'description',
			'priority',
			'notes',
			'targetList',
		];
		for (const item of fields) {
			// console.log(item);
			const itemDiv = document.createElement('div');
			const itemLabel = document.createElement('label');
			itemLabel.setAttribute('for', item);
			itemLabel.textContent = item;
			itemDiv.appendChild(itemLabel);
			const itemInput = document.createElement('input');
			switch (item) {
				case 'title':
				case 'description':
				case 'notes':
					itemInput.setAttribute('type', 'text');
					itemInput.setAttribute('value', 'Test');
					break;
				case 'dueDate':
					itemInput.setAttribute('type', 'date');
					itemInput.setAttribute('value', '2025-03-07');
					break;
				case 'priority':
					itemInput.setAttribute('type', 'number');
					itemInput.setAttribute('value', 3);
					break;
				case 'targetList':
					itemInput.setAttribute('type', 'string');
					break;
				default:
					break;
			}

			itemInput.setAttribute('id', item);
			itemDiv.appendChild(itemInput);
			todoForm.appendChild(itemDiv);
		}

		const submitButton = document.createElement('button');
		submitButton.setAttribute('type', 'submit');
		submitButton.setAttribute('value', 'submit');
		submitButton.setAttribute('id', 'addTodo');
		submitButton.textContent = 'Add Todo Item';
		todoForm.appendChild(submitButton);

		const form = document.getElementById('todoForm');
		form.addEventListener('submit', function (event) {
			event.preventDefault(); // Prevent page from refreshing

			// console.log(
			// 	form.elements.title.value,
			// 	form.elements.description.value,
			// 	form.elements.dueDate.value,
			// 	form.elements.priority.value,
			// 	form.elements.notes.value
			// );

			const test = new todoItemClass(
				form.elements.title.value,
				form.elements.description.value,
				form.elements.dueDate.value,
				form.elements.priority.value,
				form.elements.notes.value,
				true,
				form.elements.targetList.value
			);

			// localStorage.setItem('test', JSON.stringify(test));
			// console.log(localStorage);

			form.reset();
			refreshProjectList();
		});

		const closeButton = document.createElement('button');
		closeButton.setAttribute('id', 'close-dialog');
		closeButton.textContent = 'X';
		dialogContent.appendChild(closeButton);
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
		pageTitle.textContent = "RieZong's Todo List";
		titleBar.appendChild(pageTitle);

		const addItemButton = document.createElement('button');
		addItemButton.setAttribute('id', 'add-item');
		addItemButton.textContent = 'New Todo Item';
		titleBar.appendChild(addItemButton);

		const showButton = document.querySelector('#add-item');
		// "New Todo Item" button opens the dialog modally
		showButton.addEventListener('click', () => {
			dialog.showModal();
		});

		// "X" button closes the dialog
		const closeButton = document.querySelector('#close-dialog');
		closeButton.addEventListener('click', () => {
			dialog.close();
		});
	}

	function renderProjectList() {
		const projectsContainer = document.querySelector('#projects');

		const projectLists = document.createElement('div');
		projectLists.setAttribute('id', 'project-list');
		projectsContainer.appendChild(projectLists);

		for (const currentProject of projectList) {
			const todos = currentProject.getTodos();

			const projectDisplay = document.createElement('div');
			projectDisplay.setAttribute('id', currentProject.title);
			projectDisplay.setAttribute('class', 'todo-list');

			const projectTitle = document.createElement('h1');
			const currentProjectTitle = currentProject.title;
			projectTitle.textContent =
				currentProjectTitle.charAt(0).toUpperCase() +
				currentProjectTitle.slice(1);
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
		// console.log(item.targetList.title, typeof item);

		const todoDisplay = document.createElement('div');
		todoDisplay.setAttribute('id', item.title);
		todoDisplay.setAttribute('class', 'todo-item');

		const todoTitle = document.createElement('h1');
		todoTitle.textContent = item.title;
		todoDisplay.appendChild(todoTitle);

		const todoDueDate = document.createElement('p');
		todoDueDate.textContent = format(item.dueDate, 'dd.MM.yyyy');
		todoDisplay.appendChild(todoDueDate);

		const todoDetailsContainer = document.createElement('div');
		todoDetailsContainer.setAttribute('class', 'todo-details-container');
		todoDisplay.appendChild(todoDetailsContainer);

		const todoButtonsContainer = document.createElement('div');
		todoButtonsContainer.setAttribute('class', 'todo-item-buttons');
		todoDisplay.appendChild(todoButtonsContainer);

		const deleteItemButton = document.createElement('button');
		deleteItemButton.textContent = 'Delete';
		deleteItemButton.addEventListener('click', () =>
			deleteItem(item, todos, todoDisplay)
		);
		todoButtonsContainer.appendChild(deleteItemButton);

		const toggleDetailsButton = document.createElement('button');
		toggleDetailsButton.textContent = 'Show More';
		toggleDetailsButton.addEventListener('click', () =>
			toggleItemDetails(
				item,
				todos,
				todoButtonsContainer,
				todoDetailsContainer,
				toggleDetailsButton
			)
		);
		todoButtonsContainer.appendChild(toggleDetailsButton);

		return todoDisplay;
	}

	function toggleItemDetails(
		item,
		todos,
		todoButtonsContainer,
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
				todoButtonsContainer.appendChild(editDetailsButton);

				toggleDetailsButton.textContent = 'Hide';
				break;

			case 'Hide':
				while (todoDetailsContainer.firstChild) {
					todoDetailsContainer.removeChild(todoDetailsContainer.lastChild);
				}

				todoButtonsContainer.removeChild(todoButtonsContainer.lastChild);

				toggleDetailsButton.textContent = 'Show More';
				break;

			default:
				break;
		}
	}

	function deleteItem(item, todos, newItem) {
		newItem.remove(); // Remove from DOM
		todos.splice(todos.indexOf(item), 1); // Remove from array
		localStorage.removeItem(item.title); // Remove item from localStorage
		todoListLogic.saveProjectsToLocalStorage(); // Save updated JSON
	}

	function editItemDetails() {}

	renderDialog();
	renderProjectContainer();
	renderProjectTitleBar();
	renderProjectList();
})();

export { todoListDOM };
