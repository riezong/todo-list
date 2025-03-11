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

		setList(targetList) {
			this.targetList = targetList;
			targetList.add(this);
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
	todoTestItem.setList(listTodo);

	const todoTestItem2 = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);
	todoTestItem2.setList(listTodo);

	const doingTestItem = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);
	doingTestItem.setList(listDoing);

	const doneTestItem = new todoItem(
		'exercise',
		'walk 5000 steps',
		'2025-03-10',
		1,
		'The Odin Project',
		true
	);
	doneTestItem.setList(listDone);

	// console.log(listTodo, typeof listTodo);
	// console.log(listTodo.getTodos());

	return { projects, listTodo, listDoing, listDone, todoList, todoItem };
})();

// console.log(todoListLogic.projects);

export { todoListLogic };
