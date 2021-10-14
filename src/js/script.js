const response = () => {
    fetch('./src/data.json')
        .then(response => response.json())
        .then(json => {
            localStorage.getItem('representatives') ? console.log("já existe um localstorage salvo!")
                : localStorage.setItem('representatives', JSON.stringify(json));

            sortRankings('representatives');

            const response = json.map(item => main('check-reprensentatives', item.id, item.name, item.src, item.name_without_space))

            return response
        })
        .then(() => {

            $("#filter-representative").keyup(function () {
                let stringPesquisa = $(this).val();
                $('.name-representative').closest('.representative').hide();
                $('.name-representative:contains(' + stringPesquisa + ')').closest('.representative').show()
            });

            // event on click
            $('.card').click(function (e) {
                // get dados this
                const representativeChecked = {
                    id: e.target['id'],
                    name: e.currentTarget.innerText,
                }
                // alert confirm or cancel
                Swal.fire({
                    title: `Confirmar seu voto no <br>${representativeChecked.name}`,
                    showDenyButton: true,
                    confirmButtonText: 'Confirmar',
                    denyButtonText: `Cancelar`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // get localstorage
                        const representativeStorage = JSON.parse(localStorage.getItem('representatives'));
                        // filter representative checked
                        const filterRepre = representativeStorage.filter((repre) => {
                            return repre.id === representativeChecked.id;
                        });
                        // mapping object and adding the vote
                        const mapStorage = representativeStorage.map((repre) => {
                            return repre.id == filterRepre[0].id ?
                                Object.assign(repre, { votings: repre.votings + 1 }) : repre;
                        });
                        // replace/set local storage on new object
                        localStorage.setItem('representatives', JSON.stringify(mapStorage));

                        // remove elements 
                        const containerList = document.querySelector(".ranking-list");
                        containerList.innerHTML = "";
                        
                        // add ranking on html
                        sortRankings('representatives');

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Voto confirmado!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // remove checked
                        $('.form-check-input').prop('checked', false);
                    } else if (result.isDenied) {
                        let timerInterval
                        Swal.fire({
                            title: 'Cancelando voto',
                            html: 'Retornando em <b></b> milliseconds.',
                            timer: 1100,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading()
                                const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log('I was closed by the timer')
                            }
                        })
                    }

                })
            });
        })
}


const sortRankings = (nameStorage) => {
    const sortRepresentative = JSON.parse(localStorage.getItem(nameStorage)).sort(function (a, b) {
        return (a.votings < b.votings) ? 1 : ((b.votings < a.votings) ? -1 : 0);
    })

    return sortRepresentative.map((item) => {
        return list(item.name, item.votings);
    })
}

response();

