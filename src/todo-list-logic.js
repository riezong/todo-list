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
	// console.log(listTodo, typeof listTodo);
	// console.log(listDoing, typeof listDoing);
	// console.log(listDone, typeof listDone);
	// console.log(projects);

	class todoItem {
		constructor(title, description, dueDate, priority, notes, checklist) {
			this.title = title; // string
			this.description = description; // string
			this.dueDate = format(new Date(dueDate), 'dd.MM.yyyy'); // date
			this.priority = priority; // number
			this.notes = notes; // string
			this.checklist = checklist; // array? boolean?
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
	listTodo.add(todoTestItem);

	const todoTestItem2 = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);
	listTodo.add(todoTestItem2);

	const doingTestItem = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);
	listDoing.add(doingTestItem);

	const doneTestItem = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);
	listDone.add(doneTestItem);

	// console.log(listTodo, typeof listTodo);
	// console.log(listTodo.getTodos());

	return { projects };
})();

// console.log(todoListLogic.projects);

export { todoListLogic };
