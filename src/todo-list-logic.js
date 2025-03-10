const todoListLogic = (function() {

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

const defaultList = new todoList('default');
console.log(projects, typeof projects);
// console.log(defaultList, typeof defaultList);

class todoItem {
	constructor(title, description, dueDate, priority, notes, checklist) {
		this.title = title; // string
		this.description = description; // string
		this.dueDate = new Date (dueDate); // date
		this.priority = priority; // number
		this.notes = notes; // string
		this.checklist = checklist; // array? boolean?
	}
}

const testItem = new todoItem(
	'study',
	'study one hour',
	'today',
	1,
	'The Odin Project',
	true
);

defaultList.add(testItem);
    
})();

export { todoListLogic };