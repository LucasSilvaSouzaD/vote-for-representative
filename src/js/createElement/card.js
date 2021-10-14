const representatives = document.querySelector('#representatives');

const main = (tagName, id, name, src, name_without_space) => {
    const container = `
        <div class="col-2 representative">
            <label class="form-check-label ${name_without_space}" for=${id}>
                <div class="card">
                    <img src=${src} class="card-img-top"/>
                    <div class="card-body">
                        <p class="text-center text-muted">
                            <input type="radio" class="form-check-input" name=${tagName} id=${id}>
                            <small class="text-muted name-representative">
                                ${name}
                            </small>
                        </p>
                    </div>
                </div
            </label>
        </div>
    `
    const html = $.parseHTML( container);
    $(representatives).append(html);

}

