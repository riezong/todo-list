import './styles.css';

class todoItem {
	constructor(title, description, dueDate, priority, notes, checklist) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.notes = notes;
		this.checklist = checklist;
	}
}

const testItem = new todoItem(
	'study',
	'study one hour',
	'today',
	'1',
	'The Odin Project',
	true
);
console.log(testItem);
