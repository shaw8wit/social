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
    const body = e.path[3];
    const id = body.querySelector('input[name="id"]').value;
    if (content === 'Comments') {
        e.target.textContent = 'Comment';
        const makeComment = document.createElement('div');
        makeComment.className = "card comment";
        makeComment.innerHTML = `
            <div class="card-body">
                <div class="card-title">
                    <h6>Create Comment:</h6>
                </div>
                <div class="card-text form-group">
                    <textarea class="form-control" name="comment" rows="2" placeholder="Write a comment.."></textarea>
                </div>
            </div>
        `;
        fetch(`/comment/${id}`)
            .then(response => response.json())
            .then(e => {
                e.forEach(item => {
                    const comment = document.createElement('div');
                    comment.className = "card";
                    comment.innerHTML = `
                        <div class="row text-center p-2 comment__value">
                            <div class="col">${item.user}</div>
                            <div class="col">${item.content}</div>
                            <div class="col">${item.date}</div>
                        </div>
                    `;
                    makeComment.appendChild(comment);
                });
            });
        body.appendChild(makeComment);
    } else {
        const comment = body.querySelector('.comment');
        const value = comment.querySelector('textarea[name="comment"]').value.trim();
        if (value.length === 0) {
            alert("Comment can't be empty!");
            return;
        }
        fetch(`/comment/${id}`, {
                method: 'POST',
                body: JSON.stringify({
                    comment: value,
                })
            })
            .then(response => {
                if (response.status === 204) {
                    comment.remove();
                    e.target.textContent = 'Comments';
                } else {
                    return response.json();
                }
            })
            .then(err => err && alert(err.error));
    }
}
const edit = (e) => {
    if (e.target.closest('.comment_button')) {
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