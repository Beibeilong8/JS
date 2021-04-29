class Posts {
	constructor(postForm, postContainer) {
		this.postForm = postForm;
		this.postContainer = postContainer;
	}
	
	init = () => {
		this.postForm.addEventListener('submit', this.createPost)
		this.postContainer.addEventListener('click', this.deletePost)
	}
	
	createPost = (event) => {
		event.preventDefault();
		
		const now = new Date();
		
		const elems = {};
		const elemsArray = [...event.target.elements];
		elemsArray.forEach((element) => {
			if (!element.id) {
				return;
			}
			
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
	}

	editPost = () => {}
	
	deletePost = (event) => {
		if (!event.target.classList.contains('delete')) {
			return;
		}
		event.target.parentNode.remove();
	}
	
	createPostElement = (tag, className) => {
		const elem = document.createElement(tag);
		if (className) {
			elem.classList.add(className);
		}
		
		return elem;
	}
}

const posts = new Posts(
	document.querySelector('.post-form'),
	document.querySelector('.container'),
);

posts.init();

