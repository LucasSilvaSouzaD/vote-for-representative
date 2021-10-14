const listHtml = document.querySelector('.list-group');

const list = (name, qtdVotings) => {
    const list = `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${name}</div>
            </div>
            <span class="badge bg-primary rounded-pill">${qtdVotings}</span>
        </li>
    `

    const html = $.parseHTML(list);
    $(listHtml).append(html);
}