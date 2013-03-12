function input() {
	insert('title', 'Title');
	newLine();
	insert('firstname', 'First Name', 'Please type your name.');
	insert('lastname', 'Last Name');
	block();
	insert('class', 'Name of the class');
	newLine();
	insert('teacher', 'Name of the teacher');
	newLine();
	insert('due', 'Due Date', 'dd Month yyyy');
	block();
	insert('content');
}         

function build(obj) {
	//format the header
	output(obj.firstname + ' ' + obj.lastname);
	block();
	output(obj.class);
	block();
	output(obj.teacher);
	block();
	output(obj.due);
	block();
	center(obj.title);
	block();
	output(obj.content);
	//double space it.
}