import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const AddToDo = text => {
	return { type: ADD_TODO, text };
};

const DeleteToDo = id => {
	return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case ADD_TODO:
			return [{ text: action.text, id: Date.now() }, ...state];
		case DELETE_TODO:
			return [];
		default:
			return state;
	}
};

const dispatchAddToDo = text => {
	store.dispatch(AddToDo(text));
};

const store = createStore(reducer);

const dispatchDeleteToDo = e => {
	const id = e.target.parentNode.id;
	store.dispatch(DeleteToDo(id));
};

const paintToDos = () => {
	const toDos = store.getState();
	ul.innerHTML = "";
	toDos.forEach(toDo => {
		const li = document.createElement("li");
		const btn = document.createElement("button");
		btn.innerText = "DEL";
		btn.addEventListener("click", dispatchDeleteToDo);
		li.id = toDo.id;
		li.innerText = toDo.text;
		ul.appendChild(btn);
		ul.appendChild(li);
	});
};

store.subscribe(paintToDos);

const onSubmit = e => {
	e.preventDefault();
	const toDo = input.value;
	input.value = "";
	dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
