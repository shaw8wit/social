const editPost = (e) => {
    const content = e.path[3].querySelector('.content');
    if (e.target.innerText === 'Save') {
        const value = content.querySelector('textarea').value;
        if (value.trim().length === 0) {
            alert("Post can't be empty!");
            return;
        }
        const id = e.path[3].querySelector('input[name="id"]').value;
        fetch(`/editPost/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    content: value,
                })
            })
            .then(response => {
                if (response.status === 204) {
                    e.target.innerText = 'Edit';
                    content.innerHTML = `${value}`;
                } else {
                    return response.json();
                }
            })
            .then(err => {
                if (err !== undefined) alert(err.error);
            });
    } else {
        e.target.innerText = 'Save';
        content.innerHTML = `<textarea class="form-control mt-4">${content.innerText}</textarea>`;
    }
}

const editLike = (e) => {
    const status = e.target.classList.contains('like--active');
    const value = parseInt(e.target.innerText.trim()) + ((status) ? 1 : -1);
    const id = e.path[1].querySelector('input[name="id"]').value;
    fetch(`/editPost/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                likes: status,
            })
        })
        .then(response => {
            if (response.status === 204) {
                e.target.innerHTML = ` ${value}`;
                e.target.classList.toggle('like--active');
                e.target.classList.toggle('like--inactive');
            } else {
                return response.json();
            }
        })
        .then(err => err && alert(err.error));
}

const editComment = (e) => {
    var content = e.target.textContent;
    if (content === 'Comments') {
        e.target.textContent = 'Comment';
        console.log(e.path);
    } else {
        e.target.textContent = 'Comments';
        console.log(e.path);
    }
}

const edit = (e) => {
    if (e.target.closest('.comment_button')) {
        console.log("comment pressed");
        editComment(e);
    } else if (e.target.closest('.edit_button')) {
        editPost(e);
    } else if (e.target.closest('.like')) {
        e.preventDefault();
        editLike(e);
    } else {
        return;
    }
    // console.log(e);
}

document.querySelectorAll('.post_body').forEach(e => e.addEventListener('click', edit));