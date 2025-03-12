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
			this.dueDate = format(new Date(dueDate), 'dd.MM.yyyy'); // date
			switch (priority) {
				case 1:
					this.priority = 'High';
					break;
				case 2:
					this.priority = 'Medium';
					break;
				case 3:
					this.priority = 'Low';
					break;
				default:
					break;
			}
			this.notes = notes; // string
			this.checklist = checklist; // array? boolean?

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
		}

		setList(targetList) {
			this.targetList = targetList;
			targetList.add(this);
		}

		changeList(targetList) {
			console.log(this.targetList);
			const oldList = this.targetList;
			const newList = targetList;
			newList.add(this);
			oldList.splice(this);
		}
	}

	const todoTestItem = new todoItem(
		'study',
		'study one hour',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);

	const todoTestItem2 = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);

	const doingTestItem = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true,
		'doing'
	);

	const doneTestItem = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true,
		'done'
	);

	return { projects, listTodo, listDoing, listDone, todoList, todoItem };
})();

export { todoListLogic };
