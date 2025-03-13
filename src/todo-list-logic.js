import { compareAsc, format } from 'date-fns';

const todoListLogic = (function () {
	const projects = [];

	class todoList {
		constructor(title) {
			this.title = title;
			this.todoList = [];
			projects.push(this); // adds that object to the projects array. 'this' refers to the newly created todoList object.
		}

		add(todoItem) {
			this.todoList.push(todoItem);
		}

		getTitle() {
			return this.title;
		}

		getTodos() {
			return this.todoList;
		}
	}

	const listTodo = new todoList('todo');
	const listDoing = new todoList('doing');
	const listDone = new todoList('done');

	class todoItem {
		constructor(
			title,
			description,
			dueDate,
			priority,
			notes,
			checklist,
			targetListValue
		) {
			this.title = title; // string
			this.description = description; // string
			this.dueDate = new Date(dueDate); // date

			if (priority == 1) {
				this.priority = 'High';
			} else if (priority == 2) {
				this.priority = 'Medium';
			} else {
				this.priority = 'Low';
			}

			this.notes = notes; // string
			this.checklist = checklist; // array? boolean?

			this.targetListValue = targetListValue;
			let targetList;

			if (targetListValue === '' || targetListValue === undefined) {
				targetList = listTodo;
				targetList.add(this);
			} else {
				// Find the todoList object
				targetList = projects.find(
					(project) => project.getTitle() === targetListValue
				);
				if (!targetList) {
					targetList = listTodo; //if project is not found, default to listTodo.
				}
				targetList.add(this);
			}

			console.log(targetList.title);

			this.saveToLocalStorage();
			saveProjectsToLocalStorage();
		}

		setList(targetList) {
			this.targetList = targetList;
			targetList.add(this);

			this.saveToLocalStorage();
			saveProjectsToLocalStorage();
		}

		changeList(targetList) {
			console.log(this.targetList);
			const oldList = this.targetList;
			const newList = targetList;
			newList.add(this);
			oldList.splice(this);

			this.saveToLocalStorage();
			saveProjectsToLocalStorage();
		}

		saveToLocalStorage() {
			localStorage.setItem(this.title, JSON.stringify(this));
			console.log(localStorage);
		}
	}

	function saveProjectsToLocalStorage() {
		localStorage.setItem('projects', JSON.stringify(projects));
	}

	function loadFromLocalStorage() {
		const projectsData = JSON.parse(localStorage.getItem('projects'));
		if (projectsData) {
			projectsData.forEach((projectData) => {
				// Check if a project with the same title already exists
				const existingProject = projects.find(
					(project) => project.title === projectData.title
				);

				if (!existingProject) {
					// If it doesn't exist, create a new project
					const newProject = new todoList(projectData.title);
					projectData.todoList.forEach((todoData) => {
						new todoItem(
							todoData.title,
							todoData.description,
							todoData.dueDate,
							todoData.priority,
							todoData.notes,
							todoData.checklist,
							todoData.targetListValue
						);
					});
				} else {
					// if the project already exists, just add the todoItems.
					projectData.todoList.forEach((todoData) => {
						new todoItem(
							todoData.title,
							todoData.description,
							todoData.dueDate,
							todoData.priority,
							todoData.notes,
							todoData.checklist,
							todoData.targetListValue
						);
					});
				}
			});
		}
	}

	loadFromLocalStorage();

	return { projects, todoList, todoItem, saveProjectsToLocalStorage };
})();

export { todoListLogic };
