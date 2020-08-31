const edit = (e) => {
    if (e.target.closest('.comment_button')) {
        console.log("comment pressed");
    } else if (e.target.closest('.edit_button')) {
        const content = e.path[3].querySelector('.content');
        const id = e.path[3].querySelector('input[name="id"]');
        if (e.target.innerText === 'Save') {
            console.log(id.value);
            e.target.innerText = 'Edit'
            content.innerHTML = `${content.querySelector('textarea').value || "Fix Empty!"}`;
        } else {
            e.target.innerText = 'Save';
            content.innerHTML = `<textarea class="form-control mt-4">${content.innerText}</textarea>`;
        }
    } else {
        return;
    }
    // console.log(e);
}

document.querySelectorAll('.post_body').forEach(e => e.addEventListener('click', edit));