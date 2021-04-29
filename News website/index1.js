class Posts {
	constructor(postForm, postContainer) {
		this.postForm = postForm;
		this.postContainer = postContainer;
	}
	
	init = () => {
		this.postForm.addEventListener('submit', this.createPost);
		this.postContainer.addEventListener('click', this.deletePost);
		this.postContainer.addEventListener('click', this.editPost);
	}
	
	createPost = (event) => {
		event.preventDefault();

		if (event.target.querySelector('.form-submit').classList.contains('edit-submit')){
			this.applyChanges();
			return;
		}

		const now = new Date();
		
		const elems = {};
		const elemsArray = [...event.target.elements];
		elemsArray.forEach((element) => {
			if (!element.id) {return;}
			
			elems[element.id] = element.value;
		});
		
		const contentElem = this.createPostElement('div', 'post-container');
		const titleElem = this.createPostElement('h3', 'post-title');
		const bodyElem = this.createPostElement('p', 'post-body');
		const timeElem = this.createPostElement('p', 'post-time');
		const delButton = this.createPostElement('button', 'delete');
		const editButton = this.createPostElement('button', 'edit');
		
		titleElem.innerHTML = elems.title;
		bodyElem.innerHTML = elems.body;
		delButton.innerHTML = 'Delete Post';
		editButton.innerHTML = 'Edit Post';
				
		const monthes = { 0: 'Jen', 1: 'Feb', 2: 'Mar', 3: 'Apr'};
		const year = now.getFullYear();
		const month = now.getMonth();
		const date = now.getDate();
		timeElem.innerHTML = `Created at: ${date}-${monthes[month]}-${year}`;
		
		contentElem.append(titleElem);
		contentElem.append(bodyElem);
		contentElem.append(timeElem);
		contentElem.append(delButton);
		contentElem.append(editButton);
		
		this.postContainer.append(contentElem);
		this.postForm.reset();
	};

	editPost = (event) => {
		if (!event.target.classList.contains('edit')) {return;}
		// поиск по массиву (метод массива)
		// const elemsArr = [...event.target.parentNode.childNodes];
		// const postTitle = elemsArr.find(elem => elem.classList.contains('post-title'));

		event.target.parentNode.classList.add('post-to-edit');

		const postTitleValue = event.target.parentNode.querySelector('.post-title').innerHTML;
		const postBodyValue = event.target.parentNode.querySelector('.post-body').innerHTML;

		const formTitleElem = this.postForm.querySelector('input[name="title"]');
		const formBodyElem = this.postForm.querySelector('textarea[name="body"]');

		document.querySelector('.form-title').innerHTML = `Edit post with title ${postTitleValue}`;
		const button = document.querySelector('.form-submit');
		button.classList.add('edit-submit');
		button.value = `Save post`;

		formTitleElem.value = postTitleValue;
		formBodyElem.value = postBodyValue;

		console.log(postTitleValue.innerHTML);

	};
	
	deletePost = (event) => {
		if (!event.target.classList.contains('delete')) {return;}
		event.target.parentNode.remove();
	};
	
	createPostElement = (tag, className) => {
		const elem = document.createElement(tag);
		if (className) {
			elem.classList.add(className);
		}
		
		return elem;
	}



	applyChanges = () => {
		const postContainer = document.querySelector('.post-to-edit');
		const timeElement = postContainer.querySelector('.post-time');
		const title = postContainer.querySelector('.post-title');
		const body = postContainer.querySelector('.post-body');

		title.innerHTML = this.postForm.elements[0].value;
		body.innerHTML = this.postForm.elements[1].value;

		document.querySelector('form-title').innerHTML = 'Create post';
		const button = document.querySelector('.form-submit');
		button.classList.remove('edit-submit');
		button.value = 'Create Post';
		postContainer.classList.remove('post-to-edit');
		this.postForm.reset();
	}
}

const posts = new Posts(
	document.querySelector('.post-form'),
	document.querySelector('.container'),
);

posts.init();

